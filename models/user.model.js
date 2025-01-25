import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: [5, "Password must be at least 5 characters"],
  },
  verified: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("users", userSchema);
export default User;
