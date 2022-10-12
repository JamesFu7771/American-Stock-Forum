import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";
import { MemberContext } from "./component/members/MemberContext";
import TestChart from "./component/data/TestChart";
import News from "./component/News";
import HomeIndex from "./component/data/HomeIndex";
import defaultAvatar from "./FP_20220818184520.jpg";

const HomePage = () => {
    const {marketNews} =  useContext(MemberContext);
    const { user } = useAuth0();
    if (marketNews !== undefined) {
        const news = Object.values(marketNews).map((value) => {
            return <IndividualNews>
                <a href={value.url} key={value.uuid} overflowWrap="break-word">{value.title}</a>
                <ImageU src={value.image_url} alt={value.title} />
            </IndividualNews>
        });
    };

    return (<Wrapper>
        <HomeSide>
            <HomeIndex symbol={"IXIC"} />
            <HomeIndex symbol={"DJI"} />
            <HomeIndex symbol={"SPX"} />
        </HomeSide>
        <Nnews><News/> </Nnews>
        <TestChart data={"SPX"} timePeriod={"1week"} />
    </Wrapper>)

};

const HomeSide = styled.div`
display: flex;
flex-direction: column;
justify-content: flex-start;
gap: 45px;
`;

const NewsWidth =styled.div`
width: 50%;
`;

const IndividualNews = styled.div`
width: 33%;
display: flex;
flex-direction: column;
align-items: center;
gap:30px;
`;

const ImageU = styled.img`
height: 250px;
width: 300px;
z-index:2;
`;

const Wrapper = styled.div`
padding-top:5px;
height: 85vh;
display: flex;
flex-direction: row;
justify-content: space-evenly;
align-items: center;
background-image: url(${defaultAvatar});
background-size: 100%;
background-repeat: no-repeat;
`;

const Nnews = styled.div`
padding-top:30px;
display: flex;
flex-direction: column;
justify-content: space-evenly;
height: 70vh;
width: 45%;
`;

export default HomePage;