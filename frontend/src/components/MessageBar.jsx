import { useLocation  } from "react-router-dom"


export default function MessageBar() {
    
    const location = useLocation();

    return (
        <>
        <div className="w-full border-r custom-width">
            {location.pathname == '/messages' ? (
                <div className="w-full h-full">
                    <div className="flex flex-col w-full h-full m-auto justify-center items-start px-32">
                        <span className="font-twitterChirp font-bold text-3xl">Select a message</span>
                        <span className="text-gray-500 mt-1">Choose from your existing conversations, start a new one, or just keep swimming.</span>
                        <span className="mt-5 py-3 px-8 font-twitterChirp text-lg font-bold bg-sky-500 text-white rounded-3xl">New message</span>
                    </div>
                </div>
            ) : (
                <div>

                </div>
            )}
        </div>
        </>
    )

}
