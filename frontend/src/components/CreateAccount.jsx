import { useState } from "react";
import { useCreateUser } from "../controller/UserController"

export default function CreateAccount({setLogin}){

    const [error, setError] = useState(null);
    const [createDetails, setDetails] = useState({
        username: '',
        password: '',
        confirmPass: ''
    });

    const CreateAccount = async(e) =>{
        e.preventDefault();

        try{
            const data = await useCreateUser(
                createDetails.username,
                createDetails.password,
                createDetails.confirmPass
            );

            console.log(data);
        }catch(err){

            console.log(err);
            setError(err.message)

        }
    }

    return(
        <>
        <div className='text-xl font-semibold my-3'>
            <span>Create Account to X</span>
        </div>
        <div className='leading-10 flex flex-col gap-5'>
            <form className='flex flex-col gap-5' onSubmit={CreateAccount}>
                <input type="text" 
                    placeholder='Username' 
                    className='border-2 border-grey rounded-md'
                    value={createDetails.username}
                    onChange={(e) => setDetails({ ...createDetails, username: e.target.value})}
                />
                <input type="password" 
                    placeholder='Password' 
                    className='border-2 border-grey rounded-md'
                    value={createDetails.password}
                    onChange={(e) => setDetails({ ...createDetails, password: e.target.value})}
                />
                <input type="password" 
                    placeholder='Confirm Password' 
                    className='border-2 border-grey rounded-md'
                    value={createDetails.confirmPass}
                    onChange={(e) => setDetails({ ...createDetails, confirmPass: e.target.value})}
                />
                <button type='submit' 
                    className='bg-black text-white rounded-3xl border-2 
                     hover:bg-black hover:opacity-85 cursor-pointer'
                >
                Create Account
                </button>
            </form>
                <button 
                    className='text-center border-2 w-full border-black rounded-3xl
                    hover:bg-slate-100 cursor-pointer'
                    onClick={() => setLogin(true)}
                >
                Already Have an Account?
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