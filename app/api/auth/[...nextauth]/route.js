import NextAuth from "next-auth";
import connectDB from '@/utils/database';
import User from "@/models/userModel";
import GoogleProvider from "next-auth/providers/google";

connectDB();

// 7:35
export const authOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET
		})
	],
	pages: {
		signIn: '/signin'
	},
	callbacks: {
		async signIn({ user, account, profile, email, credentials }) {
			// console.log({ account, profile });

			if (account.type === 'oauth') {
				return await signInWithOAuth({ account, profile });
			}

			return true;
		},
		async jwt({ token, trigger, session }) {
			// console.log({ token });
			// 1:08:27
			// console.log({ trigger, session });

			if (trigger === 'update') {
				token.user.name = session.name;
				token.user.image = session.image;
			} else {
				// 44:43
				const user = await getUserByEmail({ email: token.email });
				// console.log("Auth Route: ", { user });
				token.user = user;
			}

			return token;
		},
		async session({ session, token }) {
			// console.log("Auth Session: ", { session, token });
			// 46:58
			session.user = token.user;

			return session;
		}
	}
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }


/**
 * 40:26
 * *********************************************
 * */
async function signInWithOAuth({ account, profile }) {
	const user = await User.findOne({ email: profile.email });
	if (user) {
		return true; // Signin
	}

	// if !user => sign up => sign in
	const newUser = new User({
		name: profile.name,
		email: profile.email,
		image: profile.picture,
		provider: account.provider,
	});
	// console.log({ newUser });

	await newUser.save();

	return true;
}

// 45:04
async function getUserByEmail({ email }) {
	const user = await User.findOne({ email }).select('-password');

	if (!user) {
		throw new Error('Email does not exist');
	}

	return {
		...user._doc,
		_id: user._id.toString()
	};
}