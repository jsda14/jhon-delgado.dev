import { motion, useReducedMotion } from 'framer-motion';
import { Mail, Linkedin, Github, Phone } from 'lucide-react';
import Container from '@/components/layout/Container';
import { useLocale } from '@/context/LocaleContext';
import styles from './Contact.module.css';

interface ContactMethod {
  id: string;
  titleKey: 'email' | 'linkedin' | 'github' | 'whatsapp';
  value: string;
  href: string;
  icon: React.ComponentType<any>;
}

const contactMethods: ContactMethod[] = [
  {
    id: 'email',
    titleKey: 'email',
    value: 'jsda14@gmail.com',
    href: 'mailto:jsda14@gmail.com',
    icon: Mail
  },
  {
    id: 'linkedin',
    titleKey: 'linkedin',
    value: 'linkedin.com/in/jsda14',
    href: 'https://linkedin.com/in/jsda14',
    icon: Linkedin
  },
  {
    id: 'github',
    titleKey: 'github',
    value: 'github.com/jsda14',
    href: 'https://github.com/jsda14',
    icon: Github
  },
  {
    id: 'whatsapp',
    titleKey: 'whatsapp',
    value: '+57 305 753 2192',
    href: 'https://wa.me/573057532192',
    icon: Phone
  }
];

const TEXTS = {
  'es-CO': {
    eyebrow: 'Disponible ahora',
    title: 'Hablemos',
    subtitle: '¿Tienes un proyecto en mente? Hablemos de cómo materializarlo con rigor de ingeniería.',
    labels: {
      email: 'Email',
      linkedin: 'LinkedIn',
      github: 'GitHub',
      whatsapp: 'WhatsApp / Tel'
    }
  },
  en: {
    eyebrow: 'Available now',
    title: "Let's talk",
    subtitle: "Got a project in mind? Let's discuss how to bring it to life with engineering rigor.",
    labels: {
      email: 'Email',
      linkedin: 'LinkedIn',
      github: 'GitHub',
      whatsapp: 'WhatsApp / Phone'
    }
  }
};

interface ContactProps {
  onOpenContact: () => void;
}

export function Contact({ onOpenContact }: ContactProps) {
  const { locale } = useLocale();
  const shouldReduceMotion = useReducedMotion();

  const t = TEXTS[locale] || TEXTS['es-CO'];

  const cardVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as const
      }
    })
  };

  return (
    <section id="contacto" className={styles.contact}>
      <Container>
        <div className={styles.contact__header}>
          <span className={styles.contact__eyebrow}>{t.eyebrow}</span>
          <h2 className={styles.contact__title}>{t.title}</h2>
          <p className={styles.contact__subtitle}>{t.subtitle}</p>
        </div>

        <div className={styles.contact__grid}>
          {contactMethods.map((method, index) => {
            const IconComponent = method.icon;
            const cardTitle = t.labels[method.titleKey];

            return (
              <motion.a
                key={method.id}
                href={method.href}
                target={method.id === 'email' ? undefined : '_blank'}
                rel={method.id === 'email' ? undefined : 'noopener noreferrer'}
                className={styles['contact-card']}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                whileHover={shouldReduceMotion ? {} : { y: -4, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onClick={(e) => {
                  if (method.id === 'email') {
                    e.preventDefault();
                    onOpenContact();
                  }
                }}
              >
                <div className={styles['contact-card__icon']}>
                  <IconComponent size={28} />
                </div>
                <span className={styles['contact-card__label']}>{cardTitle}</span>
                <span className={styles['contact-card__value']}>{method.value}</span>
              </motion.a>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default Contact;
