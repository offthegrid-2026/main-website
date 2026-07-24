import Link from "next/link";
import Image from "next/image";
import { logo } from "@/public";
import { bees } from "@/public";
import { Button, Menu } from "@/components";

export default function Navbar() {
	return (
		<div
			className="fixed top-0 left-0 w-full
			flex flex-col md:flex-row gap-2 md:gap-0
			justify-between items-center
			py-8 px-8
			z-50"
		>

			{/*LOGO*/}
			<div className="flex gap-2 self-start">

				<div
					className="flex gap-10
					lg:scale-100 md:scale-90 scale-80"
				>
					<div>
						<Image
							src={logo}
							alt="logo"
							width={180}
							height={180}
						/>
					</div>

					<div>
						<p
							className="text-sm uppercase text-white tracking-tight leading-tight">
							PART OF THE
						</p>
						<Link href="/">
							<Image
								src={bees}
								alt="logo"
								width={180}
								height={180}
							/>
						</Link>
					</div>
				</div>

			</div>


			{/*<div className="self-start mt-9">*/}
			{/*	<Menu />*/}
			{/*</div>*/}


			<div className="hidden md:flex flex-col lg:flex-row items-center gap-2 lg:self-start ">
				<Button
					title="BECOME A SPEAKER"
					textColor="#150c1c"
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
