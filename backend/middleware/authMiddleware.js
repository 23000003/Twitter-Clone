import jwt from "jsonwebtoken";
import User from "../models/User.js";

const auth = async (req, res, next) => {
  
  const { authorization } = req.headers;
  
  if (!authorization) {
    return res.status(401).json({ error: "Authorization token not found" });
  }
  // take away the "Bearer" word for tokenm
  const token = authorization.split(" ")[1];

  try {
   
    const { _id } = jwt.verify(token, process.env.SECRET);
    
    req.user = await User.findById(_id).select("_id");

    next(); //means go to the next parameter/middleware in the router

  } catch (error) {
    res.status(401).json({ error: error.message });
  }

};

export default auth