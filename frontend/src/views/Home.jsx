import PostInputTextarea from "../components/PostArea";
import AllPosts from "../components/AllPosts";
import FollowingPost from "../components/FollowingPost";
import { useState, useEffect } from "react";

export default function Home() {

    const [activeTab, setActiveTab] = useState(localStorage.getItem('activeTab') || 'For You');

    useEffect(() =>{

        if(localStorage.getItem('activeTab') !== 'Following'){
            setActiveTab('For You');
            console.log(localStorage.getItem('activeTab'))
            localStorage.removeItem('activeTab');
        }

    },[]);

    const SwitchTab = (tab) =>{

        if(tab === activeTab) return;

        if(tab === 'For You'){
            setActiveTab(tab);
            localStorage.removeItem('activeTab');
        }else if(tab === 'Following'){
            localStorage.setItem('activeTab', tab);
            setActiveTab(tab);
        }
    }

    return(
        <>
        <div className="custom-width bg-white h-14 fixed border opacity-95">
            <div className="flex flex-row h-full text-base font-twitterChirp">
                <div className="w-1/2 flex justify-center items-center hover:bg-gray-200 transition duration-200 cursor-pointer" onClick={() => SwitchTab('For You')}>
                    <span className={activeTab === "For You" ? "font-bold" : ""}>For You</span>
                </div>
                <div className="w-1/2 flex justify-center items-center hover:bg-gray-200 transition duration-200 cursor-pointer" onClick={() => SwitchTab('Following')}>
                    <span className={activeTab === "Following" ? "font-bold" : ""} >Following</span>
                </div>
            </div>
        </div>
        <div className="mt-14 border-x">
            
            <PostInputTextarea />

            {activeTab === 'For You' ? (
                <AllPosts />
            ) : (
                activeTab === 'Following' && <FollowingPost />
            )}
            
        </div>
        </>
    );
}