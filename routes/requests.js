
import express from "express";

const requestsRouter  = express.Router();

requestsRouter.post("/sendConnectionRequest",  async(req, res)=>{
    const user = req.user;
    console.log("sending connection request");

    res.send(user.firstName + "sent the connect request");
});

export default requestsRouter;