import sys
import cv2
import numpy as np
from PIL import Image
from feat import Detector
import tempfile
import os
import json
import mediapipe as mp

detector = Detector(face_model="retinaface", landmark_model="mobilenet", emotion_model="resmasknet")
mp_pose = mp.solutions.pose
pose = mp_pose.Pose()

video_path = sys.argv[1]
cap = cv2.VideoCapture(video_path)

if not cap.isOpened():
    print(json.dumps({"error": "Could not open video"}))
    sys.exit(1)

frame_count = 0
emotion_scores = []
gesture_scores = []
body_language_scores = []
frame_interval = 30

cumulative_emotions = None
cumulative_gesture_score = 0
cumulative_confidence_score = 0
num_processed_frames = 0

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break

    frame_count += 1

    if frame_count % frame_interval == 0:
        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        frame_pil = Image.fromarray(frame_rgb)

        with tempfile.NamedTemporaryFile(suffix='.png', delete=False) as temp_file:
            frame_pil.save(temp_file.name)
            temp_file_path = temp_file.name

        result = detector.detect_image([temp_file_path])
        os.remove(temp_file_path)

        if not result.emotions.empty and not result.landmarks.empty:
            emotions = result.emotions.iloc[0]
            landmarks = result.landmarks.iloc[0]
            confidence = result.confidence.iloc[0] if 'confidence' in result.columns else 1.0

            emotion_scores.append({
                'frame': frame_count,
                'emotions': emotions.to_dict(),
                'confidence': confidence
            })

            y_coordinates = landmarks[[key for key in landmarks.index if key.startswith('y_')]]
            gesture_score = y_coordinates.mean()
            frame_height = frame.shape[0]
            normalized_gesture_score = gesture_score / frame_height

            gesture_scores.append({
                'frame': frame_count,
                'gesture_score': normalized_gesture_score
            })

            if cumulative_emotions is None:
                cumulative_emotions = emotions.copy()
            else:
                cumulative_emotions += emotions
            cumulative_gesture_score += normalized_gesture_score
            cumulative_confidence_score += confidence
            num_processed_frames += 1

        results = pose.process(frame_rgb)
        if results.pose_landmarks:
            pose_landmarks = results.pose_landmarks.landmark
            visibility_scores = [landmark.visibility for landmark in pose_landmarks]
            body_language_score = np.mean(visibility_scores)

            body_language_scores.append({
                'frame': frame_count,
                'body_language_score': body_language_score
            })

cap.release()

if num_processed_frames > 0:
    average_emotions = cumulative_emotions / num_processed_frames
    average_gesture_score = cumulative_gesture_score / num_processed_frames
    average_confidence_score = cumulative_confidence_score / num_processed_frames
    average_overall_score = (0.4 * average_gesture_score) + (0.4 * (average_emotions['happiness'] / average_emotions.sum())) + (0.2 * average_confidence_score)
    average_body_language_score = np.mean([score['body_language_score'] for score in body_language_scores])

    results = {
        'emotion_scores': emotion_scores,
        'gesture_scores': gesture_scores,
        'body_language_scores': body_language_scores,
        'average_emotions': average_emotions.to_dict(),
        'average_gesture_score': average_gesture_score,
        'average_confidence_score': average_confidence_score,
        'average_overall_score': average_overall_score,
        'average_body_language_score': average_body_language_score,
        'interview_score': average_overall_score,  # Example: overall score as interview score
        'emotion_analysis': average_emotions.to_dict(),
        'gesture_analysis': average_gesture_score,
        'audio_analysis': average_confidence_score  # Placeholder: replace with actual audio analysis if needed
    }
else:
    results = {"error": "No frames processed"}

print(json.dumps(results))
