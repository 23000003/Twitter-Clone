import express from "express";
import { 
    CreateNewPost, 
    FetchAllPost, 
    FetchUserPagePost, 
    FetchUserPostLiked, 
    FetchViewedPost,
    LikePost, 
    RepostAPost, 
    UndoRepostAPost, 
    UnLikePost,
    FetchUserFollowing
} from "../controller/PostController.js";
import auth from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/', auth, CreateNewPost);
router.get('/', FetchAllPost);

router.post('/following', auth, FetchUserFollowing);

router.patch('/like', auth, LikePost);
router.patch('/unlike', auth, UnLikePost);
router.patch('/repost', auth, RepostAPost);
router.patch('/undoRepost', auth, UndoRepostAPost);

router.get('/:username/likes', FetchUserPostLiked);
router.get('/:username/:postID', FetchViewedPost);
router.get("/:username", FetchUserPagePost);


export { router as postRouter };