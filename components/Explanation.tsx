import React, { useState } from 'react';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';

export interface ExplanationProps {
	answer: string;
	explanation: string;
	defaultOpen?: boolean;
    title?: string;
}

export const Explanation: React.FC<ExplanationProps> = ({ answer, explanation, defaultOpen = false, title = '查看答案与解析' }) => {
	const [open, setOpen] = useState(defaultOpen);
	return (
		<div className="liquid-glass rounded-xl shadow-glass bg-white/60 backdrop-blur p-0 w-full max-w-2xl mx-auto">
			<button
				className={`w-full flex items-center justify-between px-5 py-3 text-base font-semibold text-emerald-700 focus:outline-none transition-all duration-200 ${open ? 'border-b border-emerald-100' : ''}`}
				onClick={() => setOpen(v => !v)}
				aria-expanded={open}
			>
				<span>{title}</span>
				<motion.span animate={{ rotate: open ? 90 : 0 }} transition={{ type: 'spring', stiffness: 320, damping: 22 }}>
					<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 7L9 10L12 7" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
				</motion.span>
			</button>
			<motion.div
				initial={false}
				animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
				transition={{ type: 'spring', stiffness: 320, damping: 30 }}
				style={{ overflow: 'hidden' }}
			>
				{open && (
					<div className="px-5 pb-5 pt-2 text-gray-700 text-base">
						<div className="mb-2 font-bold text-emerald-600">答案：{answer}</div>
                        <div className="explanation-markdown">
                            <ReactMarkdown >{explanation}</ReactMarkdown>
                        </div>
					</div>
				)}
			</motion.div>
		</div>
	);
};
