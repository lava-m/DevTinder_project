// import { adminAuth, userAuth } from "./middlewares/auth.js";
import express from "express";
import connectDB from './config/database.js';
import User from './models/user.js';
import validateSignUpData from "./utils/validation.js";

const app = express();


// Adding middleware that converts data(json) sent by postman to JS object.
app.use(express.json());



// starting point of the application
app.post("/signup", async (req,res)=>{
  console.log(req.body);
  try{
  validateSignUpData(req);
 
  // creating a new instance of the User model
  const user = new User(req.body);

 
    await user.save();
    res.send("User added successfully")
  }catch(err){
    res.status(400).send("ERROR:"+ err.message);
  }

});


app.get("/user", async(req,res)=> {
  const userEmail = req.body.emailId;

  try{
    const users = await User.findOne({emailId : userEmail});

    if(users.length === 0){
      res.status(404).send("User not found");
    }else{
      res.send(users);
    }  
  }
  catch(err){
    res.status(400).send("Something went wrong");
  }

});


app.get("/feed", async(req, res)=>{
  const users = req.body.emailId;
  
  try{
    const users = await User.find({});

    if(users.length === 0){
      res.status(404).send("User not found");
    }else{
      res.send(users);
    }  
  }
  catch(err){
    res.status(400).send("Something went wrong");
  }
 
})




app.patch("/user1/:userId", async(req,res) => {
  const userId = req.params?.userId;
  const data = req.body;
  const emailId = req.body.emailId;

  console.log(req.body);
  const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "firstName", "userId"];

  const isUpdateAllowed = Object.keys(data).every((k)=>
  ALLOWED_UPDATES.includes(k));

  // if(emailId.includes("@")){
  //   console.log("Good");
  // }else{
  //   console.log("Email Id not in correct format");
  //   res.send("Email Id not in correct format");
  // };

  if (!emailId.includes("@")) {
    return res.status(400).send("Email ID not in correct format");
  }

  if(!isUpdateAllowed){
    res.status(400).send("Update not allowed");
  }

  if(data?.skills >= 10){
    throw new Error("Update not allowed due to skills exceeding the limit");
  }
  try{
    const user = await User.findByIdAndUpdate({_id : userId}, data, {
    returnDocument: "after",
    runValidators: "true"
    })
    res.send(user);
  }catch(err){
    res.send("Something went wrong");
  }

} )




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


