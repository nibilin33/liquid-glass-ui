'use client'
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export function GlassTooltip({ content, children }: any) {
  const { isGlass } = useTheme();

  return (
    <div className="relative group inline-block">
      {children}
      <motion.div
        className={`absolute bottom-full mb-2 px-3 py-1 text-sm ${
          isGlass ? 'liquid-glass text-white' : 'bg-gray-800 text-white rounded-md shadow-md'
        }`}
        initial={{ opacity: 0, y: 10 }}
        whileHover={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {content}
      </motion.div>
    </div>
  );
}
