import React from 'react'
import YourNotification from '../components/YourNotification'

export default function Notifications() {
    
    return (
        <>
        <div className="custom-width bg-white notif-height fixed border opacity-95 z-10">
            <div className="flex flex-row h-1/2 text-base font-twitterChirp items-center mx-5 justify-between">
                <span className="font-bold text-xl">Notifications</span>
                <i class="fa-solid fa-gear"></i>
            </div>
            <div className='flex flex-row h-1/2 items-end justify-around'>
                <div className='hover:bg-gray-200 cursor-pointer w-full flex justify-center py-3 transition duration-200'>
                    <span className='font-twitterChirp font-bold'>All</span>
                </div>
                <div className='hover:bg-gray-200 cursor-pointer w-full flex justify-center py-3 transition duration-200'>
                    <span className='font-twitterChirp text-gray-600'>Verified</span>
                </div>
                <div className='hover:bg-gray-200 cursor-pointer w-full flex justify-center py-3 transition duration-200'>
                    <span className='font-twitterChirp text-gray-600'>Mentions</span>
                </div>
            </div>
        </div>

        <div className='border-b notif-top border-x'>
            <YourNotification/>
            <div className="h-svh w-full flex">
                <span></span>
            </div>
        </div>
        </>
    )
}

