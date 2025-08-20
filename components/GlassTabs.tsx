'use client'
import { useState, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

interface Tab {
  label: string
  content: ReactNode
}

interface GlassTabsProps {
  tabs: Tab[]
}

export function GlassTabs({ tabs }: GlassTabsProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const { isGlass } = useTheme()

  const tabClass = (active: boolean) =>
    `px-4 py-2 rounded-t-xl cursor-pointer transition-all ${
      isGlass
        ? `liquid-glass ${active ? 'bg-white/30' : 'bg-white/10'}`
        : `${active ? 'bg-gray-200' : 'bg-gray-100'}`
    }`

  const contentClass = isGlass
    ? 'liquid-glass p-4 mt-2'
    : 'bg-white p-4 mt-2 rounded-xl shadow-md'

  return (
    <div className="w-full">
      <div className="flex gap-2">
        {tabs.map((tab, idx) => (
          <div
            key={idx}
            className={tabClass(idx === activeIndex)}
            onClick={() => setActiveIndex(idx)}
          >
            {tab.label}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className={contentClass}
        >
          {tabs[activeIndex].content}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
