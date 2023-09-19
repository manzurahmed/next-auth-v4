/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		serverActions: true
	},
	images: {
		domains:
			[
				"lh3.googleusercontent.com",
				"images.pexels.com",
				"drive.google.com"
			]
	}
}

module.exports = nextConfig
