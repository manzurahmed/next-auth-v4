import { updateUser } from "@/actions/authActions";
import Form from "../Global/Form";
import Button from "../Global/Button";

// 54:14
const ProfileUpdate = ({ update }) => {

	// 57:33
	async function handleUpdateProfile(formData) {
		const name = formData.get('name');
		const image = formData.get('image');

		// console.log({ name, image });

		// 1:08:02
		if (update) {
			// when update() is run on client side, the page will re-render
			// server side won't re-render
			update({ name, image });
		}

		// 1:03:28
		const res = await updateUser({ name, image });
		// console.log(res);
		if (res?.msg) {
			alert(res?.msg);
		}
	}

	return (
		<div>
			<h2>Update Profile</h2>

			<Form action={handleUpdateProfile} style={{ margin: '20px 0' }}>
				<input type="text" name="name" placeholder="Name" required />
				<input type="text" name="image" placeholder="Image" required />

				<Button value="Update Profile" />
			</Form>
		</div>
	);
};

export default ProfileUpdate;
