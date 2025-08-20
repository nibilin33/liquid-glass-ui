'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { Button } from '@material-tailwind/react'

interface GlassDropdownProps {
  label: string
  items: { label: string; onClick: () => void }[]
}

export function GlassDropdown({ label, items }: GlassDropdownProps) {
  const { isGlass } = useTheme()
  const [open, setOpen] = useState(false)

  const bgClass = isGlass
    ? 'liquid-glass text-white'
    : 'bg-white text-black rounded-xl shadow-md'

  return (
    <div className="relative inline-block text-left">
      <Button
        type="button"
        onClick={() => setOpen(!open)}
        className={bgClass}
        placeholder={undefined}
        onResize={undefined}
        onResizeCapture={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        {label}
      </Button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className={`absolute mt-2 w-56 rounded-xl shadow-lg ${isGlass ? 'backdrop-blur-xl border border-white/30' : ''}`}
          >
            <div className="py-1">
              {items.map((item, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => {
                    item.onClick()
                    setOpen(false)
                  }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className={`w-full text-left px-4 py-2 text-sm ${bgClass} hover:bg-white/20`}
                >
                  {item.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
