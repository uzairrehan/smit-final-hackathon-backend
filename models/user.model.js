import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  cnic: { 
    type: String, 
    unique: true, 
    required: true,
    validate: {
      validator: function(value) {
        // Ensure the CNIC is exactly 13 characters
        return value.length === 13;
      },
      message: 'CNIC must be exactly 13 characters long.'
    }
  },
  email: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  loanRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'LoanRequest' }],
  isPasswordChanged: { type: Boolean, default: false },
});

const UserModal = mongoose.model('User', userSchema);


export default UserModal