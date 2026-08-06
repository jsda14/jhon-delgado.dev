
import clsx from 'clsx';
import { useLocale } from '@/context/LocaleContext';
import styles from './LanguageSwitcher.module.css';

export function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();

  return (
    <div className={styles.switcher} aria-label="Selector de idioma">
      <button
        type="button"
        onClick={() => setLocale('es-CO')}
        className={clsx(
          styles.switcher__btn,
          locale === 'es-CO' && styles['switcher__btn--active']
        )}
        aria-label="Cambiar idioma a Español"
        aria-pressed={locale === 'es-CO'}
      >
        ES
      </button>
      <button
        type="button"
        onClick={() => setLocale('en')}
        className={clsx(
          styles.switcher__btn,
          locale === 'en' && styles['switcher__btn--active']
        )}
        aria-label="Switch language to English"
        aria-pressed={locale === 'en'}
      >
        EN
      </button>
    </div>
  );
}

export default LanguageSwitcher;
