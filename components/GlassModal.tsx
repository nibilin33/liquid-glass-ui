'use client'
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export function GlassModal({ isOpen, onClose, children }: any) {
  const { isGlass } = useTheme();

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div
        className={`fixed inset-0 ${isGlass ? 'bg-white/20 backdrop-blur-xl' : 'bg-black/40'}`}
        onClick={onClose}
      />
      <motion.div
        className={`${isGlass ? 'liquid-glass p-6' : 'bg-white p-6 rounded-xl shadow-lg'}`}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
