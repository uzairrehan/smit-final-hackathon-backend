import mongoose from "mongoose";

function createConnection() {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((e) => {
      console.log("Cant connect to Database");
      console.log(e);
    });
}

export default createConnection;
