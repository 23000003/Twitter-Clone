import jwt, { JwtPayload } from "jsonwebtoken";
import User from "../models/User.js";
import { NextFunction, Request, Response } from "express";
import { UserType } from "../types/modelTypes.js";

declare global {
  namespace Express {
      interface Request {
          user: UserType | null;
      }
  }
}

const auth = async (req: Request, res: Response, next: NextFunction) => {
  
  const { authorization } = req.headers;
  
  if (!authorization) {
    return res.status(401).json({ 
      error: "Authorization token not found" 
    });
  }
  // take away the "Bearer" word for tokenm
  const token = authorization.split(" ")[1];

  try {
    jwt.verify(token, process.env.SECRET, (err: any, user : any) : Response | void => {
        if (err) return res.status(403).send('Invalid token');
        
        (async () => {
          req.user = await User.findById(user._id).select("_id");

          if(req.user === null){
            return res.status(404).send("User Not Found");
          }else{
            next();
          }
        })
    });

  } catch (error) {
    res.status(401).json({ 
      error: (error as Error).message 
    });
  }

};

export default auth