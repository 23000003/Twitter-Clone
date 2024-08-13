import ForYou from './ExploreNest/ForYou'

export default function Explore() {
    return (
        <>
        <div className="custom-width bg-white notif-height fixed border opacity-95 z-10">
            <div className="flex flex-row h-4/6 text-base font-twitterChirp items-start mx-5">
                <div className='h-full w-full items-center justify-between flex -mt-2'>
                    <input type="text" className='bg-gray-200 w-4/5 ml-3 h-10 rounded-3xl' placeholder='Search'/>
                    <i className="fa-solid fa-gear"></i>
                </div>
            </div>
            <div className='flex flex-row h-2/6 items-end justify-around'>
                <div className='hover:bg-gray-200 cursor-pointer w-full flex justify-center py-3 transition duration-200'>
                    <span className='font-twitterChirp font-bold'>For you</span>
                </div>
                <div className='hover:bg-gray-200 cursor-pointer w-full flex justify-center py-3 transition duration-200'>
                    <span className='font-twitterChirp text-gray-600'>Articles</span>
                </div>
                <div className='hover:bg-gray-200 cursor-pointer w-full flex justify-center py-3 transition duration-200'>
                    <span className='font-twitterChirp text-gray-600'>People</span>
                </div>
            </div>
        </div>

        <div className='border-b notif-top border-x'>
            
            <ForYou />
            
            <div className="h-svh w-full flex">
                <span></span>
            </div>

            <h2 id="question">
                //TEXT CONTENT
            </h2>
        </div>
        </>
    )
}
