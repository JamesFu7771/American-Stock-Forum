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
            checkLastNewsUpdated();
            
        } catch (error) {
            console.log('error', error);   
        }
         fetch(`https://api.marketaux.com/v1/news/all?&language=en&api_token${process.env.REACT_APP_MARKETAUX_TOKEN}`)  //100-3
        .then(response => response.json())
        .then(result => {
            console.log(result.data);
            setMarketNews(result.data);
        })
 
    },[]);

    useEffect(() => {
        if (spxData !== null & spxData !== undefined) {
            console.log("spxData:", spxData);
            fetch("/api/stockData", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(spxData),
            })
            .then((res) => console.log("res===",res))
        };
    },[spxData])

    const checkLastNewsUpdated = () => {
        // fetch("/api/lastUpdatednews")
        // .then(res => res.json())
        // .then(data => console.log(data))
    };

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
