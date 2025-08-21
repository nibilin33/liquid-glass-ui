'use client'

import { motion } from 'framer-motion';

export type GlassSidebarItem =
  | string
  | {
      label: string;
      onClick?: () => void;
    };

interface GlassSidebarProps {
  items?: GlassSidebarItem[];
}

export function GlassSidebar({ items = [] }: GlassSidebarProps) {
  return (
    <motion.aside
      className="p-6 liquid-glass hidden md:flex flex-col"
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <nav className="flex flex-col gap-3">
        {items.map((item, idx) => {
          const label = typeof item === 'string' ? item : item.label;
          const handleClick = typeof item === 'object' && item.onClick ? item.onClick : undefined;
          return (
            <motion.a
              key={label + idx}
              className="liquid-glass px-4 py-2 rounded-xl text-white cursor-pointer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleClick}
            >
              {label}
            </motion.a>
          );
        })}
      </nav>
    </motion.aside>
  );
}
