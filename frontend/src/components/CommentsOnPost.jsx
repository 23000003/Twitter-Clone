import { useState } from "react";
import { ConvertDate } from "../scripts/TimeConverter";
import PostComment from "./PostAComment";

export default function CommentsOnPost(props){

    // console.log(comments, "COMMENTS")
    const [comments, setComments] = useState(props.comments);

    return(
        <>
        <PostComment setComments = {setComments} comments = {comments}/>
        {comments.length > 0 ? (
            comments.map((comment, index) => (
                <div className='border-b hover:bg-slate-100 cursor-pointer' key={index}>
                    <div className="pt-5 px-5">
                        <div className='flex flex-row font-twitterChirp h-full w-full'>
                            <span className='h-full'>
                                <img src={comment.author.profile_pic} className="w-9 rounded-2xl" alt="Guest" />
                            </span>
                            <div className='flex flex-col w-full'>
                                <div className='flex flex-row ml-4'>
                                    <span className='font-semibold'>{comment.author.username}</span>
                                    <span className='ml-2 text-gray-400'>@ {comment.author.username} • {ConvertDate(comment.date_commented)}</span>
                                </div>
                                <div className='ml-4'>
                                    <span>{comment.content}</span>
                                    {/* {comment.content_image !== " " && <img src={comment.content_image} className='w-full my-2 rounded-lg' onClick={() => setViewContentImage(true)}/>} */}
                                
                                </div>
                                <div className='mx-4 my-2 flex justify-between'>
                                    <span>
                                        <i className="fa-regular fa-comment text-gray-500"></i>
                                        <span className='text-sm ml-2 text-gray-400'>2</span>
                                    </span>
                                    <span>
                                        <i className="fa-solid fa-retweet text-gray-500"></i>
                                        <span className='text-sm ml-2 text-gray-400'>2</span>
                                    </span>
                                    <span className='hover:bg-gray-500'>
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
                </div>
            ))
        ) : (
            <h3></h3>
        )}
        </>
    )
}