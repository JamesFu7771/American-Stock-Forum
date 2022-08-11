import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useEffect, useState } from "react";
import moment from "moment";


// import getFinanceMarketNews from "./component/HandleData";
import { MemberContext } from "./component/members/MemberContext";

const StockNews = () => {
    const { user } = useAuth0();
    const [marketApiNews,setMarketApiNews] = useState({});
    let news ="";
    console.log("in stock news");
    
    useEffect(() => {
        try {
            console.log("in news effect");
            // const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.REACT_APP_APINEWS}`;
            const url ="";
            console.log("news api:", url);
            const sessionResult = sessionStorage.getItem("result");
            console.log(sessionResult);
            // setTimeout( async () => {
                fetch(url)
                .then(res => res.json())
                .then(result => {
                    result["update_at"] = moment().format("YYYY-MM-DD HH:mm:ss");
                    setMarketApiNews(result);
                    console.log("result-----:", result);
                    console.log("result.articles:========",result.articles, typeof(result.articles),"over");
                    sessionStorage.setItem('result', result.updated_at);
                })
                
                // await fetch("/api/apinews", {
                //     method: "PUT",
                //     headers: {
                //         Accept: "application/json, text/plain, */*",
                //         "Content-Type": "application/json",
                //     },
                //     body: marketApiNews,
                // })
                // .then(res => console.log(res))
            // }, 1000);                
        } catch (error) {
            console.log('error', error);  
        };
    }, []);

    if (marketApiNews.articles !== undefined) {
        news = Object.values(marketApiNews.articles).map((value) => {
            return <IndividualNews>
                {/* <ImageU src={value.urlToImage} alt={value.title} /> */}
                <AAa href={value.url} key={value.source.id} >{value.title}</AAa>
            </IndividualNews>
        });
    };


    // {value.title}

    return (<Wrapper>
        {/* <div>{JSON.stringify(user, null, 2)}</div> */}
        <News>{news} </News>

    
    </Wrapper>)

};

const AAa = styled.a`
padding-top:30px;
word-wrap: break-word;
text-decoration:none;
/* width: 300px; */
`;

const IndividualNews = styled.div`
width: 33%;
display: flex;
flex-direction: column;
justify-content: space-between;
/* align-items: center; */
gap:20px;
margin: 10px;
background-color: rgba(243,243,243, 0.8);
/* border: 2px solid grey; */
`;

const ImageU = styled.img`
height: 80px;
width: 80px;
z-index:2;
/* border: 3px solid red; */
`;

const Wrapper = styled.div`
padding:8px 15px;
/* height: 200px; */
/* border: 33px solid blue; */
`;

const News = styled.div`

display: flex;
flex-direction: column;
justify-content: space-evenly;
align-items: center;
flex-wrap: wrap;
/* height: 70vh; */
/* border: 3px solid grey; */
`;

export default StockNews;