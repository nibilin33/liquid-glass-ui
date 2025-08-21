import React from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';

export interface ProgressBarProps {
	value: number;
	max?: number;
	showNumber?: boolean;
	className?: string;
	color?: string;
	style?: React.CSSProperties;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
	value,
	max = 100,
	showNumber = true,
	className = '',
	color = 'emerald',
	style
}) => {
	const percent = Math.max(0, Math.min(100, (value / max) * 100));
	const numberMotion = useMotionValue(0);
	React.useEffect(() => {
		animate(numberMotion, value, { duration: 0.8, ease: 'easeOut' });
	}, [value, numberMotion]);

	return (
		<div className={`w-full liquid-glass rounded-xl shadow-glass px-2 py-2 ${className}`} style={style}>
			<div className="flex items-center justify-between mb-1">
				{showNumber && (
					<motion.span
						style={{ fontVariantNumeric: 'tabular-nums' }}
						className="text-emerald-700 font-bold text-base drop-shadow"
					>
						{numberMotion.get().toFixed(0)} / {max}
					</motion.span>
				)}
			</div>
			<div className="w-full h-4 bg-emerald-100 rounded-xl overflow-hidden relative">
				<motion.div
					className={`h-full rounded-xl bg-emerald-500`}
					initial={{ width: 0 }}
					animate={{ width: `${percent}%` }}
					transition={{ duration: 0.8, ease: 'easeOut' }}
				/>
			</div>
		</div>
	);
};
