import axios from "axios";

export async function NewPost(content, file) {
    
    if (!content) {
        throw new Error("Content Field Required");
    }
    console.log(file);
    try {
        const res = await axios.post("/api/post", {
            content,
            file
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        });

        console.log(res);

        const data = res.data;

        console.log(data);

        if (res.status !== 200) {
            throw new Error(data.error);
        }

        return data;
    } catch (err) {
        throw new Error(err);
    }
}

export async function getAllPosts() {
    try{
        const data = await axios.get('/api/post');
        console.log(data);
        return data;
    }catch(err){
        throw new Error(err)
    }
}

export async function getViewedPost(postID, username){

    try{

        const res = await axios.get(`/api/post/${username}/${postID}`);

        console.log(res)

        const post = res.data;

        if(res.status !== 200){
            throw new Error(data.error);
        }

        return post
    }
    catch(err){

        throw new Error(err)
    }
}

export async function getUserPostData(username){

    try{

        const res = await axios.get(`/api/post/${username}`);
        
        if(res.status !== 200){
            throw new Error(res.data.error);
        }

        const post = res.data;

        return post
    }
    catch(err){

        throw new Error(err)
    }
}

export async function getUserPostLiked(username){

    try{
        console.log(username)
        const res = await axios.get(`/api/post/${username}/likes`);

        if(res.status !== 200){
            throw new Error(res.data.error);
        }

        const post = res.data;
        
        return post.data;
    }
    catch(err){

        throw new Error(err)
    }

}

export async function patchLikeByYou(_id){


    try{
        const res = await axios.patch(`/api/post/like`, { _id } ,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        });

        return res.data;
    }catch(err){

        throw new Error(err.message)
    }

}

export async function patchUnlikeByYou(_id){

    try{
        const res = await axios.patch(`/api/post/unlike`, { _id } ,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        });

        return res.data;
    }catch(err){

        throw new Error(err.message)
    }

}