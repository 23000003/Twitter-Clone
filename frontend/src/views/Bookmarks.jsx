import { useContext } from "react"
import { UserContext } from "../contexts/UserContext"
import def from '../assets/default.png'
import { ConvertDate } from "../scripts/TimeConverter"

export default function Bookmarks() {
    
    const { user, userData } = useContext(UserContext)

    console.log(userData);

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

            <div className='border-b hover:bg-slate-100 cursor-pointer'>
                {/* {viewUser.username != post.author.username && (
                    <div className="absolute text-sm ml-14 mt-2">
                        <i className="fa-solid fa-retweet text-gray-500 mr-2"></i>
                        <span className="text-gray-500">{viewUser.username == user.username ? "You" : viewUser.username} Reposted</span>
                    </div>
                )} */}
                <div className="pt-4 px-5">
                    <div className='flex flex-row font-twitterChirp h-full w-full'>
                        <span className='h-full'>
                            <img src={def} className="w-9 rounded-2xl" alt="Guest" />
                        </span>
                        <div className='flex flex-col w-full'>
                            <div className='flex flex-row ml-4'>
                                <span className='font-semibold'>Username</span>
                                <span className='ml-2 text-gray-400'>@Kenny • {ConvertDate(new Date())}</span>
                            </div>
                            <div className='ml-4'>
                                <span>HEYHEYAWD WADUIAHWUI DAWUHID HUIWA </span>     
                                {/* {post.content_image !== " " && <img src={post.content_image} className='w-full my-2 rounded-lg'/>}                            */}
                            </div>
                            <div className='mx-4 my-2 flex justify-between'>
                                <span>
                                    <i className="fa-regular fa-comment text-gray-500"></i>
                                    <span className='text-sm ml-2 text-gray-400'>6</span>
                                </span>
                                <span>
                                    <i className="fa-solid fa-retweet text-gray-500"></i>
                                    <span className='text-sm ml-2 text-gray-400'>6</span>
                                </span>
                                <span>
                                    <i className="fa-regular fa-heart text-gray-500"></i>
                                    <span className='text-sm ml-2 text-gray-400'>3</span>
                                </span>
                                <span>
                                    <i className="fa-regular fa-bookmark text-gray-500"></i>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            

            <div className="h-svh w-full flex">
                <span></span>
            </div>
        </div>
        </>
    )

}
