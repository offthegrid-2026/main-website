import { Poppins, Tektur } from "next/font/google";
import type { Metadata } from "next";

import { Navbar } from "@/components";
import "@/styles/globals.css";

const poppins = Poppins({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	variable: "--font-poppins",
	display: "swap",
});

const tektur = Tektur({
	subsets: ["latin"],
	variable: "--font-tektur",
	display: "swap",
});

export const metadata: Metadata = {
	title: "Off The Grid",
	description: "Off The Grid",
};

export default function RootLayout({
									   children,
								   }: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
		<body className={`${poppins.variable} ${tektur.variable} ${poppins.className}`}>
		<Navbar />
		{children}
		</body>
		</html>
	);
}