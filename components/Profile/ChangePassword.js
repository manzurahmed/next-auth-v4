
import { changePasswordWithCredentials } from "@/actions/authActions";
import Button from "../Global/Button";
import Form from "../Global/Form";

// 1:52:15
const ChangePassword = () => {

	async function handleChangePassword(formData) {
		const old_pass = formData.get('old_pass');
		const new_pass = formData.get('new_pass');
		console.log({ old_pass, new_pass });

		// 1:55:58
		const res = await changePasswordWithCredentials({ old_pass, new_pass });
		// 2:00:37
		if (res?.msg) {
			alert(res?.msg);
		}
	}


	return (
		<div>
			<h2>Change Password</h2>

			<Form action={handleChangePassword} style={{ margin: '20px 0' }}>
				<input
					type="password"
					name="old_pass"
					placeholder="Old Password"
					required
				/>
				<input
					type="password"
					name="new_pass"
					placeholder="New Password"
					required
				/>

				<Button
					value="Change Password"
				/>
			</Form>
		</div>
	);
};

export default ChangePassword;
