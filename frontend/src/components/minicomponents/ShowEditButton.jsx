import { useContext } from "react";
import { deleteYourPost } from "../../controller/PostController";
import { PostContext } from "../../contexts/PostContext";


export default function ShowEditButton({ _id }) {

    const { setPost } = useContext(PostContext);    

    const DeletePost = async () =>{
        try{
            const data = await deleteYourPost(_id);
            console.log(data);
            setPost(prevPosts => prevPosts.filter(postItem => postItem._id !== _id));
        }catch(err){
            console.log(err.message);
        }
    }

    return (
        <div className='rounded-sm bg-white w-72 absolute edit-custom z-30'>
            <div className="p-2 hover:bg-slate-200" onClick={() => DeletePost()}>
                <span>Delete</span>
            </div>
            <div className="p-2 hover:bg-slate-200">
                <span>Edit</span>
            </div>
            <div className="p-2 hover:bg-slate-200">
                <span>Pin</span>
            </div>
        </div>
    )
}
