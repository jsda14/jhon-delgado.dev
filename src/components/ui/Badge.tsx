import React from 'react';
import clsx from 'clsx';
import styles from './Badge.module.css';

export interface BadgeProps {
  variant?: 'default' | 'accent' | 'success' | 'blue';
  className?: string;
  children: React.ReactNode;
}

export function Badge({
  variant = 'default',
  className,
  children
}: BadgeProps) {
  return (
    <span
      className={clsx(
        styles.badge,
        styles[`badge--${variant}`],
        className
      )}
    >
      {children}
    </span>
  );
}
