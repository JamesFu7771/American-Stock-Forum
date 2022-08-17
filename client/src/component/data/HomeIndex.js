import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { MemberContext } from "../members/MemberContext";


// const getFinanceMarketNews = () => {
    // fetch(`https://api.marketaux.com/v1/news/all?symbols=TSLA,AMZN,MSFT&filter_entities=true&language=en&api_token=${process.env.REACT_APP_MARKETAUX_TOKEN}`)
    // fetch("https://api.marketaux.com/v1/news/all?symbols=TSLA,AMZN,MSFT&filter_entities=true&language=en&api_token=")
    // .then(response => response.text())
    // .then(result => console.log(result))
    // .catch(error => console.log('error', error));

// };

const HomeIndex = () => {
    const [homeSpx, setHomeSpx] = useState(null);
    const {setSpxData, setRealSpx} =  useContext(MemberContext);
    // const [spxData, setSpxData] = useState(null);    
    const data = null;
    // const url = `https://api.twelvedata.com/time_series?apikey=${process.env.REACT_APP_APIDATA}&interval=1min&symbol=SPX&previous_close=true&format=JSON`;
    const url = `https://api.twelvedata.com/quote?symbol=SPX&apikey=${process.env.REACT_APP_APIDATA}`;

    console.log("12data:==================", process.env.REACT_APP_APIDATA, process.env.REACT_APP_APINEWS);

    useEffect(() => {
        console.log("fetch-------------------------");
        fetch(url)
        .then(data => data.json())
        .then(res =>{
            setHomeSpx(res);
            setRealSpx(res);
            console.log("res:", res);
            })
    },[]);

    if (homeSpx !== null) {
        
        return <Wrapper>
            <InSide change={homeSpx.change}>
                <Mainh2><span>{homeSpx.symbol}</span><span>{homeSpx.open}</span> </Mainh2>
                <DetailPrice><span>{homeSpx.change}</span><span>{homeSpx.percent_change}</span></DetailPrice>
            </InSide>

        </Wrapper>
        
    } else {
        return <>Loading...</>
    }
    
    
};

const InSide=styled.div`
display: flex;
flex-direction: column;
justify-content: space-around;
background-color: ${props=> props.change > 0 ? "green" : "red"};
padding-top: 10%;
width: 100%;
height: 40%;
`;

const DetailPrice=styled.div`
display: flex;
justify-content: space-around;
font-size: 28px;

`;

const Mainh2=styled.span`
display: flex;
/* gap: 15px; */
justify-content: space-around;
font-size: 32px;

`;

const Wrapper=styled.div`
width: 300px;
height: 300px;
display: flex;
align-items: center;
/* gap: 30px; */
justify-content:space-around;
/* border: 2px solid blue; */

`;


export default HomeIndex;

