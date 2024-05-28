import openai

def generate_questions(job_title, test_type, num_questions):
    # Set up OpenAI API key
    openai.api_key = 'YOUR_OPENAI_API_KEY'

    # Define the prompt for generating questions
    prompt = f"Generate {num_questions} questions of {test_type} for the job with title {job_title}. Also provide answers separately."

    # Generate questions using the OpenAI API
    response = openai.Completion.create(
        engine="text-davinci-003",
        prompt=prompt,
        temperature=0.7,
        max_tokens=100,
        n=num_questions,
        stop=None
    )

    # Extract the generated questions from the API response
    generated_questions = [item['text'].strip() for item in response.choices]

    return generated_questions

if __name__ == "__main__":
    # Hardcoded values (for testing)
    job_title = "Full-Stack Developer"
    test_type = "multiple-choice"
    num_questions = 5

    # Generate questions using the OpenAI API
    questions = generate_questions(job_title, test_type, num_questions)

    # Print the generated questions
    for i, question in enumerate(questions):
        print(f"Question {i+1}: {question}")
