// export { default } from "next-auth/middleware";

// 2:16:33
import { withAuth } from "next-auth/middleware";
// next-auth.js.org/configuration/nextjs#middleware
// 2:20:16
import { NextResponse } from "next/server";

// 2:16:46
export default withAuth(
	// `withAuth` augments your `Request` with the user's token.
	function middleware(req) {
		// console.log(req.nextauth.token)
		// console.log({ req });
		console.log(req.nextUrl);
		// 2:18:36
		const { pathname, origin } = req.nextUrl;
		const { token } = req.nextauth;
		// console.log({ pathname, origin, token });
		// console.log("Pathname: ", { pathname }); // pathname: '/dashboard',

		// যদি pathname "/dashboard" দিয়ে শুরু হয় এবং
		// ইউজারের রোল যদি "admin" না হয় তবে, যে কোন URL এ রিডিরেক্ট করে দাও।
		// অথবা, ইরর মেসেজ দেখাও
		if (pathname.startsWith('/dashboard') &&
			token?.user?.role !== 'admin'
		) {
			// return NextResponse.redirect(origin);
			return new NextResponse('You are now authorized!');
		}
	},
	{
		callbacks: {
			authorized: ({ token }) => {
				// console.log(!!token); // returns "true" // 2:17:35
				return !!token; // true => middleware() is run
			},
		},
	}
)

// 26:53
export const config = {
	matcher:
		[
			"/profile/:path*",
			"/protected/:path*",
			"/dashboard/:path*"
		]
}