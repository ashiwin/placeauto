import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Placeauto by Ashiwin",
	description: "Search and explore places with Google Maps",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className} style={{ margin: 0 }}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
