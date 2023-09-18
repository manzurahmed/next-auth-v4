import nodemailder from 'nodemailer';
import { html } from './htmlEmails';

// 1:28:48
const sendEmail = async ({ to, url, text }) => {
	const transporter = nodemailder.createTransport({
		service: 'gmail',
		auth: {
			user: process.env.EMAIL_USER,
			pass: process.env.EMAIL_PASSWORD
		}
	});

	const mailOptions = {
		from: process.env.EMAIL_USER,
		to,
		subject: 'DevAT-VietNam | NextAuthV4',
		html: html({ url, text })
	}

	const result = await transporter.sendMail(mailOptions);

	return result;
}

export default sendEmail;