import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import { MemberContext } from "../members/MemberContext";

const HomeIndex = ({symbol}) => {
    const [homeSpx, setHomeSpx] = useState(null);
    const {setSpxData, setRealSpx} =  useContext(MemberContext);
    const [updateData, setupdateData] = useState(false); 
    const [apiNoCredit, setApiNoCredit] = useState(false);
    const data = null;
    const url = `https://api.twelvedata.com/quote?symbol=${symbol}&apikey=${process.env.REACT_APP_APIDATA}`;


    useEffect(() => {
        fetch(url)
        .then(data => data.json())
        .then(res =>{
            if (res.code === 429) {
                setApiNoCredit(true);
                setHomeSpx({"symbol":"noAPI"});
            } else {
                setHomeSpx(res);
            };
            setRealSpx(res);
            })
    },[updateData]);

    let message = "no credit to get API data";

    if (homeSpx !== null) {
        
        return <Wrapper>
            {apiNoCredit === true && <InSide change={1}> <h2>{homeSpx.symbol}:</h2> <h2>{message}</h2> </InSide>}
            {apiNoCredit === false && 
            <InSide change={homeSpx.change}>
                <Mainh2><span>{homeSpx.symbol}</span>&nbsp;&nbsp;<span>{homeSpx.open}</span> </Mainh2>
                <DetailPrice><span>{homeSpx.change}</span>&nbsp;&nbsp;<span>{homeSpx.percent_change}%</span></DetailPrice>
            </InSide>}
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
border-radius: 12px;
padding: 10% 25% 10% 25%;
width: 100%;
height: 100%;
`;

const DetailPrice=styled.div`
display: flex;
justify-content: space-around;
font-size: 20px;
`;

const Mainh2=styled.span`
display: flex;
justify-content: space-around;
font-size: 23px;
`;

const Wrapper=styled.div`
width: 250px;
height: 120px;
display: flex;
align-items: center;
justify-content:space-around;
`;


export default HomeIndex;

