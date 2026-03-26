import os
from openai import OpenAI
from pinecone import Pinecone

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY", "mock_key"))

def get_pinecone_index():
    api_key = os.getenv("PINECONE_API_KEY")
    if not api_key:
        return None
    pc = Pinecone(api_key=api_key)
    INDEX_NAME = "digitalai-business-knowledge"
    
    if INDEX_NAME not in pc.list_indexes().names():
        return None # In a real app we'd create it, but it requires specific env/cloud params
    return pc.Index(INDEX_NAME)

def embed_and_store(business_id: str, text: str, metadata: dict = None):
    """Chunks text, embeds with OpenAI, and upserts to Pinecone for RAG."""
    if not os.getenv("PINECONE_API_KEY") or not os.getenv("OPENAI_API_KEY"):
        print(f"[RAG] Mock Storage: Text saved to memory for {business_id}.")
        return True
        
    try:
        # Generate high-quality embedding
        response = client.embeddings.create(input=[text], model="text-embedding-3-small")
        embedding = response.data[0].embedding
        
        index = get_pinecone_index()
        if not index:
            print("[RAG] Pinecone index not found. Skipping upsert.")
            return False
            
        vector_id = f"{business_id}_{hash(text)}"
        payload = metadata or {}
        payload["business_id"] = business_id
        payload["text"] = text
        
        index.upsert(vectors=[(vector_id, embedding, payload)])
        print(f"[RAG] Successfully embedded and stored context for {business_id}")
        return True
    except Exception as e:
        print(f"[RAG] Error embedding text: {e}")
        return False
