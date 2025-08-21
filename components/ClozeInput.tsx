import { useState } from 'react';
import { motion } from 'framer-motion';
import { Feedback } from './Feedback';
import { Button } from './Button';

export interface ClozeInputProps {
    text: string; // 题干，使用 {n} 占位
    answers: string[]; // 正确答案数组（每个空填一个词或短语）
    letterMode?: boolean; // 是否每个字母一个输入框
    prefill?: (string | null)[][]; // letterMode 下预填答案，二维数组，填好则不可修改
    onSubmit?: (userAnswers: string[], correct: boolean) => void;
}

// 题干格式示例："We {0} to {1} our {2} out, but we were completely {3}."
export function ClozeInput({ text, answers, letterMode = false, prefill, onSubmit }: ClozeInputProps) {
    const [submitted, setSubmitted] = useState(false);
    const [correct, setCorrect] = useState(false);

    // 处理输入变化
    const [inputs, setInputs] = useState(() => {
        if (!letterMode) return Array(answers.length).fill('');
        // letterMode: 每个空拆分为字母，支持预填
        return answers.map((ans, i) => {
            if (prefill && prefill[i]) {
                return ans.split('').map((_, j) => prefill[i][j] ?? '');
            }
            return Array(ans.length).fill('');
        });
    });

    const handleChange = (blankIdx: number, letterIdx: number, val: string) => {
        if (!letterMode) {
            const next = [...inputs];
            next[blankIdx] = val;
            setInputs(next);
        } else {
            // prefill 不可修改
            if (prefill && prefill[blankIdx] && prefill[blankIdx][letterIdx] != null) return;
            const next = inputs.map(arr => [...arr]);
            next[blankIdx][letterIdx] = val;
            setInputs(next);
        }
    };

    // 处理提交
    const handleSubmit = () => {
        let isCorrect = false;
        if (!letterMode) {
            isCorrect = inputs.every((v, i) => v.trim().toLowerCase() === answers[i].trim().toLowerCase());
        } else {
            isCorrect = inputs.every((arr, i) => arr.join('').trim().toLowerCase() === answers[i].trim().toLowerCase());
        }
        setSubmitted(true);
        setCorrect(isCorrect);
        if (!letterMode) {
            onSubmit?.(inputs as string[], isCorrect);
        } else {
            onSubmit?.(inputs.map(arr => arr.join('')), isCorrect);
        }
    };

    // 渲染题干，{n} 替换为输入框
    const parts = text.split(/\{(\d+)\}/g);
    let inputIdx = 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="liquid-glass rounded-2xl p-6 shadow-glass bg-white/60 backdrop-blur w-full max-w-2xl mx-auto"
        >
            <div className="mb-4 text-lg font-semibold text-gray-800 text-center">Type the missing letters to complete the text below.</div>
            <div className="mb-6 text-base text-gray-700 leading-relaxed text-center space-y-3">
                {parts.map((part, i) => {
                    if (i % 2 === 0) return <span key={i}>{part}</span>;
                    // 输入框
                    const idx = Number(part);
                    if (!letterMode) {
                        return (
                            <motion.input
                                key={i}
                                type="text"
                                value={inputs[inputIdx++] as string}
                                onChange={e => handleChange(idx, 0, e.target.value)}
                                disabled={submitted}
                                className={`mx-1 px-3 py-1.5 text-center rounded-xl border-2 outline-none transition-all shadow-glass bg-gradient-to-br from-white/80 via-emerald-50 to-white/60 backdrop-blur font-semibold text-base focus:border-emerald-400 focus:ring-2 focus:ring-emerald-300 hover:shadow-[0_0_8px_2px_rgba(52,181,139,0.12)] ${submitted ? ((inputs[idx] as string).trim().toLowerCase() === answers[idx].trim().toLowerCase() ? 'border-emerald-400 text-emerald-700 bg-emerald-50' : 'border-red-400 text-red-500 bg-red-50') : 'border-gray-200 text-gray-700'}`}
                                style={{ minWidth: '2.5em', height: '2.4em', width: `${Math.max(2.5, (inputs[idx] as string)?.length || 2.5)}em`, boxShadow: '0 2px 12px rgba(52,181,139,0.08)' }}
                                animate={{ scale: submitted ? 1.08 : 1 }}
                            />
                        );
                    } else {
                        // letterMode: 每个字母一个输入框，支持预填
                        return (
                            <span key={i} className="inline-flex gap-1 align-middle">
                                {(answers[idx] as string).split('').map((_, letterIdx) => {
                                    const isPrefilled = prefill && prefill[idx] && prefill[idx][letterIdx] != null;
                                    return (
                                        <motion.input
                                            key={letterIdx}
                                            type="text"
                                            maxLength={1}
                                            value={inputs[idx][letterIdx] as string}
                                            onChange={e => handleChange(idx, letterIdx, e.target.value)}
                                            disabled={submitted || isPrefilled}
                                            className={`w-8 h-10 text-center px-0 py-0 rounded-lg border-2 outline-none transition-all shadow-glass bg-gradient-to-br from-white/80 via-emerald-50 to-white/60 backdrop-blur font-semibold text-lg focus:border-emerald-400 focus:ring-2 focus:ring-emerald-300 hover:shadow-[0_0_8px_2px_rgba(52,181,139,0.12)] ${isPrefilled ? 'bg-emerald-50 border-emerald-300 text-emerald-700 opacity-80' : (submitted ? (inputs[idx][letterIdx].trim().toLowerCase() === answers[idx][letterIdx].toLowerCase() ? 'border-emerald-400 text-emerald-700 bg-emerald-50' : 'border-red-400 text-red-500 bg-red-50') : 'border-gray-200 text-gray-700')}`}
                                            style={{ boxShadow: '0 2px 12px rgba(52,181,139,0.08)' }}
                                            animate={{ scale: submitted ? 1.08 : 1 }}
                                        />
                                    );
                                })}
                            </span>
                        );
                    }
                })}
            </div>
            <div className="flex flex-col items-center justify-center gap-4 min-h-[96px]">
                <Button
                    onClick={handleSubmit}
                    color="emerald"
                >Submit</Button>
                {submitted && (
                    <Feedback correct={correct} />
                )}
            </div>
        </motion.div>
    );
}
