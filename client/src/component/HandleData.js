import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { MemberContext } from "./members/MemberContext";


const getFinanceMarketNews = () => {
    // fetch(`https://api.marketaux.com/v1/news/all?symbols=TSLA,AMZN,MSFT&filter_entities=true&language=en&api_token=${process.env.REACT_APP_MARKETAUX_TOKEN}`)
    // fetch("https://api.marketaux.com/v1/news/all?symbols=TSLA,AMZN,MSFT&filter_entities=true&language=en&api_token=")
    // .then(response => response.text())
    // .then(result => console.log(result))
    // .catch(error => console.log('error', error));
};

const GetApi12Data = () => {
    const {setSpxData} =  useContext(MemberContext);
    // const [spxData, setSpxData] = useState(null);    
    const data = null;
    const url = `https://api.twelvedata.com/time_series?apikey=${process.env.REACT_APP_APIDATA}&interval=1min&symbol=SPX&previous_close=true&format=JSON`;
    console.log("12data:==================", process.env.REACT_APP_APIDATA, process.env.REACT_APP_APINEWS);

    // useEffect(() => {
    //     console.log("fetch-------------------------");
    //     fetch(url)
    //     .then(data => data.json())
    //     .then(res =>{
    //         setSpxData(res);
    //         console.log("res:", res);
    //         })
    // },[]);
    
    
    return <Wrapper>
        ok
    </Wrapper>
};

const Wrapper=styled.div`

`;


export default GetApi12Data;