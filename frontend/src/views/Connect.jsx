import { WhoToFollowContext } from '../contexts/WhoToFollowContext'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Connect() {
    
    const { whoToFollow, loading }= useContext(WhoToFollowContext);
    const navigate = useNavigate();

    return (
        <>
        <div className="custom-width bg-white notif-height fixed border opacity-95 z-10">
            <div className="flex flex-row h-4/6 text-base font-twitterChirp items-start mx-5">
                <div className='h-full w-full items-center flex -mt-2'>
                    <div className='hover:bg-gray-200 cursor-pointer p-2 rounded-3xl transition duration-200'>
                        <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5">
                            <g>
                                <path d="M7.414 13l5.043 5.04-1.414 1.42L3.586 12l7.457-7.46 1.414 1.42L7.414 11H21v2H7.414z"></path>
                            </g>
                        </svg>
                    </div>
                    <span className='ml-7 text-xl font-twitterChirp font-bold'>Connect</span>
                </div>
            </div>
            <div className='flex flex-row h-2/6 items-end justify-around'>
                <div className='hover:bg-gray-200 cursor-pointer w-full flex justify-center py-3 transition duration-200'>
                    <span className='font-twitterChirp font-bold'>Who to follow</span>
                </div>
                <div className='hover:bg-gray-200 cursor-pointer w-full flex justify-center py-3 transition duration-200'>
                    <span className='font-twitterChirp text-gray-600'>Creators for you</span>
                </div>
            </div>
        </div>

        <div className='border-b notif-top border-x'>
            
            {!loading ? (
                <div className='flex flex-col'>
                    <div className='py-3 px-4'>
                        <span className='font-twitterChirp font-bold text-xl'>Suggested for you</span>
                    </div>

                    {whoToFollow.length > 0 ? (
                        whoToFollow.map((user, index) => (
                            <div className='py-3 px-4 flex flex-row hover:bg-gray-100 cursor-pointer' key={index} onClick={() => navigate(`/${user.username}`)}>
                                <div>
                                    <img src={user.profile_pic} className='w-10 rounded-3xl' />
                                </div>
                                <div className='flex flex-col mx-2 w-full'>
                                    <div className='flex flex-row justify-between items-center'>
                                        <div className='flex flex-col'>
                                            <span className='font-twitterChirp font-bold'>{user.username}</span>
                                            <span className='text-gray-500'>@{user.username}</span>
                                        </div>
                                        <span className="bg-black text-white font-twitterChirp font-bold px-4 py-1 rounded-3xl">Follow</span>
                                    </div>
                                    <div className='w-full mt-2'>
                                        <span>
                                            {user.bio}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))
                    ):(
                        <span>No Suggestions!</span>
                    )}

                </div>
            ):(
                <h3>LOADING...</h3>
            )}
            
            
            <div className="h-svh w-full flex">
                <span></span>
            </div>
        </div>
        </>
    )
}
