import { useEffect } from "react";


export default function AlertMessage({messageAlert, setMessageAlert}) {
    
    useEffect(() => {
        if (messageAlert) {
            const timer = setTimeout(() => {
                setMessageAlert(null);
            }, 6000);
    
            return () => clearTimeout(timer); // cleanup the previous timeout if messageAlert changes
        }
    }, [messageAlert]);

    return (
        <div className='fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-blue-400 px-5 py-2 text-white rounded-lg'>
            <span>{messageAlert}</span>
        </div> 
    )
}
