"use server";

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next';
import User from '@/models/userModel';
import { redirect } from 'next/navigation';
import bcrypt from 'bcrypt';

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
		// যদি সাইন-আপের ইমেইল দিয়ে ইউজার থাকে...
		if (user) {
			throw new Error('Email already exists!');
		}

		if (data.password) {
			data.password = await bcrypt.hash(data.password, 12);
		}

		console.log({ data });

		return { msg: 'Sign Up Success! Check your email to complete the registration.' }
	} catch (error) {
		redirect(`/errors?error=${error.message}`);
	}
}
