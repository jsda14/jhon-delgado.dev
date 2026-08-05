export interface ChatMessagePayload {
  role: 'user' | 'model';
  content: string;
}

/**
 * Realiza una petición asíncrona segura al servidor FastAPI para interactuar
 * con el AI Twin de Jhon Delgado alimentado por Gemini.
 * 
 * @param message El mensaje del usuario.
 * @param history El historial previo de la conversación estructurado para Gemini.
 * @returns La respuesta en texto devuelta por la IA.
 */
export async function sendChatMessage(
  message: string,
  history?: ChatMessagePayload[]
): Promise<string> {
  try {
    const response = await fetch('http://localhost:8000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        history,
      }),
    });

    if (!response.ok) {
      throw new Error(`El servidor devolvió un estado de error: ${response.status}`);
    }

    const data = await response.json();
    
    if (!data || typeof data.reply !== 'string') {
      throw new Error('Respuesta del servidor con formato inválido.');
    }

    return data.reply;
  } catch (error) {
    console.error('Error en aiChatService.sendChatMessage:', error);
    throw error instanceof Error 
      ? error 
      : new Error('Ocurrió un error inesperado de red al conectar con el servidor.');
  }
}
