"use client";

import ProfileComponent from '@/components/Profile';
// import { useSession } from 'next-auth/react'

const ProfileClientPage = () => {

	// 1:07:42
	// const { data: session, update } = useSession();

	return (
		<div>
			<h1 style={{ color: 'red' }}>Profile Client Side</h1>
			{/* <ProfileComponent user={session?.user} update={update} /> */}
			<ProfileComponent />
		</div>
	)
}

export default ProfileClientPage