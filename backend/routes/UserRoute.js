import express from "express";
import User from "../models/User.js";
import { LoginUser, RegisterUser, FetchWhoToFollow, FetchUser } from "../controller/UserController.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/login', LoginUser);
router.post('/createAccount', RegisterUser);
router.get('/WhoToFollow', auth, FetchWhoToFollow);
router.get('/:username', FetchUser)

export { router as userRouter };
