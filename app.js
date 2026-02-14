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
    res.send("Response, I love listening to you")
});

app.listen(3000, ()=>{
    console.log("Successfully listening on port 3000");
});