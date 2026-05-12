import { useEffect } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'

export default function Counter({ value, duration = 2 }) {
  const count = useMotionValue(0);
  
  // Handle strings like "$6.2M", "64%", "1,284"
  const number = parseFloat(value.toString().replace(/[^0-9.]/g, '')) || 0;
  const prefix = value.toString().match(/^\D+/)?.[0] || '';
  const suffix = value.toString().match(/[^\d,.]+/g)?.pop() || '';
  const hasComma = value.toString().includes(',');
  const decimals = value.toString().includes('.') ? value.toString().split('.')[1].length : 0;

  const rounded = useTransform(count, (latest) => {
    let val = latest.toFixed(decimals);
    if (hasComma) {
      val = parseFloat(val).toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });
    }
    return `${prefix}${val}${suffix}`;
  });

  useEffect(() => {
    const controls = animate(count, number, { duration, ease: [0.22, 1, 0.36, 1] });
    return controls.stop;
  }, [number, count, duration]);

  return <motion.span>{rounded}</motion.span>;
}