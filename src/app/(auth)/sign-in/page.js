"use client";

import { useState } from "react";
import { Loader, LogIn } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from "@/components/ui/form";
import GoogleSignInButton from "@/components/GoogleSignInButton";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

const FormSchema = z.object({
	email: z.string().min(1, "Email is required").email("Invalid email")
});

const SignInForm = () => {
	const [isLoading, setIsLoading] = useState(false);

	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get("callbackUrl");

	const onSubmit = async (data) => {
		const { email } = data;

		try {
			signIn("email", { email, callbackUrl });
			setIsLoading(true);
		} catch (e) {
			setIsLoading(false);
		}
	};

	const onError = (error) => {
		console.log("onError", error);
	};

	const form = useForm({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			email: ""
		}
	});

	return (
		<div className="w-half">
			<div className="flex flex-col space-y-2 text-center">
				<h1 className="text-2xl font-semibold tracking-tight">
					Create an account
				</h1>
				<p className="text-sm text-muted-foreground">
					Enter your email below to create your account
				</p>
			</div>
			<div className="grid gap-6">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit, onError)}>
						<div className="grid gap-2">
							<div className="grid gap-1">
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem>
											<FormLabel className="sr-only">Email</FormLabel>
											<FormControl>
												<Input
													placeholder="mail@example.com"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<Button
								variant="outline"
								type="submit"
								disabled={isLoading}>
								{isLoading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
								Sign In with Email
							</Button>
						</div>
					</form>
				</Form>

				<div className="relative">
					<div className="absolute inset-0 flex items-center">
						<span className="w-full border-t" />
					</div>
					<div className="relative flex justify-center text-xs uppercase">
						<span className="bg-background px-2 text-muted-foreground">
							Or continue with
						</span>
					</div>
				</div>
				{/* <Button
					variant="outline"
					type="button"
					disabled={isLoading}>
					{isLoading ? (
						<Loader className="mr-2 h-4 w-4 animate-spin" />
					) : (
						<LogIn className="mr-2 h-4 w-4" />
					)}
					Sign In with Google
				</Button> */}
				<GoogleSignInButton isLoading={isLoading}>
					Sign In with Google
				</GoogleSignInButton>
			</div>
		</div>
	);
};

export default SignInForm;
