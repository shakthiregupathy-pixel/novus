from embedder import embed_user_query
from vectorstore import search_in_pinecone
from llm import query_llm_with_context

def process_user_query(query: str):
    # Embed the user's query to create a vector representation 
    query_vector = embed_user_query(query)
    
    # SAFETY NET: If Gemini fails to embed (returns empty list), stop here gracefully
    if not query_vector:
        return "⚠️ **System Busy:** I am experiencing high traffic right now due to free-tier API limits. Please wait 60 seconds and try your question again."
        
    # Search the vector DB to find top matching chunks related to the user's question
    matched_chunks = search_in_pinecone(query_vector)
    
    # Send the user query and the search results (query + context) to the LLM for Generating response
    generated_response = query_llm_with_context(query, matched_chunks)
    
    # Return the response so Streamlit can display it on the website
    return generated_response

if __name__ == "__main__":
    user_query = "give me the number of employees"
    print(process_user_query(user_query))
