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
    FetchUserFollowing,
    DeleteYourPost
} from "../controller/Post.controller.js";
import { authentication } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/', authentication, CreateNewPost);
router.get('/', FetchAllPost);

router.post('/following', authentication, FetchUserFollowing);

router.delete('/deletePost/:id', authentication, DeleteYourPost);

router.patch('/like', authentication, LikePost);
router.patch('/unlike', authentication, UnLikePost);
router.patch('/repost', authentication, RepostAPost);
router.patch('/undoRepost', authentication, UndoRepostAPost);

router.get('/:username/likes', FetchUserPostLiked);
router.get('/:username/:postID', FetchViewedPost);
router.get("/:username", FetchUserPagePost);


export { router as postRouter };