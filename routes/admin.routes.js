// Express API Routes
import { Router } from "express";
import LoanRequest from "../models/loan.model.js"; // Ensure you have this model defined properly
import User from "../models/loan.model.js"; // Ensure you have this model if `userId` refers to this

const router = Router();

// Get all loan applications
router.get("/applications", async (req, res) => {
  try {
    const applications = await LoanRequest.find().populate("userId");
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: "Error fetching applications", error });
  }
});

// Filter applications by city and country
router.get("/applications/filter", async (req, res) => {
  const { city, country } = req.query;

  try {
    const filteredApplications = await LoanRequest.find({
      "user.city": city,
      "user.country": country,
    }).populate("userId");
    res.status(200).json(filteredApplications);
  } catch (error) {
    res.status(500).json({ message: "Error filtering applications", error });
  }
});

// Get total applications count
router.get("/applications/count", async (req, res) => {
  try {
    const totalApplications = await LoanRequest.countDocuments();
    res.status(200).json({ totalApplications });
  } catch (error) {
    res.status(500).json({ message: "Error fetching total applications count", error });
  }
});

// Get pending approvals count
router.get("/applications/pending", async (req, res) => {
  try {
    const pendingApplications = await LoanRequest.countDocuments({ status: "pending" });
    res.status(200).json({ pendingApplications });
  } catch (error) {
    res.status(500).json({ message: "Error fetching pending applications count", error });
  }
});

// Get total loans disbursed amount
router.get("/applications/disbursed", async (req, res) => {
  try {
    const totalDisbursed = await LoanRequest.aggregate([
      { $match: { status: "approved" } },
      { $group: { _id: null, total: { $sum: "$loanAmount" } } },
    ]);

    res.status(200).json({
      totalDisbursed: totalDisbursed[0]?.total || 0,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching total disbursed amount", error });
  }
});

export default router;
