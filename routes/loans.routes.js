import qrcode from "qrcode";
import { Router } from "express";
const router = Router();
import LoanRequest from "../models/loan.model.js"
router.post("/addloan", async (req, res) => {
  const {
    userId,
    category,
    subcategory,
    maxLoanAmount,
    depositAmount,
    repaymentPeriod,
  } = req.body;

  try {
    const monthlyInstallment =
      (maxLoanAmount - depositAmount) / (repaymentPeriod * 12);

    const loanRequest = await LoanRequest.create({
      userId,
      category,
      subcategory,
      maxLoanAmount,
      depositAmount,
      repaymentPeriod,
      monthlyInstallment,
    });

    res
      .status(201)
      .json({ message: "Loan request submitted successfully", loanRequest });
  } catch (error) {
    res.status(400).json({ message: "Error submitting loan request", error });
  }
});

router.post("/:loanId/guarantors", async (req, res) => {
  const { loanId } = req.params;
  const { guarantors, documents } = req.body;

  try {
    const loanRequest = await LoanRequest.findById(loanId);
    loanRequest.guarantors = guarantors;
    loanRequest.documents = documents;
    await loanRequest.save();

    res
      .status(200)
      .json({
        message: "Guarantors and documents added successfully",
        loanRequest,
      });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error adding guarantors/documents", error });
  }
});

router.get("/:loanId/generate-slip", async (req, res) => {
  const { loanId } = req.params;

  try {
    const loanRequest = await LoanRequest.findById(loanId);

    // Generate token number
    const tokenNumber = `TOKEN-${Date.now()}`;
    loanRequest.tokenNumber = tokenNumber;

    // Generate QR code
    const qrData = {
      tokenNumber,
      appointment: loanRequest.appointment,
    };
    const qrCode = await qrcode.toDataURL(JSON.stringify(qrData));

    loanRequest.qrCode = qrCode;
    await loanRequest.save();

    res
      .status(200)
      .json({ message: "Slip generated successfully", tokenNumber, qrCode });
  } catch (error) {
    res.status(400).json({ message: "Error generating slip", error });
  }
});

export default router;
