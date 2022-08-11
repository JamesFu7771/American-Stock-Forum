import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";


// import getFinanceMarketNews from "./component/HandleData";
import { MemberContext } from "./component/members/MemberContext";

const News = () => {
    const {marketNews} =  useContext(MemberContext);
    const { user } = useAuth0();
    console.log(typeof(marketNews));
    const news = Object.values(marketNews).map((value) => {
        return <IndividualNews>
            <a href={value.url} key={value.uuid} overflowWrap="break-word">{value.title}</a>
            <ImageU src={value.image_url} alt={value.title} />
        </IndividualNews>
    })
    // {value.title}

    return (<Wrapper>
        <div>{JSON.stringify(user, null, 2)}</div>
        <NewsDiv>{news} </NewsDiv>

    
    </Wrapper>)

};

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

const Wrapper = styled.div``;

const NewsDiv = styled.div`
padding-top:30px;
display: flex;
flex-direction: row;
justify-content: space-evenly;
height: 70vh;
/* border: 13px solid blue; */
`;

export default News;