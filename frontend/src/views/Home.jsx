import { Link } from "react-router-dom";
import guest from "../assets/default.png"
import PostInputTextarea from "../components/PostArea";
import AllPosts from "../components/AllPosts";

export default function Home() {
    return(
        <>
        <div className="custom-width bg-white h-14 fixed border opacity-95">
            <div className="flex flex-row px-32 justify-between items-center h-full text-base font-twitterChirp">
                <span className="font-bold">For You</span>
                <Link><span>Following</span></Link>
            </div>
        </div>
        <div className="mt-14 border-x">
            
            <PostInputTextarea />

            <AllPosts/>
            
        </div>
        </>
    );
}