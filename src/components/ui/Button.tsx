import React from 'react';
import clsx from 'clsx';
import styles from './Button.module.css';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  isIconOnly?: boolean;
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  isIconOnly = false,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        styles.btn,
        styles[`btn--${variant}`],
        isIconOnly && styles['btn--icon'],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
