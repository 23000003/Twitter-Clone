import { useEffect } from 'react'
import { AppleAPI } from '../../components/hooks/NewsAPI';

export default function ForYou() {
    
    useEffect(() =>{

        setTimeout(async () =>{

            try{
                const data = await AppleAPI();
                console.log(data);
            }catch(err){
                console.log(err)
            }

        }, 1000);

    },[]);
    
    return (
        <div>
            
        </div>
    )
}
