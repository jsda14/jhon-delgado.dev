import React from 'react';
import clsx from 'clsx';
import styles from './Container.module.css';

export interface ContainerProps {
  narrow?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function Container({
  narrow = false,
  className,
  children
}: ContainerProps) {
  return (
    <div
      className={clsx(
        styles.container,
        narrow && styles['container--narrow'],
        className
      )}
    >
      {children}
    </div>
  );
}
export default Container;
