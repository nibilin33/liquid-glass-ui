'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from './Button'
import { FaCheck } from 'react-icons/fa'

interface GlassDropdownProps {
  label: string
  items: { label: string; onClick: () => void }[]
  defaultIndex?: number
}

export function Dropdown({ label, items }: GlassDropdownProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  // 当前显示文本
  const displayLabel = selected !== null ? items[selected]?.label : label;

  return (
    <div className="relative inline-block text-left">
      <Button
        color="emerald"
        onClick={() => setOpen(!open)}
      >
        {displayLabel}
      </Button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`absolute mt-2 w-56 rounded-xl shadow-lg border border-white/30 z-10 bg-emerald-50 p-4`}
          >
            <div className="py-1">
              {items.map((item, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => {
                    item.onClick();
                    setSelected(idx);
                    setOpen(false);
                  }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`w-full text-left px-4 py-2 text-sm focus:outline-none focus:bg-emerald-200 ${selected === idx ? 'bg-emerald-200 text-emerald-700 font-bold' : 'hover:bg-emerald-100'}`}
                >
                  {item.label}
                {selected === idx && <FaCheck className="ml-2 text-emerald-500 inline-block" size={14} />}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
