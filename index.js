import express from "express";
import mongoConnection from "./config/mongo.connection.js";
import authroutes from "./routes/auth.routes.js";
import cors from "cors";
import sendResponse from "./helpers/send.response.js";
import 'dotenv/config'

const app = express();
mongoConnection();

const allowedOrigins = JSON.parse(process.env.CORS_ALLOWED);
const corsOptions = {
  origin: allowedOrigins,
  methods: "GET, POST, PUT, DELETE",
  allowedHeaders: "Content-Type, Authorization",
};

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/auth", authroutes);

app.get("/", (req, res) => {
  res.send("Hello Uzair");
});

app.use((req, res) => {
  sendResponse(res, 400, {}, true, "Page not found");
});

app.listen(process.env.PORT, () => {
  console.log(`App is running on localhost:${process.env.PORT}`);
});
