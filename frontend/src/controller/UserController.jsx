import axios from 'axios'


export async function useLoginUser(username, password){

    if(!username || !password){
        throw new Error("All fields required");
    }

    /******** axios and fetch difference ******* */
    // const res = await fetch("/api/login", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },  
    //         body: JSON.stringify({ username, password }), //passes the data as body to the server making it as json
    //     });
    // const data = await res.json(); //fetches the res.status.json({its data})

    try{
        const res = await axios.post("/api/user/login", {
            username,
            password
        });
            
        const data = res.data;
        
        if (res.status !== 200) {
            throw new Error(data.error);
        }
        console.log(data)
        // for authentication, look up at application in inspect element u can see its token
        localStorage.setItem("token", data.token); 
        localStorage.setItem("username", data.user.username);
        localStorage.setItem("_id", data.user._id);
        localStorage.setItem('profile_pic', data.user.profile_pic);
    
        return data.user;
    }catch(err){
        console.log(err)
        throw new Error(err.response.data.error)
    }
}

export async function useCreateUser(username, password, confirmPass) {
    if(!username || !password || !confirmPass){
        throw Error("All fields required");
    }

    if(password !== confirmPass){
        throw Error("Passwords do not match");
    }

    const res = await axios.post("/api/user/createAccount", {
        username,
        password,
    });

    const data = res.data;
    
    if (res.status !== 200) {
        throw new Error(data.error);
    }
    
    localStorage.setItem("token", data.token);
    localStorage.setItem("username", data.username);
    
    return data;
}

export async function useWhoToFollow(){

    try{
        const data = await axios.get('/api/user/WhoToFollow', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        });
        return data;
    }catch(err){
        throw new Error(err)
    }
}

export async function useFetchUser(username){

    try{
        const data = axios.get(`/api/user/${username}`);
        return data
        
    }catch(err){
        throw new Error(err);
    }
}
// import axios from 'axios';

// export async function useLoginUser(username, password) {
//     if (!username || !password) {
//         throw new Error("All fields required");
//     }

//     const res = await axios.post("/api/user/login", {
//         username,
//         password
//     });

//     const data = res.data;

    
//     if (res.status !== 200) {
//         throw new Error(data.error);
//     }

//     localStorage.setItem("token", data.token);
//     localStorage.setItem("username", data.username);

//     return data;
// }

// export async function useCreateUser(username, password, confirmPass) {
//     if (!username || !password || !confirmPass) {
//         throw new Error("All fields required");
//     }

//     if (password !== confirmPass) {
//         throw new Error("Passwords do not match");
//     }

//     const res = await axios.post("/api/user/createAccount", {
//         username,
//         password
//     });

//     const data = res.data;

//     if (res.status !== 200) {
//         throw new Error(data.error);
//     }

//     localStorage.setItem("token", data.token);
//     localStorage.setItem("username", data.username);

//     return data;
// }
