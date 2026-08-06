import styles from './Metric.module.css';

export interface MetricProps {
  value: string;
  label: string;
}

export function Metric({ value, label }: MetricProps) {
  return (
    <div className={styles.metric}>
      <span className={styles.metric__value}>{value}</span>
      <span className={styles.metric__label}>{label}</span>
    </div>
  );
}

export default Metric;
