import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import sendEmail from "../services/mail.service.js";
import sendResponse from "../helpers/send.response.js";
import crypto from "crypto";

// Verify Email Controller

async function resetPasswordController(req, res) {
  const { email, oldPassword, newPassword } = req.body;

  try {
    if (!email || !oldPassword || !newPassword) {
      return sendResponse(
        res,
        400,
        {},
        true,
        "Email, old password, and new password are required"
      );
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return sendResponse(res, 404, {}, true, "User not found");
    }

    if (oldPassword !== user.password) {
      return sendResponse(res, 401, {}, true, "Old password is incorrect");
    }

    // Hash the new password

    // Update the password and mark it as changed
    user.password = newPassword;
    user.isPasswordChanged = true;

    await user.save();

    sendResponse(res, 200, {}, false, "Password changed successfully");
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, {}, true, "Internal server error");
  }
}

// Login Controller

async function loginController(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login successful", data: user });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
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

    // Generate a random password
    const rawPassword = crypto.randomBytes(8).toString("hex");

    const user = new User({ email, name, cnic, password: rawPassword });
    const newUser = await user.save();

    const token = await jwt.sign(
      { id: user._id, email, name, cnic },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const fullURL = `https://smit-final-frontend-uzair.vercel.app/auth/forgotpassword`;

    // Send email with the temporary password
    const info = await sendEmail(fullURL, name, email, rawPassword);

    console.log("info =>", info);

    sendResponse(
      res,
      201,
      { user: newUser },
      false,
      "Registration successful. We’ve sent an email with your temporary password."
    );
  } catch (error) {
    console.error(error);
    sendResponse(res, 500, {}, true, error.message || "Internal server error");
  }
}

export { resetPasswordController, loginController, registerController };
