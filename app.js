// import { adminAuth, userAuth } from "./middlewares/auth.js";
import express from "express";
import connectDB from './config/database.js';
import User from './models/user.js';
import validateSignUpData from "./utils/validation.js";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import {userAuth} from "./middlewares/auth.js";
import authRouter from "./routes/auth.js";
import profileRouter from "./routes/profile.js";
import requestsRouter from "./routes/requests.js";

const app = express();

// Adding middleware that converts data(json) sent by postman to JS object.
app.use(express.json());
// Adding middleware, parses it into a neat JavaScript object
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestsRouter);

// starting point of the application
// app.post("/signup", async (req,res)=>{
//   console.log(req.body);
//   try{
//     // validation of data
//     validateSignUpData(req);
//     const {firstName, lastName, emailId, password} = req.body;
   

//     // Encrypt the password/
//     const passwordHash = await bcrypt.hash(password, 10);

//     console.log(passwordHash);
//     // creating a new instance of the User model
    
//     const user = new User({firstName, lastName, emailId, password : passwordHash});
 
//     await user.save();
//     res.send("User added successfully")
//   }catch(err){
//     res.status(400).send("ERROR:"+ err.message);
//   }

// });

// const authRouter = require("./routes/auth");
// const profileRouter = require("./routes/profile.js");
// const requestsRouter = require("./routes/requests.js");

// app.get("/user", async(req,res)=> {
//   const userEmail = req.body.emailId;

//   try{
//     const users = await User.findOne({emailId : userEmail});

//     if(users.length === 0){
//       res.status(404).send("User not found");
//     }else{
//       res.send(users);
//     }  
//   }
//   catch(err){
//     res.status(400).send("Something went wrong");
//   }

// });


// app.get("/feed", async(req, res)=>{
//   const users = req.body.emailId;
  
//   try{
//     const users = await User.find({});

//     if(users.length === 0){
//       res.status(404).send("User not found");
//     }else{
//       res.send(users);
//     }  
//   }
//   catch(err){
//     res.status(400).send("Something went wrong");
//   }
 
// })




// app.patch("/user1/:userId", async(req,res) => {
//   const userId = req.params?.userId;
//   const data = req.body;
//   const emailId = req.body.emailId;

//   console.log(req.body);
//   const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "firstName", "userId"];

//   const isUpdateAllowed = Object.keys(data).every((k)=>
//   ALLOWED_UPDATES.includes(k));

//   // if(emailId.includes("@")){
//   //   console.log("Good");
//   // }else{
//   //   console.log("Email Id not in correct format");
//   //   res.send("Email Id not in correct format");
//   // };

//   if (!emailId.includes("@")) {
//     return res.status(400).send("Email ID not in correct format");
//   }

//   if(!isUpdateAllowed){
//     res.status(400).send("Update not allowed");
//   }

//   if(data?.skills >= 10){
//     throw new Error("Update not allowed due to skills exceeding the limit");
//   }
//   try{
//     const user = await User.findByIdAndUpdate({_id : userId}, data, {
//     returnDocument: "after",
//     runValidators: "true"
//     })
//     res.send(user);
//   }catch(err){
//     res.send("Something went wrong");
//   }

// } )

// console.log("Starting a new project");

connectDB()
  .then(()=>{
    console.log("Database connection established...");
    app.listen(7777, () => {
      console.log("Server running on port 7777");
    });
  })
  .catch((err)=>{
    console.log("Database cannot be connected!!");
});

// // app.post("/login", async(req, res)=>{
// //    try{
// //       const {emailId, password} = req.body;

// //       const user = await User.findOne({emailId : emailId})
// //       if(user){
// //         console.log("User email exist")
// //       }else{
// //         console.log("User email does not exist")
// //       }

// //       const isPasswordValid = await bcrypt.compare(password, user.password);

// //       if(isPasswordValid){
// //         res.send("Login successful");
// //       }else{
// //         throw new Error("Password is not correct");
// //       }
// //    }catch(err){
// //     res.status(400).send("ERROR: " + err.message);
// //    }

// // })

// // app.post("/login", async (req, res) => {
// //   try {
// //     const { emailId, password } = req.body;

// //     const user = await User.findOne({ emailId });
// //     if (!user) {
// //       throw new Error("Invalid credentials");
// //     }

// //     const isPasswordValid = await user.validatePassword(password);
// //     if (!isPasswordValid) {
// //       throw new Error("Invalid credentials");
// //     }

// //     //const token = await jwt.sign({_id: user._id}, "DEV@Tinder$790", {expiresIn: "1d"});

// //     const token = await user.getJWT();
// //     console.log(token);

// //     res.cookie("token", token);
// //     res.send("Login successful");
// //   } catch (err) {
// //     res.status(400).send("ERROR: " + err.message);
// //   }
// // });


// app.get("/profile", userAuth, async(req, res) => {
//   try{
//     const user = req.user;
//     //res.send("Reading cookie");
//     res.send(user);
//   }catch(err){
//     res.status(400).send("ERROR : "+err.message);
//   }
// });

// app.post("/sendUserConnection", userAuth, async(req, res)=>{
//   const user = req.user;

//   console.log("Sending user connection");

//   res.send(user.firstName + "sent the connect request!");
// });
