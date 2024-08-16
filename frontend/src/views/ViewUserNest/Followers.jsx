import { useContext, useEffect } from "react"
import { ProfileContext } from "../../contexts/ProfileContext"
import { useNavigate, useParams } from "react-router-dom";
import ViewUserHook from "./hook/ViewUserHook";


export default function Followers() {

    const { viewUser, loading} = useContext(ProfileContext)
    const { username } = useParams();
    const navigate = useNavigate();
    const ViewUserData = ViewUserHook();

    useEffect(() =>{
        ViewUserData();
    },[username]);

    console.log(viewUser)
    console.log(loading);
    return (
        <>
        <div className="custom-width bg-white notif-height fixed border opacity-95 z-10">
            <div className="flex flex-row h-1/2 text-base font-twitterChirp items-center mx-5">
                <i className="fa-solid fa-gear mr-8"></i>
                <div className="flex flex-col">
                    <span className="font-bold text-xl">Kenny</span>
                    <span className="text-sm text-gray-400 font-twitterChirp">@kenny</span>
                </div>
            </div>
            <div className='flex flex-row h-1/2 items-end justify-around'>
                <div className='hover:bg-gray-200 cursor-pointer w-full flex justify-center py-3 transition duration-200'>
                    <span className='font-twitterChirp font-bold'>Followers</span>
                </div>
                <div className='hover:bg-gray-200 cursor-pointer w-full flex justify-center py-3 transition duration-200'>
                    <span className='font-twitterChirp text-gray-600'>Following</span>
                </div>
            </div>
        </div>
        <div className="notif-top border-x">
            
            {loading ? (
                <span>loading...</span>
            ) : (
                viewUser ? (
                    viewUser.followers.map((user, index) => (
                        <div
                            key={index}
                            className="flex flex-row items-center justify-between hover:bg-gray-100 cursor-pointer px-5 py-3 transition duration-200"
                            onClick={() => navigate(`/${user.username}`, { state: { user } })}
                        >
                            <div className="flex flex-row items-center">
                                <img src={user.profile_pic} className="w-9 rounded-2xl" alt={user.username} />
                                <div className="flex flex-col ml-2">
                                    <span className="font-twitterChirp font-bold">{user.username}</span>
                                    <span className="text-sm text-gray-400">@{user.username}</span>
                                </div>
                            </div>
                            <button className="bg-black text-white h-9 w-20 rounded-3xl font-medium hover:bg-gray-700">
                                Follow
                            </button>
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
