import Button from "./button";

/*
 * The same two calls-to-action appear in two places that cannot share a DOM
 * node: the fixed navbar from md up, and inside the hero below "COMING SOON"
 * on phones and tablets. The navbar is position:fixed and the hero is a
 * separate sticky section, so there is no CSS that reparents one into the
 * other - each side renders this and hides the copy it does not want.
 *
 * `className` styles the wrapper only, so each caller owns its own stacking
 * direction, gap and visibility.
 */
export default function CtaButtons({ className = "" }: { className?: string }) {
	return (
		<div className={className}>
			<Button
				title="BECOME A SPEAKER"
				textColor="#ffffff"
				fromColor="#ff3f9c"
				toColor="#ff005d"
			/>
			<Button
				title="REGISTER YOUR SEAT"
				textColor="#b3eb16"
				fromColor="#2c00ff"
				toColor="#7b00ff"
			/>
		</div>
	);
}
