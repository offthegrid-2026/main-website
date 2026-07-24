"use client";

interface ButtonProps {
	title: string;
	textColor?: string;
	fromColor?: string;
	toColor?: string;
	onClick?: () => void;
	className?: string;
}

export default function Button({
								   title,
								   textColor = "#FFFFFF",
								   fromColor = "#ff2d8d",
								   toColor = "#ff005c",
								   onClick,
								   className = "",
							   }: ButtonProps) {
	return (
		<button
			onClick={onClick}
			className={`
				group relative inline-flex
				items-center justify-center
				overflow-hidden
				px-4 py-2
				font-tektur font-medium lg:text-lg md:text-sm text-xs
				md:w-50 lg:w-max
				uppercase tracking-tight
				transition-all duration-300
				hover:scale-[1.01]
				active:scale-95
				${className}
			`}
			style={{
				background: `linear-gradient(90deg, ${fromColor}, ${toColor})`,
				color: textColor,
			}}
		>
			<span className="relative z-10">{title}</span>

			{/* Shine Effect */}
			<span
				className="
					absolute
					inset-0
					translate-x-[-120%]
					bg-white/20
					skew-x-[-20deg]
					transition-transform
					duration-500
					group-hover:translate-x-[120%]
				"
			/>
		</button>
	);
}