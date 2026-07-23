
import { motion, MotionValue, useTransform } from "framer-motion";
import { city } from "@/public";
import Image from "next/image";

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
			<div className="hero-sec flex flex-col gap-0 items-center w-full h-full relative p-[200px]">

				<div>
					{/*<h1 className="text-[40px] font-helveticaNeue leading-tight text-white uppercase">*/}
					{/*	HELLO*/}
				</div>

				<div
					id="bottom-image"
					className="absolute bottom-20 w-screen overflow-visible">
					<Image
						src={city}
						alt="city"
						style={{
							scale: 1.7,
							width: "100vw",
							maxWidth: "none",
						}}
					/>
				</div>

			</div>


		</motion.div>
	);
}
