import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";


import GetApi12Data  from "./component/HandleData";
import { MemberContext } from "./component/members/MemberContext";
import Chart from "./component/data/Chart";
import TestChart from "./component/data/TestChart";
import StockNews from "./StockNews";
import News from "./component/News";
import HomeIndex from "./component/data/HomeIndex";
import defaultAvatar from "./FP_20220818184520.jpg";

const HomePage = () => {
    const {marketNews} =  useContext(MemberContext);
    const { user } = useAuth0();
    console.log(typeof(marketNews));
    if (marketNews !== undefined) {
        const news = Object.values(marketNews).map((value) => {
            return <IndividualNews>
                <a href={value.url} key={value.uuid} overflowWrap="break-word">{value.title}</a>
                <ImageU src={value.image_url} alt={value.title} />
            </IndividualNews>
        });
    };
    // {value.title}

    return (<Wrapper>
        {/* <div>{JSON.stringify(user, null, 2)}</div> */}
        <HomeSide>
            <HomeIndex symbol={"IXIC"} />
            <HomeIndex symbol={"DJI"} />
            <HomeIndex symbol={"SPX"} />
        </HomeSide>
        <Nnews><News/> </Nnews>
        {/* <NewsWidth><StockNews/></NewsWidth> */}
        {/* <Chart symbol={"SPX"}/> */}
        <TestChart data={"Spx"} timePeriod={"1week"} />
        {/* <GetApi12Data/> */}
    
    </Wrapper>)

};

const HomeSide = styled.div`
display: flex;
flex-direction: column;
justify-content: flex-start;
gap: 45px;
/* margin-bottom: 300px; */
`;

const NewsWidth =styled.div`
width: 50%;
`;

const IndividualNews = styled.div`
width: 33%;
display: flex;
flex-direction: column;
/* justify-content: center; */
align-items: center;
gap:30px;
/* border: 2px solid red; */
`;

const ImageU = styled.img`
height: 250px;
width: 300px;
z-index:2;
/* border: 3px solid red; */
`;

const Wrapper = styled.div`
padding-top:25px;
height: 85vh;
display: flex;
flex-direction: row;
justify-content: space-evenly;
align-items: center;
background-image: url(${defaultAvatar});
background-size: 100%;
background-repeat: no-repeat;
background-size: cover;
/* border: 13px solid red; */
`;

const Nnews = styled.div`
padding-top:30px;
display: flex;
flex-direction: column;
justify-content: space-evenly;
height: 70vh;
width: 45%;
/* border: 13px solid blue; */
`;

export default HomePage;