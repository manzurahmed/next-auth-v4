"use server";

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getServerSession } from 'next-auth/next'
import ProtectedComponent from '@/components/Protected';

const ProtectedServerPage = async () => {

	const session = await getServerSession(authOptions);

	return (
		<div>
			<h1>This is a
				<i style={{ color: 'red' }}>Server-side</i> protected page.
			</h1>

			<ProtectedComponent user={session?.user} />
		</div>
	)
}

export default ProtectedServerPage