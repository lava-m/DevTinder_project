// import { adminAuth, userAuth } from "./middlewares/auth.js";
import express from "express";
import connectDB from './config/database.js';
import User from './models/user.js';
const app = express();

// starting point of the application
app.post("/signup", async (req,res)=>{
 
  // creating a new instance of the User model
  const user = new User({
    firstName: "Virat",
    lastName: "Saini",
    emailId: "Virat@gmail.com",
    password: "12345",
  });

  await user.save();
  res.send("User added successfully")
});



console.log("Starting a new project");

connectDB()
  .then(()=>{
    console.log("Database connection established...");
    app.listen(3000, () => {
      console.log("Server running on port 3000");
    });
  })
  .catch((err)=>{
    console.log("Database cannot be connected!!");
  });


