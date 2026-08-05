import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot } from 'lucide-react';
import styles from './AIChatWidget.module.css';

interface Message {
  id: string;
  sender: 'agent' | 'user';
  text: string;
}

const FAQ_RESPONSES: Record<string, string> = {
  '¿Qué estándares de código sigues?': 'Sigo estándares estrictos de TypeScript sin `any`, React 18 funcional con principios SRP, y CSS Modules estructurados de forma atómica bajo la metodología BEM.',
  '¿Cómo funciona la gobernanza de IA?': 'Toda acción requiere leer primero `.specs/`, validar compilaciones limpias de TypeScript mediante `tsc --noEmit`, seguir guías semánticas HTML5 / WCAG AA y usar Conventional Commits.',
  'Háblame de los proyectos.': 'Tengo 3 proyectos principales detallados: "Aluna Tyquy" (plataforma de lenguas indígenas), "Gym IoT Access Control" (sincronización WebSockets/lectores RFID) y "W&T Offshore" (telemetría de alta frecuencia en Canvas).'
};

export function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'agent', text: '¡Hola! Soy Agy, tu asistente técnico. Pregúntame acerca de los estándares de código, gobernanza de IA o proyectos de este portafolio.' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), sender: 'user', text };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');

    // Answer selection
    setTimeout(() => {
      let replyText = 'Interesante pregunta. Todos los detalles técnicos, de estilos BEM y la arquitectura del portafolio se detallan estrictamente dentro de la carpeta `.specs/`.';
      
      const foundFAQ = Object.keys(FAQ_RESPONSES).find(faq => text.toLowerCase().includes(faq.toLowerCase()) || faq.toLowerCase().includes(text.toLowerCase()));
      if (foundFAQ) {
        replyText = FAQ_RESPONSES[foundFAQ];
      }

      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        sender: 'agent',
        text: replyText
      }]);
    }, 600);
  };

  return (
    <div className={styles['chat-widget']}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={styles['chat-widget__trigger']}
        aria-label="Abrir chat de IA"
      >
        <MessageSquare size={24} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            className={styles['chat-widget__panel']}
          >
            <div className={styles['chat-widget__header']}>
              <div className={styles['chat-widget__title-group']}>
                <Bot size={18} style={{ color: 'var(--clr-copper)' }} />
                <div>
                  <h4 className={styles['chat-widget__title']}>Agy AI Agent</h4>
                  <span className={styles['chat-widget__subtitle']}>specs-governance-bot v1</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className={styles['chat-widget__close']}
                aria-label="Cerrar chat"
              >
                <X size={18} />
              </button>
            </div>

            <div className={styles['chat-widget__body']}>
              <div className={styles['chat-widget__messages']}>
                {messages.map(msg => (
                  <div
                    key={msg.id}
                    className={`${styles['chat-widget__message']} ${
                      msg.sender === 'user'
                        ? styles['chat-widget__message--user']
                        : styles['chat-widget__message--agent']
                    }`}
                  >
                    {msg.text}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              <div className={styles['chat-widget__suggestions']}>
                {Object.keys(FAQ_RESPONSES).map(faq => (
                  <button
                    key={faq}
                    onClick={() => handleSendMessage(faq)}
                    className={styles['chat-widget__suggestion-btn']}
                  >
                    {faq}
                  </button>
                ))}
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className={styles['chat-widget__input-area']}
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Escribe tu duda técnica..."
                className={styles['chat-widget__input']}
              />
              <button type="submit" className={styles['chat-widget__submit']} aria-label="Enviar mensaje">
                <Send size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
export default AIChatWidget;
