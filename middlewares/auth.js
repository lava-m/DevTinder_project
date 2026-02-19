
// middlewares/auth.js

export const adminAuth = (req, res, next) => {
    console.log("Admin auth is getting checked");
    const token = "xyz";
    const isAdminAuthorized = token === "xyz";
  
    if (!isAdminAuthorized) {
      return res.status(401).send("Unauthorized request");
    }
  
    next();
  };
  
  export const userAuth = (req, res, next) => {
    console.log("User auth is getting checked");
    const token = "xyz";
    const isUserAuthorized = token === "xyz";
  
    if (!isUserAuthorized) {
      return res.status(401).send("Unauthorized request");
    }
  
    next();
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