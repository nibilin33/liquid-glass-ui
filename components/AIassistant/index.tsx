import React, { useRef, useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { FaPaperPlane, FaRobot, FaUser } from "react-icons/fa";
import { Button } from "../Button";

export interface AIMessage {
  role: "user" | "ai";
  content: string;
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

export function AIChatBox({ messages = [], onSend, loading, className = "", style, placeholder = "输入你的问题..." }: AIChatBoxProps) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<AIMessage[]>(messages);
  const inputRef = useRef<HTMLInputElement>(null);

  // 只在初始时同步一次外部 messages
  useEffect(() => {
    if (messages.length > 0) setHistory(messages);
    // eslint-disable-next-line
  }, []);

  // 提供添加消息和替换最后一条消息的工具
  const addMessage = (msg: AIMessage) => setHistory(h => [...h, msg]);
  const replaceLast = (msg: AIMessage) => setHistory(h => h.length ? [...h.slice(0, -1), msg] : [msg]);

  const handleSend = () => {
    if (input.trim()) {
      addMessage({ role: "user", content: input });
      setInput("");
      inputRef.current?.focus();
      onSend(input, addMessage, replaceLast);
    }
  };

  const messagesList = useMemo(() => (
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
            <span className="flex items-end mr-2 text-emerald-500"><FaRobot size={20} /></span>
          )}
          <div
            className={`px-4 py-2 rounded-2xl max-w-[80%] whitespace-pre-line break-words shadow-md ${msg.role === "user"
              ? "bg-emerald-500/90 text-white rounded-br-md"
              : "bg-white/80 text-emerald-900 rounded-bl-md border border-emerald-100"}
              ${msg.loading ? "animate-pulse" : ""}`}
          >
            {msg.content}
            {msg.loading && <span className="ml-2 animate-pulse text-emerald-400">...</span>}
          </div>
          {msg.role === "user" && (
            <span className="flex items-end ml-2 text-emerald-400"><FaUser size={18} /></span>
          )}
        </motion.div>
      ))}
    </>
  ), [history]);

  return (
    <div className={`liquid-glass rounded-2xl shadow-glass bg-white/70 backdrop-blur p-4 flex flex-col w-full max-w-xl mx-auto ${className}`} style={style}>
      <div className="flex-1 overflow-y-auto mb-3 max-h-[420px] min-h-[220px] pr-1">
        {messagesList}
        {loading && (
          <div className="flex justify-start mb-2">
            <span className="flex items-end mr-2 text-emerald-500"><FaRobot size={20} /></span>
            <div className="px-4 py-2 rounded-2xl max-w-[80%] bg-white/80 text-emerald-900 rounded-bl-md border border-emerald-100 animate-pulse">AI 正在思考...</div>
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
          onKeyDown={e => { if (e.key === 'Enter') handleSend(); }}
          disabled={loading}
        />
        <Button
          onClick={handleSend}
          disabled={loading || !input.trim()}
          aria-label="发送"
        >
          <FaPaperPlane />
        </Button>
      </div>

      {/* 用法示例：
        <AIChatBox
          onSend={async (msg, addMessage, replaceLast) => {
            // 1. 先插入一个 loading 态的 AI 消息
            addMessage({ role: 'ai', content: '', loading: true });
            // 2. 发起 SSE 请求
            const resp = await fetch('/api/ai', {
              method: 'POST',
              body: JSON.stringify({ message: msg }),
              headers: { 'Content-Type': 'application/json' },
            });
            if (!resp.body) return;
            const reader = resp.body.getReader();
            let aiText = '';
            while (true) {
              const { value, done } = await reader.read();
              if (done) break;
              const chunk = new TextDecoder().decode(value);
              aiText += chunk;
              // 3. 每收到一段流式内容就 replaceLast
              replaceLast({ role: 'ai', content: aiText, loading: true });
            }
            // 4. 最后去掉 loading
            replaceLast({ role: 'ai', content: aiText });
          }}
        />
      */}
    </div>
  );
}

export default AIChatBox;
