import { Link, Outlet, useNavigate, useParams, useLocation } from "react-router-dom"
import { useEffect, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import bgSample from "../assets/Sample-png-image-500kb.png"
import { ProfileContext } from "../contexts/ProfileContext";
import ViewUserHook from "./ViewUserNest/hook/ViewUserHook";

export default function ViewUser(){
    
    const { username } = useParams();
    const { viewUser, loading, usersPost} = useContext(ProfileContext);
    const { user } = useContext(UserContext); // to check if its your account that ur viewing
    const navigate = useNavigate();
    const location = useLocation();
    const ViewUserData = ViewUserHook();
    console.log(useParams());

    useEffect(() =>{
        ViewUserData();
    }, [username]);

    return(
        <>
        {!loading ? (
            <>
            <div className="custom-width bg-white h-14 fixed border opacity-95 z-10">
                <div className="flex flex-row h-full text-base font-twitterChirp">
                    <div className="p-3 ml-2 mr-5">
                        <i className="fa-solid fa-clone text-blue-400"></i>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-xl">{viewUser.username}</span>
                        <span className="text-sm text-gray-400 font-twitterChirp">{usersPost.length} post</span>
                    </div>
                </div>
            </div>
            <div className="mt-14 border-x">
                <div className="flex flex-col w-full">
                    <div className="w-full h-52 overflow-hidden bg-slate-300">
                        {viewUser.background_pic != ' ' && (<img src={bgSample} className="w-full h-full object-cover" alt="Description" />)};
                    </div>
                    
                    <div className="border-b">
                        <div className="flex flex-col">
                            <div className="flex profile-width rounded-full bg-white -mt-16 ml-5 absolute">
                                <img src={viewUser.profile_pic} className="w-32 rounded-full m-auto"/>
                            </div>
                            <div className="w-full justify-end flex mt-3 -ml-5">
                                {user.username === viewUser.username ? (
                                    <span className="bg-white border border-gray-400 text-black 
                                        font-twitterChirp font-bold px-5 py-1.5 rounded-3xl
                                        cursor-pointer hover:bg-gray-100"
                                    >Edit Profile</span>
                                ): (
                                    <span className="bg-black text-white font-twitterChirp font-bold px-5 py-1.5 rounded-3xl">Follow</span>
                                )}
                            </div>
                            <div className="mt-7 flex flex-col">
                                <div className="mx-5 flex flex-col">
                                    <span className="font-twitterChirp font-bold text-xl">{viewUser.username}</span>
                                    <span className="font-twitterChirp text-base text-gray-400">@{viewUser.username}</span>
                                    <span className="mt-3">{viewUser.bio}</span>
                                    <div className="mt-3 font-twitterChirp">
                                        <span className="font-bold text-gray-600">
                                            {viewUser.following.length} 
                                            <span className="font-medium text-gray-500">Following</span>
                                        </span>
                                        <span className="ml-5 font-bold text-gray-600 cursor-pointer" onClick={() => navigate(`followers`)}>
                                            {viewUser.followers.length}
                                            <span className="font-medium text-gray-500">Followers</span>
                                        </span>
                                    </div>
                                </div>
                                <div className="mt-5 font-twitterChirp flex flex-row justify-around">
                                    <div className="w-full flex justify-center py-2 hover:bg-gray-100 cursor-pointer transition duration-200">
                                        <Link 
                                            className={location.pathname === `/${username}` ? "font-bold" : "font-medium text-gray-500"} 
                                            to="" 
                                        ><span>Posts</span>   
                                        </Link>
                                    </div>
                                    <div className="w-full flex justify-center py-2 hover:bg-gray-100 cursor-pointer transition duration-200">
                                        <Link
                                            className={location.pathname === `/${username}/with_comments` ? "font-bold" : "font-medium text-gray-500"}
                                            to={`/${username}/with_comments`}
                                        ><span>Comments</span>
                                        </Link>
                                    </div>
                                    <div className="w-full flex justify-center py-2 hover:bg-gray-100 cursor-pointer transition duration-200">
                                        <Link className="font-medium text-gray-500"><span>Media</span></Link>
                                    </div>
                                    <div className="w-full flex justify-center py-2 hover:bg-gray-100 cursor-pointer transition duration-200">
                                        <Link
                                            className={location.pathname === `/${username}/likes` ? "font-bold" : "font-medium text-gray-500"}
                                            to={`/${username}/likes`}
                                        ><span>Likes</span></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Outlet/>

                    <div className="h-svh w-full flex">
                        <span></span>
                    </div>

                </div>
            </div>
            </>
        ) : (
            <span>loading..</span>
        )}
        </>
    )
}