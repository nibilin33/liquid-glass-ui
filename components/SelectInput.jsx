import React, { useState, useRef, useEffect } from 'react';

export const SelectInput = ({
  options = [],
  value = '',
  onChange,
  placeholder = '请选择或输入',
  className = '',
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [open, setOpen] = useState(false);
  const [filtered, setFiltered] = useState(options);
  const containerRef = useRef(null);

  useEffect(() => {
    let filteredOptions = options.filter(opt =>
      opt.toLowerCase().includes(inputValue.toLowerCase())
    );
    // 如果输入不为空且没有匹配项，则把输入作为一个选项
    if (
      inputValue &&
      !options.some(opt => opt.toLowerCase() === inputValue.toLowerCase())
    ) {
      filteredOptions = [inputValue, ...filteredOptions];
    }
    setFiltered(filteredOptions);
  }, [inputValue, options]);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // 点击外部关闭下拉
  useEffect(() => {
    const handleClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    setOpen(true);
    onChange?.(e.target.value);
  };

  const handleOptionClick = (opt) => {
    setInputValue(opt);
    setOpen(false);
    onChange?.(opt);
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-xs ${className}`}
    >
      <input
        className="w-full px-4 py-2 rounded-xl border border-emerald-200 bg-white/70 backdrop-blur shadow focus:outline-none focus:ring-2 focus:ring-emerald-200 transition text-emerald-700"
        value={inputValue}
        onChange={handleInputChange}
        onFocus={() => setOpen(true)}
        placeholder={placeholder}
        autoComplete="off"
      />
      {open && filtered.length > 0 && (
        <div className="absolute left-0 right-0 mt-1 bg-white/90 backdrop-blur border border-emerald-100 rounded-xl shadow-lg z-10 max-h-48 overflow-auto">
          {filtered.map((opt, idx) => (
            <div
              key={opt + idx}
              className="px-4 py-2 cursor-pointer hover:bg-emerald-50 text-emerald-700"
              onClick={() => handleOptionClick(opt)}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};