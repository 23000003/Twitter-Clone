import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ConvertToPostDate } from "../scripts/TimeConverter";
import { WhoToFollowContext } from "../contexts/WhoToFollowContext";
import { getViewedPost } from "../controller/PostController";
import CommentsOnPost from "../components/CommentsOnPost";

export default function ViewPost(){

    const [viewedPost, setViewedPost] = useState({});
    const [loading, setLoading] = useState(true);
    const [found, setFound] = useState(false);

    const { setRelevantPeople } = useContext(WhoToFollowContext)
    const { username, postID } = useParams();
    const navigate = useNavigate();

    useEffect(() =>{
        setLoading(true);
        
        setTimeout(async () => {
            try{
                const data = await getViewedPost(postID, username);
                setViewedPost(data.posts);
                setRelevantPeople(data.posts.author)
                setLoading(false)
            }catch(err){
                console.log(err)
                setLoading(false)
            }
    
        }, 1000);

        return () => {
            setRelevantPeople(null);
        }

    },[])

    // setTimeout(() => setLoading(false), 1000);
    console.log(viewedPost)

    return(
        <>
        {!loading ? (
            <>
            <div className="custom-width bg-white h-14 fixed border-x opacity-95 z-10">
                <div className="flex flex-row h-full text-base font-twitterChirp">
                    <div className="p-3 ml-2 mr-5 flex items-center">
                        <i className="fa-solid fa-clone text-blue-400" onClick={() => navigate(-1)}></i>
                    </div>
                    <div className="flex flex-col justify-center">
                        <span className="font-bold text-xl">Post</span>
                    </div>
                </div>
            </div>
            <div className='border-b mt-14 border-x'>
                <div className="pt-5 px-5">
                    <div className='flex flex-row font-twitterChirp h-full w-full'>
                        <span className='h-full'>
                            <img src={viewedPost.author.profile_pic} className="w-11 rounded-3xl" alt="Guest" />
                        </span>
                        <div className='flex flex-col w-full'>
                            <div className="flex flex-row justify-between item-center">
                                <div className='flex flex-col ml-4'>
                                    <span className='font-semibold'>{viewedPost.author.username}</span>
                                    <span className=' text-gray-500 text-sm'>@{viewedPost.author.username}</span>
                                </div>
                            </div>
                            <div className='-ml-10 mt-4'>
                                <span className="text-lg">{viewedPost.content}</span>     
                                {viewedPost.content_image !== " " && <img src={viewedPost.content_image} className='w-full my-3 rounded-lg'/>}                           
                            </div>
                            <div className="-ml-10 text-gray-400 my-2">
                                <span>{ConvertToPostDate(viewedPost.date_created)}</span>
                            </div>
                            <div className=' -ml-10 py-3 my-2 flex justify-between border-y'>
                                <span>
                                    <i className="fa-regular fa-comment text-gray-500 ml-1"></i>
                                    <span className='text-sm ml-2 text-gray-400'>{viewedPost.comments.length}</span>
                                </span>
                                <span>
                                    <i className="fa-solid fa-retweet text-gray-500"></i>
                                    <span className='text-sm ml-2 text-gray-400'>{viewedPost.reposted_by.length}</span>
                                </span>
                                <span>
                                    <i className="fa-regular fa-heart text-gray-500"></i>
                                    <span className='text-sm ml-2 text-gray-400'>{viewedPost.likes.length}</span>
                                </span>
                                <span>
                                    <i className="fa-regular fa-bookmark text-gray-500 mr-2"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <CommentsOnPost comments = {viewedPost.comments}/>
                <div className="h-svh w-full flex">
                    <span></span>
                </div>
            </div>
            
            </>
        ) : (
            <span>Loading...</span>
        )}
        </>
    );
}