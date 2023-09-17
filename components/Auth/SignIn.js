"use client"

import { signIn } from "next-auth/react"
import Link from "next/link"

const SignIn = ({ callbackUrl }) => {
	return (
		<div>
			<h2>Sing In With Next Auth</h2>

			{/** Google Login */}
			<div style={{ margin: '30px 0' }}>
				<button
					onClick={() => signIn('google', { callbackUrl })}
				>
					Continue With Google
				</button>
			</div>

			<div style={{ margin: '30px 0' }}>
				<Link href="/signup">Sign Up</Link>
			</div>
		</div>
	)
}

export default SignIn