import React from 'react';
import { motion } from 'framer-motion';
import { Card } from './Card';
import { Button } from './Button';

export interface FeatureItem {
  text: string;
  supported?: boolean;
}

export interface PriceSet {
  name: string;
  price: string;
  features: FeatureItem[];
  highlight?: boolean;
  buttonText?: string;
  onClick?: () => void;
}

interface PriceSetsProps {
  sets: PriceSet[];
  className?: string;
}

export function PriceSets({ sets, className = '' }: PriceSetsProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 py-8 ${className}`}>
      {sets.map((set, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          whileHover={set.highlight ? { scale: 1.04, boxShadow: '0 0 32px 8px #34d39955' } : { scale: 1.02 }}
          transition={{ duration: 0.5, delay: idx * 0.15, type: 'spring', stiffness: 320, damping: 22 }}
        >
          <Card
            title={set.name}
            className={`flex flex-col items-center justify-between p-8 rounded-3xl border backdrop-blur-lg shadow-xl transition-all
              ${set.highlight
                ? 'border-emerald-400 bg-gradient-to-br from-emerald-300/80 via-white/70 to-emerald-100/80 shadow-emerald-300/40'
                : 'border-gray-200 bg-gradient-to-br from-white/60 via-emerald-100/40 to-white/80'}
            `}
          >
            <div className={`text-4xl font-extrabold mb-2 drop-shadow-lg ${set.highlight ? 'text-emerald-700' : 'text-emerald-500'}`}>{set.price}</div>
            <ul className="mb-6 text-base text-left w-full space-y-2">
              {set.features.map((f, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.08, type: 'spring', stiffness: 320, damping: 22 }}
                  className={`flex items-center gap-2 px-2 py-1 rounded-lg transition-all
                    ${set.highlight
                      ? f.supported !== false
                        ? 'bg-gradient-to-r from-emerald-200/60 via-white/80 to-emerald-100/60 text-emerald-700 font-semibold shadow-emerald-200/30'
                        : 'bg-gradient-to-r from-gray-100/60 via-white/80 to-gray-200/60 text-gray-400 line-through opacity-70'
                      : f.supported !== false
                        ? 'bg-white/60 text-emerald-500'
                        : 'bg-white/40 text-gray-400 line-through opacity-70'}
                    hover:scale-105 hover:shadow-lg hover:bg-emerald-100/80`
                  }
                >
                  <span className="inline-block w-5 h-5 mr-1">
                    {f.supported !== false ? (
                      <svg viewBox="0 0 20 20" fill="currentColor" className={`drop-shadow ${set.highlight ? 'text-emerald-400 animate-pulse' : 'text-emerald-300'}`}><circle cx="10" cy="10" r="8" opacity="0.18"/><path d="M7.5 10.5l2 2.5 3-4.5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/></svg>
                    ) : (
                      <svg viewBox="0 0 20 20" fill="currentColor" className="text-gray-400"><circle cx="10" cy="10" r="8" opacity="0.18"/><path d="M7 7l6 6M13 7l-6 6" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/></svg>
                    )}
                  </span>
                  <span className={f.supported !== false
                    ? 'bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-700'
                    : 'text-gray-400 line-through'}>
                    {f.text}
                  </span>
                </motion.li>
              ))}
            </ul>
            <div className="w-full flex justify-center mt-auto">
              <Button
                color={set.highlight ? 'emerald' : 'gray'}
                className={`font-bold py-3 text-lg rounded-xl transition-all ${set.highlight ? 'bg-emerald-400/90 hover:bg-emerald-500/90 shadow-emerald-300/40' : 'bg-white/80 hover:bg-emerald-100/80'}`}
                onClick={set.onClick}
              >
                {set.buttonText || 'Choose'}
              </Button>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
