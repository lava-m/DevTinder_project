// starting point of the application

console.log("Starting a new project");

// imports the Express module into your Node.js program.
// Express is a library.
const express = require('express');

// factory to buid web servers
// start the server
const app = express();

//request handler function
// listening to requests
app.use("/test", (req, res)=>{
    res.send("Response, I love listening to you 1")
});

// use will match all the HTTP method API calls to /test
app.get("/user", (req, res)=>{
    console.log(req.query);
    res.send({ firstName: "Akshay", lastName: "Saini"});
});

app.post("/user", (req, res)=> {
    res.send("Hello from the server");
}) 

app.listen(3000, ()=>{
    console.log("Successfully listening on port 3000");
});

app.delete("/user", (req, res)=>{
    res.send("Delete request");
});

app.put("/user", (req, res)=>{
    res.send("put request");
});

app.patch("/user", (req, res)=>{
    console.log(req.query);
    res.send("Patch request");
});