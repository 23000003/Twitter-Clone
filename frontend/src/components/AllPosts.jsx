import guest from '../assets/default.png'
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { PostContext } from '../contexts/PostContext';
import { ConvertDate } from '../scripts/TimeConverter';
import { UserContext } from '../contexts/UserContext';
import { 
    TriggerAddToBookmark,
    TriggerLikeByYou, 
    TriggerRemoveBookmark, 
    TriggerRepostByYou, 
    TriggerUndoRepostByYou, 
    TriggerUnLikeByYou 
} from './hooks/PostHook';
import ShowEditButton from './minicomponents/ShowEditButton';
import { ApiAlertContext } from '../contexts/ApiAlertContext';
import AlertMessage from './minicomponents/AlertMessage';

export default function AllPosts(){

    const { post, loading } = useContext(PostContext);
    const { user, userData, setUserData } = useContext(UserContext);
    const { messageAlert, setMessageAlert } = useContext(ApiAlertContext);

    const [viewContentImage, setViewContentImage] = useState(false);
    const [showEditDetails, setShowEdit] = useState(null);
    const navigate = useNavigate()

    const handleAddBookmark = async (_id) => {
        await TriggerAddToBookmark(_id, setUserData, setMessageAlert);
    };

    const handleRemoveBookmark = async (_id) => {
        await TriggerRemoveBookmark(_id, setUserData, setMessageAlert);
    };

    console.log(userData)

    return(
        <>
        {!loading ? (
            post ? (
                <>
                {post.map((post, index) => (
                    <div className={`border-b ${showEditDetails == null ? 'hover:bg-slate-100 cursor-pointer' : ''}`} onClick={() => navigate(`/${post.author.username}/status/${post._id}`)} key={index}>
                        <div className="pt-5 px-5">
                            <div className='flex flex-row font-twitterChirp h-full w-full'>
                                <span className='h-full'>
                                    <img src={post.author.profile_pic} className="w-9 rounded-2xl" alt="Guest" />
                                </span>
                                <div className='flex flex-col w-full'>
                                    <div className='flex flex-row ml-4 justify-between'>
                                        <div className='flex flex-row'>
                                            <span className='font-semibold'>{post.author.username}</span>
                                            <span className='ml-2 text-gray-400'>@ {post.author.username} • {ConvertDate(post.date_created)}</span>
                                        </div>
                                        <div className="cursor-pointer hover:bg-gray-200 rounded-3xl" onClick={(e) => {e.stopPropagation(); setShowEdit(post._id)}}>
                                            <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 mx-2 ">
                                                <g>
                                                    <path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 
                                                        .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z">
                                                    </path>
                                                </g>
                                            </svg>
                                            {showEditDetails === post._id && (<ShowEditButton _id = {post._id} />)}
                                        </div>
                                    </div>
                                    <div className='ml-4'>
                                        <span>{post.content}</span>
                                        {post.content_image !== " " && <img src={post.content_image} className='w-full my-2 rounded-lg' onClick={() => setViewContentImage(true)}/>}
                                    
                                    </div>
                                    <div className='mx-4 my-2 flex justify-between'>
                                        <span className='hover:bg-sky-100 p-1 rounded-3xl text-gray-400 hover:text-sky-500'>
                                            <i className="fa-regular fa-comment"></i>
                                            <span className='text-sm ml-2'>{post.comments.length}</span>
                                        </span>
                                        {post.reposted_by.includes(user._id) ? (
                                            <span onClick={(e) => {e.stopPropagation(); TriggerUndoRepostByYou(post._id);}} className='hover:bg-green-100 p-1 rounded-3xl text-gray-400 hover:text-green-500'>
                                                <i className="fa-solid fa-retweet text-green-500"></i>
                                                <span className='text-sm ml-2 text-green-500'>{post.reposted_by.length}</span>
                                            </span>
                                        ) : (
                                            <span onClick={(e) => {e.stopPropagation(); TriggerRepostByYou(post._id);}} className='hover:bg-green-100 p-1 rounded-3xl text-gray-400 hover:text-green-500'>
                                                <i className="fa-solid fa-retweet "></i>
                                                <span className='text-sm ml-2'>{post.reposted_by.length}</span>
                                            </span>
                                        )}
                                        {post.likes.includes(user._id) ? (
                                            <span onClick={(e) => {e.stopPropagation(); TriggerUnLikeByYou(post._id);}}  className='hover:bg-red-100 p-1 rounded-3xl text-gray-400 hover:text-red-500'>
                                                <i className="fa-solid fa-heart text-red-500"></i>
                                                <span className='text-sm ml-2 text-red-500'>{post.likes.length}</span>
                                            </span>
                                        ) : (
                                            <span onClick={(e) => {e.stopPropagation(); TriggerLikeByYou(post._id);}}  className='hover:bg-red-100 p-1 rounded-3xl text-gray-400 hover:text-red-500'>
                                                <i className="fa-regular fa-heart "></i>
                                                <span className='text-sm ml-2 '>{post.likes.length}</span>
                                            </span>
                                        )}
                                        {userData.bookmarks.some(bookmark => bookmark._id === post._id) ? (
                                            <span className='hover:bg-orange-100 py-1 px-2 rounded-3xl text-gray-400 hover:text-yellow-500' onClick={(e) => {e.stopPropagation(); handleRemoveBookmark(post._id)}}>
                                                <i className="fa-solid text-yellow-500 fa-bookmark"></i>
                                            </span>
                                        ) : (
                                            <span className='hover:bg-orange-100 py-1 px-2 rounded-3xl text-gray-400 hover:text-yellow-500' onClick={(e) => {e.stopPropagation(); handleAddBookmark (post._id)}}>
                                                <i className="fa-regular fa-bookmark"></i>
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                {showEditDetails && (<div className='fixed w-full h-svh z-20 top-0 left-0' onClick={(e) => {e.stopPropagation(); setShowEdit(null)}}></div>)};
                {messageAlert && (<AlertMessage messageAlert = {messageAlert} setMessageAlert = {setMessageAlert}/>)}                                   
                </>
            ) : (
                <h3>NO POST</h3>
            )
        ) : (
            <span>Loading...</span>
        )}
        </>
    );
}