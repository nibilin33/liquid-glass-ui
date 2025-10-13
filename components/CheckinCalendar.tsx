import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from './Button';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function getDaysInMonth(year: number, month: number) {
    return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number) {
    return new Date(year, month, 1).getDay();
}

export interface CheckinCalendarProps {
    records?: Record<string, number[]>; // { '2025-08': [1,2,3,5,...] }
    onMonthChange?: (year: number, month: number) => void;
    onDayClick?: (year: number, month: number, day: number) => void; 
}

export function CheckinCalendar({ records = {}, onMonthChange, onDayClick }: CheckinCalendarProps) {
    const today = new Date();
    const [viewYear, setViewYear] = useState(today.getFullYear());
    const [viewMonth, setViewMonth] = useState(today.getMonth());
    const daysInMonth = getDaysInMonth(viewYear, viewMonth);
    const firstDayOfWeek = getFirstDayOfWeek(viewYear, viewMonth);
    const key = `${viewYear}-${String(viewMonth + 1).padStart(2, '0')}`;
    const checkedDays = records[key] || [];

    const handlePrevMonth = () => {
        let year = viewYear;
        let month = viewMonth - 1;
        if (month < 0) {
            year--;
            month = 11;
        }
        setViewYear(year);
        setViewMonth(month);
        onMonthChange?.(year, month+1);
    };
    const handleNextMonth = () => {
        let year = viewYear;
        let month = viewMonth + 1;
        if (month > 11) {
            year++;
            month = 0;
        }
        setViewYear(year);
        setViewMonth(month);
        onMonthChange?.(year, month+1);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 320, damping: 22 }}
            className="liquid-glass rounded-3xl p-8 shadow-2xl bg-white/70 backdrop-blur-lg w-full max-w-xl mx-auto flex flex-col items-center gap-2 border border-emerald-100"
            style={{ minHeight: 480 }}
        >
            <div className="flex items-center justify-center w-full mb-3 gap-3">
                <Button color="gray" onClick={handlePrevMonth} className="w-12 h-12 rounded-2xl text-xl shadow-md bg-white/70 border border-emerald-100 flex items-center justify-center"><FaChevronLeft /></Button>
                <div className="flex flex-col items-center justify-center px-7 py-3 rounded-2xl bg-gradient-to-br from-white/80 via-emerald-50 to-white/60 shadow-lg border border-emerald-100">
                    <div className="text-2xl font-extrabold text-emerald-700 tracking-wide leading-tight drop-shadow-lg">{viewYear}</div>
                    <div className="text-lg font-bold text-emerald-600 tracking-wide leading-tight">{String(viewMonth + 1).padStart(2, '0')} / {viewYear}</div>
                </div>
                <Button color="gray" onClick={handleNextMonth} className="w-12 h-12 rounded-2xl text-xl shadow-md bg-white/70 border border-emerald-100 flex items-center justify-center"><FaChevronRight /></Button>
            </div>
            <div className="w-full grid grid-cols-7 gap-2 sm:gap-3 md:gap-4 mb-3 text-center">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((w, i) => (
                    <div key={i} className="w-10 text-base sm:text-sm md:text-sm text-emerald-500 font-bold tracking-wide drop-shadow-sm flex items-center justify-center" style={{ letterSpacing: 2 }}>{w}</div>
                ))}
            </div>
            <div className="w-full grid grid-cols-7 gap-2 sm:gap-3 md:gap-4 text-center">
                {Array(firstDayOfWeek).fill(null).map((_, i) => (
                    <div key={'empty-' + i} />
                ))}
                {[...Array(daysInMonth)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ scale: 0.9, opacity: 0.7 }}
                        animate={{ scale: checkedDays.includes(i + 1) ? 1.08 : 1, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 320, damping: 18 }}
                        className={`w-10 h-10 sm:w-6 sm:h-6 md:w-8 md:h-8 rounded-xl flex items-center justify-center font-bold text-base sm:text-sm md:text-sm shadow-lg bg-gradient-to-br from-white/90 via-emerald-100 to-white/70 border-2 cursor-pointer select-none transition-all duration-200
              ${checkedDays.includes(i + 1)
                                ? 'border-emerald-400 text-emerald-700 bg-emerald-100 drop-shadow-emerald'
                                : 'border-gray-200 text-gray-400 hover:border-emerald-300 hover:text-emerald-600'}
            `}
                        title={checkedDays.includes(i + 1) ? 'Checked in' : 'Not checked in'}
                        style={{ margin: '1px' }}
                        onClick={() => onDayClick?.(viewYear, viewMonth + 1, i + 1)} 
                    >
                        {i + 1}
                    </motion.div>
                ))}
            </div>
            <div className="mt-6 text-lg text-emerald-700 font-semibold text-center bg-white/60 px-4 py-2 rounded-xl shadow border border-emerald-100">
                <span className="font-extrabold text-emerald-600 text-xl">{checkedDays.length}</span> days
            </div>
        </motion.div>
    );
}
