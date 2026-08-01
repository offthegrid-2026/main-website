"use client";

import { useState } from "react";
import Button from "./button";
import ComingSoonModal from "./coming-soon-modal";

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
	// Neither CTA has anywhere to go yet, so both raise the same notice. The state
	// sits here rather than in a provider because only one copy of this component
	// is ever interactive - the other is display:none for the current breakpoint,
	// so its buttons cannot be reached and its modal cannot be opened.
	const [notice, setNotice] = useState(false);

	return (
		<>
			<div className={className}>
				<Button
					title="BECOME A SPEAKER"
					textColor="#ffffff"
					fromColor="#ff3f9c"
					toColor="#ff005d"
					onClick={() => setNotice(true)}
				/>
				<Button
					title="REGISTER YOUR SEAT"
					textColor="#b3eb16"
					fromColor="#2c00ff"
					toColor="#7b00ff"
					onClick={() => setNotice(true)}
				/>
			</div>

			<ComingSoonModal open={notice} onClose={() => setNotice(false)} />
		</>
	);
}
