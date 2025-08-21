import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export interface AnimateNumberProps {
  value: number; // 初始数字（秒）
  onEnd?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export function Timer({ value, onEnd, className = '', style = {} }: AnimateNumberProps) {
  const [num, setNum] = useState(value);
  useEffect(() => {
    setNum(value);
    if (value <= 0) return;
    const timer = setInterval(() => {
      setNum(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          if (onEnd) onEnd();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [value, onEnd]);

  return (
    <AnimatePresence mode="wait">
      {num > 0 ? (
        <motion.span
          key={num}
          initial={{ scale: 0.7, opacity: 0.5, y: -10 }}
          animate={{ scale: 1.2, opacity: 1, y: 0 }}
          exit={{ scale: 0.7, opacity: 0, y: 10 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className={className}
          style={style}
        >
          {num}
        </motion.span>
      ) : (
        <motion.span
          key="ended"
          initial={{ scale: 0.7, opacity: 0.5, y: -10 }}
          animate={{ scale: 1, opacity: 1, y: 0, color: '#f87171' }}
          exit={{ scale: 0.7, opacity: 0, y: 10 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className={className + ' animate-pulse text-xs'}
          style={{ ...style, color: '#f87171', fontWeight: 500 }}
        >
          Ended
        </motion.span>
      )}
    </AnimatePresence>
  );
}
