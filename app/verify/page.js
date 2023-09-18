// 1:37:50

import { verifyWithCredentials } from "@/actions/authActions"


const VerifyPage = async ({ searchParams: { token } }) => {

	// console.log({ token })

	const res = await verifyWithCredentials(token);

	return (
		<div>
			<h1 style={{ color: 'green' }}>{res?.msg}</h1>
		</div>
	)
}

export default VerifyPage