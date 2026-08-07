import type { ReactNode } from 'react';
import clsx from 'clsx';
import styles from './Tag.module.css';

export interface TagProps {
  variant?: 'default' | 'primary' | 'warning' | 'success' | 'purple' | 'orange' | 'blue';
  className?: string;
  children: ReactNode;
}

const variantClasses: Record<string, string> = {
  default: styles['tag--default'] || '',
  primary: styles['tag--primary'] || '',
  warning: styles['tag--warning'] || '',
  success: styles['tag--success'] || '',
  purple: styles['tag--purple'] || '',
  orange: styles['tag--orange'] || '',
  blue: styles['tag--blue'] || '',
};

export function Tag({
  variant = 'default',
  className,
  children
}: TagProps) {
  // Advertencia preventiva en desarrollo ante variantes no soportadas
  if (import.meta.env.MODE !== 'production' && !(variant in variantClasses)) {
    console.warn(`[Design System Warning] La variante de Tag "${variant}" no está soportada oficialmente.`);
  }

  const selectedVariantClass = variantClasses[variant] || variantClasses.default;

  return (
    <span
      className={clsx(
        styles.tag,
        selectedVariantClass,
        className
      )}
    >
      {children}
    </span>
  );
}

export default Tag;
