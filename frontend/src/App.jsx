import { useContext } from "react";
import { UserContext } from "./contexts/UserContext";
import { Navigate, Outlet} from 'react-router-dom'

export default function App(){

    const { user } = useContext(UserContext);

    console.log(user);

    return(
        <>
        {user.username ? (<Navigate to = "/home" />): (<Outlet/>)}
        </>
    );
}