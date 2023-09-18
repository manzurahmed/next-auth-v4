"use client"

import { signIn } from "next-auth/react"
import Link from "next/link"
import Form from "../Global/Form"
import Button from "../Global/Button"

const SignIn = ({ callbackUrl }) => {

	// 1:44:10
	async function handleCredentialsLogin(formData) {
		const email = formData.get('email');
		const password = formData.get('password');
		// console.log({ email, password });

		// 1:45:25
		await signIn(
			'credentials',
			{ email, password, callbackUrl }
		);
	}


	return (
		<div>
			<h2>Sign In With Next Auth</h2>

			{/** Google Login */}
			<div style={{ margin: '30px 0' }}>
				<button
					onClick={() => signIn('google', { callbackUrl })}
				>
					Continue With Google
				</button>
			</div>

			{/** SignIn with Credentials */}
			<Form action={handleCredentialsLogin} style={{ margin: '30px 0' }}>
				<input
					type="email"
					name="email"
					placeholder="Email"
					required
				/>
				<input
					type="password"
					name="password"
					placeholder="Password"
					required
				/>
				<Button value="Credentials Login" />

			</Form>

			<div style={{ margin: '30px 0' }}>
				<Link href="/signup">Sign Up</Link>
			</div>
		</div>
	)
}

export default SignIn