import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/User.js";
import { NextFunction, Request, Response } from "express";


export const authentication = async (
  req: Request, 
  res: Response, 
  next: NextFunction
) =>  {
  
  const { authorization } = req.headers;
  
  if (!authorization) {
    res.status(401).json({ 
      error: "Authorization token not found" 
    });
    return;
  }
  // take away the "Bearer" word for tokenm
  const token = authorization.split(" ")[1];

  try {
    jwt.verify(token, process.env.SECRET, (err: any, user : any) : Response | void => {
        if (err){
          res.status(403).send('Invalid token');
          return;
        }
        const checkUser = async () => {
          req.user = await User.findById(user._id).select("_id");

          if(req.user === null){
            res.status(404).send("User Not Found");
            return;
          }else{
            next();
          }
        }
        checkUser();
    });
  } catch (error) {
    res.status(401).json({ 
      error: (error as Error).message 
    });
  }

};
