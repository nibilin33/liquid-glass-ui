'use client'
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useRef } from 'react';

export function Input(props: any) {
  const { label, required, validate, className = '', ...rest } = props;
  const [focused, setFocused] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // 校验方法，支持异步
  const handleValidate = async (value: string) => {
    if (typeof validate === 'function') {
      const result = await validate(value);
      if (result) {
        setError(true);
        setErrorMessage(result);
      } else {
        setError(false);
        setErrorMessage('');
      }
    } else {
      setError(false);
      setErrorMessage('');
    }
  };

  return (
    <div className="w-full">
      {label && (
        <label className="block mb-2 text-sm font-semibold text-emerald-700 drop-shadow-sm select-none">
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}
      <motion.div
        animate={{ scale: focused ? 1.04 : 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="w-full"
      >
        <input
          {...rest}
          ref={inputRef}
          required={required}
          aria-required={required}
          aria-invalid={!!error}
          className={`liquid-glass px-4 py-2 rounded-xl text-gray-800 shadow-glass outline-none border transition-all ${error ? 'border-red-400 focus:border-red-500 focus:ring-red-400 focus:shadow-[0_0_12px_2px_rgba(239,68,68,0.5)]' : 'border-transparent focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400 focus:shadow-[0_0_12px_2px_rgba(52,181,139,0.5)]'} ${className}`}
          onFocus={e => { setFocused(true); props.onFocus?.(e); }}
          onBlur={async e => {
            setFocused(false);
            props.onBlur?.(e);
            await handleValidate(e.target.value);
          }}
          onChange={async e => {
            props.onChange?.(e);
          }}
        />
      </motion.div>
      {error && errorMessage && (
        <div className="mt-2 text-xs text-red-500 font-medium drop-shadow-sm">{errorMessage}</div>
      )}
    </div>
  );
}
