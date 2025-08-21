import { motion } from 'framer-motion';

export interface FeedbackProps {
	correct: boolean;
	message?: string;
	correctText?: string;
	errorText?: string;
	fontFamily?: string;
}

import { useEffect, useState } from 'react';

export function Feedback({ correct, message, correctText, errorText, fontFamily }: FeedbackProps) {
	// motion typing effect
	const [displayText, setDisplayText] = useState('');
	const finalText = message || (correct ? (correctText || '恭喜，答对了！') : (errorText || '再试一次吧'));

	useEffect(() => {
		setDisplayText('');
		let i = 0;
		const timer = setInterval(() => {
			setDisplayText(finalText.slice(0, i + 1));
			i++;
			if (i >= finalText.length) clearInterval(timer);
		}, 28 + Math.random() * 40);
		return () => clearInterval(timer);
	}, [finalText]);

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.8, y: 20 }}
			animate={{ opacity: 1, scale: 1.04, y: 0 }}
			exit={{ opacity: 0, scale: 0.8, y: -20 }}
			transition={{ type: 'spring', stiffness: 400, damping: 24 }}
			className={`liquid-glass px-7 py-3 rounded-xl font-medium shadow-glass text-base flex items-center justify-center gap-3 select-none border-2 ${correct ? 'bg-gradient-to-br from-emerald-50 via-emerald-100 to-white/80 text-emerald-700 border-emerald-300' : 'bg-gradient-to-br from-red-50 via-red-100 to-white/80 text-red-500 border-red-300'}`}
			style={{ boxShadow: correct ? '0 4px 24px rgba(52,181,139,0.18)' : '0 4px 24px rgba(248,113,113,0.18)' }}
		>
			<motion.div
				initial={{ scale: 0.7, rotate: correct ? -20 : 20 }}
				animate={{ scale: 1.1, rotate: 0 }}
				transition={{ type: 'spring', stiffness: 500, damping: 30 }}
			>
				{correct ? (
					<svg width="28" height="28" viewBox="0 0 36 36" fill="none">
						<circle cx="18" cy="18" r="18" fill="#34d399" />
						<path d="M11 19l5 5 9-9" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
						<motion.circle
							initial={{ r: 0 }}
							animate={{ r: 18 }}
							transition={{ duration: 0.5, delay: 0.1 }}
							cx="18" cy="18" r="18" fill="#34d399" style={{ opacity: 0.18 }}
						/>
					</svg>
				) : (
					<svg width="28" height="28" viewBox="0 0 36 36" fill="none">
						<circle cx="18" cy="18" r="18" fill="#f87171" />
						<path d="M13 13l10 10M23 13l-10 10" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
						<motion.circle
							initial={{ r: 0 }}
							animate={{ r: 18 }}
							transition={{ duration: 0.5, delay: 0.1 }}
							cx="18" cy="18" r="18" fill="#f87171" style={{ opacity: 0.18 }}
						/>
					</svg>
				)}
			</motion.div>
			<span
				className="drop-shadow-lg tracking-wide"
				style={{ fontFamily: fontFamily || 'Fira Mono, Menlo, Monaco, Consolas, monospace', fontSize: '0.88em', letterSpacing: '0.04em' }}
			>
				{displayText}
			</span>
		</motion.div>
	);
}
