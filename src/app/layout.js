import Navbar from "@/components/navbar";
import Provider from "@/components/providers/provider";
import "@/styles/globals.css";

export default function RootLayout({ children, pageProps }) {
	return (
		<html lang="en">
			<Provider>
				<body className="bg-ba">
					<main className="h-screen flex flex-col justify-center items-center">
						<Navbar />
						{children}
					</main>
				</body>
			</Provider>
		</html>
	);
}
