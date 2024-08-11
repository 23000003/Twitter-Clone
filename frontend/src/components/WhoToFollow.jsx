import { useContext, useEffect, useState } from "react";
import { useWhoToFollow } from "../controller/UserController";
import { WhoToFollowContext } from "../contexts/WhoToFollowContext";
import { useNavigate, useParams, useLocation } from "react-router-dom";

export default function WhoToFollow(){

    const { whoToFollow, setWhoToFollow, relevantPeople, loading, setLoading }= useContext(WhoToFollowContext)
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { username } = useParams();

    useEffect(() =>{
        setLoading(true);
        setTimeout(async() =>{
            const data = await useWhoToFollow();
            const shuffled = shuffle(data.data)
            setWhoToFollow(shuffled);
            setLoading(false);
        },1000)

    },[pathname])

    // Instead of static who to follow why not show everyone :))
    const shuffle = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    console.log(relevantPeople)

    return(
        <>
        <div className="fixed max-w-md w-full h-3/5">
            
            {relevantPeople && (
                <div className="px-8 mt-3 w-full ">
                    <div className="bg-white w-full border rounded-xl">
                        <div className="px-5 pt-5 pb-2">
                            <span className="font-twitterChirp font-bold text-xl">Relevant People</span>
                        </div> 
                        <div
                            className="flex flex-row items-center justify-between hover:bg-gray-100 cursor-pointer px-5 pt-3 transition duration-200"
                            onClick={() => navigate(`/${relevantPeople.username}`, { state: { relevantPeople } })}
                        >
                            <div className="flex flex-row items-center">
                                <img src={relevantPeople.profile_pic} className="w-9 rounded-2xl" />
                                <div className="flex flex-col ml-2">
                                    <span className="font-twitterChirp font-bold">{relevantPeople.username}</span>
                                    <span className="text-sm text-gray-400">@{relevantPeople.username}</span>
                                </div>
                            </div>
                            <button className="bg-black text-white h-9 w-20 rounded-3xl font-medium hover:bg-gray-700">
                                Follow
                            </button>
                        </div>
                        {relevantPeople.bio && (
                            <div className="ml-16 pt-1 pb-3">
                                <span>{relevantPeople.bio}</span>
                            </div>
                        )}
                    </div>
                </div>
            )}

            <div className="px-8 mt-3 w-full ">
                <div className="bg-white w-full border rounded-xl">
                    <div className="p-5">
                        <span className="font-twitterChirp font-bold text-xl">{pathname === `/${username}` ? "You might like" : "Who To Follow"}</span>
                    </div> 

                    {whoToFollow && whoToFollow.length > 0 ? (
                        whoToFollow.slice(0, relevantPeople === null ? 7 : 3).map((user, index) => (
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
                        <span>No Recommendations</span>
                    )}
                
                    <div className="flex flex-row items-center justify-between p-3 pl-6 h-full hover:bg-gray-100 w-full rounded-b-xl transition duration-200 cursor-pointer">
                        <span className="text-sky-400 font-twitterChirp" onClick={() => navigate('/connect')}>Show more</span>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}