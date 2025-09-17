import React from 'react';
import { motion } from 'framer-motion';

interface AutoHighlightProps {
  text: string;
  highlights: string[];
  color?: string;
  className?: string;
}
interface HighlightProps {
  children: React.ReactNode;
  color?: string; // 默认黄色
  className?: string;
}
export function Highlight({ children, color = "#FFE066", className = "" }: HighlightProps) {
  return (
    <motion.mark
      className={`relative inline-block px-0.5 ${className}`}
      style={{
        background: "none",
        padding: 0,
      }}
      initial={{ y: 6, opacity: 0.7 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 24, duration: 0.35 }}
      whileHover={{ scale: 1.04 }}
    >
      <span
        aria-hidden
        className="absolute left-0 right-0 bottom-0 top-1/2 -z-10 rounded-sm"
        style={{
          background: color,
          height: "38%",
          content: "''",
          display: "block",
        }}
      />
      <span className="relative z-10">{children}</span>
    </motion.mark>
  );
}

export function AutoHighlight({ text, highlights, color, className }: AutoHighlightProps) {
  if (!highlights.length) return <>{text}</>;
  // 构造正则
  const regex = new RegExp(`(${highlights.map(h => h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
  const parts = text.split(regex);
  return (
    <span className={className}>
      {parts.map((part, i) =>
        highlights.some(h => h.toLowerCase() === part.toLowerCase()) ? (
          <Highlight key={i} color={color}>{part}</Highlight>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </span>
  );
}