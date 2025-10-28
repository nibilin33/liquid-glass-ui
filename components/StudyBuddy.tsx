'use client'
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PenguinMouth from './PenguinMouth';
export interface StudyBuddyProps {
  idleSeconds?: number; // 空闲多少秒后探出
  greeting?: string;
  persistPosition?: boolean;
  className?: string;
}

const STORAGE_KEY = 'liquid_glass_buddy_pos';

export function StudyBuddy({
  idleSeconds = 8,
  greeting = '需要我帮你复习或答疑吗？点我开始对话～',
  persistPosition = true,
  className = '',
}: StudyBuddyProps) {
  const [visible, setVisible] = useState(false); // 探出（空闲时）
  const [open, setOpen] = useState(false); // 是否展开对话窗口
  const [dragging, setDragging] = useState(false);
  const [pos, setPos] = useState<{ left: number; top: number } | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const pointerRef = useRef<{ sx: number; sy: number; ox: number; oy: number } | null>(null);
  const idleTimer = useRef<number | null>(null);

  const [messages, setMessages] = useState<{ from: 'bot' | 'user'; text: string }[]>([
    { from: 'bot', text: greeting },
  ]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Load saved position
  useEffect(() => {
    if (persistPosition) {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const p = JSON.parse(raw);
          if (typeof p.left === 'number' && typeof p.top === 'number') setPos(p);
        }
      } catch {}
    }
  }, [persistPosition]);

  // idle detection
  useEffect(() => {
    const reset = () => {
      setVisible(false);
      if (idleTimer.current) window.clearTimeout(idleTimer.current);
      idleTimer.current = window.setTimeout(() => {
        setVisible(true);
      }, idleSeconds * 1000);
    };
    const events = ['mousemove', 'keydown', 'wheel', 'touchstart'] as const;
    events.forEach(ev => window.addEventListener(ev, reset, { passive: true }));
    reset();
    return () => {
      events.forEach(ev => window.removeEventListener(ev, reset as any));
      if (idleTimer.current) window.clearTimeout(idleTimer.current);
    };
  }, [idleSeconds]);

  // save position
  useEffect(() => {
    if (!persistPosition) return;
    if (pos) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(pos));
      } catch {}
    }
  }, [pos, persistPosition]);

  // pointer drag handlers
  const onPointerDown = (e: React.PointerEvent) => {
    (e.target as Element).setPointerCapture(e.pointerId);
    const rect = rootRef.current?.getBoundingClientRect();
    if (!rect) return;
    pointerRef.current = {
      sx: e.clientX,
      sy: e.clientY,
      ox: rect.left,
      oy: rect.top,
    };
    setDragging(true);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging || !pointerRef.current) return;
    const { sx, sy, ox, oy } = pointerRef.current;
    const dx = e.clientX - sx;
    const dy = e.clientY - sy;
    // clamp position within viewport
    const left = Math.max(8, Math.min(window.innerWidth - 72, ox + dx));
    const top = Math.max(8, Math.min(window.innerHeight - 72, oy + dy));
    setPos({ left, top });
  };
  const onPointerUp = (e: React.PointerEvent) => {
    try {
      (e.target as Element).releasePointerCapture(e.pointerId);
    } catch {}
    pointerRef.current = null;
    setDragging(false);
  };

  // click avatar -> 打开对话
  const handleAvatarClick = (e?: React.MouseEvent) => {
    // 如果拖动中则忽略点击
    if (dragging) return;
    setOpen(v => !v);
    setVisible(false); // 展开后收起探出提示
    setTimeout(() => inputRef.current?.focus(), 120);
  };

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    setMessages(m => [...m, { from: 'user', text }]);
    // 模拟回复
    setTimeout(() => {
      setMessages(m => [
        ...m,
        { from: 'bot', text: `收到：「${text}」。我可以帮你梳理要点、出练习题或解释概念。` },
      ]);
    }, 700);
  };

  // default position (bottom-right) if not set
  const style: React.CSSProperties = pos
    ? { position: 'fixed', left: pos.left, top: pos.top, zIndex: 160 }
    : { position: 'fixed', right: 24, bottom: 24, zIndex: 160 };

  return (
    <div ref={rootRef} style={style} className={className}>
      <AnimatePresence>
        {visible && !open && (
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 24 }}
            transition={{ duration: 0.36 }}
            className="mb-2 text-xs px-3 py-1 rounded-full liquid-glass bg-white/90 text-emerald-700 shadow-lg select-none"
            style={{ pointerEvents: 'none', whiteSpace: 'nowrap' }}
          >
            {greeting}
          </motion.div>
        )}
      </AnimatePresence>

      <div
        // onPointerDown={onPointerDown}
        // onPointerMove={onPointerMove}
        // onPointerUp={onPointerUp}
        // onPointerCancel={onPointerUp}
        style={{ touchAction: 'none' }}
        onClick={handleAvatarClick}
      >
        <PenguinMouth />
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.16 }}
            className="mt-3 w-[320px] max-w-[88vw] liquid-glass rounded-xl shadow-xl border border-emerald-100 bg-white/80 backdrop-blur p-3"
            style={{ pointerEvents: 'auto' }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <button
                  className="text-xs px-2 py-1 rounded-md text-emerald-600 bg-emerald-50 hover:bg-emerald-100"
                  onClick={() => {
                    setMessages([{ from: 'bot', text: greeting }]);
                  }}
                >
                  重置
                </button>
                <button
                  className="text-xs px-2 py-1 rounded-md bg-white/60 hover:bg-white/80"
                  onClick={() => setOpen(false)}
                  aria-label="关闭对话"
                >
                  关闭
                </button>
              </div>
            </div>

            <div className="h-48 overflow-y-auto p-2 space-y-2 bg-white/30 rounded-md border border-white/30">
              {messages.map((m, i) => (
                <div key={i} className={`text-sm break-words ${m.from === 'bot' ? 'text-emerald-800' : 'text-gray-800 text-right'}`}>
                  <div className={`inline-block px-3 py-1 rounded-md ${m.from === 'bot' ? 'bg-emerald-50' : 'bg-white/90'}`}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 flex gap-2">
              <input
                ref={inputRef}
                className="flex-1 px-3 py-2 rounded-lg outline-none border border-white/30 bg-white/90 text-sm"
                placeholder="输入问题或发送关键词（回车发送）"
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    const v = (e.target as HTMLInputElement).value;
                    sendMessage(v);
                    (e.target as HTMLInputElement).value = '';
                  }
                }}
              />
              <button
                className="px-3 py-2 rounded-lg bg-emerald-500 text-white text-sm shadow"
                onClick={() => {
                  const v = inputRef.current?.value || '';
                  sendMessage(v);
                  if (inputRef.current) inputRef.current.value = '';
                }}
              >
                发送
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default StudyBuddy;