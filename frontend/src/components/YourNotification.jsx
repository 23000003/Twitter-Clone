import React from 'react'
import def from '../assets/default.png'

export default function YourNotification() {
    return (
        <>
        <div className='border-b hover:bg-slate-100 cursor-pointer'>
            <div className="pt-4 px-5 ml-2">
                <div className='flex flex-col font-twitterChirp h-full w-full'>

                    <div className='flex flex-row items-start'>
                        <svg viewBox="0 0 24 24" aria-hidden="true" className="w-8">
                            <g><path d="M22.99 11.295l-6.986-2.13-.877-.326-.325-.88L12.67.975c-.092-.303-.372-.51-.688-.51-.316 
                                0-.596.207-.688.51l-2.392 7.84-1.774.657-6.148 1.82c-.306.092-.515.372-.515.69 0 .32.21.6.515.69l7.956 
                                2.358 2.356 7.956c.09.306.37.515.69.515.32 0 .6-.21.69-.514l1.822-6.15.656-1.773 7.84-2.392c.303-.09.51-.37.51-.687 0-.316-.207-.596-.51-.688z" 
                                fill="#794BC4">
                                </path>
                            </g>
                        </svg>
                        <div className='flex flex-col ml-2'>
                            <div>
                                <img src={def} className="w-9 rounded-3xl" alt="Guest" />
                            </div>
                            <div className='flex flex-col w-full'>
                                <div className='flex flex-row mt-2'>
                                    <span className='text-gray-700'>Recent post from</span>
                                    <span className='font-semibold ml-1'>Testtt</span>
                                </div>
                                <div className='my-3 text-gray-500'>
                                    <span>HEY</span>     
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
        
        </>
    )
}
