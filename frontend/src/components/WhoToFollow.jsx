import { useContext, useEffect, useState, useMemo, useRef } from "react";
import { useFollowUser, useUnfollowUser, useWhoToFollow } from "../controller/UserController";
import { WhoToFollowContext } from "../contexts/WhoToFollowContext";
import { useNavigate, useParams, useLocation } from "react-router-dom";


export default function WhoToFollow() {

    const { whoToFollow, setWhoToFollow, relevantPeople, loading, setLoading } = useContext(WhoToFollowContext);
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const { username } = useParams();

    const hoverIndexRef = useRef(null);

    const handleMouseEnter = (index) => {
        hoverIndexRef.current = index;
    };

    const handleMouseLeave = () => {
        hoverIndexRef.current = null;
    };

    const [isFollowed, setIsFollowed] = useState([]);

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                const data = await useWhoToFollow();
                setWhoToFollow(data.data);
            } catch (err) {
                console.error(err.message);
            }
            setLoading(false);
        };
        fetchData();
    }, [pathname]);

    
    const shuffle = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const shuffledWhoToFollow = useMemo(() => {
        return shuffle([...whoToFollow]);
    }, [whoToFollow]);


    const FollowUser = async (_id) =>{

        try{
            const data = await useFollowUser(_id);
            console.log(data);
            setIsFollowed(data.data.following);
        }catch(err){
            console.log(err.message);
        }

    }

    const UnfollowUser = async (_id) =>{

        try{
            const data = await useUnfollowUser(_id);
            console.log(data);
            setIsFollowed(data.data.following);
        }catch(err){
            console.log(err.message);
        }

    }

    console.log(whoToFollow)

    if(loading){
        return <div>loading...</div>
    } 

    return (
        <>
            <div className="fixed max-w-md w-full h-3/5">
                {relevantPeople && (
                    <div className="px-8 mt-3 w-full">
                        <div className="bg-white w-full border rounded-xl">
                            <div className="px-5 pt-5 pb-2">
                                <span className="font-twitterChirp font-bold text-xl">Relevant People</span>
                            </div>
                            <div
                                className="flex flex-row items-center justify-between hover:bg-gray-100 cursor-pointer px-5 pt-3 transition duration-200"
                                onClick={() => navigate(`/${relevantPeople.username}`, { state: { relevantPeople } })}
                            >
                                <div className="flex flex-row items-center">
                                    <img src={relevantPeople.profile_pic} className="w-9 rounded-2xl" alt="Profile" />
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

                <div className="px-8 mt-3 w-full">
                    <div className="bg-white w-full border rounded-xl">
                        <div className="p-5">
                            <span className="font-twitterChirp font-bold text-xl">{pathname === `/${username}` ? "You might like" : "Who To Follow"}</span>
                        </div>

                        {shuffledWhoToFollow.length > 0 ? (
                            shuffledWhoToFollow.slice(0, relevantPeople === null ? 7 : 3).map((user, index) => (
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
                                    { isFollowed.includes(user._id) ? (
                                        <button
                                            className={`text-black border h-9 w-24 rounded-3xl font-medium mr-3 ${hoverIndexRef.current === index ? 'border-red-600 text-red-600' : 'bg-white'}`}
                                            onMouseEnter={() => handleMouseEnter(index)}
                                            onMouseLeave={handleMouseLeave}
                                            onClick={(e) => {e.stopPropagation(); UnfollowUser(user._id)}} 
                                        >
                                            {hoverIndexRef.current === index ? 'Unfollow' : 'Following'}
                                        </button>
                                    ) : (
                                        <button className="bg-black text-white h-9 w-20 rounded-3xl font-medium hover:bg-gray-700" onClick={(e) => {e.stopPropagation(); FollowUser(user._id)}}>
                                            Follow
                                        </button>
                                    )}
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
