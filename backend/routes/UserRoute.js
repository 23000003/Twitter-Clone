import express from "express";
import User from "../models/User.js";
import { LoginUser, RegisterUser, FetchWhoToFollow, FetchUser, FollowAUser, UnFollowAUser } from "../controller/UserController.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/login', LoginUser);
router.post('/createAccount', RegisterUser);

router.patch('/followUser', auth, FollowAUser);

router.get('/WhoToFollow', auth, FetchWhoToFollow);

router.delete('/unfollowUser/:id', auth, UnFollowAUser);

router.get('/:id', auth, FetchUser)

export { router as userRouter };
