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
        //  fetch(`https://api.marketaux.com/v1/news/all?&language=en&api_token=${REACT_APP_MARKETAUX_TOKEN}`)
        // .then(response => response.json())
        // .then(result => {
        //     console.log(result.data);
        //     setmarketNews(result.data);
        // })
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



    



    return (
        <MemberContext.Provider
            value={{
                status,
                setStatus,
                currentUser,
                setCurrentUser,
                isAuthenticated,
                marketNews,
                setSpxData,
                // getFinanceMarketNews,
            }}
            >
            {children}
        </MemberContext.Provider>
    );

};
