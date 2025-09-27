import React, { useState, KeyboardEvent, ChangeEvent } from 'react';
import { FiX } from 'react-icons/fi';

export interface TagInputProps {
  value?: string[];
  onChange?: (tags: string[]) => void;
  placeholder?: string;
  maxTags?: number;
}

export const TagInput: React.FC<TagInputProps> = ({
  value = [],
  onChange,
  placeholder = '输入标签并回车',
  maxTags = 10,
}) => {
  const [input, setInput] = useState('');

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' || e.key === ',') && input.trim()) {
      e.preventDefault();
      if (value.length < maxTags && !value.includes(input.trim())) {
        const newTags = [...value, input.trim()];
        onChange?.(newTags);
      }
      setInput('');
    } else if (e.key === 'Backspace' && !input && value.length) {
      const newTags = value.slice(0, -1);
      onChange?.(newTags);
    }
  };

  const handleRemove = (idx: number) => {
    const newTags = value.filter((_, i) => i !== idx);
    onChange?.(newTags);
  };

  return (
    <div className="flex flex-nowrap items-center gap-2 px-4 py-2 rounded-2xl shadow-lg bg-white/60 backdrop-blur border border-emerald-100 focus-within:ring-2 focus-within:ring-emerald-200 transition-all overflow-x-auto">
      {value.map((tag, idx) => (
        <span
          key={tag}
          className="flex items-center bg-emerald-50/80 text-emerald-700 rounded-full px-2 py-0.5 text-xs shadow-sm mr-1 border border-emerald-100 whitespace-nowrap max-w-[180px] overflow-hidden text-ellipsis"
          style={{ minWidth: 0 }}
        >
          <span className="overflow-hidden text-ellipsis whitespace-nowrap max-w-[140px] block">{tag}</span>
          <button
            type="button"
            className="ml-1 p-1 rounded-full hover:bg-emerald-200/80 hover:text-emerald-900 transition-colors focus:outline-none flex-shrink-0"
            onClick={() => handleRemove(idx)}
            aria-label="删除标签"
            tabIndex={0}
          >
            <FiX size={14} />
          </button>
        </span>
      ))}
      {value.length < maxTags && (
        <input
          className="flex-1 min-w-[60px] border-none outline-none bg-transparent py-0.5 text-emerald-700 placeholder-emerald-300 focus:ring-0 text-xs whitespace-nowrap"
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          placeholder={placeholder}
          style={{ minWidth: 0, maxWidth: 120 }}
        />
      )}
    </div>
  );
};