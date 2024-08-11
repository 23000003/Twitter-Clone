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

    const handleSocketEvent = ({ data }) => { // unlike and like 
      setPost((prevPosts) =>
        prevPosts.map(post =>
          post._id === data._id ? { ...post, likes: data.likes } : post
        )
      );
      console.log(data);
    };

    socket.on('postLiked', handleSocketEvent);
    socket.on('postUnliked', handleSocketEvent);

    return () => {
      socket.off('postLiked', handleSocketEvent);
      socket.off('postUnliked', handleSocketEvent);
    };

  }, []);

  

  return (
    <PostContext.Provider value={{ post, loading, setPost}}>
      {children}
    </PostContext.Provider>
  );
};

export default PostProvider;
