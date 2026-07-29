
import CtaButtons from "@/components/cta-buttons";
import HeroText from "@/components/herotext";
import ShinyText from "@/components/shinytext";
import { bees, city, pattern } from "@/public";
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
				<div
					id="bottom-image"
					className="absolute w-screen overflow-visible
					lg:-bottom-5 lg:scale-100
					md:bottom-8 md:scale-110
					bottom-30 scale-165
					z-10"
				>
					<Image
						src={city}
						alt="city"
						style={{
							scale: 1.7,
							width: "100vw",
							maxWidth: "none",
							transformOrigin: "bottom center",
						}}
					/>
				</div>


				{/*BG*/}
				<div
					className="absolute z-0
					lg:-bottom-400 lg:scale-100
					md:-bottom-140 md:scale-150
					-bottom-40 scale-200"
				>
					<Image
						src={pattern}
						alt="bg"
						style={{
							scale: 1.2,
							width: "100vw",
							maxWidth: "none",
							opacity: 0.03,
						}}
					/>
				</div>


			</div>


		</motion.div>
	);
}
