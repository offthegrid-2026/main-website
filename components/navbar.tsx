import Link from "next/link";
import Image from "next/image";
import { logo } from "@/public";
import { bees } from "@/public";
import { Button, Menu } from "@/components";

export default function Navbar() {
	return (
		<div className="fixed top-10 left-0 w-full flex justify-between items-center py-5 px-10 z-50">
			<div className="flex flex-col gap-2 self-start -mt-10">
				<Image
					src={logo}
					alt="logo"
					width={180}
					height={180}
				/>
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
			<div className="self-start">
				<Menu />
			</div>
			<div className="flex items-center gap-2 self-start -mt-10">
				<Button title="Become A Speaker" />
				<Button title="Get Pass" />
			</div>
		</div>
	);
}
