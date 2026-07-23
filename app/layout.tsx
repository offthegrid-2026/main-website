import { Navbar } from "@/components";
import "@/styles/globals.css";
import type { Metadata } from "next";
export const metadata: Metadata = {
	title: "Off The Grid",
	description: "Off The Grid",
};
export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<Navbar />
				{children}
			</body>
		</html>
	);
}
