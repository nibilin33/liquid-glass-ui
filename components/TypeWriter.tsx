import { motion } from 'framer-motion';
import React from 'react';

export interface TypeWriterProps {
  text: string;
  delay?: number; // 每个字母动画延迟，默认 0.04s
  className?: string;
  style?: React.CSSProperties;
  cursor?: boolean;
}

export function TypeWriter({ text, delay = 0.04, className = '', style = {}, cursor = false }: TypeWriterProps) {
  const letters = text.split("");
  return (
    <span className={className} style={{ display: 'inline-flex', ...style }}>
      {letters.map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * delay, type: 'spring', stiffness: 320, damping: 22 }}
        >{char}</motion.span>
      ))}
      {cursor && <span className="inline-block animate-pulse text-emerald-400">|</span>}
    </span>
  );
}
