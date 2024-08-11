import { createContext, useState } from "react";

export const WhoToFollowContext = createContext();

const WhoToFollowProvider = ({ children }) => {
  
    const [whoToFollow, setWhoToFollow] = useState([{}])
    const [relevantPeople, setRelevantPeople] = useState(null)
    const [loading, setLoading] = useState(true);
    
    return (
        <WhoToFollowContext.Provider value={{ whoToFollow, setWhoToFollow, relevantPeople, setRelevantPeople, loading, setLoading }}>
            {children}
        </WhoToFollowContext.Provider>
    );
};

export default WhoToFollowProvider;
