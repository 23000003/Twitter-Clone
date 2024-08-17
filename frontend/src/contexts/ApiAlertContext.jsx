import { createContext, useState } from "react";

export const ApiAlertContext = createContext();

const ApiAlertProvider = ({ children }) => {
  
    const [messageAlert, setMessageAlert] = useState(null)
    
    return (
        <ApiAlertContext.Provider value={{ setMessageAlert, messageAlert }}>
            {children}
        </ApiAlertContext.Provider>
    );
};

export default ApiAlertProvider;
