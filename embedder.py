import os
from google import genai
from typing import List
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Initialize the new Gemini Client
# It automatically looks for GOOGLE_API_KEY, but we can pass it explicitly
api_key = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=api_key)

# The correct, currently supported embedding model
EMBEDDING_MODEL = "text-embedding-004" # Note: If 004 fails, use "gemini-embedding-001"

def embed_chunks(chunks: List[str]) -> List[List[float]]:
    """
    Embeds a list of chunks using the new Gemini SDK.
    The SDK handles batching automatically when passed a list.
    """
    try:
        # Use the correct task type and model
        response = client.models.embed_content(
            model='gemini-embedding-001',
            contents=chunks,
            config={
                'task_type': 'RETRIEVAL_DOCUMENT'
            }
        )
        # Extract embeddings from the response
        return [item.values for item in response.embeddings]
    except Exception as e:
        print(f"Error embedding chunks: {e}")
        return []

def embed_user_query(query: str) -> List[float]:
    """
    Embeds a single user query using the new Gemini SDK.
    """
    try:
        response = client.models.embed_content(
            model='gemini-embedding-001',
            contents=query,
            config={
                'task_type': 'RETRIEVAL_QUERY'
            }
        )
        return response.embeddings[0].values
    except Exception as e:
        print(f"Error embedding query: {e}")
        return []

# --- TEST BLOCK ---
# This part allows you to see the code actually working in your terminal
if __name__ == "__main__":
    test_text = ["Hello world", "This is a test of the Gemini embedding system."]
    
    print("Generating embeddings...")
    vectors = embed_chunks(test_text)
    
    if vectors:
        print(f"Success! Generated {len(vectors)} vectors.")
        print(f"First vector dimension size: {len(vectors[0])}")
    else:
        print("Failed to generate embeddings. Check your API key in the .env file.")