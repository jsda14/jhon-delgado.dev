import React from 'react';
import clsx from 'clsx';
import styles from './Card.module.css';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
  featured?: boolean;
  children: React.ReactNode;
}

export function Card({
  interactive = false,
  featured = false,
  className,
  children,
  ...props
}: CardProps) {
  return (
    <div
      className={clsx(
        styles.card,
        interactive && styles['card--interactive'],
        featured && styles['card--featured'],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
export default Card;
