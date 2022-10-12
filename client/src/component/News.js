import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";
import { MemberContext } from "./members/MemberContext";

const News = () => {
    let news;
    const {marketNews} =  useContext(MemberContext);
    if (marketNews === undefined) {
        return <>Loading...</>
    } else {
        news = Object.values(marketNews).map((value) => {
            return <IndividualNews key={value.uuid}>
                <Aa href={value.url} key={value.uuid} overflowWrap="break-word">{value.title}</Aa>
                <NewsContext>
                    <ImageU src={value.image_url} alt={value.title} />
                    <a>{value.description} </a>
                </NewsContext>
            </IndividualNews>
        })
    };

    return (<Wrapper>
        <Hh2>Today's Top News:</Hh2>
        <NewsDiv>{marketNews === undefined? "   Loading..." : news} </NewsDiv>
    </Wrapper>)

};

const Aa= styled.a`
font-size: 23px;
`;

const Hh2=styled.span`
font-size: 28px;
color: greenyellow;
font-style: italic;
`;

const NewsContext=styled.div`
display: flex;
flex-direction: row;
gap: 18px;
`;

const IndividualNews = styled.div`
width: 100%;
display: flex;
flex-direction: column;
align-items: flex-start;
gap:30px;
padding: 13px;
background-color: rgba(243,243,243, 0.1);
border: 2px solid rgba(243,243,243, 0.1);
border-radius: 12px;
`;

const ImageU = styled.img`
width: 100px;
z-index:2;
`;

const Wrapper = styled.div`
width: 100%;
height: 100%;
`;

const NewsDiv = styled.div`
display: flex;
flex-direction: column;
justify-content: space-evenly;
height: 100%;
`;

export default News;