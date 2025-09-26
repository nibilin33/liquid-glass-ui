'use client'

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export type GlassSidebarItem =
  | string
  | {
      label: string;
      onClick?: () => void;
    };

interface GlassSidebarProps {
  items?: GlassSidebarItem[];
  activeIndex?: number;
  onActiveChange?: (idx: number) => void;
}

export function Sidebar({ items = [], activeIndex, onActiveChange }: GlassSidebarProps) {
  const [active, setActive] = useState<number>(activeIndex ?? 0);

  const handleItemClick = (idx: number, handleClick?: () => void) => {
    setActive(idx);
    onActiveChange?.(idx);
    if (handleClick) handleClick();
  };
  useEffect(()=>{
    if (activeIndex !== undefined) {
      setActive(activeIndex);
    }
  },[activeIndex])
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
          const isActive = activeIndex !== undefined ? idx === activeIndex : idx === active;
          return (
            <motion.a
              key={label + idx}
              className={`relative liquid-glass px-4 py-2 cursor-pointer transition-all
                ${isActive
                  ? "bg-emerald-500/90 text-white shadow-xl ring-2 ring-emerald-300 font-semibold"
                  : "text-emerald-700/70 hover:bg-white/10"}
              `}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleItemClick(idx, handleClick)}
              style={{
                boxShadow: isActive
                  ? "0 4px 24px 0 rgba(16,185,129,0.18), 0 1.5px 8px 0 rgba(16,185,129,0.10)"
                  : undefined,
                border: isActive ? "1.5px solid #34d399" : undefined,
              }}
            >
           {isActive && (
              <span
                className="absolute -left-4 top-1/2 -translate-y-1/2 w-2 h-2 bg-white rounded-full shadow"
                style={{ boxShadow: "0 0 10px #fff" }}
              />
            )}
              {label}
            </motion.a>
          );
        })}
      </nav>
    </motion.aside>
  );
}