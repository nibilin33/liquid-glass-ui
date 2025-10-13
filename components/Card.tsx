'use client';
import { motion } from 'framer-motion';
import { Card as MtCard, CardBody } from '@material-tailwind/react';
import type { ReactNode } from 'react';

interface GlassCardProps {
  title?: ReactNode;
  children: ReactNode;
  className?: string;
  onClick?: () => void; // 新增
}

export function Card({ title, children, className = '', onClick }: GlassCardProps) {
  return (
    <motion.div whileHover={{ y: -4, scale: 1.03 }}>
      {/* @ts-ignore */}
      <MtCard
        className={`liquid-glass p-4`}
        onClick={onClick}
      >
         {/* @ts-ignore */}
        <CardBody
          className={className}
        >
         {title && <h3 className="text-white font-bold mb-2">{title}</h3>}
          {children}
        </CardBody>
      </MtCard>
    </motion.div>
  );
}