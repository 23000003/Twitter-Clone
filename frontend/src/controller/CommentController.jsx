import axios from "axios";

export async function useCommentPost(content, file, username, postID){

    if(!content){
        throw new Error("Content Field Required");
    }

    try{

        const res = await axios.post(`/api/comment/${username}/${postID}`, {
            content,
            file
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        });

        const data = res.data

        if (res.status !== 200) {
            throw new Error(data.error);
        }
        
        data.newComment.author = data.user;        

        return data.newComment;

    } catch (err) {
        throw new Error(err);
    }

}

export async function getUserCommentOnPost(username){
    console.log(username);
    try{
        
        const res = await axios.get(`/api/comment/${username}/with_comments`);

        if(res.status !== 200){
            throw new Error(res.data.error)
        }

        const userComments = res.data;

        return userComments;
    }
    catch(err){
        throw new Error(err)
    }
}