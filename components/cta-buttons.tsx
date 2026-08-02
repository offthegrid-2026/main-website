"use client";

import { useState } from "react";
import Button from "./button";
import ComingSoonModal from "./coming-soon-modal";

const WAITLIST_FORM = "https://forms.gle/UFsAiVAwWLHd3sW98";

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
	// Only "BECOME A SPEAKER" still has nowhere to go; the waitlist now points at
	// the form. The state sits here rather than in a provider because only one copy
	// of this component is ever interactive - the other is display:none for the
	// current breakpoint, so its button cannot be reached and its modal cannot open.
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
					title="JOIN THE WAITLIST"
					textColor="#b3eb16"
					fromColor="#2c00ff"
					toColor="#7b00ff"
					href={WAITLIST_FORM}
				/>
			</div>

			<ComingSoonModal open={notice} onClose={() => setNotice(false)} />
		</>
	);
}
