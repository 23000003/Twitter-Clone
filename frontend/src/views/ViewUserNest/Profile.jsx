import React from 'react'
import { useContext } from 'react';
import { ProfileContext } from '../../contexts/ProfileContext';
import { ConvertDate } from '../../scripts/TimeConverter';
import { UserContext } from '../../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

export default function Profile() {

    const { viewUser, usersPost } = useContext(ProfileContext);
    const { user } = useContext(UserContext)
    const navigate = useNavigate();

    return (
        <>
        {usersPost.length > 0 ? (
            usersPost.map((post, index) => (
                <div className='border-b hover:bg-slate-100 cursor-pointer' key={index} onClick={() => navigate(`/${post.author.username}/status/${post._id}`)}>
                    {viewUser.username != post.author.username && (
                        <div className="absolute text-sm ml-14 mt-2">
                            <i className="fa-solid fa-retweet text-gray-500 mr-2"></i>
                            <span className="text-gray-500">{viewUser.username == user.username ? "You" : viewUser.username} Reposted</span>
                        </div>
                    )}
                    <div className="pt-4 px-5" style={{ marginTop: viewUser.username != post.author.username ? '16px' : '0px' }}>
                        <div className='flex flex-row font-twitterChirp h-full w-full'>
                            <span className='h-full'>
                                <img src={post.author.profile_pic} className="w-9 rounded-2xl" alt="Guest" />
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
                </div>
            ))
        ) : (
            <span>No Post made by viewUser</span>
        )}
        </>
    )
}
