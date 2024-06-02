import sys
import cv2
import dlib
import ffmpeg
import numpy as np
import librosa
import moviepy.editor as mp
from scipy.spatial import distance as dist
from imutils import face_utils
import json
import os

def analyze_video(filepath):
    try:
        # Convert video if necessary
        if not filepath.endswith('.mp4'):
            converted_path = convert_to_mp4(filepath)
        else:
            converted_path = filepath
        
        # Extract frames and audio from the video
        video = cv2.VideoCapture(converted_path)
        if not video.isOpened():
            raise Exception("Could not open video file.")
        
        audio_path = extract_audio(converted_path)

        # Perform analysis
        facial_expressions = facial_expression_analysis(video)
        eye_contact = eye_contact_analysis(video)
        gestures = gesture_analysis(video)
        posture = posture_analysis(video)
        speech = analyze_speech(audio_path)

        # Calculate overall score (this is a simple average of individual scores)
        overall_score = (facial_expressions['score'] + eye_contact['score'] + gestures['score'] +
                         posture['score'] + speech['score']) / 5

        results = {
            "facial_expressions": facial_expressions,
            "eye_contact": eye_contact,
            "gestures": gestures,
            "posture": posture,
            "speech": speech,
            "overall_score": overall_score
        }

        print(json.dumps(results))
    except Exception as e:
        print(json.dumps({"error": str(e)}))
        sys.exit(1)

def extract_audio(filepath):
    try:
        video = mp.VideoFileClip(filepath)
        audio_path = filepath.replace('.mp4', '.wav')
        video.audio.write_audiofile(audio_path)
        return audio_path
    except Exception as e:
        raise Exception(f"Failed to extract audio: {str(e)}")
    
def convert_to_mp4(filepath):
    try:
        output_path = filepath + '.mp4'
        ffmpeg.input(filepath).output(output_path).run(overwrite_output=True)
        return output_path
    except Exception as e:
        raise Exception(f"Failed to convert video to MP4: {str(e)}")

def analyze_speech(audio_path):
    y, sr = librosa.load(audio_path)
    tone_score = analyze_tone(y, sr)
    pitch_score = analyze_pitch(y, sr)
    speed_score = analyze_speed(y, sr)

    overall_score = (tone_score + pitch_score + speed_score) / 3

    return {
        "tone": tone_score,
        "pitch": pitch_score,
        "speed": speed_score,
        "score": overall_score
    }

def analyze_tone(y, sr):
    # Placeholder function for tone analysis, returns score between 0 and 1
    return 0.8

def analyze_pitch(y, sr):
    # Use librosa to extract pitch, returns score between 0 and 1
    pitches, magnitudes = librosa.core.piptrack(y=y, sr=sr)
    pitch = np.mean([pitches[t].max() for t in range(pitches.shape[1]) if magnitudes[t].max() > 0])
    return min(max(pitch / 300, 0), 1)  # Normalize pitch score

def analyze_speed(y, sr):
    # Use librosa to analyze speech speed, returns score between 0 and 1
    tempo, _ = librosa.beat.beat_track(y=y, sr=sr)
    return min(max(tempo / 300, 0), 1)  # Normalize tempo score

def facial_expression_analysis(video):
    detector = dlib.get_frontal_face_detector()
    predictor_path = r"D:/FYP/SHS/ml/models/shape_predictor_68_face_landmarks.dat"
    print(f"Trying to load shape predictor from: {predictor_path}")
    if not os.path.exists(predictor_path):
        raise Exception(f"Shape predictor file not found at: {predictor_path}")
    
    predictor = dlib.shape_predictor(predictor_path)
    emotion_model = load_emotion_model()
    scores = []

    while True:
        ret, frame = video.read()
        if not ret:
            break

        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = detector(gray)

        for face in faces:
            landmarks = predictor(gray, face)
            landmarks = face_utils.shape_to_np(landmarks)

            # Crop face region for emotion recognition
            x, y, w, h = face.left(), face.top(), face.width(), face.height()
            face_img = frame[y:y+h, x:x+w]
            emotion_score = recognize_emotion(face_img, emotion_model)
            scores.append(emotion_score)

    overall_score = np.mean(scores) if scores else 0
    return {"score": overall_score, "details": scores}

def load_emotion_model():
    # Load your pre-trained emotion recognition model
    model = cv2.dnn.readNetFromONNX('D:/FYP/SHS/ml/models/emotion-ferplus-8.onnx')
    return model

def recognize_emotion(face_img, model):
    # Preprocess the face image and recognize emotion, returns score between 0 and 1
    blob = cv2.dnn.blobFromImage(face_img, scalefactor=1.0, size=(64, 64),
                                 mean=(0, 0, 0), swapRB=True, crop=False)
    model.setInput(blob)
    output = model.forward()
    emotion = np.argmax(output)
    return emotion / 6  # Normalize emotion score

def eye_contact_analysis(video):
    detector = dlib.get_frontal_face_detector()
    predictor_path = r"D:/FYP/SHS/ml/models/shape_predictor_68_face_landmarks.dat"
    predictor = dlib.shape_predictor(predictor_path)
    scores = []

    while True:
        ret, frame = video.read()
        if not ret:
            break

        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = detector(gray)

        for face in faces:
            landmarks = predictor(gray, face)
            landmarks = face_utils.shape_to_np(landmarks)
            left_eye = landmarks[36:42]
            right_eye = landmarks[42:48]

            left_eye_aspect_ratio = eye_aspect_ratio(left_eye)
            right_eye_aspect_ratio = eye_aspect_ratio(right_eye)

            avg_ear = (left_eye_aspect_ratio + right_eye_aspect_ratio) / 2.0
            if avg_ear < 0.25:
                scores.append(0.0)  # Not looking
            else:
                scores.append(1.0)  # Looking

    overall_score = np.mean(scores) if scores else 0
    return {"score": overall_score, "details": scores}

def eye_aspect_ratio(eye):
    A = dist.euclidean(eye[1], eye[5])
    B = dist.euclidean(eye[2], eye[4])
    C = dist.euclidean(eye[0], eye[3])
    ear = (A + B) / (2.0 * C)
    return ear

def gesture_analysis(video):
    scores = []

    while True:
        ret, frame = video.read()
        if not ret:
            break

        # Placeholder for actual gesture analysis
        scores.append(0.8)  # Assume a constant score for simplicity

    overall_score = np.mean(scores) if scores else 0
    return {"score": overall_score, "details": scores}

def posture_analysis(video):
    scores = []

    while True:
        ret, frame = video.read()
        if not ret:
            break

        # Placeholder for actual posture analysis
        scores.append(0.9)  # Assume a constant score for simplicity

    overall_score = np.mean(scores) if scores else 0
    return {"score": overall_score, "details": scores}

if __name__ == "__main__":
    video_path = r"D:\FYP\SHS\uploads\2f1357b7bf536dfd7aff98025f9786af.mp4"
    # video_path = sys.argv[1]
    analyze_video(video_path)
