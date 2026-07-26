
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

			<div className="hero-sec flex flex-col w-full h-full relative p-10">

				{/*MAIN*/}
				<div
					className="hero-text mt-20
					flex flex-col items-center
					z-20"
				>
					<div className="scale-80 lg:scale-90">
						<HeroText />
					</div>
					{/* fades in once the hero artwork has finished settling */}
					<motion.div className="-mt-20"
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 1.4, duration: 0.9, ease: "easeOut" }}
					>
						{/* ShinyText fills glyphs with a background-clip gradient, which only
                            covers the element box - leading/padding keep descenders inside it */}
						<ShinyText
							className="font-bodoniseventytwo uppercase tracking-[0.04em]
                            text-[72px] md:text-[96px] lg:text-[70px]
                            leading-[1.2] pb-[0.12em]"
							text="Coming Soon..."
							speed={2}
							delay={0}
							color="#b5b5b5"
							shineColor="#ffffff"
							spread={120}
							direction="left"
							yoyo={false}
							pauseOnHover={false}
							disabled={false}
						/>
					</motion.div>
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
