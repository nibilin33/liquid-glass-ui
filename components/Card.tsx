'use client';
import { motion } from 'framer-motion';
import { Card as MtCard, CardBody } from '@material-tailwind/react';
import type { ReactNode } from 'react';

interface GlassCardProps {
  title: ReactNode;
  children: ReactNode;
  className?: string;
}

export function Card({ title, children, className = '' }: GlassCardProps) {
  return (
    <motion.div whileHover={{ y: -4, scale: 1.03 }} whileTap={{ scale: 0.97 }}>
      <MtCard
        className={`liquid-glass p-4 ${className}`}
        placeholder={undefined}
        onResize={undefined}
        onResizeCapture={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <CardBody
          placeholder={undefined}
          onResize={undefined}
          onResizeCapture={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <h3 className="text-white font-bold mb-2">{title}</h3>
          {children}
        </CardBody>
      </MtCard>
    </motion.div>
  );
}