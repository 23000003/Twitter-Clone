import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import XLogo from '../assets/XLogo.png'
import IconNav from "./IconNav";
import defaultPfp from '../assets/default.png'
import WhoToFollow from "./WhoToFollow";

export default function Sidebar(){

    const { user } = useContext(UserContext);
    const location = useLocation();
    console.log(user)
    
    return(
        <>
        {!user.username ? (<Navigate to = "/" />): (
            <>
            <div className="flex flex-row w-full min-h-dvh justify-center">
                <header className="flex flex-col items-end w-64">
                    <div className="fixed h-full w-72 ">
                        <div className="h-full p-5">
                            <img src={XLogo} className="w-7"/>
                            <nav role="navigation" className="mt-4">
                                <IconNav/>
                            </nav>
                            <div className="w-full h-16 mt-4 flex flex-row items-center justify-between cursor-pointer hover:bg-slate-100">
                                <div className="flex flex-row items-center">
                                    <img src={user.profile} className="w-11 rounded-3xl" />
                                    <span className="ml-4 font-twitterChirp font-bold">{user.username}</span>
                                </div>
                                <span className="mr-5 font-twitterChirp font-bold">---</span>
                            </div>
                        </div>
                    </div>
                </header>
                <main className="custom-width w-full">
                    <Outlet/>
                </main>
                <div className="max-w-96 w-full ml-5">
                    {location.pathname !== '/explore' && (
                        <div className="ml-8 mt-2 mb-14 w-full relative z-10">
                            <div className="fixed max-w-sm h-10 w-full">
                                <form className="rounded-3xl w-full bg-gray-300 h-full p-2">
                                    <div className="w-full ml-3">
                                        <i className="fa-regular fa-comment"></i>
                                        <input type="text" name="" id="" placeholder="Search" className="ml-3 text-md w-10/12"/>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                    <WhoToFollow/>
                </div>
            </div>
            </>
        )}
        </>
    );
}