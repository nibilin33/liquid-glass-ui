// Glassmorphism Glowing Icons
const gradientMapping: Record<string, string> = {
	emerald: "linear-gradient(90deg, #34B58B, #1A7F64)",
	blue: "linear-gradient(90deg, #3b82f6, #1e40af)",
	purple: "linear-gradient(90deg, #a78bfa, #7c3aed)",
	red: "linear-gradient(90deg, #ef4444, #b91c1c)",
	indigo: "linear-gradient(90deg, #6366f1, #312e81)",
	orange: "linear-gradient(90deg, #f59e42, #ea580c)",
	green: "linear-gradient(90deg, #34B58B, #1A7F64)",
};

export interface IconItem {
	label: string;
	icon: React.ReactNode;
	color?: string;
	customClass?: string;
}

interface IconContainerProps {
	items: IconItem[];
	className?: string;
}

export function IconContainer({ items, className }: IconContainerProps) {
			const getBackgroundStyle = (color?: string): { background: string } => {
				if (color && gradientMapping[color]) {
					return { background: gradientMapping[color] };
				}
				if (color) {
					return { background: color };
				}
				return { background: gradientMapping['green'] };
			};

	return (
		<div
			className={`grid gap-[5em] grid-cols-2 md:grid-cols-3 mx-auto py-[3em] overflow-visible ${className || ""}`}
		>
			{items.map((item, index) => (
				<button
					key={index}
					type="button"
					aria-label={item.label}
					className={`relative bg-transparent outline-none w-[4.5em] h-[4.5em] [perspective:24em] [transform-style:preserve-3d] [-webkit-tap-highlight-color:transparent] group ${item.customClass || ""}`}
				>
					{/* 发光渐变层 */}
					<span
						className="absolute top-0 left-0 w-full h-full rounded-[1.25em] block transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] origin-[100%_100%] rotate-[15deg] group-hover:[transform:rotate(25deg)_translate3d(-0.5em,-0.5em,0.5em)]"
						style={{
							...getBackgroundStyle(item.color),
							boxShadow: `0 0 1.5em 0.5em ${item.color ? item.color : 'rgba(52,181,139,0.25)'}, 0.5em -0.5em 0.75em hsla(223, 10%, 10%, 0.15)`,
							filter: 'blur(2px)',
							opacity: 0.85,
						}}
					></span>

					{/* 图标玻璃层 */}
					<span
						className="absolute top-0 left-0 w-full h-full rounded-[1.25em] bg-[hsla(0,0%,100%,0.15)] transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] origin-[80%_50%] flex backdrop-blur-[0.75em] [-webkit-backdrop-filter:blur(0.75em)] transform group-hover:[transform:translateZ(2em)]"
						style={{
							boxShadow: "0 0 0 0.1em hsla(0, 0%, 100%, 0.3) inset",
						}}
					>
						<span className="m-auto w-[1.5em] h-[1.5em] flex items-center justify-center" aria-hidden="true">
							{item.icon}
						</span>
					</span>

					{/* 发光边缘效果 */}
					<span
						className="absolute top-0 left-0 w-full h-full rounded-[1.25em] pointer-events-none"
						style={{
							boxShadow: `0 0 2em 0.5em ${item.color ? item.color : 'rgba(52,181,139,0.25)'}`,
							opacity: 0.5,
							filter: 'blur(6px)',
						}}
					></span>

					{/* 标签 */}
					<span className="absolute top-full left-0 right-0 text-center whitespace-nowrap leading-[2] text-base opacity-0 transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.83,0,0.17,1)] translate-y-0 group-hover:opacity-100 group-hover:[transform:translateY(20%)]">
						{item.label}
					</span>
				</button>
			))}
		</div>
	);
};