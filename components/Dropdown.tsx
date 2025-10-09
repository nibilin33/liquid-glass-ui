'use client'
import { useState, useRef, useLayoutEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from './Button'
import { FaCheck } from 'react-icons/fa'

interface GlassDropdownProps {
  label: string
  items: { label: string; onClick: () => void }[]
  defaultIndex?: number
}

export function Dropdown({ label, items, defaultIndex }: GlassDropdownProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<number | null>(defaultIndex ?? null); // 支持 defaultIndex
  const btnRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [menuStyle, setMenuStyle] = useState<React.CSSProperties>({});

  // 当前显示文本
  const displayLabel = selected !== null ? items[selected]?.label : label;

  useLayoutEffect(() => {
    if (open && btnRef.current && menuRef.current) {
      const btnRect = btnRef.current.getBoundingClientRect();
      const menuRect = menuRef.current.getBoundingClientRect();
      const winW = window.innerWidth, winH = window.innerHeight;
      let top = btnRect.bottom + 8;
      let left = btnRect.left;
      let right: number | undefined = undefined;
      let transform = '';
      if (btnRect.bottom + menuRect.height + 16 > winH) {
        top = btnRect.top - menuRect.height - 8;
      }
      if (btnRect.left + menuRect.width > winW - 8) {
        left = undefined as any;
        right = winW - btnRect.right;
        transform = 'unset';
      }
      setMenuStyle({
        position: 'fixed',
        top,
        left,
        right,
        zIndex: 100,
        minWidth: btnRect.width,
        transform,
      });
    }
  }, [open]);

  // defaultIndex 变化时自动更新选中项
  useLayoutEffect(() => {
    setSelected(defaultIndex ?? null);
  }, [defaultIndex]);

  return (
    <div className="relative inline-block text-left">
      <Button
        color="emerald"
        style={{
          textTransform: 'none'
        }}
        onClick={() => setOpen(!open)}
        ref={btnRef}
      >
        {displayLabel}
      </Button>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`absolute mt-2 w-56 rounded-xl shadow-lg border border-white/30 z-10 bg-emerald-50 p-4`}
            style={menuStyle}
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