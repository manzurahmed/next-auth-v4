export { default } from "next-auth/middleware"

// 26:53
export const config = {
	matcher:
		[
			"/profile/:path*",
			"/protected/:path*",
			"/dashboard/:path*"
		]
}