import express from "express";
import mongoConnection from "./config/mongo.connection.js";
import authroutes from "./routes/auth.routes.js";
import loanRoutes from "./routes/loans.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import cors from "cors";
import sendResponse from "./helpers/send.response.js";
import "dotenv/config";

const app = express();
mongoConnection();



app.use(cors("*"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/auth", authroutes);
app.use("/loans", loanRoutes);
app.use("/admin", adminRoutes);

app.get("/", (req, res) => {
  res.send("Hello Uzair");
});

app.use((req, res) => {
  sendResponse(res, 400, {}, true, "Page not found");
});

app.listen(process.env.PORT, () => {
  console.log(`App is running on localhost:${process.env.PORT}`);
});
