"use server";

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';
import User from '@/models/userModel';
import { redirect } from 'next/navigation';
import bcrypt from 'bcrypt';
import { generateToken, verifyToken } from '@/utils/token';
import sendEmail from '@/utils/sendEmail';

// 1:35:15
const BASE_URL = process.env.NEXTAUTH_URL;

// 59:05
// https://nextjs.org/docs/app/building-your-application/data-fetching/forms-and-mutations#displaying-loading-state
export async function updateUser({ name, image }) {
	const session = await getServerSession(authOptions);
	// console.log("authActions: ", session);

	if (!session) {
		throw new Error('Unauthorized entry attempted!');
	}

	try {
		const user = await User.findByIdAndUpdate(
			session?.user?._id,
			{
				name, image
			},
			{ new: true }
		).select('-password');

		if (!user) {
			throw new Error('Email does not exists!')
		}

		return { msg: 'Update Profile Successfully!' }

	} catch (error) {
		redirect(`/errors?error=${error.message}`);
	}
}


// 1:19:33
export async function signUpWithCredentials(data) {

	try {
		// console.log({ data });
		const user = await User.findOne({ email: data.email });
		// যদি সাইন-আপের ইমেইল দিয়ে ডাটাবেজে ইউজার থাকে...
		if (user) {
			throw new Error('Email already exists!');
		}

		if (data.password) {
			data.password = await bcrypt.hash(data.password, 12);
		}

		// 1:27:35
		const token = generateToken({ user: data });
		// console.log({ token });

		// 1:35:20
		// Send email to user to verify its account
		await sendEmail({
			to: data.email,
			url: `${BASE_URL}/verify?token=${token}`,
			text: 'VERIFY EMAIL'
		})

		return {
			msg: 'Sign Up Success! Check your email to complete the registration.'
		}

	} catch (error) {
		redirect(`/errors?error=${error.message}`);
	}
}


// 1:38:43
export async function verifyWithCredentials(token) {

	try {

		const { user } = verifyToken(token);
		console.log("verifyWithCredentials: ", user);
		const userExist = await User.findOne({ email: user.email });
		// যদি ডাটাবেজে টোকেনের মধ্যেকার ইমেইল আইডি থাকে
		if (userExist) {
			return {
				msg: 'Verify Successful!'
			}
		}

		const newUser = new User(user);
		// console.log({ newUser });
		await newUser.save();

		return {
			msg: 'Verify Successful!'
		}

	} catch (error) {
		redirect(`/errors?error=${error.message}`);
	}
}
