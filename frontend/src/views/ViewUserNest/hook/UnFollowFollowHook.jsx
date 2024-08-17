import { useState } from "react";
import { useFollowUser, useUnfollowUser } from "../../../controller/UserController";

export default function UnFollowFollowHook() {
    
    const [hoverIndex, setHoverIndex] = useState(null);

    const [isFollowed, setIsFollowed] = useState([]);

    const FollowUser = async (_id) => {
        try {
            const data = await useFollowUser(_id);
            setIsFollowed(data.data.following);
        } catch (err) {
            console.log(err.message);
        }
    }

    const UnfollowUser = async (_id) => {
        try {
            const data = await useUnfollowUser(_id);
            setIsFollowed(data.data.following);
        } catch (err) {
            console.log(err.message);
        }
    }

    return {
        FollowUser,
        UnfollowUser,
        setHoverIndex,
        hoverIndex,
        isFollowed
    }
}
