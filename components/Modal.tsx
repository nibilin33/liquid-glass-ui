'use client'
import { motion } from 'framer-motion';

export function Modal({ isOpen, onClose, children }: any) {

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div
        className={`fixed inset-0  bg-white/20 backdrop-blur-xl`}
        onClick={onClose}
      />
      <motion.div
        className={`liquid-glass p-6`}
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
