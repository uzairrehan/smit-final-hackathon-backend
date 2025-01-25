import mongoose from "mongoose";

const loanRequestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  maxLoanAmount: { type: Number, required: true },
  depositAmount: { type: Number, required: true },
  repaymentPeriod: { type: Number, required: true },
  monthlyInstallment: { type: Number, required: true },
  guarantors: [
    {
      name: String,
      email: String,
      location: String,
      cnic: String,
    },
  ],
  documents: {
    salarySlip: String,
    bankStatement: String,
  },
  appointment: {
    date: Date,
    time: String,
    officeLocation: String,
  },
  tokenNumber: String,
  qrCode: String,
});

const LoanRequest = mongoose.model("LoanRequest", loanRequestSchema);

export default LoanRequest;
