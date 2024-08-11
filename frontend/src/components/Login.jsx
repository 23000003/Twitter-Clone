import { useState } from "react";
import { useLoginUser }from "../controller/UserController";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export default function LoginUser({setLogin}){

    const {setUser} = useContext(UserContext);

    const navigate = useNavigate();

    const [loginDetails, setLoginDetails] = useState({
        username: "",
        password: "",
    });

    const [error, setError] = useState(null);

    const LoginUser = async (e) =>{
        e.preventDefault();

        try{
            const data = await useLoginUser(loginDetails.username, loginDetails.password);
            setUser({
                    username: data.username, 
                    _id: data._id,
                    profile: data.profile_pic, 
                    post: []
                });
            navigate('/home');
            console.log(data);
        }catch(err){
            console.log(err);
            setError(err.message)
        }
    }

    return(
        <>
        <div className='text-xl font-semibold my-3'>
            <span>Sign in to X</span>
        </div>
        <div className='leading-10 flex flex-col gap-5'>
            <form className='flex flex-col gap-5' onSubmit={LoginUser}>
                <input type="text" 
                    placeholder='Username' 
                    className='border-2 border-grey rounded-md'
                    value={loginDetails.username}
                    onChange={(e) => setLoginDetails({...loginDetails, username: e.target.value})}
                />
                <input type="password" 
                    placeholder='Password' 
                    className='border-2 border-grey rounded-md'
                    value={loginDetails.password}
                    onChange={(e) => setLoginDetails({...loginDetails, password: e.target.value})}
                />
                <button type='submit' 
                    className='bg-black text-white rounded-3xl border-2 
                     hover:bg-black hover:opacity-85 cursor-pointer'
                >Login
                </button>
            </form>
                <button 
                    className='text-center border-2 w-full border-black rounded-3xl
                    hover:bg-slate-100 cursor-pointer'
                    onClick={() => setLogin(false)}
                >Create Account
                </button>

            {error && (
                <div className="bg-red-500 text-white p-2 rounded-md mt-6 text-sm mb-4">
                    <i className="fa-solid fa-triangle-exclamation"></i> {error}
                </div>
            )}
        </div>
        </>
    );
}