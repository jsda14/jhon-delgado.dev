import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, AlertCircle } from 'lucide-react';
import { useLocale } from '@/context/LocaleContext';
import styles from './ContactModal.module.css';

// Esquema de validación con Zod
const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres / Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Ingresa un correo válido / Enter a valid email address' }),
  subject: z.string().min(3, { message: 'El asunto debe tener al menos 3 caracteres / Subject must be at least 3 characters' }),
  message: z.string().min(10, { message: 'El mensaje debe tener al menos 10 caracteres / Message must be at least 10 characters' }),
  _honey: z.string().optional(), // Honeypot antispam
});

type ContactFormData = z.infer<typeof contactFormSchema>;

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TEXTS = {
  'es-CO': {
    title: 'Hablemos',
    name: 'Nombre',
    email: 'Correo electrónico',
    subject: 'Asunto',
    message: 'Mensaje',
    send: 'Enviar mensaje',
    sending: 'Enviando...',
    successTitle: '¡Mensaje enviado!',
    successDesc: 'Gracias por ponerte en contacto. Responderé a tu correo lo antes posible.',
    errorTitle: 'Error de envío',
    errorDesc: 'Hubo un problema al transmitir tu mensaje. Por favor reinténtalo.',
    retry: 'Reintentar',
    close: 'Cerrar'
  },
  en: {
    title: "Let's talk",
    name: 'Name',
    email: 'Email address',
    subject: 'Subject',
    message: 'Message',
    send: 'Send message',
    sending: 'Sending...',
    successTitle: 'Message sent!',
    successDesc: 'Thank you for reaching out. I will respond to your email as soon as possible.',
    errorTitle: 'Submission failed',
    errorDesc: 'There was a problem transmitting your message. Please try again.',
    retry: 'Retry',
    close: 'Close'
  }
};

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const { locale } = useLocale();
  const [submitState, setSubmitState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema)
  });

  const t = TEXTS[locale] || TEXTS['es-CO'];

  // Evitar scroll en la página principal cuando el modal está abierto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const onSubmit = async (data: ContactFormData) => {
    // 1. Detección de Honeypot Anti-Spam: Si el bot rellenó el campo oculto, simulamos éxito en silencio
    if (data._honey && data._honey.trim() !== '') {
      console.warn('[Anti-Spam] Envío sospechoso bloqueado por honeypot.');
      setSubmitState('sending');
      setTimeout(() => {
        setSubmitState('success');
      }, 1000);
      return;
    }

    setSubmitState('sending');

    const formspreeId = import.meta.env.VITE_FORMSPREE_ID;

    if (!formspreeId) {
      console.error('[Formspree Config Error] VITE_FORMSPREE_ID no está definida en el archivo de variables de entorno .env.');
      setSubmitState('error');
      return;
    }

    // Normalizar la URL en caso de que el usuario haya guardado la URL completa en lugar de solo el ID del formulario
    const url = formspreeId.startsWith('http')
      ? formspreeId
      : `https://formspree.io/f/${formspreeId}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message
        })
      });

      if (response.ok) {
        setSubmitState('success');
        reset();
      } else {
        setSubmitState('error');
      }
    } catch (error) {
      console.error('[Formspree Submit Error] Error de red:', error);
      setSubmitState('error');
    }
  };

  const handleClose = () => {
    setSubmitState('idle');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.backdrop}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
        >
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header del Modal */}
            <div className={styles.modal__header}>
              <h3 className={styles.modal__title}>{t.title}</h3>
              <button className={styles.modal__close} onClick={handleClose} aria-label="Cerrar">
                <X size={18} />
              </button>
            </div>

            {/* Renderizado condicional según estado de envío */}
            {submitState === 'idle' || submitState === 'sending' ? (
              <form className={styles.modal__form} onSubmit={handleSubmit(onSubmit)}>
                {/* Campo Oculto Honeypot Anti-Spam */}
                <div className={styles.honeypot}>
                  <label htmlFor="_honey">Ignore this field</label>
                  <input id="_honey" tabIndex={-1} {...register('_honey')} />
                </div>

                {/* Nombre */}
                <div className={styles['form-group']}>
                  <label className={styles['form-group__label']}>{t.name}</label>
                  <input
                    type="text"
                    className={`${styles['form-group__input']} ${errors.name ? styles['form-group__input--error'] : ''}`}
                    {...register('name')}
                    disabled={submitState === 'sending'}
                  />
                  {errors.name && (
                    <span className={styles['form-group__error-msg']}>{errors.name.message}</span>
                  )}
                </div>

                {/* Email */}
                <div className={styles['form-group']}>
                  <label className={styles['form-group__label']}>{t.email}</label>
                  <input
                    type="email"
                    className={`${styles['form-group__input']} ${errors.email ? styles['form-group__input--error'] : ''}`}
                    {...register('email')}
                    disabled={submitState === 'sending'}
                  />
                  {errors.email && (
                    <span className={styles['form-group__error-msg']}>{errors.email.message}</span>
                  )}
                </div>

                {/* Asunto */}
                <div className={styles['form-group']}>
                  <label className={styles['form-group__label']}>{t.subject}</label>
                  <input
                    type="text"
                    className={`${styles['form-group__input']} ${errors.subject ? styles['form-group__input--error'] : ''}`}
                    {...register('subject')}
                    disabled={submitState === 'sending'}
                  />
                  {errors.subject && (
                    <span className={styles['form-group__error-msg']}>{errors.subject.message}</span>
                  )}
                </div>

                {/* Mensaje */}
                <div className={styles['form-group']}>
                  <label className={styles['form-group__label']}>{t.message}</label>
                  <textarea
                    className={`${styles['form-group__textarea']} ${errors.message ? styles['form-group__textarea--error'] : ''}`}
                    {...register('message')}
                    disabled={submitState === 'sending'}
                  />
                  {errors.message && (
                    <span className={styles['form-group__error-msg']}>{errors.message.message}</span>
                  )}
                </div>

                {/* Botón Submit */}
                <button
                  type="submit"
                  className={styles['form__submit-btn']}
                  disabled={submitState === 'sending'}
                >
                  {submitState === 'sending' ? t.sending : t.send}
                </button>
              </form>
            ) : submitState === 'success' ? (
              <div className={styles['state-container']}>
                <div className={`${styles['state-icon']} ${styles['state-icon--success']}`}>
                  <Check size={28} />
                </div>
                <h4 className={styles['state-title']}>{t.successTitle}</h4>
                <p className={styles['state-desc']}>{t.successDesc}</p>
                <button
                  className={`${styles['state-btn']} ${styles['state-btn--primary']}`}
                  onClick={handleClose}
                >
                  {t.close}
                </button>
              </div>
            ) : (
              <div className={styles['state-container']}>
                <div className={`${styles['state-icon']} ${styles['state-icon--error']}`}>
                  <AlertCircle size={28} />
                </div>
                <h4 className={styles['state-title']}>{t.errorTitle}</h4>
                <p className={styles['state-desc']}>{t.errorDesc}</p>
                <div style={{ display: 'flex', gap: '0.75rem', width: '100%', justifyContent: 'center' }}>
                  <button
                    className={`${styles['state-btn']} ${styles['state-btn--ghost']}`}
                    onClick={handleClose}
                  >
                    {t.close}
                  </button>
                  <button
                    className={`${styles['state-btn']} ${styles['state-btn--primary']}`}
                    onClick={() => setSubmitState('idle')}
                  >
                    {t.retry}
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ContactModal;
