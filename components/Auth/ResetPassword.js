"use client";

import { resetPasswordWithCredentials } from "@/actions/authActions";
import Button from "../Global/Button"
import Form from "../Global/Form"

// 2:10:22
const ResetPasswordComponent = ({ token }) => {

	async function handleResetPassword(formData) {
		const password = formData.get('password');
		// console.log({ password });

		// 2:13:40
		const res = await resetPasswordWithCredentials({ token, password });

		if (res?.msg) {
			alert(res?.msg);
		}
	}


	return (
		<div>
			<h1>Reset Password</h1>

			<Form action={handleResetPassword}>
				<input type="password" name="password" placeholder="Password" required />

				<Button value="Reset Password" />
			</Form>
		</div>
	)
}

export default ResetPasswordComponent