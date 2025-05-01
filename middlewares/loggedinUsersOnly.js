const  User  = require("../models/User.js");
const { getUser } = require("../services/jwt.js");

async function loggedinUsersOnly(req, res, next) {
  try {
    const userToken = req.headers["token"];
    
    if (!userToken) {
      return res
        .status(401)
        .json({ message: "User not authorised, please login" });
    }
    console.log(userToken);
    const token = userToken.split("Bearer ")[1];
    const userId = getUser(token).id;
    console.log("user is : \n\n"+userId);

    if (!userId) return res.status(401).json({ message: "Invalid user" });

    req.userId = userId;
    console.log("middleware got : "+userId);
    const user = await User.findOne({ where: { id: userId } });
    console.log("passed 2")
    if (!user)
      return res.status(400).json({
        message: "User records not found",
      });

    req.user = user;
      console.log("passed 3")
    next();
  } catch (error) {
    console.log("came here")
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}

module.exports = loggedinUsersOnly;
