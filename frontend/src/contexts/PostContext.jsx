import { createContext, useState, useEffect } from "react";
import { getAllPosts } from '../controller/PostController'
import { socket } from "../components/hooks/socketInit";

export const PostContext = createContext();

const PostProvider = ({ children }) => {
  
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() =>{
    //For fancyness loading animation
    setTimeout(async () => {
        const data = await getAllPosts();
        setPost(data.data.posts);
        setLoading(false);
        console.log("CHECK")
      }, 1000);

    const handleLikeEvent = ({ data }) => { // unlike and like 
      setPost((prevPosts) =>
        prevPosts.map(post =>
          post._id === data._id ? { ...post, likes: data.likes } : post
        )
      );
      console.log(data);
    };

    const handleRepostEvent = ({ data }) => { // repost and unrepost
      setPost((prevPosts) =>
        prevPosts.map(post =>
          post._id === data._id ? { ...post, reposted_by: data.reposted_by } : post
        )
      );
      console.log(data);
    };

    socket.on('postLiked', handleLikeEvent);
    socket.on('postUnliked', handleLikeEvent);
    socket.on('postReposted', handleRepostEvent);
    socket.on('postUndoRepost', handleRepostEvent);

    return () => {
      socket.off('postLiked', handleLikeEvent);
      socket.off('postUnliked', handleLikeEvent);
      socket.off('postReposted', handleRepostEvent);
      socket.off('postUndoRepost', handleRepostEvent);
    };

  }, []);

  

  return (
    <PostContext.Provider value={{ post, loading, setPost}}>
      {children}
    </PostContext.Provider>
  );
};

export default PostProvider;
