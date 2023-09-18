#  Next-Auth v4 with Nextjs Server Actions, Mongo DB, Mongoose, Google Login, Credentials Login 2023

YouTube Source:
https://www.youtube.com/watch?v=fcySGWgRuu8

# PROJECT SETUP

```bash
npx create-next-app@latest ./

√ Would you like to use TypeScript? ... No
√ Would you like to use ESLint? ... No
√ Would you like to use Tailwind CSS? ... No
√ Would you like to use `src/` directory? ... No
√ Would you like to use App Router? (recommended) ... Yes
√ Would you like to customize the default import alias? ... No

```

# ADDITIONAL PACKAGES

```bash
npm i mongoose next-auth bcrypt jsonwebtoken nodemailer
```

# GENERAL NEXTAUTH SECRET

```bash
openssl rand -base64 32
```

## NextAuth Middleware

https://next-auth.js.org/configuration/nextjs#middleware

# JWT

JSON Web Tokens are an open, industry standard RFC 7519 method for representing claims securely between two parties.

JWT.IO allows you to decode, verify and generate JWT.

https://jwt.io/


# NextAuth with MongoDB(mongoose) + Server Actions

https://github.com/devat-youtuber/next-auth-v4-readme

## Main functions.

  - SignIn with OAuth ( Google )
  - SignIn with Credentials ( Email, Password )
  - SignUp with Name, Email, Password
  - Verify Email
  - Update Profile
  - Change Password
  - Forgot Password
  - Middleware to secure certain pages

## Implementation Guide

4. Header Component and Pages

  - Protected (client, server)
  - Profile (client, server)
  - signin, Signup
  - Admin Dashboard

5. SignIn with OAuth (Google) without Database

  - Import GoogleProvider
  - Access to Google Cloud Console to get (GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET)
    + https://console.cloud.google.com/
    + create a new project
    + APIs & Services => Credentials => CREATE CREDENTIALS => OAuth client ID
      => Web application => Authorized JavaScript origins (http://localhost:3000)
      => Authorized redirect URIs (http://localhost:3000/api/auth/callback/google)

  - SignIn Component
  - Google Login Button

6. SignOut and Middleware keep the site protected
  - SignOut component
  - Middleware
    + export { default } from 'next-auth/middleware'
    + export const config = {
      matcher: ["/profile/:path*", "/protected/:path*", "/dashboard/:path*"]
    }

  - Protected Page Render

7. Setup MongoDB (mongoose)
  - Models (user)
  - Connect to MongoDb

8. SignIn with OAuth (Google) with Database (mongoose)
  - callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async jwt({ token, trigger, session }) {
      return token;
    },
    async session({ session, token }) {
      return session;
    }
  }

  - async signIn => signInWithOAuth
  - async jwt => getUserByEmail
  - async session => session.user = token.user

9. Profile Page Render
  - Profile Component
  - ProfileCard Component
  - nextConfig = {
    images: {
      domains: ["lh3.googleusercontent.com", "images.pexels.com"]
    }
  }

  - restart => npm run dev

10. Update User Profile
  - ProfileUpdate Component
  - Form Component
  - updateUser action
  - Fix Error getServerSession when called from "use client"
  - Button Component

11. Update and Re-Render User Profile
  - update({ name, image }) on Client-Side
  - Fix Re-Render on Server Side
    + The page server side only renders for the first time
    + The next times will not re-render, so we will combine with the client side.
    + The first time will render the server side, the next time will render the client side.

12. Sign Up with Credentials (name, email, password)
  - SignUp Component
  - signUpWithCredentials Action

13. Handle Errors - Errors page

14. Token + Send Email - .env
  - TOKEN_SECRET=YOUR_SECRET ( openssl rand -base64 32 )
  - EMAIL_USER
  - EMAIL_PASSWORD

15. Verify Email to complete the registration
  - Verify Page
  - verifyEmailWithCredentials Action

16. SignIn with Credentials (email, password)
  - import CredentialsProvider
  - async authorize => signInWithCredentials Action

17. Change Password
  - ChangePassword Component
  - userActions => changePassword

18. Forgot Passoword
  - authActions => forgotPasswordWithCredentials

19. Reset Password
  - reset_password page
  - ResetPassword Component
  - authActions => resetPasswordWithCredentials

20. Middleware protect routes based on role Admin

21. Deploy Vercel
  - run build => test
  - push to github
  - deploy vercel
  - config NEXTAUTH_URL in Environment Variables => re-deploy
  - config in Google Cloud Console


VIETNAMESE PHRASES USED IN THIS YOUTUBE TUTORIAL
Bảo mật = Security
mật khẩu ứng dụng = application password
mật khẩu umg dung cua ban = Your user password
Chon umg dung va thiet bi ban muon tao mat khau umg dung = Select the usage and design you want to create
TAO = CREATE
Tài khoản = Account

## Generated app password

https://myaccount.google.com/u/1/apppasswords

Your app password for your device

```bash
wrzp fbbp kqec qecz
```

**How to use it**

Go to the settings for your Google Account in the application or device you are trying to set up. Replace your password with the 16-character password shown above.

Just like your normal password, this app password grants complete access to your Google Account. You won't need to remember it, so don't write it down or share it with anyone.
