import jwt from 'jsonwebtoken';

// 1:26:33

export const generateToken = (payload) => {
	return jwt.sign(
		payload,
		process.env.TOKEN_SECRET,
		{
			expiresIn: '1d'
		}
	);
}

export const verifyToken = (token) => {
	return jwt.verify(
		token,
		process.env.TOKEN_SECRET
	);
}