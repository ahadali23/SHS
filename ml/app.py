import PyPDF2

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

# Hardcoded PDF path for testing
pdf_path = 'D:/FYP/SHS/uploads/file-1716727796847.pdf'

# Print PDF path for debugging
print("PDF Path:", pdf_path)

# Extract text from PDF
cv_text = extract_text_from_pdf(pdf_path)

# Print extracted text for debugging
print("Extracted Text:", cv_text)
