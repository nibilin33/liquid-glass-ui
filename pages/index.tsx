'use client'
import { GlassButton } from '../components/GlassButton'
import { GlassInput } from '../components/GlassInput'
import { GlassCard } from '../components/GlassCard'
import { GlassModal } from '../components/GlassModal'
import { GlassTabs } from '../components/GlassTabs'
import { GlassDropdown } from '../components/GlassDropdown'
import { GlassSidebar } from '../components/GlassSidebar'
import { GlassTooltip } from '../components/GlassTooltip'
import { useState } from 'react'

export default function Showcase() {
  const [modalOpen, setModalOpen] = useState(false)
  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-green-200 via-emerald-300 to-gray-500">
      <h1 className="text-3xl font-bold mb-8 text-white drop-shadow-lg">Liquid Glass UI 组件展示</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <GlassCard title="按钮 Button">
          <GlassButton onClick={() => setModalOpen(true)}>酷炫弹窗</GlassButton>
        </GlassCard>
        <GlassCard title="输入框 Input">
          <GlassInput placeholder="请输入内容…" />
        </GlassCard>
        <GlassCard title="Tabs 标签页">
          <GlassTabs tabs={[{label:'Tab 1',content:'内容1'},{label:'Tab 2',content:'内容2'}]} />
        </GlassCard>
        <GlassCard title="下拉菜单 Dropdown">
          <GlassDropdown
            label="请选择一个选项"
            items={[
              { label: "选项A", onClick: () => {} },
              { label: "选项B", onClick: () => {} },
              { label: "选项C", onClick: () => {} }
            ]}
          />
        </GlassCard>
        <GlassCard title="侧边栏 Sidebar">
          <GlassSidebar items={["首页","功能","设置"]} />
        </GlassCard>
        <GlassCard title="Tooltip 气泡提示">
          <GlassTooltip text="提示内容">
            <span className="underline cursor-pointer">鼠标悬停</span>
          </GlassTooltip>
        </GlassCard>
      </div>
      <GlassModal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <p className="text-lg">这是一个酷炫的玻璃Modal弹窗！</p>
      </GlassModal>
    </div>
  )
}

