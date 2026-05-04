import os
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
# --- HYBRID CHANGE: Use Local Embeddings ---
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_chroma import Chroma
from langchain_core.messages import HumanMessage, SystemMessage

# --- PATH SETUP ---
current_dir = os.path.dirname(os.path.abspath(__file__))
ENV_PATH = os.path.join(current_dir, "..", ".env")
PERSIST_DIRECTORY = os.path.join(current_dir, "..", "vector_db")

if os.path.exists(ENV_PATH):
    load_dotenv(ENV_PATH)

# --- CUSTOM RAG CHAIN ---
class CustomRAGChain:
    def __init__(self, llm, vectorstore):
        self.llm = llm
        self.vectorstore = vectorstore

    def invoke(self, inputs):
        query = inputs.get("query") or inputs.get("input")
        
        # 1. Retrieve (Locally - No API Cost)
        # We fetch 15 chunks to catch split tables
        try:
            docs = self.vectorstore.similarity_search(query, k=15)
        except Exception as e:
            return {"result": f"Database Error: {e}", "source_documents": []}
            
        if not docs:
             return {"result": "No information found.", "source_documents": []}
        
        # 2. Context Construction
        context_text = ""
        for doc in docs:
            page_num = doc.metadata.get('page', 0) + 1
            source = os.path.basename(doc.metadata.get('source', 'Unknown'))
            context_text += f"\n--- START CONTEXT FROM {source} (PAGE {page_num}) ---\n"
            context_text += doc.page_content
            context_text += "\n--- END CONTEXT ---\n"
        
        # 3. Prompt Engineering (Sent to Google Gemini)
        system_prompt = """You are a precise academic assistant for K.R. Mangalam University.
        
        RULES:
        1. Use ONLY the provided context.
        2. Format tables clearly (Merge split tables).
        3. Cite Page Numbers.
        
        CONTEXT:
        {context}
        """
        
        messages = [
            SystemMessage(content=system_prompt.format(context=context_text)),
            HumanMessage(content=query)
        ]
        
        try:
            # This is the ONLY part that goes to the Internet
            ai_response = self.llm.invoke(messages)
            result_text = ai_response.content
        except Exception as e:
            result_text = f"AI Error: {str(e)}"
        
        return {
            "result": result_text,
            "source_documents": docs
        }

def get_qa_chain():
    # 1. Local Embeddings (Must match ingest.py)
    embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")
    
    if not os.path.exists(PERSIST_DIRECTORY):
        raise FileNotFoundError(f"Run ingest.py first!")
    
    vectorstore = Chroma(persist_directory=PERSIST_DIRECTORY, embedding_function=embeddings)
    
    # 2. Cloud LLM (Gemini 2.5 Flash via Gemini API)
    # We use Flash because it handles long context (tables) very well
    llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash", temperature=0)
    
    return CustomRAGChain(llm, vectorstore)