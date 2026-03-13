from pdfreader import read_pdf
from chunker import chunk_pages
from embedder import embed_chunks
from vectorstore import store_in_pinecone
from typing import List

pdf_path = "./resources/employee_performance_report.pdf"
def run():
    # Read HR Policy PDF and extract text
    pages = read_pdf(pdf_path)
    
    # Chunk the extracted text into manageable pieces
    chunks = chunk_pages(pages, chunk_size=100, chunk_overlap=20)
   
    
    #Embed the chunck using open ai's embedding model to create the vector representation 
    embedded_chunks = embed_chunks(chunks)
   
    
    #Store the chunks and their embedding in pinecone vector database
    store_in_pinecone(chunks, embedded_chunks, namespace="")
   
    
if __name__ == "__main__":
    run()