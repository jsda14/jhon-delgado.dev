import { useState, useRef } from 'react';
import { sendChatMessage } from '@/services/aiChatService';
import type { ChatMessagePayload } from '@/services/aiChatService';

export interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
}

export function useAIChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-message',
      sender: 'assistant',
      text: '¡Hola! Soy el asistente IA de Jhon Delgado. Puedes preguntarme sobre su experiencia, stack técnico, proyectos o pedirme su información de contacto.'
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessageId = Date.now().toString();
    const newMsg: Message = { id: userMessageId, sender: 'user', text };
    
    // Añadimos el mensaje del usuario al historial
    setMessages(prev => [...prev, newMsg]);
    setIsLoading(true);
    setError(null);

    // Mapeamos el historial local al formato de roles que espera Gemini ('user' y 'model')
    const historyPayload: ChatMessagePayload[] = messages.map(msg => ({
      role: msg.sender === 'user' ? 'user' : 'model',
      content: msg.text
    }));

    try {
      const reply = await sendChatMessage(text, historyPayload);
      
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: reply
      }]);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Error de comunicación de red.';
      setError(errorMsg);
      
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: 'Lo siento, no pude comunicarme con el servidor del AI Twin. Asegúrate de que el backend en FastAPI esté corriendo localmente en el puerto 8000.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    isLoading,
    error,
    messagesEndRef,
    sendMessage
  };
}
