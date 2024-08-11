import { createContext, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  
  const [user, setUser] = useState({
    username: localStorage.getItem("username"),
    _id: localStorage.getItem("_id"),
    profile: localStorage.getItem("profile_pic"),
    posts: [],
  });

  console.log(user)

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
