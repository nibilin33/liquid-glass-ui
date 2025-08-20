'use client'
import { motion } from 'framer-motion';

export function GlassSidebar() {
  return (
    <motion.aside
      className="w-64 p-6 liquid-glass hidden md:flex flex-col"
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-bold text-white mb-6">Liquid UI</h2>
      <nav className="flex flex-col gap-3">
        {['Dashboard', 'Components', 'Settings'].map(item => (
          <motion.a
            key={item}
            className="liquid-glass px-4 py-2 rounded-xl text-white"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {item}
          </motion.a>
        ))}
      </nav>
    </motion.aside>
  );
}
