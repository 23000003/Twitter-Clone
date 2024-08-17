import { useContext } from 'react';
import { 
    patchLikeByYou, 
    patchRepostByYou, 
    patchUndoRepostByYou, 
    patchUnlikeByYou 
} from '../../controller/PostController';
import { addToBookmarks, removeFromBookmarks } from '../../controller/UserController';
import { UserContext } from '../../contexts/UserContext';
import { ApiAlertContext } from '../../contexts/ApiAlertContext';


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
        const data = await patchRepostByYou(_id);
        console.log(data)

    }catch(err){
        console.log(err);
    }

}

export async function TriggerUndoRepostByYou(_id){
    
    try{
        const data = await patchUndoRepostByYou(_id);
        console.log(data)
    }catch(err){
        console.log(err);
    }

}

//User Controller
export async function TriggerAddToBookmark(_id, setUserData, setMessageAlert) {
    
    try {
        const data = await addToBookmarks(_id);
        console.log(data);
        setUserData(data.data.data);
        setMessageAlert(data.data.message);
    } catch (err) {
        console.log(err);
    }

}

export async function TriggerRemoveBookmark(_id, setUserData, setMessageAlert) {
    
    try {
        const data = await removeFromBookmarks(_id);
        console.log(data);
        setUserData(data.data.data);
        setMessageAlert(data.data.message);
    } catch (err) {
        console.log(err);
    }

}