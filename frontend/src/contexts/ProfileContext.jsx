import { createContext, useEffect, useState } from "react";

export const ProfileContext = createContext();

const ProfileProvider = ({ children }) => {
  
    const [viewUser, setViewUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [usersPost, setUsersPost] = useState([{}]);

    return (
        <ProfileContext.Provider value={{ viewUser, setViewUser, loading, setLoading, usersPost, setUsersPost }}>
            {children}
        </ProfileContext.Provider>
    );
};

export default ProfileProvider;
