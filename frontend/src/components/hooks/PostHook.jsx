import { patchLikeByYou, patchUnlikeByYou } from '../../controller/PostController';


export async function TriggerLikeByYou(_id){
        
    try{
        console.log("GOING")
        const data = await patchLikeByYou(_id);
        console.log(data)
    }catch(err){
        console.log(err);
    }
}

export async function TriggerUnLikeByYou (_id){
    
    try{
        console.log("UNGOING")
        const data = await patchUnlikeByYou(_id);
        console.log(data)
    }catch(err){
        console.log(err);
    }
}
