
import { motion, MotionValue, useTransform } from "framer-motion";
import {bees, city, pattern} from "@/public";
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

			<div className="hero-sec flex flex-col gap-0 items-center w-full h-full relative p-10">

				{/*PART OF*/}
				{/*<div className="bengal absolute left-8 top-42">*/}
				{/*	<p*/}
				{/*		className="text-sm uppercase text-white font-medium tracking-tight leading-tight font-helveticaNeue">*/}
				{/*		PART OF THE*/}
				{/*	</p>*/}
				{/*	<Link href="/">*/}
				{/*		<Image*/}
				{/*			src={bees}*/}
				{/*			alt="logo"*/}
				{/*			width={180}*/}
				{/*			height={180}*/}
				{/*		/>*/}
				{/*	</Link>*/}
				{/*</div>*/}

				{/*MAIN*/}
				<div>

					{/*<h1 className="text-[40px] font-helveticaNeue leading-tight text-white uppercase">*/}
					{/*	HELLO*/}
					{/*</h1>*/}

				</div>


				{/*BOTTOM IMAGE*/}
				<div
					id="bottom-image"
					className="absolute -bottom-5 w-screen overflow-visible">
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
				<div className="absolute z-0">
					<Image
						src={pattern}
						alt="bg"
						style={{
							scale: 1.7,
							width: "100vw",
							maxWidth: "none",
							opacity: 0.1,
						}}
					/>
				</div>


			</div>


		</motion.div>
	);
}
