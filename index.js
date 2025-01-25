import express from "express";
import mongoConnection from "./config/mongo.connection.js";
import authroutes from "./routes/auth.routes.js";
import cors from "cors"
import sendResponse from "./helpers/send.response.js";
const app = express();
mongoConnection();

const PORT = process.env.PORT


app.use(cors("*"))
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/authentication" ,authroutes)


app.get("/",(req,res)=>{
  res.send("Hello Uzair")
})



app.use((req, res) => {
     sendResponse(res, 400, {}, true,  "Page not found");
});

app.listen(PORT, () => {
  console.log(`App is running on localhost:${PORT}`);
});