import express, { application } from 'express'
import { authentication } from '../middleware/authMiddleware.js';
import { 
    PostAComment, 
    FetchUsersComments 
} from '../controller/Comment.controller.js';

const router = express.Router();

router.post('/:username/:postID', authentication, PostAComment);
router.get('/:username/with_comments', FetchUsersComments);

export {router as commentRouter};