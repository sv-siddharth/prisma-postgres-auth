"use client";

import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

import { Loader, LogIn } from "lucide-react";
import { Button } from "./ui/button";

const GoogleSignInButton = ({ isLoading, children }) => {
	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get("callbackUrl");

	const loginWithGoogle = () => signIn("google", { callbackUrl });

	return (
		// <Button
		// 	onClick={loginWithGoogle}
		// 	className="w-half">
		// 	{children}
		// </Button>
		<Button
			variant="outline"
			type="submit"
			onClick={loginWithGoogle}
			disabled={isLoading}>
			{isLoading ? (
				<Loader className="mr-2 h-4 w-4 animate-spin" />
			) : (
				<LogIn className="mr-2 h-4 w-4" />
			)}
			{children}
		</Button>
	);
};

export default GoogleSignInButton;
