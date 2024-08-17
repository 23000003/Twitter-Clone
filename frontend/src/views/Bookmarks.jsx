import { useContext, useState, useEffect } from "react"
import { UserContext } from "../contexts/UserContext"
import def from '../assets/default.png'
import { ConvertDate } from "../scripts/TimeConverter"
import { ApiAlertContext } from "../contexts/ApiAlertContext"
import AlertMessage from "../components/minicomponents/AlertMessage"
import { TriggerRemoveBookmark } from "../components/hooks/PostHook"

export default function Bookmarks() {
    
    const { user, userData, userDataLoading, setUserData } = useContext(UserContext)
    const { setMessageAlert, messageAlert } =  useContext(ApiAlertContext);

    console.log(userData);

    const handleRemoveBookmark = async (_id) => {
        await TriggerRemoveBookmark(_id, setUserData, setMessageAlert);
    };

    return (
        <>
        <div className="custom-width bg-white h-16 fixed border-x opacity-95 z-10">
            <div className="flex flex-row h-full mx-6 justify-between items-center">
                <div className="text-base font-twitterChirp flex flex-col">
                    <span className="font-bold text-xl">Bookmarks</span>
                    <span className="text-sm text-gray-500">@{user.username}</span>
                </div>
                <div className="cursor-pointer">
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5">
                        <g>
                            <path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 
                                .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z">
                            </path>
                        </g>
                    </svg>
                </div>
            </div>
        </div>

        <div className='border-b mt-16 border-x'>
            
            <div className='w-full items-center p-4'>
                <input type="text" className='bg-gray-200 w-full h-10 rounded-3xl' placeholder='Search'/>
            </div>

            {userDataLoading ? (
                <div>loading...</div>
            ) : (
                userData.bookmarks.length > 0 ? (
                    userData.bookmarks.map((post, index) => (
                        <div className='border-b hover:bg-slate-100 cursor-pointer' key={index}>
                            {/* {viewUser.username != post.author.username && (
                                <div className="absolute text-sm ml-14 mt-2">
                                    <i className="fa-solid fa-retweet text-gray-500 mr-2"></i>
                                    <span className="text-gray-500">{viewUser.username == user.username ? "You" : viewUser.username} Reposted</span>
                                </div>
                            )} */}
                            <div className="pt-4 px-5">
                                <div className='flex flex-row font-twitterChirp h-full w-full'>
                                    <span className='h-full'>
                                        <img src={post.author.profile_pic} className="w-9 rounded-2xl" alt="Guest" />
                                    </span>
                                        <div className='flex flex-col w-full'>
                                            <div className='flex flex-row ml-4'>
                                                <span className='font-semibold'>{post.author.username}</span>
                                                <span className='ml-2 text-gray-400'>@{post.author.username} • {ConvertDate(post.date_created)}</span>
                                            </div>
                                            <div className='ml-4'>
                                                <span>{post.content}</span>     
                                                {post.content_image !== " " && <img src={post.content_image} className='w-full my-2 rounded-lg'/>}                           
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
                                            <span className='hover:bg-orange-100 py-1 px-2 rounded-3xl text-gray-400 hover:text-yellow-500' onClick={(e) => {e.stopPropagation(); handleRemoveBookmark(post._id)}}>
                                                <i className="fa-solid text-yellow-500 fa-bookmark"></i>
                                            </span>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>No bookmarks</div>
                )
            )}
            {messageAlert && (<AlertMessage messageAlert = {messageAlert} setMessageAlert = {setMessageAlert}/>)}        
            
            <div className="h-svh w-full flex">
                <span></span>
            </div>
        </div>
        </>
    )

}
