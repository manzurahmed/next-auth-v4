"use client"

import ProfileCard from "./ProfileCard";
import ProfileUpdate from "./ProfileUpdate";
// 1:11:35
import { useSession } from 'next-auth/react'

const ProfileComponent = ({ user }) => {
	// console.log({ user });

	// 1:11:42
	const { data: session, update } = useSession();
	/*
	First time: session = 'udefined', user exists => run server-side
	Next time: session exists => run client side
	*/
	// console.log({ session });


	return (
		<div>
			<ProfileCard user={session?.user || user} />
			<ProfileUpdate update={update} />
		</div>
	);
};

export default ProfileComponent;
