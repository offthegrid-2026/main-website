"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

/*
 * Rendered into document.body rather than in place.
 *
 * A transform, translate, scale or filter on any ancestor makes that ancestor the
 * containing block for position:fixed descendants - the modal would then centre
 * on that element instead of the viewport, and an overflow-hidden on it would
 * clip the backdrop. Two ancestors here can do that: hero-text carries a
 * translate between 768 and 1260px, and the hero root becomes a real transform
 * the moment page.tsx stops freezing its scroll progress (spaMode), at which
 * point its overflow-hidden starts clipping too. Right now the hero renders
 * transform:none, so this is latent rather than broken - which is exactly why it
 * is worth not depending on.
 *
 * The portal also puts the backdrop above the fixed navbar without having to
 * reason about which ancestor's z-index it is trapped inside.
 */
export default function ComingSoonModal({
	open,
	onClose,
}: {
	open: boolean;
	onClose: () => void;
}) {
	// document only exists after mount; gating on this keeps the server and the
	// first client render identical instead of hydrating a portal that was not there
	const [mounted, setMounted] = useState(false);
	const closeRef = useRef<HTMLButtonElement | null>(null);

	useEffect(() => setMounted(true), []);

	useEffect(() => {
		if (!open) return;
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [open, onClose]);

	if (!mounted) return null;

	return createPortal(
		<AnimatePresence>
			{open && (
				<motion.div
					// Dismiss only when the backdrop itself is the click target. Testing
					// the target beats stopPropagation on the panel: a drag that starts
					// inside the panel and releases outside still resolves its click to a
					// common ancestor, which would otherwise read as a click-away.
					onClick={(e) => {
						if (e.target === e.currentTarget) onClose();
					}}
					className="fixed inset-0 z-[100] flex items-center justify-center
					bg-black/70 px-6 backdrop-blur-sm"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.2, ease: "easeOut" }}
				>
					<motion.div
						role="dialog"
						aria-modal="true"
						aria-labelledby="coming-soon-title"
						// 1.5px of padding with a gradient behind it draws the border, so
						// the stroke can carry the same pink-to-violet ramp as the buttons
						className="relative w-full max-w-md rounded-2xl p-[1.5px]"
						style={{
							background:
								"linear-gradient(135deg, #ff3f9c 0%, #7b00ff 55%, #2c00ff 100%)",
							boxShadow:
								"0 0 90px -20px rgba(255,63,156,0.55), 0 0 140px -50px rgba(123,0,255,0.75)",
						}}
						initial={{ opacity: 0, scale: 0.92, y: 16 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.95, y: 8 }}
						transition={{ type: "spring", stiffness: 260, damping: 22 }}
					>
						<div
							className="relative overflow-hidden rounded-2xl bg-heroColor px-8 py-11 text-center"
							style={{
								backgroundImage:
									"radial-gradient(120% 90% at 50% 0%, rgba(123,0,255,0.22) 0%, transparent 60%)",
							}}
						>
							<button
								ref={closeRef}
								onClick={onClose}
								aria-label="Close"
								autoFocus
								className="group absolute top-3.5 right-3.5 grid h-9 w-9 place-items-center
								cursor-pointer rounded-full text-white/55
								transition-colors duration-200
								hover:bg-white/10 hover:text-white
								focus:outline-none focus-visible:ring-2 focus-visible:ring-greenColor"
							>
								<svg
									viewBox="0 0 24 24"
									className="h-4 w-4"
									fill="none"
									stroke="currentColor"
									strokeWidth={2.5}
									strokeLinecap="round"
									aria-hidden="true"
								>
									<path d="M5 5 19 19M19 5 5 19" />
								</svg>
							</button>

							<div className="text-5xl leading-none select-none" aria-hidden="true">
								🚧
							</div>

							<h2
								id="coming-soon-title"
								className="mt-5 font-tektur text-[clamp(1.25rem,4vw,1.6rem)] font-bold
								tracking-tight text-white uppercase"
							>
								Feature coming soon
							</h2>

							<div
								className="mx-auto mt-5 h-px w-16"
								style={{
									background:
										"linear-gradient(90deg, transparent, #b3eb16, transparent)",
								}}
							/>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>,
		document.body,
	);
}
