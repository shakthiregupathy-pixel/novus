from typing import List, Tuple

def chunk_pages(pages: List[str], chunk_size: int = 450, chunk_overlap: int = 150) -> List[str]:
    chunks: List[str] = []
    
    full_text = " ".join(pages)
    text_length = len(full_text)
    
    if text_length == 0:
        return chunks
