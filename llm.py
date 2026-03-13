import os
import time
from google import genai
from google.genai import types
from dotenv import load_dotenv


load_dotenv()


api_key = os.getenv("GEMINI_API_KEY")
client = genai.Client(api_key=api_key)

def create_context_cache(context_chunks: list, ttl_minutes: int = 15):
    context_text = "\n\n".join(context_chunks)
    
    try:
        
        cache = client.caches.create(
            model="gemini-2.5-flash", 
            config=types.CreateCachedContentConfig(
                display_name="document_context",
                contents=[types.Content(parts=[types.Part(text=context_text)], role="user")],
                ttl_seconds=ttl_minutes * 60,
            )
        )
        return cache
    except Exception as e:
        print(f"Could not create cache: {e}")
        return None

def query_llm_with_context(query: str, context_chunks: list, cache_name: str = None):
    
    context_text = "\n\n".join(context_chunks)
    prompt = f"Context:\n{context_text}\n\nUser Question: {query}"
    max_retries = 5
    base_delay = 5 

    for i in range(max_retries):
        try:
            config = {}
            if cache_name:
                config['cached_content'] = cache_name
            response = client.models.generate_content(
                model="gemini-2.5-flash",
                contents=query if cache_name else prompt,
                config=config
            )
            return response.text
        except Exception as e:
            if "429" in str(e) or "RESOURCE_EXHAUSTED" in str(e):
                if i < max_retries - 1:
                    delay = base_delay * (2 ** i)
                    print(f"Rate limit reached. Waiting {delay} seconds before retry {i+1}/{max_retries}...")
                    time.sleep(delay)
                    continue
            return f"Error generating response: {e}"

    return "Error: Maximum retries exceeded. Please wait a moment and try again."