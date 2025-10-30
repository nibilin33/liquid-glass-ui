import React, { useEffect, useRef, useState } from "react";
/**
 * PenguinMouthSmall — 迷你版企鹅（嘴巴开合 + 花朵装饰）
 * - SVG 卡通企鹅，缩小至约 100x100 显示区域
 * - 头顶带一朵花
 * - 默认随机张嘴（2–6 秒一次），点击立即张嘴
 */
export function PenguinMouthSmall({
  size = 64,
  speakDuration = 220,
  minInterval = 1000,
  maxInterval = 3000,
  className = "",
}: {
  size?: number | string;
  speakDuration?: number;
  minInterval?: number;
  maxInterval?: number;
  className?: string; // 新增
}) {
  const [speaking, setSpeaking] = useState(false);
  const timerRef = useRef<number | null>(null);

  const asPx = typeof size === "number" ? `${size}px` : size;

  const speakOnce = () => {
    if (speaking) return;
    setSpeaking(true);
    window.setTimeout(() => setSpeaking(false), speakDuration);
  };

  const schedule = () => {
    const jitter = Math.random() * (maxInterval - minInterval) + minInterval;
    timerRef.current = window.setTimeout(() => {
      speakOnce();
      schedule();
    }, jitter) as unknown as number;
  };

  useEffect(() => {
    schedule();
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [minInterval, maxInterval, speakDuration]);

  return (
    <div
      className={`flex items-center justify-center select-none ${className}`}
      style={{ width: asPx, height: asPx }}
    >
      <style>{`
        .penguin-mini:hover { filter: drop-shadow(0 2px 8px rgba(0,0,0,.25)); }
        .beak-top, .beak-bottom { transition: transform ${speakDuration}ms cubic-bezier(.2,.7,.2,1); transform-origin: 250px 235px; }
        .beak-bottom { transform-origin: 250px 238px; }
        .speaking .beak-top { transform: rotate(-5deg); }
        .speaking .beak-bottom { transform: rotate(18deg); }
        .flower-petal { transform-origin: center; }
      `}</style>

      <svg
        className={`penguin-mini cursor-pointer ${speaking ? "speaking" : ""}`}
        width="100%"
        height="100%"
        viewBox="0 0 500 500"
        onClick={speakOnce}
        role="img"
        aria-label="Mini penguin with moving mouth and flower"
      >
        {/* 身体与肚皮 */}
        <g>
          <ellipse cx="250" cy="310" rx="180" ry="180" fill="#0F1720" />
          <ellipse cx="250" cy="350" rx="150" ry="130" fill="#FEF7EF" />
        </g>

        {/* 头部与面部 */}
        <g>
          <ellipse cx="250" cy="175" rx="190" ry="190" fill="#0F1720" />
          <path fill="#FEF7EF" d="M125 210c0-78 58-130 125-130s125 52 125 130c0 48-38 70-125 70s-125-22-125-70z" />
        </g>

        {/* 嘴喙 */}
        <path className="beak-top" d="M195 220 C225 195, 275 195, 305 220 C285 235, 265 245, 250 245 C235 245, 215 235, 195 220 Z" fill="#F9A825" />
        <path className="beak-bottom" d="M195 245 C220 260, 280 260, 305 245 C290 265, 270 280, 250 282 C230 280, 210 265, 195 245 Z" fill="#F4A51C" />

        {/* 眼睛 */}
        <g transform="translate(180,165)">
          <rect x="-20" y="-20" rx="10" ry="10" width="40" height="40" fill="#9DAAFB" />
        </g>
        <g transform="translate(320,165)">
          <rect x="-20" y="-20" rx="10" ry="10" width="40" height="40" fill="#F59AA2" />
        </g>

        {/* 花朵装饰 */}
        <g transform="translate(310,40)">
          <circle cx="0" cy="0" r="10" fill="#FFD54F" />
          <circle className="flower-petal" cx="0" cy="-18" r="8" fill="#F48FB1" />
          <circle className="flower-petal" cx="0" cy="18" r="8" fill="#F48FB1" />
          <circle className="flower-petal" cx="-18" cy="0" r="8" fill="#F48FB1" />
          <circle className="flower-petal" cx="18" cy="0" r="8" fill="#F48FB1" />
          <circle className="flower-petal" cx="12" cy="-12" r="6" fill="#F06292" />
          <circle className="flower-petal" cx="-12" cy="-12" r="6" fill="#F06292" />
        </g>
      </svg>
    </div>
  );
}