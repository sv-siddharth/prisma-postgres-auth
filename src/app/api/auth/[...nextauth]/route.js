import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";

export const authOptions = {
	adapter: PrismaAdapter(db),
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET
		}),
		EmailProvider({
			server: process.env.EMAIL_SERVER,
			from: process.env.EMAIL_FROM
		})
	],
	secret: process.env.SECRET,
	session: {
		strategy: "jwt"
	},
	pages: {
		signIn: "/sign-in"
	}
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
