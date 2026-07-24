import Link from "next/link";
import Image from "next/image";
import { logo } from "@/public";
import { bees } from "@/public";
import { Button, Menu } from "@/components";

export default function Navbar() {
	return (
		<div className="fixed top-0 left-0 w-full flex justify-between items-center py-8 px-8 z-50">

			<div className="flex gap-2 self-start">
				<div className="flex items-start gap-10">
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
							className="text-sm uppercase text-white font-medium tracking-tight leading-tight font-helveticaNeue">
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
			<div className="flex items-center gap-2 self-start">
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
