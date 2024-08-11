import { useState } from 'react'
import Logo from '../assets/XLogo.png'
import LoginUser from '../components/Login'
import CreateAccount from '../components/CreateAccount';

export default function IndexValidation(){
    
    const [login, setLogin] = useState(true);

    return(
        <div className="flex flex-row w-full h-screen">
            <div className="flex w-5/12 justify-center items-center bg-black">
                <img src={Logo} className='filter-invert-white' />
            </div>
            <div className="flex flex-col w-7/12 items-center justify-center">
                <div className='w-6/12'>
                    <div className='flex items-center justify-center'>
                        <img src={Logo} className='w-12'/>  
                    </div>
                    {login ? (
                        <LoginUser setLogin={setLogin}/>
                    ) : (
                        <CreateAccount setLogin={setLogin}/>
                    )}
                </div>
            </div>
        </div>
    )
}