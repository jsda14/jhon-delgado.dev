import { useState, useRef, useEffect } from 'react';
import { sendChatMessage } from '@/services/aiChatService';
import type { ChatMessagePayload } from '@/services/aiChatService';
import { useLocale } from '@/context/LocaleContext';

export interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
}

const CHAT_TEXTS = {
  es: {
    greeting: "¡Hola! Soy el asistente IA de Jhon Delgado. Puedes preguntarme sobre su experiencia, stack técnico, proyectos o pedirme su información de contacto.",
    networkError: "Lo siento, no pude comunicarme con el servidor del AI Twin. Por favor, intenta de nuevo más tarde.",
    genericError: "Error de comunicación de red."
  },
  en: {
    greeting: "Hi! I'm Jhon Delgado's AI Assistant. Ask me anything about his experience, tech stack, projects, or request his contact info.",
    networkError: "Sorry, I couldn't connect to the AI Twin server. Please try again later.",
    genericError: "Network communication error."
  }
};

export function useAIChat() {
  const { locale } = useLocale();
  const currentLocale = locale === 'es-CO' ? 'es' : 'en';

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-message',
      sender: 'assistant',
      text: CHAT_TEXTS[currentLocale].greeting
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sincronizar el saludo inicial cuando cambia el idioma
  useEffect(() => {
    setMessages(prev => {
      if (prev.length === 0) {
        return [
          {
            id: 'init-message',
            sender: 'assistant',
            text: CHAT_TEXTS[currentLocale].greeting
          }
        ];
      }
      return prev.map(msg => {
        if (msg.id === 'init-message') {
          return {
            ...msg,
            text: CHAT_TEXTS[currentLocale].greeting
          };
        }
        return msg;
      });
    });
  }, [currentLocale]);

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
      const reply = await sendChatMessage(text, historyPayload, currentLocale);
      
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: reply
      }]);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : CHAT_TEXTS[currentLocale].genericError;
      setError(errorMsg);
      
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: CHAT_TEXTS[currentLocale].networkError
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
