
import CtaButtons from "@/components/cta-buttons";
import HeroText from "@/components/herotext";
import ShinyText from "@/components/shinytext";
import { bees, city } from "@/public";
import { motion, MotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Hero({
	scrollYProgress,
}: {
	scrollYProgress: MotionValue<number>;
}) {
	const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
	const rotate = useTransform(scrollYProgress, [0, 1], [0, -5]);
	return (
		<motion.div
			style={{ scale, rotate }}
			className="flex flex-col w-full h-screen bg-heroColor sticky top-0 left-0 overflow-hidden"
		>

			<div className="hero-sec flex flex-col w-full h-full relative p-[calc(40*var(--u))]">

				{/*MAIN*/}
				{/* Three bands, each anchored differently because the space they have to
				    fill is different.

				    Below md and from 1261px the block is top-anchored and clears the
				    navbar by hand: below md that bar is the logo alone (~185*--u), since
				    the buttons moved into the hero.

				    768-1260 centres instead. Anchoring it to the navbar was wrong - the
				    slack on a tablet is below the artwork, not above it, so pinning the
				    top just moved the gap into the middle of the screen. Centring puts
				    the artwork on the horizontal axis and lets the space fall either
				    side, and on a 768x1024 portrait it lands the foot of "COMING SOON"
				    almost exactly where the skyline starts. The translate biases it a
				    little above centre; it is a transform rather than a margin so it
				    shifts by exactly its own value instead of the half a margin would
				    give against a flex-1 box that resizes with it.

				    Ranges are deliberately disjoint - max-md, md:max-[1261px],
				    min-[1261px] - so no two can ever apply at once and their order in
				    the stylesheet cannot matter. That is not fussiness: Tailwind emits
				    arbitrary min-[...] variants ahead of the named breakpoints, so a
				    plain md: utility outranks min-[1261px] at equal specificity however
				    much larger the pixel value. justify-start is the base for the same
				    reason - as a variant it would have to win that fight.

				    max-[1261px] and not max-[1260px] because Tailwind compiles a max
				    variant to `not all and (min-width: N)`, which is strictly less than
				    N. Written against 1260 it stops one pixel short of min-[1261px] and
				    a viewport of exactly 1260px matches neither, falling back to the
				    base rules. 1261 makes the two exact complements. */}
				<div
					className="hero-text
					flex flex-1 flex-col items-center justify-start
					mt-0
					max-md:mt-[calc(215*var(--u))]
					md:max-[1261px]:justify-center
					md:max-[1261px]:-translate-y-[calc(120*var(--u))]
					min-[1261px]:mt-[calc(80*var(--u))]
					min-[1261px]:flex-none
					z-20"
				>
					{/* relative/top shifts the artwork visually but leaves its layout box
					    in place, so the heading below does not follow it up */}
					<div className="relative top-[calc(-40*var(--u))] scale-80 lg:scale-90">
						<HeroText />
					</div>
					{/* fades in once the hero artwork has finished settling */}
					<motion.div className="mt-[calc(-25*var(--u))]"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 1.4, duration: 0.9, ease: "easeOut" }}
					>
						{/* ShinyText fills glyphs with a background-clip gradient, which only
                            covers the element box - leading/padding keep descenders inside it.

                            --art-heading is a ratio of the artwork's rendered width, set in
                            globals.css. It replaces the equivalent literal expression that
                            used to live here: keyed off --u alone the heading stopped
                            responding below ~1344px while the artwork carried on, and each
                            band would have needed its own hand-derived formula.

                            The length: hint is required, not decoration. text- is overloaded
                            for font-size and colour; Tailwind infers the type from the value,
                            and a bare var() is opaque to it, so without the hint this
                            compiles to a `color` declaration and no font-size at all, leaving
                            the heading at the inherited 16px. (Spelling the un-hinted form out
                            here would be enough for the scanner to emit that dead rule, so
                            it is described rather than written.) */}
						<ShinyText
							className="font-gokschil uppercase tracking-[0.04em] text-center -mt-10
                            text-[length:var(--art-heading)]
                            leading-[1.2] pb-[0.12em]"
							text="Coming Soon"
							speed={3}
							delay={1}
							color="#c0bfbf"
							shineColor="#ffffff"
							spread={120}
							direction="left"
							yoyo={false}
							pauseOnHover={true}
							disabled={false}
						/>
					</motion.div>

					{/* Phone/tablet home for the navbar's two CTAs. Column on the narrowest
					    screens because the two labels side by side do not fit a 375px
					    viewport; from sm they sit in a row again. Inside hero-text so they
					    keep its z-20 and stay above the city artwork, which would otherwise
					    swallow the clicks. */}
					<CtaButtons
						className="flex md:hidden
						flex-col sm:flex-row items-stretch sm:items-center justify-center
						gap-[calc(24*var(--u))]
						mt-[calc(60*var(--u))]"
					/>
				</div>


				{/*BOTTOM IMAGE*/}
				{/* city.svg is 823x782 but the skyline is only the rect at y 8..122 -
				    the bottom ~15% - and the rest is empty sky the light beams sweep
				    through. So the artwork is always rendered several viewport-widths
				    wide and mostly clipped, and the only part that reads is that band,
				    whose height works out to 13.85% of whatever width the image gets.

				    It used to be sized by 100vw alone and scaled twice: scale-165 on
				    this div (default centre origin) on top of scale 1.7 on the image
				    (bottom-centre origin). Those two disagree about the origin, so the
				    div's growth pushed its bottom edge down by (1.65-1)/2 of a height
				    that itself tracks 100vw - about 237px at 767px wide, against only
				    120px of bottom-30 to hold it up. That is what cut the skyline's
				    base off as the viewport approached md, and why a 375px phone (where
				    the same sum comes to 116px vs 120px) escaped it.

				    Now: one element, one size, no transform. max() makes it behave like
				    object-fit: cover - 170vw reproduces the old desktop size exactly and
				    still wins on any viewport wider than 1.265:1, while 215vh takes over
				    on tall ones and holds the band at ~30% of the screen instead of
				    letting it collapse to 18% on a phone. The two agree at the 1920x900
				    reference, so there is no seam where control passes between them. */}
				{/* left-0 is what makes the horizontal placement hold still. Without an
				    inset this box falls back to its static position, which inside hero-sec
				    is within that element's p-[40*--u] - so the artwork carried a 40*--u
				    push to the right. --u is clamped between 0.7px and 1px, so that push
				    is 40px on a desktop but 28px anywhere --u bottoms out, while the
				    translate beside it is a percentage of an image width that scales with
				    the viewport. One term fixed in px and one proportional cannot stay in
				    step, and the artwork slid ~0.4% of its width - 6-7px - between a
				    desktop and a phone. Pinning to 0 removes the fixed term outright. */}
				<div
					id="bottom-image"
					className="absolute -bottom-5 left-0 w-screen overflow-visible z-10"
				>
					<Image
						src={city}
						alt="city"
						style={{
							width: "max(170vw, 215vh)",
							maxWidth: "none",
							// Sole control of the horizontal position, as a percentage of the
							// image's own width - so it means the same thing at every size.
							//
							// -49.375% is the hand-tuned -50.6% with the container's old
							// 40*--u push folded in: that push was 40/(1920*1.7) = 1.225% of
							// the image width on any ordinary desktop, so the two forms render
							// identically there. They stop agreeing on phones and tablets,
							// which is the drift being corrected.
							marginLeft: "50%",
							transform: "translateX(-49.575%)",
						}}
					/>
				</div>


				{/*BG*/}
				{/* purely decorative, and built entirely from .hero-grid in globals.css
				    - see the comment there for the geometry and the tuning knobs */}
				<div className="hero-grid z-0" aria-hidden="true" />


			</div>


		</motion.div>
	);
}
