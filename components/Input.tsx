'use client'
import { motion } from 'framer-motion';
import { useState, useRef } from 'react';

export function Input(props: any) {
  const { label, required, validate, className = '', type, ...rest } = props;
  const [focused, setFocused] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [fileName, setFileName] = useState('');
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

  // 文件选择处理
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFileName(files[0].name);
    } else {
      setFileName('');
    }
    props.onChange?.(e);
  };

  return (
    <div className={`${className}`}>
      {label && (
        <label className="block mb-2 text-sm font-semibold text-emerald-700 drop-shadow-sm select-none">
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}
      <motion.div
        animate={{ scale: focused ? 1.04 : 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="w-full inline-block"
      >
        {type === 'file' ? (
          <div className="flex items-center liquid-glass px-4 py-2 rounded-xl shadow-glass border border-transparent focus-within:border-emerald-400 bg-white/60 backdrop-blur w-full">
            <label
              className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg font-medium cursor-pointer shadow hover:bg-emerald-200 transition"
              htmlFor={rest.id || 'file-input'}
            >
              选择文件
            </label>
            <input
              {...rest}
              id={rest.id || 'file-input'}
              ref={inputRef}
              type="file"
              className="hidden"
              required={required}
              aria-required={required}
              aria-invalid={!!error}
              onFocus={e => { setFocused(true); props.onFocus?.(e); }}
              onBlur={async e => {
                setFocused(false);
                props.onBlur?.(e);
                await handleValidate(e.target.value);
              }}
              onChange={handleFileChange}
            />
            <span className="ml-4 text-gray-700 text-sm truncate flex-1 select-none">
              {fileName || '未选择任何文件'}
            </span>
          </div>
        ) : (
          <input
            {...rest}
            ref={inputRef}
            required={required}
            aria-required={required}
            aria-invalid={!!error}
            type={type}
            className={`liquid-glass px-4 py-2 rounded-xl text-gray-800 shadow-glass outline-none border transition-all ${error ? 'border-red-400 focus:border-red-500 focus:ring-red-400 focus:shadow-[0_0_12px_2px_rgba(239,68,68,0.5)]' : 'border-transparent focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400 focus:shadow-[0_0_12px_2px_rgba(52,181,139,0.5)]'} w-full`}
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
        )}
      </motion.div>
      {error && errorMessage && (
        <div className="mt-2 text-xs text-red-500 font-medium drop-shadow-sm">{errorMessage}</div>
      )}
    </div>
  );
}