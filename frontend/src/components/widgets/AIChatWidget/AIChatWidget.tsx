import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { MessageSquare, X, Send, Bot, Sparkles } from 'lucide-react';
import clsx from 'clsx';
import ReactMarkdown from 'react-markdown';
import { useAIChat } from '@/hooks/useAIChat';
import styles from './AIChatWidget.module.css';

const FAQ_SUGGESTIONS = [
  '¿Qué estándares de código sigues?',
  '¿Cómo funciona la gobernanza de IA?',
  'Háblame de los proyectos.'
];

export function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, isLoading, messagesEndRef, sendMessage } = useAIChat();
  const shouldReduceMotion = useReducedMotion();

  const toggleMenu = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isLoading]);
  // We can manage input local state in presentation layer for value bindings
  const [inputValue, setInputValue] = useState('');

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      sendMessage(inputValue);
      setInputValue('');
    }
  };

  const panelVariants = {
    hidden: { opacity: 0, scale: shouldReduceMotion ? 1 : 0.95, y: shouldReduceMotion ? 0 : 12 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { duration: 0.25, ease: 'easeOut' as const }
    },
    exit: { 
      opacity: 0, 
      scale: shouldReduceMotion ? 1 : 0.95, 
      y: shouldReduceMotion ? 0 : 12,
      transition: { duration: 0.2, ease: 'easeIn' as const }
    }
  };

  return (
    <div className={styles['chat-widget']}>
      <button
        onClick={toggleMenu}
        className={styles['chat-widget__trigger']}
        aria-label="Abrir chat del gemelo digital de IA"
      >
        <MessageSquare size={22} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={styles['chat-widget__window']}
          >
            {/* Header */}
            <div className={styles['chat-widget__header']}>
              <div className={styles['chat-widget__title-group']}>
                <Bot size={18} style={{ color: 'var(--clr-copper)' }} />
                <div>
                  <h4 className={styles['chat-widget__title']}>
                    <span>Jhon Delgado AI Twin</span>
                    <Sparkles size={12} style={{ color: 'var(--clr-copper)' }} />
                  </h4>
                  <span className={styles['chat-widget__subtitle']}>active-agent v1</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className={styles['chat-widget__close']}
                aria-label="Cerrar chat modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Message History */}
            <div className={styles['chat-widget__messages']}>
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={clsx(
                    styles['chat-widget__message'],
                    msg.sender === 'user' 
                      ? styles['chat-widget__message--user'] 
                      : styles['chat-widget__message--assistant']
                  )}
                >
                  {msg.sender === 'assistant' ? (
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  ) : (
                    msg.text
                  )}
                </div>
              ))}
              {isLoading && (
                <div className={styles['chat-widget__loading']}>
                  <span>Escribiendo</span>
                  <div className={styles['chat-widget__loading-dots']}>
                    <span className={styles['chat-widget__loading-dot']} />
                    <span className={styles['chat-widget__loading-dot']} />
                    <span className={styles['chat-widget__loading-dot']} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions */}
            <div className={styles['chat-widget__suggestions']}>
              {FAQ_SUGGESTIONS.map(suggestion => (
                <button
                  key={suggestion}
                  onClick={() => sendMessage(suggestion)}
                  disabled={isLoading}
                  className={styles['chat-widget__suggestion-btn']}
                >
                  {suggestion}
                </button>
              ))}
            </div>

            {/* Input Box */}
            <form onSubmit={handleInputSubmit} className={styles['chat-widget__input-box']}>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Escribe tu mensaje técnico..."
                disabled={isLoading}
                className={styles['chat-widget__input']}
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className={styles['chat-widget__send-btn']}
                aria-label="Enviar mensaje a la IA"
              >
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
