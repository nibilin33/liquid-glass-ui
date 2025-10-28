'use client'
import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PenguinMouthSmall } from './PenguinMouth';
import AIChatBox, { AIChatBoxHandle } from "./AIassistant";

export interface StudyBuddyProps {
  idleSeconds?: number; // 空闲多少秒后探出
  greeting?: string;
  persistPosition?: boolean;
  className?: string;
  handleSend?: any;
}

const STORAGE_KEY = 'liquid_glass_buddy_pos';

export function StudyBuddy({
  idleSeconds = 8,
  greeting = '需要我帮你复习或答疑吗？点我开始对话～',
  persistPosition = true,
  className = '',
  handleSend = async (msg:any, addMessage:any, replaceLast:any) => {
    addMessage({ role: 'ai', content: '', loading: true });
    // 模拟 SSE 流式响应
    const reply = "你好！我是你的学习小助手小Q。无论是复习知识点还是解答疑问，我都乐意帮忙！请告诉我你想了解的内容吧。";
    let aiText = '';
    for (let i = 0; i < reply.length; i++) {
      await new Promise(r => setTimeout(r, 40));
      aiText += reply[i];
      replaceLast({ role: 'ai', content: aiText, loading: true });
    }
    replaceLast({ role: 'ai', content: aiText });
  },
}: StudyBuddyProps) {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [pos, setPos] = useState<{ left: number; top: number } | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const chatboxRef = useRef<AIChatBoxHandle | null>(null);
  const idleTimer = useRef<number | null>(null);

  const [messages, setMessages] = useState<{ role: 'ai' | 'user'; content: string }[]>([
    { role: 'ai', content: greeting },
  ]);

  // 临时拖拽状态（不引起 rerender）
  const dragState = useRef<{
    startX: number;
    startY: number;
    origLeft: number;
    origTop: number;
    moved: boolean;
    elW: number;
    elH: number;
    pointerId?: number;
  } | null>(null);

  const DRAG_THRESHOLD = 6; // px

  // Load saved position
//   useEffect(() => {
//     if (!persistPosition) return;
//     try {
//       const raw = localStorage.getItem(STORAGE_KEY);
//       if (raw) {
//         const p = JSON.parse(raw);
//         if (typeof p.left === 'number' && typeof p.top === 'number') setPos(p);
//       }
//     } catch {}
//   }, [persistPosition]);

  // Save position
//   useEffect(() => {
//     if (!persistPosition) return;
//     if (!pos) return;
//     try {
//       localStorage.setItem(STORAGE_KEY, JSON.stringify(pos));
//     } catch {}
//   }, [pos, persistPosition]);

  // idle detection
  useEffect(() => {
    const reset = () => {
      setVisible(false);
      if (idleTimer.current) window.clearTimeout(idleTimer.current);
      idleTimer.current = window.setTimeout(() => setVisible(true), idleSeconds * 1000);
    };
    const events: Array<keyof WindowEventMap> = ['mousemove', 'keydown', 'wheel', 'touchstart'];
    events.forEach(ev => window.addEventListener(ev, reset as any, { passive: true }));
    reset();
    return () => {
      events.forEach(ev => window.removeEventListener(ev, reset as any));
      if (idleTimer.current) window.clearTimeout(idleTimer.current);
    };
  }, [idleSeconds]);

  // helper: get current element rect
  const getElemRect = () => {
    const el = rootRef.current;
    if (!el) return null;
    return el.getBoundingClientRect();
  };

  // start drag: attach window listeners
  const onPointerDown = (e: React.PointerEvent) => {
    // only left button / touch
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    e.preventDefault();

    const el = rootRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const elW = rect.width;
    const elH = rect.height;

    // compute original left/top. if pos exists use pos, else use rect.left/top
    const origLeft = pos?.left ?? rect.left;
    const origTop = pos?.top ?? rect.top;

    dragState.current = {
      startX: e.clientX,
      startY: e.clientY,
      origLeft,
      origTop,
      moved: false,
      elW,
      elH,
      pointerId: e.pointerId,
    };

    setDragging(true);

    // capture on the target for safety, but still use window listeners
    try {
      (e.target as Element).setPointerCapture(e.pointerId);
    } catch {}

    const onMove = (ev: PointerEvent) => {
      if (!dragState.current) return;
      if (dragState.current.pointerId !== ev.pointerId) return;
      const dx = ev.clientX - dragState.current.startX;
      const dy = ev.clientY - dragState.current.startY;
      if (!dragState.current.moved && Math.hypot(dx, dy) >= DRAG_THRESHOLD) {
        dragState.current.moved = true;
      }
      if (!dragState.current.moved) return;

      // calc new position and clamp
      const rawLeft = dragState.current.origLeft + dx;
      const rawTop = dragState.current.origTop + dy;
      const left = Math.max(8, Math.min(window.innerWidth - dragState.current.elW - 8, rawLeft));
      const top = Math.max(8, Math.min(window.innerHeight - dragState.current.elH - 8, rawTop));
      // update pos state
      setPos({ left, top });
    };

    const onUp = (ev: PointerEvent) => {
      if (!dragState.current) return;
      if (dragState.current.pointerId !== ev.pointerId) return;

      // release pointer capture if possible
      try {
        (e.target as Element).releasePointerCapture(ev.pointerId);
      } catch {}

      const wasMoved = dragState.current.moved;
      dragState.current = null;
      setDragging(false);

      // remove handlers
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);

      if (!wasMoved) {
        // treat as click
        setOpen(v => !v);
        setVisible(false);
        // focus chat input if opened
        setTimeout(() => {
          const input = rootRef.current?.querySelector('input');
          (input as HTMLInputElement | null)?.focus();
        }, 120);
      } else {
        // dragged: pos already set and will be persisted by effect
      }
    };

    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
  };

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
        onClick={()=>{
            setOpen(v => !v);
        }}
        style={{ touchAction: 'none', cursor: dragging ? 'grabbing' : 'grab', display: 'inline-block' }}
        aria-label="StudyBuddy avatar draggable"
        title="Drag to move / tap to open"
      >
        <PenguinMouthSmall />
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.16 }}
            className="mt-3 w-[320px] max-w-[88vw] rounded-xl shadow-xl border border-emerald-100 bg-gradient-to-br from-emerald-50/80 via-white/80 to-white/95 backdrop-blur p-3"
            style={{ pointerEvents: 'auto' }}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <button
                  className="text-xs px-2 py-1 rounded-md text-emerald-600 bg-emerald-50 hover:bg-emerald-100"
                  onClick={() => {
                    if (chatboxRef.current?.reset) {
                      chatboxRef.current.reset([{ role: 'ai', content: greeting }]);
                    } else {
                      setMessages([{ role: 'ai', content: greeting }]);
                    }
                  }}
                >
                  Reset
                </button>
                {/* <button
                  className="text-xs px-2 py-1 rounded-md bg-white/60 hover:bg-white/80"
                  onClick={() => {
                    setOpen(false);
                    if (chatboxRef.current?.reset) chatboxRef.current.reset();
                  }}
                  aria-label="Close chat"
                >
                  Close
                </button> */}
              </div>
            </div>

            <AIChatBox ref={chatboxRef} messages={messages} onSend={handleSend} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default StudyBuddy;