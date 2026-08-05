import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Mail, Linkedin, Github, Phone } from 'lucide-react';
import Container from '@/components/layout/Container';
import styles from './Contact.module.css';

interface ContactMethod {
  id: string;
  title: string;
  value: string;
  href: string;
  icon: React.ComponentType<{ size?: number }>;
}

const contactMethods: ContactMethod[] = [
  {
    id: 'email',
    title: 'Email',
    value: 'jsda14@gmail.com',
    href: 'mailto:jsda14@gmail.com',
    icon: Mail
  },
  {
    id: 'linkedin',
    title: 'LinkedIn',
    value: 'linkedin.com/in/jsda14',
    href: 'https://linkedin.com/in/jsda14',
    icon: Linkedin
  },
  {
    id: 'github',
    title: 'GitHub',
    value: 'github.com/jsda14',
    href: 'https://github.com/jsda14',
    icon: Github
  },
  {
    id: 'whatsapp',
    title: 'WhatsApp / Tel',
    value: '+57 305 753 2192',
    href: 'https://wa.me/573057532192',
    icon: Phone
  }
];

export function Contact() {
  const shouldReduceMotion = useReducedMotion();

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
        <h2 className={styles.contact__title}>Contacto Directo</h2>
        <p>¿Tienes un proyecto en mente? Hablemos de cómo materializarlo con rigor de ingeniería.</p>

        <div className={styles.contact__grid}>
          {contactMethods.map((method, index) => {
            const IconComponent = method.icon;
            return (
              <motion.a
                key={method.id}
                href={method.href}
                target="_blank"
                rel="noopener noreferrer"
                className={styles['contact-card']}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                whileHover={shouldReduceMotion ? {} : { y: -4, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className={styles['contact-card__icon']}>
                  <IconComponent size={28} />
                </div>
                <span className={styles['contact-card__title']}>{method.title}</span>
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
