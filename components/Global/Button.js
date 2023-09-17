"use client";

import { experimental_useFormStatus as useFormStatus } from "react-dom";

// 1:04:55
const Button = ({ value, ...props }) => {

	const { pending } = useFormStatus();

	return (
		<button {...props} disabled={pending}>
			{
				pending ? 'Loading...' : value
			}
		</button>
	);
};

export default Button;
