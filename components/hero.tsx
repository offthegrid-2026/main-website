
import { motion, MotionValue, useTransform } from "framer-motion";
import {bees, city, pattern} from "@/public";
import Image from "next/image";
import HeroText from "@/components/herotext";
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
					<div>
						<h1 className="text-5xl text-white bottom-200">
							COMING SOON
						</h1>
					</div>
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
