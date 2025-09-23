import { useRef, useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface LogoLoopProps {
	images: string[];
	speed?: number; // px/s
	height?: number | string;
	className?: string;
}

export function LogoLoop({ images, speed = 60, height = 64, className = '' }: LogoLoopProps) {
	const [isHover, setIsHover] = useState(false);
	const controls = useAnimation();
	const containerRef = useRef<HTMLDivElement>(null);
	const [width, setWidth] = useState(0);

	useEffect(() => {
		if (containerRef.current) {
			setWidth(containerRef.current.scrollWidth);
		}
	}, [images]);

	useEffect(() => {
		if (!isHover && width) {
			controls.start({
				x: [0, -width],
				transition: {
					x: {
						repeat: Infinity,
						repeatType: 'loop',
						duration: width / speed,
						ease: 'linear',
					},
				},
			});
		} else {
			controls.stop();
		}
	}, [isHover, width, speed, controls]);

	return (
		<div
			className={`relative overflow-hidden rounded-2xl shadow-glass bg-white/40 backdrop-blur border border-emerald-100 ${className}`}
			style={{ height }}
			onMouseEnter={() => setIsHover(true)}
			onMouseLeave={() => setIsHover(false)}
		>
			<motion.div
				ref={containerRef}
				className="flex items-center gap-8 px-8"
				animate={controls}
				style={{ height }}
			>
				{images.concat(images).map((src, i) => (
					<div key={i} className="flex items-center justify-center">
						<img
							src={src}
							alt="logo"
							className="w-auto h-full object-contain drop-shadow-lg rounded-xl bg-white/60"
							style={{ maxHeight: height }}
						/>
					</div>
				))}
			</motion.div>
			{/* 玻璃发光遮罩 */}
			<div className="absolute inset-0 pointer-events-none rounded-2xl" style={{ boxShadow: '0 8px 32px rgba(52,181,139,0.12)' }} />
		</div>
	);
}
