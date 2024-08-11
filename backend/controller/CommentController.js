import Post from "../models/Post.js"
import Comment from "../models/Comment.js"
import User from "../models/User.js";

const PostAComment = async (req, res) => {
    const { content, file } = req.body;

    if (!content) {
        return res.status(400).json({ error: "Content Field Required" });
    }

    try {
        const user = await User.findById(req.user._id);

        const newComment = await Comment.create({
            author: user._id,
            content: content,
            content_image: file, 
            date_commented: new Date(),
            likes: 0,
        });

        const postCommented = await Post.findById(req.params.postID);

        if (!postCommented) {
            return res.status(404).json({ error: "Post not found" });
        }

        postCommented.comments.push(newComment._id);
        await postCommented.save();

        res.status(200).json({ newComment, user });

    } catch (err) {
        res.status(500).json({ error: err.message }); // Ensure error response is informative
        console.log(err);
    }
};

const FetchUsersComments = async (req, res) => {

    const username = req.params.username;

    try {
        
        const user = await User.findOne({ username: username });

        if (!user) {
            return res.status(404).json({ error: "User Doesn't Exist" });
        }

        const commentsPost = await Post.find({ comments: { $exists: true, $ne: [] } })
            .sort({ date_created: "desc" })
            .populate({
                path: 'author',
                select: 'username profile_pic'
            })
            .populate({
                path: 'comments',
                match: { author: user._id }, 
                select: 'content date_commented likes',
                populate: {
                    path: 'author',
                    select: 'username profile_pic likes'
                }
            })
            .exec();

        const filteredPosts = commentsPost.filter(post => post.comments.length > 0);

        res.status(200).json(filteredPosts);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};



const DeleteComment = async(req, res) =>{

}

export { PostAComment, DeleteComment, FetchUsersComments }; 