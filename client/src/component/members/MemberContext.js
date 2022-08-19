import { useAuth0 } from "@auth0/auth0-react";
import { createContext, useState, useEffect } from "react";
import moment from 'moment';

export const MemberContext = createContext(null);

export const MemberProvider = ({ children }) => {
    const { user, isAuthenticated } = useAuth0();
    const [status, setStatus] = useState("loading");
    const [currentUser, setCurrentUser] = useState(null);
    const [marketNews,setMarketNews] = useState({});
    const [marketApiNews,setMarketApiNews] = useState({});
    const [spxData, setSpxData] = useState(null); 
    const [realSpx, setRealSpx] = useState(null);
    const [updateFeed,setUpdateFeed] = useState(false);

    useEffect(() => {
        console.log(user);
        setCurrentUser(user);
    }, [isAuthenticated]);

    useEffect(() => {
        console.log("running times");
        try {
            fetch(`https://api.marketaux.com/v1/news/all?&language=en&api_token=${process.env.REACT_APP_MARKETAUX_TOKEN}`)  //100-3
            .then(response => response.json())
            .then(result => {
                console.log("get news api:------------",result.data);
                setMarketNews(result.data);
            })
            
        } catch (error) {
            console.log('error', error);   
        };

    },[]);



    useEffect(() => {
        // fetch('/api/me/home-feed'
        // )
        // .then(res=>res.json())
        // .then(data => {
        //     setTweetIds(data.tweetIds);
        //     setTweetsById(data.tweetsById);
        //     setHasLoaded("idle");
        //     console.log("homeFeed: ",data);
        // })
        // .catch((error) => {
        //     setIsError(true);
        //     console.log("error: ",error);
        // });
    },[updateFeed]);

    console.log("in context", updateFeed);




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
                // getFinanceMarketNews,
            }}
            >
            {children}
        </MemberContext.Provider>
    );

};
