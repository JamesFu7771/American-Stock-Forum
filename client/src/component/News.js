import styled from "styled-components";
import { useAuth0 } from "@auth0/auth0-react";
import { useContext } from "react";


// import getFinanceMarketNews from "./component/HandleData";
import { MemberContext } from "./members/MemberContext";

const News = () => {
    let news;
    const {marketNews} =  useContext(MemberContext);
    const { user } = useAuth0();
    console.log(".................................",typeof(marketNews));
    if (marketNews === undefined) {
        return <>Loading...</>
    } else {
        news = Object.values(marketNews).map((value) => {
            console.log("newsL==-----------------------===",value);
            return <IndividualNews>
                <a href={value.url} key={value.uuid} overflowWrap="break-word">{value.title}</a>
                <NewsContext>
                    <ImageU src={value.image_url} alt={value.title} />
                    <a>{value.description} </a>
                </NewsContext>
            </IndividualNews>
        })
    };
    // {value.title}

    return (<Wrapper>
        <Hh2>Today's Top News:</Hh2>
        {/* <div>{JSON.stringify(user, null, 2)}</div> */}
        <NewsDiv>{marketNews === undefined? "   Loading..." : news} </NewsDiv>

    
    </Wrapper>)

};

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
/* justify-content: center; */
align-items: flex-start;
gap:30px;
padding: 13px;
background-color: rgba(243,243,243, 0.1);
border: 2px solid rgba(243,243,243, 0.1);
border-radius: 12px;
`;

const ImageU = styled.img`
/* height: 250px; */
width: 100px;
z-index:2;
/* border: 3px solid red; */
`;

const Wrapper = styled.div`
/* width: 400px; */
width: 100%;
height: 100%;
`;

const NewsDiv = styled.div`
/* padding-top:10px; */
display: flex;
flex-direction: column;
justify-content: space-evenly;
/* gap: 40px; */
height: 100%;
/* border: 13px solid blue; */
`;

export default News;