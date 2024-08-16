import { useParams } from "react-router-dom"
import { useContext } from "react";
import { ProfileContext } from "../../../contexts/ProfileContext";
import { getUserPostData } from "../../../controller/PostController";

export default function ViewUserHook() {
    
    const { username } = useParams();
    const { setViewUser, setLoading, setUsersPost } = useContext(ProfileContext);
    console.log(useParams());

    const ViewUserData = async () =>{
        setLoading(true);
        setTimeout( async () =>{
            try{
                const data = await getUserPostData(username);
                setLoading(false);
                setUsersPost(data.posts)
                setViewUser(data.user)
                console.log(data,"DATA");
            }catch(err){
                console.log(err)
            }
        }, 1000);
    }

    
    return ViewUserData;
}
