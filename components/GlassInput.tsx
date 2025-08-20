'use client'
import { motion } from 'framer-motion';
import { Input as MTInput } from '@material-tailwind/react';

export function GlassInput(props: any) {
  // 过滤掉 label 属性，或强制 label 隐藏
  const { label, ...rest } = props;
  return (
    <motion.div
      className="transition-all"
      whileFocus={{ scale: 1.02 }}
    >
      <MTInput
        {...rest}
        className="liquid-glass rounded-[7px]"
      />
    </motion.div>
  );
}
