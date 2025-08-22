'use client'
import { useState, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Tab {
  label: string
  content: ReactNode
}

interface GlassTabsProps {
  tabs: Tab[]
}

export function Tabs({ tabs }: GlassTabsProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  const tabClass = (active: boolean) =>
    `px-4 py-2 rounded-t-xl cursor-pointer transition-all liquid-glass ${active ? 'bg-white/30' : 'bg-white/10'}`

  const contentClass = `liquid-glass p-4 mt-2`

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
