import express from "express";
import mongoose from "mongoose";

const app = express();
const port = 5000;

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Connected successfully on port ${port}`);
});

mongoose
  .connect(
    "mongodb+srv://sivams20:miqRt0CcROUNAhx0@expensetrackcluster.lvlsc.mongodb.net/?retryWrites=true&w=majority&appName=expenseTrackCluster"
  )
  .then(() => {
    console.log("Connected to database !!");
  })
  .catch((err: any) => {
    console.log("Connection failed! " + err);
  });
