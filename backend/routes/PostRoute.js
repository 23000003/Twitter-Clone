import express from "express";
import { 
    CreateNewPost, 
    FetchAllPost, 
    FetchUserPagePost, 
    FetchUserPostLiked, 
    FetchViewedPost,
    LikePost, 
    UnLikePost
} from "../controller/PostController.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/', auth, CreateNewPost);
router.get('/', FetchAllPost);
router.patch('/like', auth, LikePost);
router.patch('/unlike', auth, UnLikePost);
router.get('/:username/likes', FetchUserPostLiked);
router.get('/:username/:postID', FetchViewedPost);
router.get("/:username", FetchUserPagePost);


export { router as postRouter };