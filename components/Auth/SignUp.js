"use client";

import { signUpWithCredentials } from '@/actions/authActions';
import Button from '../Global/Button';
import Form from '../Global/Form';

// 1:15:58
const SignUp = () => {

	async function handleSignUpCredentials(formData) {
		const name = formData.get('name');
		const email = formData.get('email');
		const password = formData.get('password');

		// console.log({ name, email, password });

		// 1:20:35
		const res = await signUpWithCredentials(
			{ name, email, password }
		);

		if (res?.msg) {
			alert(res?.msg);
		}
	}

	return (
		<div>
			<h2>Sign Up With NextAuth</h2>

			<Form action={handleSignUpCredentials} style={{ margin: '30px 0' }}>
				<input
					type="text"
					name='name'
					placeholder='Name'
					required
				/>
				<input
					type="email"
					name='email'
					placeholder='Email'
					required
				/>
				<input
					type="password"
					name='password'
					placeholder='Password'
					required
				/>

				<Button value="Register" />
			</Form>
		</div>
	);
};

export default SignUp;
