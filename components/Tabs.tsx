'use client'
import { useState, ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Tab {
  label: string
  value: string
  content: ReactNode
}

interface GlassTabsProps {
  tabs: Tab[]
  value?: string
  onChange?: (value: string) => void
}

export function Tabs({ tabs, value, onChange }: GlassTabsProps) {
  const isControlled = value !== undefined && onChange !== undefined
  const [activeIndex, setActiveIndex] = useState(0)

  // 受控模式下根据 value 查找索引
  const currentIndex = isControlled
    ? tabs.findIndex(tab => tab.value === value)
    : activeIndex

  const handleTabClick = (idx: number) => {
    if (isControlled) {
      onChange?.(tabs[idx].value)
    } else {
      setActiveIndex(idx)
    }
  }

  const tabClass = (active: boolean) =>
    `relative px-4 py-2 rounded-t-xl cursor-pointer transition-all liquid-glass font-semibold ${
      active ? 'bg-white/70 text-emerald-700 shadow-lg' : 'bg-white/10 text-gray-500'
    }`

  const contentClass = `liquid-glass p-4 mt-2`

  return (
    <div className="w-full">
      <div className="flex gap-2">
        {tabs.map((tab, idx) => (
          <div
            key={tab.value}
            className={tabClass(idx === currentIndex)}
            onClick={() => handleTabClick(idx)}
            style={{ position: 'relative' }}
          >
            {tab.label}
            {idx === currentIndex && (
              <motion.div
                layoutId="tab-underline"
                className="absolute left-2 right-2 -bottom-1 h-1 rounded bg-emerald-400"
                style={{ zIndex: 2 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className={contentClass}
        >
          {tabs[currentIndex]?.content}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}