"use client";

interface ButtonProps {
	title: string;
	textColor?: string;
	fromColor?: string;
	toColor?: string;
	onClick?: () => void;
	/** renders a real anchor instead of a button; opens in a new tab */
	href?: string;
	className?: string;
}

export default function Button({
								   title,
								   textColor = "#FFFFFF",
								   fromColor = "#ff2d8d",
								   toColor = "#ff005c",
								   onClick,
								   href,
								   className = "",
							   }: ButtonProps) {
	// font-stretch-semi-condensed is wdth 87.5, halfway into Tektur's 75-100
	// range - narrow enough to tighten the two long labels without the letters
	// reading as compressed.
	const shared = {
		className: `
			group relative inline-flex
			items-center justify-center
			overflow-hidden
			px-[calc(24*var(--u))] py-[calc(14*var(--u))]
			lg:px-[calc(16*var(--u))] lg:py-[calc(8*var(--u))]
			font-tektur font-bold font-stretch-100%
			text-[max(14px,calc(24*var(--u)))] lg:text-[max(11px,calc(18*var(--u)))]
			lg:w-max
			uppercase tracking-tight
			cursor-pointer
			transition-all duration-300
			hover:scale-[1.01]
			active:scale-95
			${className}
		`,
		style: {
			background: `linear-gradient(90deg, ${fromColor}, ${toColor})`,
			color: textColor,
		},
	};

	const content = (
		<>
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
		</>
	);

	// An anchor rather than a button wrapped in one: nesting interactive content
	// is invalid, and only a real <a> gives middle-click, ctrl-click and "open in
	// new tab" on a destination the user may well want to keep for later.
	// rel=noreferrer alongside noopener because older browsers tie the two, and
	// target=_blank without it hands the opened page a window.opener handle.
	if (href) {
		return (
			<a href={href} target="_blank" rel="noopener noreferrer" {...shared}>
				{content}
			</a>
		);
	}

	return (
		<button onClick={onClick} {...shared}>
			{content}
		</button>
	);
}