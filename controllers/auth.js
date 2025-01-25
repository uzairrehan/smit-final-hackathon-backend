import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import sendVerificationEmail from "../services/mail.service.js";
import sendResponse from "../helpers/send.response.js";
import { verifyPageHTML } from "../constants/verification.email.info.js";

// Verify Email Controller
async function verifyEmailController(req, res) {
  try {
    const { token } = req.query;

    if (!token) {
      return sendResponse(res, 400, {}, true, "Token is required");
    }
    let userID = "";
    let usernamee = "";
    try {
      let { id, username } = jwt.verify(token, process.env.JWT_SECRET);
      userID = id;
      usernamee = username;
    } catch (err) {
      console.error("JWT verification failed:", err.message);
      return sendResponse(res, 400, {}, true, "Invalid or expired token");
    }
    const user = await User.findOneAndUpdate(
      { _id: userID },
      { verified: true },
      { new: true }
    );

    if (!user) {
      return sendResponse(res, 404, {}, true, "User not found");
    }

    res.send(verifyPageHTML(usernamee));
  } catch (error) {
    console.error(error);
    sendResponse(res, 400, {}, true, error.message || "Verification failed");
  }
}

// Login Controller
async function loginController(req, res) {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return sendResponse(
        res,
        400,
        {},
        true,
        "Email and password are required"
      );
    }

    const user = await User.findOne({ email });

    if (!user) {
      return sendResponse(res, 404, {}, true, "User not found");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return sendResponse(res, 401, {}, true, "Invalid credentials");
    }

    // Generate JWT for login
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    sendResponse(res, 200, { user, token }, false, "Login successful");
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, {}, true, "Internal server error");
  }
}

// Register Controller
async function registerController(req, res) {
  const { email, username, password } = req.body;

  try {
    if (!email || !username || !password) {
      return sendResponse(res, 400, {}, true, "All fields are required");
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return sendResponse(res, 409, {}, true, "Email already in use");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ email, username, password: hashedPassword });
    const newUser = await user.save();

    // Generate verification token
    const token = jwt.sign(
      { id: user._id, username: username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const fullURL = `${process.env.SERVER_URL}/auth/verify-email?token=${token}`;

    await sendVerificationEmail(email, fullURL, username);

    sendResponse(
      res,
      201,
      { user: newUser },
      false,
      "Registration successful. Please verify your email."
    );
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, {}, true, "Internal server error");
  }
}

export { verifyEmailController, loginController, registerController };
