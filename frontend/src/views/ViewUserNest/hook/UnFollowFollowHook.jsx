import { useState } from "react";
import { useFollowUser, useUnfollowUser } from "../../../controller/UserController";

export default function UnFollowFollowHook() {
    
    const [hoverIndex, setHoverIndex] = useState(null);

    const [isFollowed, setIsFollowed] = useState([]);
    const [isUnFollowed, setIsUnFollowed] = useState([]);

    const FollowUser = async (_id, type) => {
        try {
            const data = await useFollowUser(_id);
            
            if(type === "isUnFollowed"){
                setIsUnFollowed((prevIsUnFollowed) => 
                    prevIsUnFollowed.filter(Unfollowed => Unfollowed !== data.data)
                );
            }else if(type === "isFollowed"){
                setIsFollowed((prevIsFollowed) => [...prevIsFollowed, data.data]);
            }

        } catch (err) {
            console.log(err.message);
        }
    }

    const UnfollowUser = async (_id, type) => {
        try {
            const data = await useUnfollowUser(_id);
            
            if(type === "isUnFollowed"){
                setIsUnFollowed((prevIsUnFollowed) => [...prevIsUnFollowed, data.data]);
            }else if(type === "isFollowed"){
                setIsFollowed((prevIsFollowed) => 
                    prevIsFollowed.filter(followed => followed !== data.data)
                );
            }

            console.log(data)
        } catch (err) {
            console.log(err.message);
        }
    }

    return {
        FollowUser,
        UnfollowUser,
        setHoverIndex,
        hoverIndex,
        isFollowed,
        isUnFollowed
    }
}
