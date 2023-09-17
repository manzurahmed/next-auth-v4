"use client";

import ProtectedComponent from "@/components/Protected";

// import { useSession } from 'next-auth/react'

const ProtectedClientPage = () => {

	// const { data: session } = useSession();
	// console.log({ session });

	return (
		<div>
			<h1>This is a
				<i style={{ color: 'red' }}>Client-side</i> protected page.
			</h1>

			<ProtectedComponent />
		</div>
	)
}

export default ProtectedClientPage