
// middlewares/auth.js
import jwt from "jsonwebtoken";
import User from "../models/user.js";

  export const userAuth = async(req, res, next) => {

    try{
      const {token} = req.cookies;

      if(!token){
        throw new Error("Token is not valid!!");
      }

      const decodedObj = await jwt.verify(token, "DEV@Tinder$790");

      const {_id} = decodedObj;

      const user = await User.findById(decodedObj._id);

      if(!user){
        throw new Error("User not found");
        }
        req.user = user;
        next();// move to the next handler
    }
    catch(err){
          res.status(400).send("ERROR:"+ err.message);
    }
};




// export const adminAuth = (req, res, next) => {
//     console.log("xyz");
//     const token = "xyz";
//     const isAdminAuthorized = token === "xyz";
//     if(!isAdminAuthorized){
//         res.status(401).send("Unauthorised request");

//     }else{
//         next();
//     }
// };

// export const userAuth = (req, res, next) => {
//     console.log("User auth is getting checked");
//     const token = "xyz";
//     const isAdminAuthorized = token === "xyz";
//     if(!isAdminAuthorized){
//         res.status(401).send("Unauthorised request");

//     }else{
//         next();
//     }
// };

// module.exports = {
//     adminAuth,
//     userAuth,
// };