import { connect } from "mongoose";

const connectDB = async () => {
  try {
    await connect("mongodb+srv://lavanyamartin1_db_user:QnQxKqK6EBEH6qHz@namastenode.1enlpal.mongodb.net/DevTinder");
    console.log("Database connection established...");
  } catch (err) {
    console.log("Database cannot be connected!", err);
  }
};

export default connectDB;
