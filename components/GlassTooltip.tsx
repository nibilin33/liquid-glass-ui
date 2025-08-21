'use client'
import {useState} from 'react';
import { motion } from 'framer-motion';

export interface GlassTooltipProps {
  content?: React.ReactNode;
  children?: React.ReactNode;
  trigger?: 'hover' | 'click';
}

export function GlassTooltip({ content, children, trigger = 'hover' }: GlassTooltipProps) {
  const [open, setOpen] = useState(false);

  if (!content || !children) return <>{children}</>;

  const handleClick = () => {
    if (trigger === 'click') setOpen(v => !v);
  };
  const handleMouseEnter = () => {
    if (trigger === 'hover') setOpen(true);
  };
  const handleMouseLeave = () => {
    if (trigger === 'hover') setOpen(false);
  };

  return (
    <div
      className="relative inline-block"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      tabIndex={0}
      style={{ outline: 'none' }}
    >
      {children}
      <motion.div
        className={`pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1 text-sm whitespace-nowrap
          transition-all duration-200 liquid-glass text-white
          ${open ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
        `}
        initial={false}
        animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
        transition={{ duration: 0.2 }}
        role="tooltip"
        aria-live="polite"
      >
        {content}
      </motion.div>
    </div>
  );
}
