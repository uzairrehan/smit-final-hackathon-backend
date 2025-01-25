import {
  verificationEmailHTML,
  subject,
} from "../constants/verification.email.info.js";
import transporter from "../config/nodemailer.connection.js";

async function sendVerificationEmail(fullURL,name,email,password) {
  const mailOptions = {
    from: `Verification Email ${process.env.SENDER_EMAIL}`,
    to: email,
    subject: subject,
    html: verificationEmailHTML(fullURL,name,email,password),
  };

  const info = transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.error(error);
    }
    console.log("info=", info)
    return info
  });
}

export default sendVerificationEmail;
  