import { adminAuth, userAuth } from "./middlewares/auth.js";
import express from "express";

// starting point of the application

console.log("Starting a new project");

// imports the Express module into your Node.js program.
// Express is a library.
//const express = require('express');
//const { userAuth } = require('./middlewares/auth');

// factory to buid web servers
// start the server
const app = express();

// const{ adminAuth, userAuth} = require("./middlewares/auth");

//request handler function
// listening to requests
app.use("/test", (req, res)=>{
    res.send("Response, I love listening to you 1")
});

app.use("/admin/getAllUsers", (req, res)=>{
    const token = "acdscsd";
    const adminAuth = token === "abc";

    if(adminAuth){
        console.log("Admin authorized");
    }else{
        res.status(401).send("Access denied");
    }
})

// Error handling
app.use("/", (err, req, res, next) => {
    if(err){
        res.status(500).send("Something went wrong");
    }
});

app.get("/getUserData", (req, res) => {
    throw new Error("abc");
    res.send("User Data sent");
})

// app.use("/", (err, req, res, next) => {
//     if(err){
//         res.status(500).send("Something went wrong");
//     }
// });



// Multiple route handlers
// app.get("/user", userAuth, (req, res) =>{
//     //console.log("Response 1");
//     res.send("User Authorized data");
//     //next();
// },
// );

// * means any character
// $ means stop
app.get("/*abc$", (req, res)=>{
    console.log(req.query);
    res.send({ firstName: "Akshay", lastName: "Saini"});
});
app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
