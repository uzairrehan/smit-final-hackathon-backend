import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import sendEmail from "../services/mail.service.js";
import sendResponse from "../helpers/send.response.js";
import { verifyPageHTML } from "../constants/verification.email.info.js";
import crypto from "crypto";


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
  const { cnic, name, email } = req.body;

  try {
    if (!cnic || !name || !email) {
      return sendResponse(res, 400, {}, true, "All fields are required");
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return sendResponse(res, 409, {}, true, "Email already in use");
    }

    const password = crypto.randomBytes(8).toString('hex');

    const user = new User({ email, name, cnic,password });
    const newUser = await user.save();

    const token = await jwt.sign(
      { id: user._id,  email, name, cnic },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const fullURL = `${process.env.SERVER_URL}/auth/forgot-password?token=${token}`;

    const info = await sendEmail(fullURL,name,email,password);
    
    console.log("info =>",info);
    
    sendResponse(
      res,
      201,
      { user: newUser },
      false,
      "Registration successful .weve sended an email for your user."
    );
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, {}, true, error);
  }
}

export { verifyEmailController, loginController, registerController };
