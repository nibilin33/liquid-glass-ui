import { useState, useRef } from "react";
import { motion } from "framer-motion";

export interface CodeInputProps {
  length?: number;
  value?: string;
  onChange?: (code: string) => void;
  onComplete?: (code: string) => void;
  disabled?: boolean;
  autoFocus?: boolean;
  className?: string;
  loading?: boolean; // 新增 loading 属性
}

export function CodeInput({
  length = 6,
  value = "",
  onChange,
  onComplete,
  disabled = false,
  autoFocus = false,
  className = "",
  loading = false, // 新增
}: CodeInputProps) {
  const [inputs, setInputs] = useState(() =>
    value ? value.split("").slice(0, length) : Array(length).fill("")
  );
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  // 监听外部 value 变化
  // 可选：如果需要受控模式，建议加 useEffect

  const handleChange = (idx: number, val: string) => {
    if (disabled || loading) return;
    if (!/^[a-zA-Z0-9]{0,1}$/.test(val)) return;
    const next = [...inputs];
    next[idx] = val;
    setInputs(next);
    onChange?.(next.join(""));
    if (val && idx < length - 1) {
      inputRefs.current[idx + 1]?.focus();
    }
    if (next.every((v) => v.length > 0)) {
      onComplete?.(next.join(""));
    }
  };
  // 新增：粘贴事件处理
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    if (disabled || loading) return;
    const paste = e.clipboardData.getData("text").replace(/[^a-zA-Z0-9]/g, "");
    if (!paste) return;
    const chars = paste.slice(0, length).split("");
    setInputs(chars.concat(Array(length - chars.length).fill("")));
    onChange?.(chars.join(""));
    // 自动触发完成
    if (chars.length === length) {
      onComplete?.(chars.join(""));
    }
    // 自动 focus 到最后一个填充的格子
    const last = Math.min(chars.length - 1, length - 1);
    inputRefs.current[last]?.focus();
    e.preventDefault();
  };
  const handleKeyDown = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled || loading) return;
    if (e.key === "Backspace" && !inputs[idx] && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    }
    if (e.key === "ArrowLeft" && idx > 0) {
      inputRefs.current[idx - 1]?.focus();
    }
    if (e.key === "ArrowRight" && idx < length - 1) {
      inputRefs.current[idx + 1]?.focus();
    }
  };

  return (
    <div
      className={`flex gap-3 justify-center items-center relative ${className}`}
      style={{ userSelect: "none" }}
    >
      {Array.from({ length }).map((_, idx) => (
        <motion.input
          key={idx}
          type="text"
          inputMode="numeric"
          maxLength={1}
          autoFocus={autoFocus && idx === 0}
          value={inputs[idx]}
          disabled={disabled || loading}
          ref={el => { inputRefs.current[idx] = el; }}
          onChange={e => handleChange(idx, e.target.value)}
        　onPaste={handlePaste} // 新增粘贴事件
          onKeyDown={e => handleKeyDown(idx, e)}
          className={`w-8 h-10 text-center text-xl font-bold rounded-xl border-2 outline-none transition-all shadow-glass bg-gradient-to-br from-white/80 via-emerald-50 to-white/60 backdrop-blur focus:border-emerald-400 focus:ring-2 focus:ring-emerald-300 hover:shadow-[0_0_8px_2px_rgba(52,181,139,0.12)] border-gray-200 text-emerald-700 ${disabled || loading ? "bg-gray-100 opacity-60" : ""}`}
          style={{
            boxShadow: "0 2px 12px rgba(52,181,139,0.08)",
            letterSpacing: "0.1em",
          }}
          animate={{ scale: inputs[idx] ? 1.08 : 1 }}
        />
      ))}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white/70 backdrop-blur border border-emerald-100 shadow-lg">
            <svg className="animate-spin h-8 w-8 text-emerald-400" viewBox="0 0 24 24">
              <circle className="opacity-30" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
              <path className="opacity-80" fill="currentColor" d="M12 2a10 10 0 0 1 10 10h-2a8 8 0 1 0-8-8V2z"/>
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}