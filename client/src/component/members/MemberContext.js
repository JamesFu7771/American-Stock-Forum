import { useAuth0 } from "@auth0/auth0-react";
import { createContext, useState, useEffect } from "react";

export const MemberContext = createContext(null);

export const MemberProvider = ({ children }) => {
    const { user, isAuthenticated } = useAuth0();
    const [status, setStatus] = useState("loading");
    const [currentUser, setCurrentUser] = useState(null);
    const [marketNews,setMarketNews] = useState({});
    const [spxData, setSpxData] = useState(null); 
    const [realSpx, setRealSpx] = useState(null);
    const [updateFeed,setUpdateFeed] = useState(false);

    useEffect(() => {
        setCurrentUser(user);
    }, [isAuthenticated]);

    useEffect(() => {
        try {
            fetch(`https://api.marketaux.com/v1/news/all?&language=en&api_token=${process.env.REACT_APP_MARKETAUX_TOKEN}`)  //100-3
            .then(response => response.json())
            .then(result => {
                setMarketNews(result.data);
            })
            
        } catch (error) {
            console.log('error', error);   
        };

    },[]);

    return (
        <MemberContext.Provider
            value={{
                status,
                realSpx,
                setStatus,
                updateFeed,
                currentUser,
                setCurrentUser,
                isAuthenticated,
                marketNews,
                setSpxData,
                setRealSpx,
                setUpdateFeed,
            }}
            >
            {children}
        </MemberContext.Provider>
    );

};
