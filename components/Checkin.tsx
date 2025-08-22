import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './Button';

export interface CheckinProps {
  totalDays?: number; // 总周期天数
  onCheckin?: (day: number) => void;
}

export function Checkin({ totalDays = 21, onCheckin }: CheckinProps) {
  const [checkedDays, setCheckedDays] = useState<number[]>([]);
  const today = checkedDays.length + 1;
  const isTodayChecked = checkedDays.includes(today);
  const handleCheckin = () => {
    if (!isTodayChecked && today <= totalDays) {
      setCheckedDays([...checkedDays, today]);
      onCheckin?.(today);
    }
  };
  return (
    <div className="liquid-glass rounded-2xl p-6 shadow-glass bg-white/60 backdrop-blur w-full max-w-md mx-auto flex flex-col items-center gap-6">
  <div className="text-lg font-bold text-emerald-700 mb-2">{totalDays}-Day Challenge</div>
      <div className="flex gap-2 flex-wrap justify-center mb-4">
        {[...Array(totalDays)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0.8, opacity: 0.7 }}
            animate={{ scale: checkedDays.includes(i + 1) ? 1.1 : 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow bg-gradient-to-br from-white/80 via-emerald-50 to-white/60 border-2 ${checkedDays.includes(i + 1) ? 'border-emerald-400 text-emerald-700 bg-emerald-50' : 'border-gray-200 text-gray-400'}`}
          >
            {i + 1}
          </motion.div>
        ))}
      </div>
      <div className="text-base text-gray-700 mb-2">Checked in <span className="font-bold text-emerald-600">{checkedDays.length}</span> days, consecutive <span className="font-bold text-emerald-600">{checkedDays.length}</span> days</div>
      <Button
        color={isTodayChecked ? 'gray' : 'emerald'}
        onClick={handleCheckin}
        disabled={isTodayChecked || today > totalDays}
        className="w-32 h-12 text-lg font-bold rounded-xl shadow-lg"
      >
        {isTodayChecked ? 'Checked in today' : 'Check in now'}
      </Button>
    </div>
  );
}
