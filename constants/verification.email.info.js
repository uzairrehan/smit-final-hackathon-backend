const subject = "Verify Your Email Address";

const verificationEmailHTML = (verificationLink, username) => {
  return `<!DOCTYPE html>
    <html>
    <head>
      <title>Email Verification</title>
    </head>
    <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; margin: 0; padding: 0;">
      <table align="center" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; border: 1px solid #ddd; border-radius: 8px; overflow: hidden; margin-top: 20px;">
        <tr>
          <td style="padding: 20px; text-align: center; background-color: #007bff; color: #ffffff; font-size: 24px; font-weight: bold;">
            Verify Your Email
          </td>
        </tr>
        <tr>
          <td style="padding: 20px; color: #333333; font-size: 16px; line-height: 1.5;">
            <p>Dear ${username},</p>
            <p>Thank you for signing up! To complete your registration, please verify your email address by clicking the button below:</p>
            <p style="text-align: center; margin: 20px 0;">
              <a href=${verificationLink} style="background-color: #007bff; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 4px; display: inline-block; font-weight: bold;">Verify Email</a>
            </p>
            <p>If the button doesn't work, copy and paste the following link into your browser:</p>
            <p style="word-break: break-word; color: #007bff;">${verificationLink}</p>
            <p>If you did not sign up, you can safely ignore this email.</p>
            <p>Best regards,<br>Uzair Rehan</p>
          </td>
        </tr>
        <tr>
          <td style="padding: 10px; text-align: center; background-color: #f1f1f1; color: #666666; font-size: 12px;">
            &copy; 2025 Uzair Rehan. All rights reserved.
          </td>
        </tr>
      </table>
    </body>
    </html>
    `;
};

const verifyPageHTML = (username) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Verified</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      text-align: center;
      background-color: #f9f9f9;
      padding: 20px;
      margin: 0;
    }
    .container {
      max-width: 500px;
      margin: 50px auto;
      padding: 20px;
      background-color: #ffffff;
      border: 1px solid #ddd;
      border-radius: 8px;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }
    .header {
      background-color: #007bff;
      color: #ffffff;
      padding: 20px;
      font-size: 24px;
      font-weight: bold;
      border-radius: 8px 8px 0 0;
    }
    .emoji {
      font-size: 50px;
      margin: 20px 0;
    }
    .title {
      font-size: 22px;
      color: #333333;
      margin-bottom: 10px;
    }
    .description {
      font-size: 16px;
      color: #333333;
      margin-bottom: 30px;
      line-height: 1.5;
    }
    .btn {
      display: inline-block;
      padding: 12px 24px;
      font-size: 16px;
      color: #ffffff;
      background-color: #007bff;
      text-decoration: none;
      border-radius: 4px;
      font-weight: bold;
      transition: background-color 0.3s ease;
    }
    .btn:hover {
      background-color: #0056b3;
    }
    .footer {
      margin-top: 20px;
      font-size: 12px;
      color: #666666;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">Email Verification</div>
    <div class="emoji">🎉</div>
    <div class="title">${username} Your Email Has Been Verified!</div>
    <div class="description">
      Thank you for verifying your email address. You can now access all features of your account.
    </div>
    <a href="/dashboard" class="btn">Go to Dashboard</a>
    <div class="footer">&copy; 2025 Uzair Rehan. All rights reserved.</div>
  </div>
</body>
</html>

`;
};

export { verificationEmailHTML, subject, verifyPageHTML };
