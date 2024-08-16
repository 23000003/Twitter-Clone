import { useContext, useEffect } from "react"
import { ProfileContext } from "../../contexts/ProfileContext"
import { useNavigate, useParams } from "react-router-dom";
import ViewUserHook from "./hook/ViewUserHook";


export default function Following() {

    const { viewUser, loading} = useContext(ProfileContext)
    const { username } = useParams();
    const navigate = useNavigate();
    const ViewUserData = ViewUserHook();

    useEffect(() =>{
        ViewUserData();
    },[username]);

    console.log(viewUser)
    console.log(loading);

    useEffect(() =>{
        window.scrollTo({ top: 0 });
    },[]);

    return (
        <>
        <div className="custom-width bg-white notif-height fixed border opacity-95 z-10">
            <div className="flex flex-row h-1/2 text-base font-twitterChirp items-center mx-5">
                <i className="fa-solid fa-gear mr-8"></i>
                <div className="flex flex-col">
                    <span className="font-bold text-xl">{viewUser.username}</span>
                    <span className="text-sm text-gray-400 font-twitterChirp">@{viewUser.username}</span>
                </div>
            </div>
            <div className='flex flex-row h-1/2 items-end justify-around'>
                <div className='hover:bg-gray-200 cursor-pointer w-full flex justify-center py-3 transition duration-200'  onClick={() => navigate(`/${viewUser.username}/followers`)}>
                    <span className='font-twitterChirp text-gray-600'>Followers</span>
                </div>
                <div className='hover:bg-gray-200 cursor-pointer w-full flex justify-center py-3 transition duration-200'>
                    <span className='font-twitterChirp font-bold'>Following</span>
                </div>
            </div>
        </div>
        <div className="notif-top border-x">
            
            {loading ? (
                <span>loading...</span>
            ) : (
                viewUser ? (
                    viewUser.following.map((user, index) => (
                        <div
                            key={index}
                            className="flex flex-row items-center justify-between hover:bg-gray-100 cursor-pointer px-5 py-3 transition duration-200"
                            onClick={() => navigate(`/${user.username}`, { state: { user } })}
                        >
                            <div className="flex flex-row items-start">
                                <img src={user.profile_pic} className="w-9 rounded-2xl" alt={user.username} />
                                <div className="flex flex-col ml-2">
                                    <span className="font-twitterChirp font-bold">{user.username}</span>
                                    <span className=" text-gray-400">@{user.username} <span className="text-xs bg-gray-200 px-1 rounded-md text-gray-500">Follows You</span></span>
                                    <span className="text-gray-600">{user.bio}</span>
                                </div>
                            </div>
                            <div className="flex flex-row items-center">
                                {viewUser.followers.some(followers => followers._id === user._id) ? (
                                    <button className=" text-black border h-9 w-24 rounded-3xl font-medium hover:bg-gray-700 mr-3">
                                        Following
                                    </button>
                                ) : (
                                    <button className="bg-black text-white h-9 w-20 rounded-3xl font-medium hover:bg-gray-700 mr-3">
                                        Follow
                                    </button>
                                )}
                                <div className="cursor-pointer hover:bg-gray-200" onClick={(e) => {e.stopPropagation(); setShowEdit(post._id)}}>
                                    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5 mr-3">
                                        <g>
                                            <path d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 
                                                .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z">
                                            </path>
                                        </g>
                                    </svg>
                                    {/* {showEditDetails === post._id && (<ShowEditButton _id = {post._id} />)} */}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <span>User does not exist</span>
                )
            )}

            <div className="h-svh w-full flex">
                <span></span>
            </div>
        </div>
        </>
    )

}
