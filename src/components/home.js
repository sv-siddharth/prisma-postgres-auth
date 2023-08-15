"use client";

"use client";
import { Button } from "@/components/ui/button";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Home(props) {
	const { data: session, status } = useSession();

	if (status === "loading") {
		return <h1>Loading...</h1>;
	}

	if (session) {
		return (
			<>
				Signed in as {session.user?.email} <br />
				<Button
					type="button"
					onClick={() => signOut()}>
					{" "}
					Sign out
				</Button>
			</>
		);
	}
	return (
		<>
			Not signed in <br />
			<Button
				type="button"
				onClick={() => signIn()}>
				Sign in
			</Button>
		</>
	);
}
