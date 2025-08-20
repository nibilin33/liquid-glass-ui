'use client'
import { GlassCard } from '../components/GlassCard'
import { GlassButton } from '../components/GlassButton'
import { GlassModal } from '../components/GlassModal'
import { useState } from 'react'
import { useTheme } from '../context/ThemeContext'

export default function Home() {
  const { toggleTheme } = useTheme()
  const [open, setOpen] = useState(false)

  return (
    <div className="p-6 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 min-h-screen">
      <GlassButton onClick={toggleTheme}>切换普通/Glass模式</GlassButton>
      <GlassButton onClick={() => setOpen(true)}>打开 Modal</GlassButton>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassCard title="Card 1">内容 1</GlassCard>
        <GlassCard title="Card 2">内容 2</GlassCard>
      </div>

      <GlassModal isOpen={open} onClose={() => setOpen(false)}>
        <p>这是一个 Liquid Glass Modal</p>
      </GlassModal>
    </div>
  )
}
