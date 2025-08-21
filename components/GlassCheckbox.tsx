'use client'
import { motion } from 'framer-motion';
import { Checkbox as MTCheckbox } from '@material-tailwind/react';
import React from 'react';

export interface GlassCheckboxProps {
    label?: React.ReactNode;
    checked?: boolean;
    onChange?: (checked: boolean) => void;
    className?: string;
    [key: string]: any;
}

export function GlassCheckbox({ label, checked, onChange, className = '', ...rest }: GlassCheckboxProps) {
    return (
        <motion.label
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className={`flex items-center cursor-pointer ${className}`}
            style={{ userSelect: 'none' }}
        >
            <MTCheckbox
                checked={checked}
                onChange={e => onChange?.(e.target.checked)}
                className="liquid-glass checked:bg-emerald-500 checked:border-emerald-500 focus:ring-emerald-500"
                {...(rest as any)} />
            {label && <span className="text-white text-base font-medium drop-shadow-sm">{label}</span>}
        </motion.label>
    );
}
