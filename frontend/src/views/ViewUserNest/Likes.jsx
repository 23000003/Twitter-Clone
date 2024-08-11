import { useContext, useEffect, useState } from 'react'
import { getUserPostLiked } from '../../controller/PostController';
import { useParams } from 'react-router-dom';
import { ConvertDate } from '../../scripts/TimeConverter';
import { UserContext } from '../../contexts/UserContext';

export default function Likes() {
    
    const [userPostLiked, setPostLiked] = useState([{}]);
    const [loading, setLoading] = useState(true);
    const { username } = useParams();
    const { user } = useContext(UserContext);

    useEffect(() =>{
        setLoading(true);
        setTimeout( async () => {
            try{
                const data = await getUserPostLiked(username);
                console.log(data)
                setPostLiked(data);
                setLoading(false);
            }catch(err){
                console.log(err)
            }
        }, 1000);

    },[]);

    return (
        <>
        {!loading ? (
            userPostLiked.length > 0 ? (
                userPostLiked.map((like, index) => (
                    <div className='border-b hover:bg-slate-100 cursor-pointer' key={index} onClick={() => navigate(`/${like.author.username}/status/${like._id}`)}>
                        <div className="absolute text-sm ml-14 mt-2">
                            <i className="fa-solid fa-heart text-gray-400 ml-3"></i>
                            <span className="text-gray-500 ml-1 font-twitterChirp">{username} liked</span>
                        </div>
                        <div className="pt-8 px-5">
                            <div className='flex flex-row font-twitterChirp h-full w-full'>
                                <span className='h-full'>
                                    <img src={like.author.profile_pic} className="w-9 rounded-2xl" alt="Guest" />
                                </span>
                                <div className='flex flex-col w-full'>
                                    <div className='flex flex-row ml-4'>
                                        <span className='font-semibold'>{like.author.username}</span>
                                        <span className='ml-2 text-gray-400'>@ {like.author.username} • {ConvertDate(like.date_created)}</span>
                                    </div>
                                    <div className='ml-4'>
                                        <span>{like.content}</span>     
                                        {like.content_image !== " " && <img src={like.content_image} className='w-full my-2 rounded-lg'/>}                           
                                    </div>
                                    <div className='mx-4 my-2 flex justify-between'>
                                        <span>
                                            <i className="fa-regular fa-comment text-gray-500"></i>
                                            <span className='text-sm ml-2 text-gray-400'>{like.comments.length}</span>
                                        </span>
                                        <span>
                                            <i className="fa-solid fa-retweet text-gray-500"></i>
                                            <span className='text-sm ml-2 text-gray-400'>{like.reposted_by.length}</span>
                                        </span>
                                        <span>
                                            {like.likes.includes(user._id) ? (
                                                <>
                                                <i className="fa-solid fa-heart text-red-500"></i>
                                                <span className='text-sm ml-2 text-red-500'>{like.likes.length}</span>
                                                </>
                                            ) : (
                                                <>
                                                <i className="fa-regular fa-heart text-gray-500"></i>
                                                <span className='text-sm ml-2 text-gray-400'>{like.likes.length}</span>
                                                </>
                                            )}
                                        </span>
                                        <span>
                                            <i className="fa-regular fa-bookmark text-gray-500"></i>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <span>No Likes</span>
            )
        ):(
            <h3>LOADING...</h3>
        )}
        </>
    )
}
