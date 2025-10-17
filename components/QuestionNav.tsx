import { useState, useEffect, useCallback } from 'react';
import { Button } from './Button';
import { FaChevronLeft, FaChevronRight, FaSpinner } from 'react-icons/fa';
import {
    TypeWriter
} from './TypeWriter';
import { Timer } from './Timer';

export interface QuestionNavProps {
    current: number;
    total: number;
    title: string;
    onPrev?: () => Promise<boolean> | boolean; // 支持异步返回
    onNext?: () => Promise<boolean> | boolean; // 支持异步返回
    prevDisabled?: boolean;
    nextDisabled?: boolean;
    countdown?: number;
}

export function QuestionNav({ current, total, title, onPrev, onNext, prevDisabled, nextDisabled, countdown }: QuestionNavProps) {
    const [currentIndex, setCurrentIndex] = useState(current);
    const [timeLeft, setTimeLeft] = useState<number | undefined>(undefined);
    // 新增 loading 状态
    const [loadingPrev, setLoadingPrev] = useState(false);
    const [loadingNext, setLoadingNext] = useState(false);
    useEffect(() => {
        setCurrentIndex(current);
    }, [current]);
    useEffect(() => {
        if (typeof countdown === 'number') {
            setTimeLeft(countdown);
        } else {
            setTimeLeft(undefined);
        }
    }, [countdown, currentIndex, title]);

    // 异步切换逻辑，支持 sync/async 返回 boolean
    const handlePrev = async () => {
        if (prevDisabled || currentIndex <= 1 || loadingPrev) return;
        if (onPrev) {
            try {
                setLoadingPrev(true);
                const res = await Promise.resolve(onPrev());
                if (res === true) setCurrentIndex(idx => Math.max(1, idx - 1));
            } finally {
                setLoadingPrev(false);
            }
        } else {
            setCurrentIndex(idx => Math.max(1, idx - 1));
        }
    };
    const handleNext = async () => {
        if (nextDisabled || currentIndex >= total || loadingNext) return;
        if (onNext) {
            try {
                setLoadingNext(true);
                const res = await Promise.resolve(onNext());
                if (res === true) setCurrentIndex(idx => Math.min(total, idx + 1));
            } finally {
                setLoadingNext(false);
            }
        } else {
            setCurrentIndex(idx => Math.min(total, idx + 1));
        }
    };
    const handleCountdownEnd = useCallback(() => {
        handleNext();
    }, [nextDisabled, currentIndex, total, onNext]);
    return (
        <div className="liquid-glass rounded-2xl px-6 py-4 shadow-lg bg-white/70 backdrop-blur flex items-center justify-between gap-4 border border-emerald-100 w-full max-w-xl mx-auto">
          <Button
                color="gray"
                onClick={handlePrev}
                disabled={prevDisabled || currentIndex <= 1 || loadingPrev}
                className="w-10 h-10 rounded-full text-lg shadow flex items-center justify-center"
            >
                {loadingPrev ? <FaSpinner className="animate-spin" /> : <FaChevronLeft />}
            </Button>
            <div className="flex-1 flex flex-col items-center justify-center">
                <div className="text-xs text-emerald-500 font-bold mb-1">第 {currentIndex} / {total} 题</div>
                <TypeWriter
                    text={title}
                    className="text-lg font-bold text-emerald-700 tracking-wide"
                />
                {typeof timeLeft === 'number' && timeLeft > 0 && (
                    <div className="mt-1 text-xs font-bold text-emerald-500 bg-white/60 px-3 py-1 rounded-full shadow border border-emerald-100 flex items-center gap-2">
                        <Timer value={timeLeft} onEnd={handleCountdownEnd} className="text-emerald-600 text-base font-extrabold" />
                    </div>
                )}
            </div>
            <Button
                color="gray"
                onClick={handleNext}
                disabled={nextDisabled || currentIndex >= total || loadingNext}
                className="w-10 h-10 rounded-full text-lg shadow flex items-center justify-center"
            >
                {loadingNext ? <FaSpinner className="animate-spin" /> : <FaChevronRight />}
            </Button>
        </div>
    );
}
