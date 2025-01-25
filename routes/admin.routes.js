import { Router } from "express";
const router = Router();

router.get("/applications", async (req, res) => {
  try {
    const applications = await LoanRequest.find().populate("userId");
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: "Error fetching applications", error });
  }
});

router.get("/applications/filter", async (req, res) => {
  const { city, country } = req.query;

  try {
    const filteredApplications = await LoanRequest.find({
      "user.city": city,
      "user.country": country,
    });
    res.status(200).json(filteredApplications);
  } catch (error) {
    res.status(500).json({ message: "Error filtering applications", error });
  }
});

export default router;
