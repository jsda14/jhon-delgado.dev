from pydantic import BaseModel, Field
from typing import List, Dict, Optional

class ChatRequest(BaseModel):
    message: str = Field(..., description="El mensaje del usuario para el AI Twin")
    history: Optional[List[Dict[str, str]]] = Field(
        default=None, 
        description="Historial previo de la conversación. Cada elemento debe ser un dict con 'role' y 'parts' o 'content'"
    )

class ChatResponse(BaseModel):
    reply: str = Field(..., description="La respuesta generada por el AI Twin de Jhon Delgado")
