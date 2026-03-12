import express from "express";
import validateSignUpData from "../utils/validation.js";
import bcrypt from "bcrypt";
import User from "../models/user.js";


const authRouter = express.Router();

authRouter.post("/signup", async(req, res) => {
    console.log(req.body);
    try{
      // validation of data
      validateSignUpData(req);
      const {firstName, lastName, emailId, password} = req.body;
     
  
      // Encrypt the password/
      const passwordHash = await bcrypt.hash(password, 10);
  
      console.log(passwordHash);
      // creating a new instance of the User model
      
      const newUser = new User({firstName, lastName, emailId, password : passwordHash});
   
      await newUser.save();
      res.send("User added successfully")
    }catch(err){
      res.status(400).send("ERROR 1 :"+ err.message);
    }
  
});

authRouter.post("/login", async(req, res) => {

    try {
        const { emailId, password } = req.body;
    
        const user = await User.findOne({ emailId });
        if (!user) {
          throw new Error("Invalid credentials");
        }
    
        const isPasswordValid = await user.validatePassword(password);
        if (!isPasswordValid) {
          throw new Error("Invalid credentials");
        }
    
        //const token = await jwt.sign({_id: user._id}, "DEV@Tinder$790", {expiresIn: "1d"});
    
        const token = await user.getJWT();
        console.log(token);
    
        res.cookie("token", token);
        res.send("Login successful");
      } catch (err) {
        res.status(400).send("ERROR: " + err.message);
      }
});
export default authRouter;