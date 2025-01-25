import {
  verificationEmailHTML,
  subject,
} from "../constants/verification.email.info.js";
import transporter from "../config/nodemailer.connection.js";

async function sendVerificationEmail(to, verificationLink, username) {
  const mailOptions = {
    from: `Verification Email ${process.env.SENDER_EMAIL}`,
    to: to,
    subject: subject,
    html: verificationEmailHTML(verificationLink, username),
  };

  const info = transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.error(error);
    }
    console.log(info);
  });
  console.log(info);
  return info;
}

export default sendVerificationEmail;
