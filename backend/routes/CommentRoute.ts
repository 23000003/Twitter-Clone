import express, { application } from 'express'
import auth from '../middleware/authMiddleware.js'
import { PostAComment, FetchUsersComments } from '../controller/CommentController.js';

const router = express.Router();

router.post('/:username/:postID', auth, PostAComment);
router.get('/:username/with_comments', FetchUsersComments);

export {router as commentRouter};