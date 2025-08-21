'use client'
import { motion } from 'framer-motion';
import { Button } from './Button';

export function Navbar() {
  return (
    <motion.header
      className="h-16 px-6 flex items-center justify-between liquid-glass"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-lg font-semibold text-white">Liquid Dashboard</h1>
      <Button>Log out</Button>
    </motion.header>
  );
}
