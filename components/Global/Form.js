"use client";

import { useRef } from "react";

// 54:37
const Form = ({ action, ...props }) => {

	/**
	 * The useRef Hook allows you to persist values between renders.
	 * It can be used to store a mutable value that does not cause a re-render when updated.
	 * It can be used to access a DOM element directly.
	 * useRef() only returns one item. It returns an Object called current.
	 */
	const formRef = useRef();

	async function handleAction(formData) {
		await action(formData);
		formRef.current.reset();
	}

	return (
		<form {...props} ref={formRef} action={handleAction} />
	);
};

export default Form;
