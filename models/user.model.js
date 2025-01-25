import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  cnic: { 
    type: String, 
    unique: true, 
    required: true,
    max:[13,"must be at least 13 characters"],
    min:[13,"must be at least 13 characters"]
  },
  email: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  loanRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'LoanRequest' }],
  isPasswordChanged: { type: Boolean, default: false },
});

const UserModal = mongoose.model('User', userSchema);


export default UserModal