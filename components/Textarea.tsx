import React, { useState } from 'react';
import { motion } from 'framer-motion';

export interface TextareaProps {
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  className?: string;
  style?: React.CSSProperties;
  rows?: number;
  maxLength?: number;
}

export function Textarea({ label, value, onChange, placeholder, required, error, className = '', style = {}, rows = 4, maxLength }: TextareaProps) {
  const [focused, setFocused] = useState(false);
  const length = value?.length || 0;
  return (
    <div className={`w-full flex flex-col gap-2 ${className}`} style={style}>
      {label && (
        <label className="text-sm font-medium text-emerald-700 mb-1 select-none">
          {label} {required && <span className="text-red-400">*</span>}
        </label>
      )}
      <motion.textarea
        className={`liquid-glass rounded-xl px-4 py-3 shadow-glass bg-white/60 backdrop-blur border-2 outline-none transition-all duration-200 resize-none text-base text-emerald-700 placeholder:text-gray-400 placeholder:text-sm focus:placeholder:text-emerald-300 ${
          focused ? 'border-emerald-400 ring-2 ring-emerald-200' : 'border-gray-200'
        } ${error ? 'border-red-400' : ''}`}
        style={{ fontFamily: 'inherit', minHeight: 80 }}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
        maxLength={maxLength}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        animate={{ scale: focused ? 1.03 : 1, boxShadow: focused ? '0 0 0 4px #34d39933' : '0 2px 12px #34d39911' }}
        transition={{ type: 'spring', stiffness: 320, damping: 22 }}
      />
      {typeof maxLength === 'number' && (
        <div className="text-xs text-gray-400 text-right select-none">
          Left {Math.max(0, (maxLength ?? 0) - length)} characters
        </div>
      )}
      {error && <div className="text-xs text-red-400 mt-1">{error}</div>}
    </div>
    );
}
