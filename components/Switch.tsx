'use client'
import React from "react";

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
  label?: React.ReactNode;
}

export function Switch({ checked, onChange, disabled = false, className = "", label }: SwitchProps) {
  return (
    <label className={`flex items-center gap-2 cursor-pointer select-none ${disabled ? "opacity-60 cursor-not-allowed" : ""} ${className}`}>
      <span className="relative inline-block w-11 h-6">
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={e => onChange(e.target.checked)}
          className="opacity-0 w-0 h-0 peer"
        />
        <span
          className={`
            absolute left-0 top-0 w-11 h-6 rounded-full transition
            ${checked ? "bg-emerald-500/90 shadow-emerald-200 shadow-md" : "bg-gray-300/80 shadow-inner"}
            peer-focus:ring-2 peer-focus:ring-emerald-300
            liquid-glass
            border border-gray-300
          `}
        />
        <span
          className={`
            absolute top-0.5 left-0.5 w-5 h-5 rounded-full shadow-md transition
            ${checked ? "translate-x-5 bg-emerald-400 border-emerald-500" : "bg-white border-gray-300"}
            border
          `}
          style={{ transition: "transform 0.2s cubic-bezier(.4,2,.6,1), background 0.2s" }}
        />
      </span>
      {label && <span className={`text-sm ${checked ? "text-emerald-700 font-semibold" : "text-gray-500"}`}>{label}</span>}
    </label>
  );
}

export default Switch;