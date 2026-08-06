import React, { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import Container from '@/components/layout/Container';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import { useLocale } from '@/context/LocaleContext';
import { getHeroData, getStrapiMediaUrl } from '@/services/strapi';
import type { HeroData } from '@/services/strapi';
import styles from './Hero.module.css';

function RadarDecoration() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let angle = 0;

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      const cx = W / 2;
      const cy = H / 2;
      const maxR = Math.min(W, H) / 2 - 8;

      ctx.clearRect(0, 0, W, H);

      const isDark = document.documentElement.getAttribute('data-theme') !== 'light'
        && !(document.documentElement.getAttribute('data-theme') === null
          && window.matchMedia('(prefers-color-scheme: light)').matches);

      const ringColor     = isDark ? 'rgba(217,98,43,0.12)'  : 'rgba(217,98,43,0.18)';
      const sweepColor    = isDark ? 'rgba(217,98,43,0.22)'  : 'rgba(217,98,43,0.30)';
      const dotColor      = isDark ? 'rgba(217,98,43,0.70)'  : 'rgba(217,98,43,0.85)';
      const crosshairColor= isDark ? 'rgba(217,98,43,0.08)'  : 'rgba(217,98,43,0.12)';

      /* Crosshairs */
      ctx.strokeStyle = crosshairColor;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx, cy - maxR); ctx.lineTo(cx, cy + maxR);
      ctx.moveTo(cx - maxR, cy); ctx.lineTo(cx + maxR, cy);
      ctx.stroke();

      /* Rings */
      [0.35, 0.6, 0.85, 1].forEach(ratio => {
        ctx.beginPath();
        ctx.arc(cx, cy, maxR * ratio, 0, Math.PI * 2);
        ctx.strokeStyle = ringColor;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      /* Sweep */
      const sweepLen = Math.PI * 0.55;
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      const sg = ctx.createLinearGradient(0, 0, maxR, 0);
      sg.addColorStop(0, sweepColor);
      sg.addColorStop(1, 'transparent');
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, maxR, -sweepLen / 2, sweepLen / 2);
      ctx.closePath();
      ctx.fillStyle = sg;
      ctx.fill();
      ctx.restore();

      /* Sweep leading edge */
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(maxR, 0);
      ctx.strokeStyle = isDark ? 'rgba(217,98,43,0.5)' : 'rgba(217,98,43,0.6)';
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();

      /* Blips */
      const blips = [
        { r: 0.42, a: 1.1  },
        { r: 0.71, a: 3.8  },
        { r: 0.58, a: 5.4  },
        { r: 0.88, a: 2.3  },
      ];
      blips.forEach(({ r, a }) => {
        const diff = ((a - angle) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
        const fade = diff < Math.PI * 2 ? Math.max(0, 1 - diff / (Math.PI * 2)) : 0;
        if (fade < 0.02) return;
        const bx = cx + Math.cos(a) * maxR * r;
        const by = cy + Math.sin(a) * maxR * r;
        ctx.beginPath();
        ctx.arc(bx, by, 3, 0, Math.PI * 2);
        ctx.fillStyle = dotColor.replace('0.70', String((0.7 * fade).toFixed(2)))
                                .replace('0.85', String((0.85 * fade).toFixed(2)));
        ctx.fill();
      });

      angle = (angle + 0.008) % (Math.PI * 2);
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={320}
      height={320}
      className={styles.hero__radar}
      aria-hidden="true"
    />
  );
}

export function Hero() {
  const { locale } = useLocale();
  const [data, setData] = useState<HeroData | null>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    let isMounted = true;
    getHeroData(locale).then(res => {
      if (isMounted) {
        setData(res);
      }
    });
    return () => {
      isMounted = false;
    };
  }, [locale]);

  // Objeto de respaldo (fallback) en caso de que Strapi esté offline
  const currentData: HeroData = data || {
    eyebrowText: locale === 'es-CO' ? 'Disponible para proyectos' : 'Available for projects',
    eyebrowStatus: 'available',
    titleFirst: 'Jhon',
    titleEmphasis: 'Delgado',
    role: 'Full-Stack & AI Integration Engineer',
    subtitle: locale === 'es-CO'
      ? 'Más de 4 años construyendo interfaces de alto rendimiento, arquitecturas backend robustas y agentes autónomos con Inteligencia Artificial — en producción, no en demos.'
      : 'More than 4 years building high-performance interfaces, robust backend architectures, and autonomous AI agents — in production, not in demos.',
    primaryBtnText: locale === 'es-CO' ? 'Ver proyectos' : 'View projects',
    cvFile: locale === 'es-CO' ? '/cv.pdf' : '/cv-en.pdf',
    metaItems: [
      { label: locale === 'es-CO' ? 'Base' : 'Base', value: locale === 'es-CO' ? 'Colombia · Remoto' : 'Colombia · Remote' },
      { label: locale === 'es-CO' ? 'Cliente actual' : 'Current client', value: 'Enovate, Houston TX' }
    ]
  };

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };

  const item = {
    hidden:  { opacity: 0, y: shouldReduceMotion ? 0 : 18 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.65, 
        ease: [0.16, 1, 0.3, 1] as const 
      } 
    },
  };

  return (
    <section className={styles.hero}>
      <Container>
        <div className={styles.hero__layout}>
          {/* Left — text */}
          <motion.div
            className={styles.hero__copy}
            variants={container}
            initial="hidden"
            animate="visible"
          >
            <motion.span className={styles.hero__eyebrow} variants={item}>
              <span 
                className={clsx(
                  styles['hero__eyebrow-dot'], 
                  styles[`hero__eyebrow-dot--${currentData.eyebrowStatus}`]
                )} 
                aria-hidden="true" 
              />
              {currentData.eyebrowText}
            </motion.span>

            <motion.h1 className={styles.hero__title} variants={item}>
              {currentData.titleFirst}<br />
              <em className={styles['hero__title-em']}>{currentData.titleEmphasis}</em>
            </motion.h1>

            <motion.p className={styles.hero__role} variants={item}>
              {currentData.role}
            </motion.p>

            <motion.p className={styles.hero__subtitle} variants={item}>
              {currentData.subtitle}
            </motion.p>

            <motion.div className={styles.hero__actions} variants={item}>
              <button
                onClick={() => document.getElementById('proyectos')?.scrollIntoView({ behavior: 'smooth' })}
                className={`${styles.hero__btn} ${styles['hero__btn--primary']}`}
              >
                <span>{currentData.primaryBtnText}</span>
                <ArrowRight size={15} />
              </button>
              <a
                href={getStrapiMediaUrl(currentData.cvFile)}
                target="_blank"
                rel="noopener noreferrer"
                download
                className={`${styles.hero__btn} ${styles['hero__btn--ghost']}`}
              >
                <Download size={15} />
                <span>{locale === 'es-CO' ? 'Descargar CV' : 'Download CV'}</span>
              </a>
            </motion.div>

            <motion.div className={styles.hero__meta} variants={item}>
              {currentData.metaItems.map((meta, idx) => (
                <React.Fragment key={meta.id || idx}>
                  {idx > 0 && <span className={styles['hero__meta-sep']} aria-hidden="true">·</span>}
                  <span className={styles['hero__meta-item']}>
                    <span className={styles['hero__meta-label']}>{meta.label}</span>
                    {meta.value}
                  </span>
                </React.Fragment>
              ))}
            </motion.div>
          </motion.div>

          {/* Right — decoration */}
          <motion.div
            className={styles.hero__visual}
            initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.8, 
              delay: 0.3, 
              ease: [0.16, 1, 0.3, 1] as const 
            }}
            aria-hidden="true"
          >
            <RadarDecoration />
            <span className={styles['hero__visual-label']}>
              <span className={styles['hero__visual-label-dot']} />
              {locale === 'es-CO' ? 'Sistema activo' : 'System online'}
            </span>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

export default Hero;
