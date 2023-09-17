import SignIn from '@/components/Auth/SignIn'
import React from 'react'

const SignInPage = ({ searchParams: { callbackUrl } }) => {

	// console.log(props);
	/*
	{                                                                         
		params: {},
		searchParams: { callbackUrl: 'http://localhost:3000/protected/server' } 
	}
	**/

	return (
		<SignIn callbackUrl={callbackUrl || "/"} />
	)
}

export default SignInPage