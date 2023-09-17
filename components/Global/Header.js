'use server';

import { getServerSession } from "next-auth/next"
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import Link from 'next/link'
import SignOut from "../Auth/SignOut";

// 11:37
const Header = async () => {

	const session = await getServerSession(authOptions);

	console.log({ session });

	return (
		<header style={{ display: 'flex', gap: 30 }}>
			<Link href="/">Home</Link>
			<Link href="/protected/client">Protected (client)</Link>
			<Link href="/protected/server">Projected (server)</Link>

			{
				session
					? <>
						<Link href="/profile/client">Profile (client)</Link>
						<Link href="/profile/server">Profile (server)</Link>
						<Link href="/dashboard">Admin Dashboard</Link>

						<SignOut />
					</>
					: <Link href="/signin">Sign In</Link>
			}
		</header>
	)
}

export default Header