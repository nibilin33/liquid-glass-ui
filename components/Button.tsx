'use client'
import { motion } from 'framer-motion';
import { Button as MTButton } from '@material-tailwind/react';

export function Button(props: any) {
  return (
    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className='inline-block'>
      <MTButton {...props} className="liquid-glass">
        {props.children}
      </MTButton>
    </motion.div>
  );
}
