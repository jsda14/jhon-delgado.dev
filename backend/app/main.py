from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.schemas.chat import ChatRequest, ChatResponse
from app.services.ai_service import ai_service
from app.config import settings

app = FastAPI(
    title="Jhon Delgado AI Twin API Backend",
    description="Servidor FastAPI seguro para gestionar el chatbot AI Twin mediante Google Gemini API.",
    version="1.0.0"
)

# Configuración de CORS para permitir solicitudes del frontend web en desarrollo (Vite)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "https://jhon-delgado.dev"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health", status_code=200)
def health_check():
    """Endpoint simple para verificar la salud del backend."""
    return {"status": "ok", "gemini_configured": bool(settings.GEMINI_API_KEY)}

@app.post("/api/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    """
    Recibe un mensaje de chat y opcionalmente su historial,
    y devuelve la respuesta generada por el AI Twin de Jhon Delgado.
    """
    try:
        reply = ai_service.generate_chat_response(
            message=request.message,
            history=request.history,
            locale=request.locale
        )
        return ChatResponse(reply=reply)
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Error interno del servidor al procesar la IA: {str(e)}"
        )
