'use client'
import { motion } from 'framer-motion';
import { Input as MTInput } from '@material-tailwind/react';

export function GlassInput(props: any) {
  return (
    <motion.div whileFocus={{ scale: 1.02 }}>
      <MTInput {...props} className="liquid-glass text-white" />
    </motion.div>
  );
}
