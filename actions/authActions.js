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

	try {
		const session = await getServerSession(authOptions);
		// console.log("authActions: ", session);

		if (!session) {
			throw new Error('Unauthorized entry attempted!');
		}

		// Find the user by ID in DB and Update "name" and "image"
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

		return {
			msg: 'Update Profile Successfully!'
		}

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


// 1:54:53
export async function changePasswordWithCredentials({ old_pass, new_pass }) {

	try {

		const session = await getServerSession(authOptions);
		// console.log({ session });

		// 1:56:20
		if (!session) {
			throw new Error('Unauthorizated attemp to change password. Log in first!');
		}

		// If current Auth provider isn't "credentials",
		// he is using other Auth provider, i.e., Google.
		const currentProvider = session?.user?.provider;
		const currentProviderCapitalized = currentProvider.charAt(0).toUpperCase() + currentProvider.slice(1);


		if (session?.user?.provider !== 'credentials') {
			throw new Error(`This account is signed in with ${currentProviderCapitalized}. You can't change password in this case!`);
		}

		// Find in DB by User ID from server session
		const user = await User.findById(session?.user?._id);
		// If user does not exists in DB
		if (!user) {
			throw new Error('User does not exists!');
		}

		// Password does not match
		const compare = await bcrypt.compare(old_pass, user.password);
		if (!compare) {
			throw new Error('Old password does not match!');
		}

		// Encrypt new password
		const newPass = await bcrypt.hash(new_pass, 12);
		// Commit new password to DB
		await User.findByIdAndUpdate(
			user._id,
			{ password: newPass }
		);

		return {
			msg: 'Change Password Successfully!'
		}

	} catch (error) {
		redirect(`/errors?error=${error.message}`);
	}
}


// 2:05:25
export async function forgotPasswordWithCredentials({ email }) {

	try {

		// Find user in DB by email address
		const user = await User.findOne({ email });
		// If user does not exists in DB
		if (!user) {
			throw new Error('Email does not exists!');
		}

		// If current Auth provider isn't "credentials",
		// he is using other Auth provider, i.e., Google.
		const currentProvider = user?.provider;
		const currentProviderCapitalized = currentProvider.charAt(0).toUpperCase() + currentProvider.slice(1);

		if (user?.provider !== 'credentials') {
			throw new Error(`This account is signed in with ${currentProviderCapitalized}. You need to log in using your credentials!`);
		}

		const token = generateToken({ userId: user._id });
		// console.log({ token });

		// 2:08:23
		await sendEmail({
			to: email,
			url: `${BASE_URL}/reset_password?token=${token}`,
			text: 'RESET PASSWORD'
		});



		return {
			msg: 'Successful! Check your email to reset your password.'
		}

	} catch (error) {
		redirect(`/errors?error=${error.message}`);
	}
}


// 2:13:07
export async function resetPasswordWithCredentials({ token, password }) {

	try {

		// console.log({ token, password });
		// 2:14:18
		const { userId } = verifyToken(token);
		const newPass = await bcrypt.hash(password, 12);

		await User.findByIdAndUpdate(userId, { password: newPass });



		return {
			msg: 'Successful! Your password has been reset.'
		}

	} catch (error) {
		redirect(`/errors?error=${error.message}`);
	}
}