import mongoose from "mongoose";

const connect = () => {
  try {
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
  } catch (error) {
    console.log("DB connection error!");
  }
};

export default connect;
