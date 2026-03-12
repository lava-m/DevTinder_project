import express from "express";
//import {userAuth} from "./auth.js";

const profileRouter = express.Router();

profileRouter.get("/profile",  async(req, res) => {
    try{
      const user = req.user;
      //res.send("Reading cookie");
      res.send(user);
    }catch(err){
      res.status(400).send("ERROR 2: "+err.message);
    }
});

export default profileRouter;