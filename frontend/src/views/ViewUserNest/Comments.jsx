import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ConvertDate } from '../../scripts/TimeConverter';
import { UserContext } from '../../contexts/UserContext';
import { getUserCommentOnPost } from '../../controller/CommentController';

export default function Comments() {

    const { username }= useParams()
    const { user } = useContext(UserContext)
    const navigate = useNavigate();
    const [usersPost, setUsersPost] = useState([{}]);
    const [loading, setLoading] = useState(true);

    useEffect(() =>{

        setTimeout(async () =>{

            try{
                const data = await getUserCommentOnPost(username);
                setUsersPost(data);
                setLoading(false);
            }catch(err){
                console.log(err)
            }

        }, 1000);

    },[]);
    
    console.log(usersPost, "users")

    return (
        <>
        {!loading ? (
            usersPost.length > 0 ? (
                usersPost.map((post, index) => (
                    <div className='border-b hover:bg-slate-100 cursor-pointer' key={index} onClick={() => navigate(`/${post.author.username}/status/${post._id}`)}>
                        <div className="pt-4 px-5">
                            <div className='flex flex-row font-twitterChirp h-full w-full'>
                                <span className='flex flex-col items-center'>
                                    <img src={post.author.profile_pic} className="w-9 rounded-2xl" alt="Guest" />
                                    <span className='w-0.5 h-full bg-gray-200 flex -mb-3'></span>
                                </span>
                                <div className='flex flex-col w-full'>
                                    <div className='flex flex-row ml-4'>
                                        <span className='font-semibold'>{post.author.username}</span>
                                        <span className='ml-2 text-gray-400'>@ {post.author.username} • {ConvertDate(post.date_created)}</span>
                                    </div>
                                    <div className='ml-4'>
                                        <span>{post.content}</span>     
                                        {post.content_image !== " " && <img src={post.content_image} className='w-full my-2 rounded-lg'/>}                           
                                    </div>
                                    <div className='mx-4 my-2 flex justify-between'>
                                        <span>
                                            <i className="fa-regular fa-comment text-gray-500"></i>
                                            <span className='text-sm ml-2 text-gray-400'>{post.comments.length}</span>
                                        </span>
                                        <span>
                                            <i className="fa-solid fa-retweet text-gray-500"></i>
                                            <span className='text-sm ml-2 text-gray-400'>{post.reposted_by.length}</span>
                                        </span>
                                        <span>
                                            <i className="fa-regular fa-heart text-gray-500"></i>
                                            <span className='text-sm ml-2 text-gray-400'>{post.likes.length}</span>
                                        </span>
                                        <span>
                                            <i className="fa-regular fa-bookmark text-gray-500"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {post.comments.map((comment, index) => (
                            <div className="pt-4 px-5" key={index}>
                                <div className='flex flex-row font-twitterChirp h-full w-full'>
                                    <span className='flex flex-col items-center'>
                                        <img src={comment.author.profile_pic} className="w-9 rounded-2xl" alt="Guest" />
                                        {index !== post.comments.length - 1 && (
                                            <span className='w-0.5 h-full bg-gray-200 flex -mb-3'></span>
                                        )}
                                    </span>
                                    <div className='flex flex-col w-full'>
                                        <div className='flex flex-row ml-4'>
                                            <span className='font-semibold'>{comment.author.username}</span>
                                            <span className='ml-2 text-gray-400'>@ {comment.author.username} • {ConvertDate(comment.date_commented)}</span>
                                        </div>
                                        <div className='ml-4'>
                                            <span>{comment.content}</span>     
                                            {/* {post.content_image !== " " && <img src={post.content_image} className='w-full my-2 rounded-lg'/>}                            */}
                                        </div>
                                        <div className='mx-4 my-2 flex justify-between'>
                                            <span>
                                                <i className="fa-regular fa-comment text-gray-500"></i>
                                                <span className='text-sm ml-2 text-gray-400'></span>
                                            </span>
                                            <span>
                                                <i className="fa-solid fa-retweet text-gray-500"></i>
                                                <span className='text-sm ml-2 text-gray-400'></span>
                                            </span>
                                            <span>
                                                <i className="fa-regular fa-heart text-gray-500"></i>
                                                <span className='text-sm ml-2 text-gray-400'>{comment.likes}</span>
                                            </span>
                                            <span>
                                                <i className="fa-regular fa-bookmark text-gray-500"></i>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ))
            ) : (
                <span>No Post made by viewUser</span>
            )
        ):(
            <h3>LOADING....</h3>
        )}
        </>
    )
}
