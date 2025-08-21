'use client'
import { useRef, useState } from 'react';

export interface ReadAloudProps {
  text: string;
  lang?: string;
  rate?: number;
  highlightClass?: string;
}

export function ReadAloud({ text, lang = 'en-US', rate = 1, highlightClass = 'bg-emerald-100 rounded' }: ReadAloudProps) {
  const synthRef = useRef<typeof window.speechSynthesis | null>(null);
  // 仅在浏览器环境初始化 speechSynthesis
  if (typeof window !== 'undefined' && !synthRef.current) {
    synthRef.current = window.speechSynthesis;
  }
  const words = text.split(/(\s+)/);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const playWord = (word: string, idx: number) => {
    if (typeof window === 'undefined' || !synthRef.current) return;
    setActiveIdx(idx);
    const utter = new window.SpeechSynthesisUtterance(word);
    utter.lang = lang;
    utter.rate = rate;
    utter.onend = () => setActiveIdx(null);
    synthRef.current.cancel();
    synthRef.current.speak(utter);
  };

  return (
    <div className="flex flex-wrap">
      {words.map((w, idx) => (
        w.trim() ? (
          <span
            key={idx}
            role="button"
            tabIndex={0}
            onClick={() => playWord(w, idx)}
            onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && playWord(w, idx)}
            aria-label={`播放 ${w}`}
            className={`p-0.5 rounded transition-all duration-100 cursor-pointer select-none text-emerald-800 hover:bg-emerald-50 focus:outline-none focus:bg-emerald-100
              ${activeIdx === idx ? 'bg-emerald-200/80 text-emerald-900 font-bold underline decoration-emerald-400' : ''}`}
            style={{ boxShadow: activeIdx === idx ? '0 2px 12px rgba(16,185,129,0.12)' : 'none', borderBottom: activeIdx === idx ? '1px solid #10b981' : 'none' }}
          >
            {w}
          </span>
        ) : (
          <span key={idx}>{w}</span>
        )
      ))}
    </div>
  );
}
