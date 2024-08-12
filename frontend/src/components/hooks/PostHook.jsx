import { patchLikeByYou, patchRepostByYou, patchUndoRepostByYou, patchUnlikeByYou } from '../../controller/PostController';


export async function TriggerLikeByYou(_id){
        
    try{
        console.log("LIKE")
        const data = await patchLikeByYou(_id);
        console.log(data)
    }catch(err){
        console.log(err);
    }
}

export async function TriggerUnLikeByYou (_id){
    
    try{
        console.log("UNLIKE")
        const data = await patchUnlikeByYou(_id);
        console.log(data)
    }catch(err){
        console.log(err);
    }
}

export async function TriggerRepostByYou(_id){
    
    try{
        console.log("REPOSTED");
        const data = await patchRepostByYou(_id);
        console.log(data)

    }catch(err){
        console.log(err);
    }

}

export async function TriggerUndoRepostByYou(_id){
    
    try{
        console.log("UNDOREPOST");
        const data = await patchUndoRepostByYou(_id);
        console.log(data)

    }catch(err){
        console.log(err);
    }

}