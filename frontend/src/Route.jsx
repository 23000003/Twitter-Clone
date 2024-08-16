import { Routes, Route, BrowserRouter } from "react-router-dom";
import IndexValidation from "./views/Validation";
import Home from "./views/Home";
import App from "./App";
import Sidebar from "./components/Sidebar";
import ViewUser from "./views/ViewUser";
import ViewPost from "./views/ViewPost";
import Notifications from "./views/Notifications";
import Explore from "./views/Explore";
import Connect from "./views/Connect";
import Profile from "./views/ViewUserNest/Profile";
import Comments from "./views/ViewUserNest/Comments";
import Likes from "./views/ViewUserNest/Likes";
import Message from "./views/Message";
import Bookmarks from "./views/Bookmarks";
import NoFeatures from "./views/NoFeatures";
import Followers from "./views/ViewUserNest/Followers";

function Router(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<IndexValidation />} />
                </Route>

                <Route path="/home" element={<Sidebar />}>
                    <Route index element={<Home />} />
                </Route>

                <Route path="/:username" element={<Sidebar/>}>
                    <Route path="" element={<ViewUser />}>
                        <Route index element={<Profile />} />
                        <Route path="with_comments" element={<Comments />} />
                        <Route path="likes" element={<Likes />} />
                    </Route>
                    <Route path="followers" element={<Followers />}></Route>
                    <Route path="status/:postID" element={<ViewPost/>}/>
                </Route>

                <Route path="/notifications" element={<Sidebar/>}>
                    <Route index element={<Notifications/>} />
                </Route>

                <Route path="/explore" element={<Sidebar/>}>
                    <Route index element={<Explore/>} />
                </Route>

                <Route path="/connect" element={<Sidebar/>}>
                    <Route index element={<Connect/>} />
                </Route>

                <Route path="/messages" element={<Sidebar/>}>
                    <Route index element={<Message />} />
                    <Route path=":userID" element={<Message />} />
                </Route>

                <Route path="/bookmarks" element={<Sidebar/>}>
                    <Route index element={<Bookmarks />} />
                </Route>

                <Route path="/:feature" element={<Sidebar/>}>
                    <Route index element={< NoFeatures/>} />
                </Route>

            </Routes>
        </BrowserRouter>
    );
};
export default Router;
