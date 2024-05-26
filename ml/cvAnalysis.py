import sys
import json
import PyPDF2
from transformers import BertTokenizer, BertModel
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np

# Load BERT model and tokenizer
tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
model = BertModel.from_pretrained('bert-base-uncased')

# Function to extract text from PDF
def extract_text_from_pdf(pdf_path):
    try:
        text = ''
        with open(pdf_path, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            for page in reader.pages:
                text += page.extract_text()
        return text
    except Exception as e:
        print(f"Error extracting text from PDF: {e}")
        return ""

# Function to get BERT embeddings
def get_embeddings(text):
    try:
        inputs = tokenizer(text, return_tensors='pt', truncation=True, padding=True, max_length=512)
        outputs = model(**inputs)
        return outputs.last_hidden_state.mean(dim=1).detach().numpy()
    except Exception as e:
        print(f"Error getting embeddings: {e}")
        return np.array([])

# Extract command line arguments
pdf_path = sys.argv[1]
job_description = sys.argv[2]

# Extract text from PDF
cv_text = extract_text_from_pdf(pdf_path)

if cv_text == "":
    result = {
        "error": "Failed to extract text from CV PDF"
    }
else:
    # Get embeddings for CV and job description
    cv_embeddings = get_embeddings(cv_text)
    job_embeddings = get_embeddings(job_description)

    if cv_embeddings.size == 0 or job_embeddings.size == 0:
        result = {
            "error": "Failed to get embeddings"
        }
    else:
        # Calculate cosine similarity
        similarity_score = float(cosine_similarity(cv_embeddings, job_embeddings)[0][0])

        # Create a result dictionary
        result = {
            "score": similarity_score,
            "cv_text": cv_text,
            "job_description": job_description
        }

# Print result as JSON
print(json.dumps(result))
