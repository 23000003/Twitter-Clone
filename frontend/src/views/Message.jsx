import { useEffect, useState } from 'react'
import def from '../assets/default.png'

export default function Message() {
    
    const [testEmpty, setTestEmpty] = useState(false);

    return (
        <>
        <div className="w-full message-width bg-white h-screen border opacity-95 z-10">
            <div className="message-height text-base font-twitterChirp mx-3 p-2 flex items-center justify-between sticky">
                <span className='font-twitterChirp font-bold text-xl'>Messages</span>
                <svg viewBox="0 0 24 24" aria-hidden="true" className="w-5" >
                    <g>
                        <path d="M10.54 1.75h2.92l1.57 2.36c.11.17.32.25.53.21l2.53-.59 2.17 2.17-.58 2.54c-.05.2.04.41.21.53l2.36 
                            1.57v2.92l-2.36 1.57c-.17.12-.26.33-.21.53l.58 2.54-2.17 2.17-2.53-.59c-.21-.04-.42.04-.53.21l-1.57 
                            2.36h-2.92l-1.58-2.36c-.11-.17-.32-.25-.52-.21l-2.54.59-2.17-2.17.58-2.54c.05-.2-.03-.41-.21-.53l-2.35-1.57v-2.92L4.1 
                            8.97c.18-.12.26-.33.21-.53L3.73 5.9 5.9 3.73l2.54.59c.2.04.41-.04.52-.21l1.58-2.36zm1.07 2l-.98 1.47C10.05 6.08 
                            9 6.5 7.99 6.27l-1.46-.34-.6.6.33 1.46c.24 1.01-.18 2.07-1.05 2.64l-1.46.98v.78l1.46.98c.87.57 1.29 1.63 1.05 
                            2.64l-.33 1.46.6.6 1.46-.34c1.01-.23 2.06.19 2.64 1.05l.98 1.47h.78l.97-1.47c.58-.86 1.63-1.28 
                            2.65-1.05l1.45.34.61-.6-.34-1.46c-.23-1.01.18-2.07 1.05-2.64l1.47-.98v-.78l-1.47-.98c-.87-.57-1.28-1.63-1.05-2.64l.34-1.46-.61-.6-1.45.34c-1.02.23-2.07-.19-2.65-1.05l-.97-1.47h-.78zM12 10.5c-.83 
                            0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5c.82 0 1.5-.67 1.5-1.5s-.68-1.5-1.5-1.5zM8.5 12c0-1.93 1.56-3.5 3.5-3.5 1.93 0 3.5 1.57 3.5 3.5s-1.57 
                            3.5-3.5 3.5c-1.94 0-3.5-1.57-3.5-3.5z">
                        </path>
                    </g>
                </svg>
            </div>
            <div className='overflow-scroll flex flex-col w-full message-height1'>
                {testEmpty ? (
                    <div className='py-6 px-12'>
                        <div className='flex flex-col'>
                            <span className='font-twitterChirp text-3xl font-bold'>Welcome to your inbox!</span>
                            <span className='font-twitterChirp text-gray-600 mt-3' style={{fontSize: "15px"}}>
                                Drop a line, share posts, and more with private conversations
                                between you and others on X.
                            </span>
                            <span className='bg-sky-500 text-white p-3 px-8 text-lg font-twitterChirp font-bold rounded-3xl mt-7 self-start'>
                                Write a message
                            </span>
                        </div>
                    </div>
                ):(
                    <>
                    <div className='w-full items-center px-4 my-4'>
                        <input type="text" className='bg-gray-200 w-full h-10 rounded-3xl' placeholder='Search'/>
                    </div>
                    <div className='w-full px-4 py-3 hover:bg-gray-100 cursor-pointer transition duration-200'>
                        <div className='flex flex-row items-center'>
                            <img src={def} className='w-10 rounded-sm'/>
                            <div className='flex flex-col ml-2'>
                                <span className='font-bold font-twitterChirp'>Username <span className='font-normal font-twitterChirp text-gray-500'>@Username • Apr 14</span></span>
                                <span className='truncate w-4/5 text-gray-500'>TEXTT HEHHHHHHHHHHHHHHHHHHHHHHHHHHHH HE Y</span>
                            </div>
                        </div>
                    </div>
                    <span className='text-3xl'>Hey</span>   
                    <span className='text-3xl'>Hey</span>
                    
                    <span className='text-3xl'>Hey</span>  
                    <span className='text-3xl'>Hey</span>   
                    <span className='text-3xl'>Hey</span>
                    <span className='text-3xl'>Hey</span>  
                    <span className='text-3xl'>Hey</span>   
                    <span className='text-3xl'>Hey</span>
                    <span className='text-3xl'>Hey</span>   
                    <span className='text-3xl'>Hey</span>
                    <span className='text-3xl'>Hey</span>
                    <span className='text-3xl'>Hey</span>   
                    <span className='text-3xl'>Hey</span>
                    <span className='text-3xl'>Hey</span>  
                    <span className='text-3xl'>Hey</span>   
                    <span className='text-3xl'>Hey</span>
                    <span className='text-3xl'>Hey</span>  
                    <span className='text-3xl'>Hey</span>   
                    <span className='text-3xl'>Hey</span>

                       
                    </>
                )}

            </div>
        </div>
        {/* <div className="w-full border-r custom-width">
        
        </div> */}
        </>
    )
}
