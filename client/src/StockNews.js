import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { useContext, useEffect, useState } from "react";
import moment from "moment";

const StockNews = () => {
    const { user } = useAuth0();
    const [marketApiNews,setMarketApiNews] = useState({});
    let news ="";
    
    useEffect(() => {
        try {
            const url=`https://newsapi.org/v2/top-headlines?country=us&apiKey=${process.env.REACT_APP_APINEWS}`;
                fetch(url)
                .then(res => res.json())
                .then(result => {
                    result["update_at"] = moment().format("YYYY-MM-DD HH:mm:ss");
                    setMarketApiNews(result);
                    sessionStorage.setItem('result', result.updated_at);
                })              
        } catch (error) {
            console.log('error', error);  
        };
    }, []);

    if (marketApiNews.articles !== undefined) {
        news = Object.values(marketApiNews.articles).map((value) => {
            return <IndividualNews>
                <ImageU src={value.urlToImage} alt={value.title} />
                <AAa href={value.url} key={value.source.id} >{value.title}</AAa>
            </IndividualNews>
        });
    };


    return (<Wrapper>
        <News>{news} </News>
    </Wrapper>)

};

const AAa = styled.a`
padding-top:30px;
word-wrap: break-word;
text-decoration:none;
`;

const IndividualNews = styled.div`
width: 33%;
display: flex;
flex-direction: row;
justify-content: space-between;
gap:20px;
margin: 10px;
background-color: rgba(243,243,243, 0.8);
border: 2px solid grey;
`;

const ImageU = styled.img`
height: 80px;
width: 80px;
z-index:2;
`;

const Wrapper = styled.div`
padding:8px 15px;
`;

const News = styled.div`

display: flex;
flex-direction: column;
justify-content: space-evenly;
align-items: center;
flex-wrap: wrap;
`;

export default StockNews;