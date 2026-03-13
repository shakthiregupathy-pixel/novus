import os
import time
from google import genai
from typing import List
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Initialize the new Gemini Client
api_key = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=api_key)

EMBEDDING_MODEL = "text-embedding-004" # Note: If 004 fails, use "gemini-embedding-001"

def embed_chunks(chunks: List[str]) -> List[List[float]]:
    """
    Embeds a list of chunks using the new Gemini SDK.
    """
    try:
        response = client.models.embed_content(
            model='gemini-embedding-001',
            contents=chunks,
            config={
                'task_type': 'RETRIEVAL_DOCUMENT'
            }
        )
        return [item.values for item in response.embeddings]
    except Exception as e:
        print(f"Error embedding chunks: {e}")
        return []

def embed_user_query(query: str) -> List[float]:
    """
    Embeds a single user query using the new Gemini SDK WITH AUTOMATIC RETRIES.
    """
    max_retries = 3
    
    for i in range(max_retries):
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
            # If we hit the rate limit (429 Too Many Requests), wait and retry
            if "429" in str(e) or "RESOURCE_EXHAUSTED" in str(e):
                if i < max_retries - 1:
                    wait_time = 5 * (2 ** i) # Waits 5s, then 10s
                    print(f"Rate limit hit! Automatically waiting {wait_time} seconds...")
                    time.sleep(wait_time)
                    continue # Try the loop again
            
            # If it's a different error, print it and stop
            print(f"Error embedding query: {e}")
            return []
            
    return []

# --- TEST BLOCK ---
if __name__ == "__main__":
    test_text = ["Hello world", "This is a test of the Gemini embedding system."]
    
    print("Generating embeddings...")
    vectors = embed_chunks(test_text)
    
    if vectors:
        print(f"Success! Generated {len(vectors)} vectors.")
