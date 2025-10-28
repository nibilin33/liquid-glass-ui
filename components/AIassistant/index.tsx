import React, { useRef, useState, useEffect, useMemo, forwardRef, useImperativeHandle } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane, FaRobot, FaUser } from "react-icons/fa";
import { Button } from "../Button";

export interface AIMessage {
  role: "user" | "ai";
  content: React.ReactNode | string;
  loading?: boolean;
}

export interface AIChatBoxProps {
  messages?: AIMessage[]; // 可选，初始消息
  onSend: (msg: string, addMessage: (msg: AIMessage) => void, replaceLast: (msg: AIMessage) => void) => void;
  loading?: boolean;
  className?: string;
  style?: React.CSSProperties;
  placeholder?: string;
}

export interface AIChatBoxHandle {
  reset: (msgs?: AIMessage[]) => void;
}

export const AIChatBox = forwardRef<AIChatBoxHandle, AIChatBoxProps>(function AIChatBox(
  { messages = [], onSend, loading, className = "", style, placeholder = "输入你的问题..." },
  ref
) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<AIMessage[]>(messages);
  const inputRef = useRef<HTMLInputElement>(null);
  const initialRef = useRef<AIMessage[]>(messages);

  // 新增：用于滚动到最新消息的 ref
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messages.length > 0) {
      setHistory(messages);
      initialRef.current = messages;
    }
    // eslint-disable-next-line
  }, []);

  const addMessage = (msg: AIMessage) => setHistory(h => [...h, msg]);
  const replaceLast = (msg: AIMessage) => setHistory(h => (h.length ? [...h.slice(0, -1), msg] : [msg]));

  const handleSend = () => {
    if (input.trim()) {
      addMessage({ role: "user", content: input });
      const cur = input;
      setInput("");
      inputRef.current?.focus();
      onSend(cur, addMessage, replaceLast);
    }
  };

  useImperativeHandle(
    ref,
    () => ({
      reset: (msgs?: AIMessage[]) => {
        const target = msgs ?? initialRef.current ?? [];
        setHistory(target);
        setInput("");
        setTimeout(() => inputRef.current?.focus(), 50);
      },
    }),
    []
  );

  // 当 history 变化时自动滚动到最新消息
  useEffect(() => {
    const t = setTimeout(() => {
      const c = scrollContainerRef.current;
      if (!c) return;
      // 平滑滚动到容器底部 —— 仅操作容器，不触发 window 滚动
      try {
        c.scrollTo({ top: c.scrollHeight, behavior: "smooth" });
      } catch {
        // fallback
        c.scrollTop = c.scrollHeight;
      }
    }, 50);
    return () => clearTimeout(t);
  }, [history.length]);

  const messagesList = useMemo(
    () => (
      <>
        {history.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.04 }}
            className={`flex mb-2 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.role === "ai" && (
              <span className="flex items-end mr-2 text-emerald-500">
                <FaRobot size={20} />
              </span>
            )}
            <div
              className={`px-4 py-2 rounded-2xl max-w-[80%] whitespace-pre-line break-words shadow-md ${
                msg.role === "user"
                  ? "bg-emerald-500/90 text-white rounded-br-md"
                  : "bg-white/80 text-emerald-900 rounded-bl-md border border-emerald-100"
              } ${msg.loading ? "animate-pulse" : ""}`}
            >
              {msg.content}
              {msg.loading && <span className="ml-2 animate-pulse text-emerald-400">...</span>}
            </div>
            {msg.role === "user" && (
              <span className="flex items-end ml-2 text-emerald-400">
                <FaUser size={18} />
              </span>
            )}
          </motion.div>
        ))}
      </>
    ),
    [history]
  );

  return (
    <div
      className={`liquid-glass rounded-2xl shadow-glass bg-white/70 backdrop-blur p-4 flex flex-col w-full max-w-xl mx-auto ${className}`}
      style={style}
    >
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto mb-3 max-h-[420px] min-h-[220px] pr-1"
      >
        {messagesList}
        {/* 锚点：滚动到这里以展示最新消息 */}
        <div ref={messagesEndRef} />
        {loading && (
          <div className="flex justify-start mb-2">
            <span className="flex items-end mr-2 text-emerald-500">
              <FaRobot size={20} />
            </span>
            <div className="px-4 py-2 rounded-2xl max-w-[80%] bg-white/80 text-emerald-900 rounded-bl-md border border-emerald-100 animate-pulse">
              AI 正在思考...
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 mt-auto">
        <input
          ref={inputRef}
          type="text"
          className="flex-1 px-4 py-2 rounded-xl border border-emerald-200 bg-white/80 focus:outline-emerald-400 text-base shadow-inner"
          placeholder={placeholder}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === "Enter") handleSend();
          }}
          disabled={loading}
        />
        <Button onClick={handleSend} disabled={loading || !input.trim()} aria-label="发送">
          <FaPaperPlane />
        </Button>
      </div>
    </div>
  );
});

export default AIChatBox;