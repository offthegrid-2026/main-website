
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
				{/* From md to 1260px the block grows to fill the section and centres
				    itself, which keeps it clear of the navbar. Only from 1261px up -
				    where the artwork has finally narrowed enough to sit inside the
				    logos - does it revert to the top-anchored layout the desktop sizes
				    are tuned against.

				    Below md the buttons are no longer in the navbar, so that bar is just
				    the logo row (~185*--u tall) and the artwork moves up into the space
				    they left. Centring cannot do that once the buttons join this stack -
				    the group just grows downward and re-centres - so this anchors to the
				    top instead and clears the shortened navbar by hand. */}
				{/* The mobile rules are max-md, not md overrides, on purpose: Tailwind
				    emits arbitrary min-[...] variants ahead of the named breakpoints, so
				    a md: utility outranks min-[1261px] at equal specificity no matter
				    which pixel value is larger. max-md cannot match above 768px at all,
				    which leaves every rule from md up byte-identical to before. */}
				<div
					className="hero-text
					flex flex-1 flex-col items-center justify-center
					max-md:justify-start
					mt-0 max-md:mt-[calc(215*var(--u))] min-[1261px]:mt-[calc(80*var(--u))]
					min-[1261px]:flex-none min-[1261px]:justify-start
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

                            The size is 7% of the artwork's own width expression rather than a
                            multiple of --u: the artwork is capped by the viewport once that is
                            the tighter term, and --u floors out below ~1344px, so keying off
                            --u alone lets the heading stop shrinking while the artwork carries
                            on - and eventually overtake it. */}
						<ShinyText
							className="font-laCo uppercase tracking-[0.04em] text-center -mt-10
                            text-[min(calc(70*var(--u)),calc(7vw_-_5.6*var(--u)))]
                            leading-[1.2] pb-[0.12em]"
							text="Coming Soon"
							speed={2}
							delay={0}
							color="#a39d9d"
							shineColor="#ffffff"
							spread={120}
							direction="left"
							yoyo={false}
							pauseOnHover={false}
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
				<div
					id="bottom-image"
					className="absolute -bottom-5 w-screen overflow-visible z-10"
				>
					<Image
						src={city}
						alt="city"
						style={{
							width: "max(170vw, 215vh)",
							maxWidth: "none",
							// centres the overflowing image on the div's centre, which is
							// where the old scale(1.7) about bottom-centre also left it
							marginLeft: "50%",
							transform: "translateX(-50%)",
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
