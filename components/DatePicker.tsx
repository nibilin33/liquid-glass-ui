'use client'
import React, { useState, useRef, useLayoutEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface DatePickerProps {
  value?: string;
  onChange?: (date: string) => void;
  min?: string;
  max?: string;
  className?: string;
  placeholder?: string;
  label?: React.ReactNode; // 新增 label
  required?: boolean; // 新增 required
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

// 工具函数：将 Date 格式化为 YYYY-MM-DD 字符串
function formatDate(date: Date | null) {
  if (!date) return '';
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}
export function DatePicker({ value, onChange, min, max, className = "", label, required, placeholder="" }: DatePickerProps) {
  const today = new Date();
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState<Date | null>(value ? new Date(value) : null);
  const [view, setView] = useState(() => {
    const d = value ? new Date(value) : today;
    return { year: d.getFullYear(), month: d.getMonth() };
  });
  const inputRef = useRef<HTMLDivElement>(null);
 const popupRef = useRef<HTMLDivElement>(null);
  const [popupStyle, setPopupStyle] = useState<React.CSSProperties>({});
  // 计算弹窗位置
  const updatePopupPosition = useCallback(() => {
    if (show && inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      setPopupStyle({
        position: "fixed",
        left: rect.left,
        top: rect.bottom + 4,
        zIndex: 9999,
        width: rect.width > 320 ? rect.width : 320,
      });
    }
  }, [show]);
  useLayoutEffect(() => {
    updatePopupPosition();
    if (!show) return;
    // 滚动直接关闭弹窗
    const closeOnScrollOrResize = () => setShow(false);
    window.addEventListener("scroll", closeOnScrollOrResize, true);
    window.addEventListener("resize", updatePopupPosition);
    return () => {
      window.removeEventListener("scroll", closeOnScrollOrResize, true);
      window.removeEventListener("resize", updatePopupPosition);
    };
  }, [show, updatePopupPosition]);

  useLayoutEffect(() => {
    if (!show) return;
    const handler = (e: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(e.target as Node) &&
        popupRef.current &&
        !popupRef.current.contains(e.target as Node)
      ) {
        setShow(false);
      }
    };
    window.addEventListener("mousedown", handler);
    return () => window.removeEventListener("mousedown", handler);
  }, [show]);
  const handleSelect = (y: number, m: number, d: number) => {
    const date = new Date(y, m, d);
    setSelected(date);
    setShow(false);
    onChange?.(formatDate(date)); // 使用 formatDate
  };

  const days = getDaysInMonth(view.year, view.month);
  const firstDay = new Date(view.year, view.month, 1).getDay();
  const weeks: (number | null)[][] = [];
  let week: (number | null)[] = Array(firstDay).fill(null);
  for (let day = 1; day <= days; day++) {
    week.push(day);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length) weeks.push([...week, ...Array(7 - week.length).fill(null)]);

  return (
    <div ref={inputRef} className={`inline-block ${className}`}>
      {label && (
        <div className="mb-1 text-sm font-medium text-emerald-700 select-none">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </div>
      )}
      <input
        readOnly
        required={required}
        className="liquid-glass px-3 py-2 rounded-lg border w-40 cursor-pointer bg-white/60 backdrop-blur shadow-inner focus:outline-emerald-400"
        value={formatDate(selected)} // 使用 formatDate// 使用 formatDate
        placeholder={placeholder}
        onClick={() => setShow((v) => !v)}
      />
      {show &&
        createPortal(
          <div
            style={popupStyle}
            ref={popupRef}
            className="bg-white/70 backdrop-blur-xl border border-emerald-100 rounded-2xl shadow-2xl p-4 liquid-glass"
          >
            <div className="flex justify-between items-center mb-2">
              <button
                className="px-2 py-1 rounded hover:bg-emerald-50 transition"
                onClick={() =>
                  setView((v) =>
                    v.month === 0
                      ? { year: v.year - 1, month: 11 }
                      : { year: v.year, month: v.month - 1 }
                  )
                }
                aria-label="Previous month"
                type="button"
              >
                <FaChevronLeft />
              </button>
              <span className="font-semibold text-emerald-700 tracking-wide">
                {view.year} - {String(view.month + 1).padStart(2, "0")}
              </span>
              <button
                className="px-2 py-1 rounded hover:bg-emerald-50 transition"
                onClick={() =>
                  setView((v) =>
                    v.month === 11
                      ? { year: v.year + 1, month: 0 }
                      : { year: v.year, month: v.month + 1 }
                  )
                }
                aria-label="Next month"
                type="button"
              >
                  <FaChevronRight />
              </button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-emerald-700 mb-1">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                <div key={d}>{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {weeks.flat().map((d, i) => {
                const isSelected =
                  d &&
                  selected &&
                  selected.getFullYear() === view.year &&
                  selected.getMonth() === view.month &&
                  selected.getDate() === d;
                return (
                  <button
                    key={i}
                    className={`h-9 w-9 rounded-xl transition font-semibold
                      ${d ? "hover:bg-emerald-100/80" : ""}
                      ${isSelected ? "bg-emerald-400 text-white shadow-lg" : ""}
                      ${!d ? "opacity-0 cursor-default" : ""}
                    `}
                    disabled={!d}
                    onClick={() => {
                        console.log(d);
                        d && handleSelect(view.year, view.month, d);
                    }}
                    type="button"
                  >
                    {d || ""}
                  </button>
                );
              })}
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}

export default DatePicker;