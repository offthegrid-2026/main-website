import Link from "next/link";
import Image from "next/image";
import { bees } from "@/public";
import { AnimatedLogo, Button, Menu } from "@/components";

export default function Navbar() {
	return (
		<div
			className="fixed top-0 left-0 w-full
			flex flex-col md:flex-row gap-[calc(8*var(--u))] md:gap-0
			justify-between items-center
			py-[calc(32*var(--u))] px-[calc(32*var(--u))]
			z-50"
		>

			{/*LOGO*/}
			{/* self-* is the cross axis: on the mobile flex-col navbar that is
			    horizontal, so self-center puts the logo above the buttons; from md
			    up the bar is a row again and self-start means top-aligned */}
			<div className="flex gap-[calc(8*var(--u))] self-center md:self-start">

				{/* --u replaces the old breakpoint scale steps, so this shrinks
				    continuously with the viewport rather than jumping at md/lg */}
				<div className="flex gap-[calc(40*var(--u))]">
					<div>
						<Link href="/">
							<AnimatedLogo className="w-[calc(180*var(--u))]" />
						</Link>
					</div>

					<div>
						<p
							className="text-[max(10px,calc(14*var(--u)))] uppercase text-white tracking-tight leading-tight ">
							PART OF THE
						</p>
						{/* bees.svg is 739x308 - forcing it into a square box letterboxed it
						    and the leftover space read as a gap under "PART OF THE" */}
						<Image
							src={bees}
							alt="logo"
							width={739}
							height={308}
							className="block w-[calc(180*var(--u))] h-auto"
						/>
					</div>
				</div>

			</div>


			{/*<div className="self-start mt-9">*/}
			{/*	<Menu />*/}
			{/*</div>*/}


			<div className="flex flex-row md:flex-col lg:flex-row items-center gap-[calc(8*var(--u))] lg:self-start ">
				<Button
					title="BECOME A SPEAKER"
					textColor="#ffffff"
					fromColor="#ff3f9c"
					toColor="#ff005d"
				/>
				<Button
					title="REGISTER YOUR SEAT"
					textColor="#b3eb16"
					fromColor="#2c00ff"
					toColor="#7b00ff"
				/>
			</div>
		</div>
	);
}
