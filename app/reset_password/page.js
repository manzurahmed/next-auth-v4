import ResetPasswordComponent from '@/components/Auth/ResetPassword'
import React from 'react'

// 2:09:46
const ResetPasswordPage = ({ searchParams: { token } }) => {

	// console.log({ token });

	return (
		<ResetPasswordComponent token={token} />
	)
}

export default ResetPasswordPage