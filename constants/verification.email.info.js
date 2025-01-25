const subject = "Email";

const verificationEmailHTML = (fullURL,name,email,password) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body {
      font-family: 'Arial', sans-serif;
      background-color: #f9f9f9;
      color: #333;
      margin: 0;
      padding: 0;
    }
    .email-container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #fff;
      padding: 30px;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    }
    .header {
      text-align: center;
      font-size: 28px;
      color: #4CAF50;
      margin-bottom: 20px;
    }
    .content {
      font-size: 16px;
      line-height: 1.6;
      margin-bottom: 30px;
      color: #333;
    }
    .content p {
      margin-bottom: 15px;
    }
    .content ul {
      margin: 0;
      padding-left: 20px;
    }
    .content ul li {
      margin-bottom: 10px;
    }
    .button {
      display: inline-block;
      background-color: #4CAF50;
      color: #fff;
      padding: 12px 30px;
      text-decoration: none;
      font-size: 18px;
      border-radius: 5px;
      text-align: center;
      margin-top: 20px;
    }
    .button:hover {
      background-color: #45a049;
    }
    .footer {
      text-align: center;
      font-size: 14px;
      color: #777;
      margin-top: 30px;
    }
    .footer p {
      margin: 0;
    }
  </style>
  <title>Password Reset Email</title>
</head>
<body>
  <div class="email-container">
    <div class="header">Saylani Microfinance</div>
    <div class="content">
      <p>Dear ${name},</p>
      <p>We have successfully created an account for you with the following credentials:</p>
      <ul>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Temporary Password:</strong> ${password}</li>
      </ul>
      <p>Please use the temporary password above to log in.</p>
      <p>To reset your password, click the link below:</p>
      <a href="${fullURL}" class="button">Reset Password</a>
    </div>
    <div class="footer">
      <p>If you did not request this email, please ignore it.</p>
      <p>&copy; 2025 Saylani Microfinance</p>
    </div>
  </div>
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
