import { useState, useContext } from "react";
import styled from "styled-components";
import TestChart from "./component/data/TestChart";
import Post from "./component/members/Post";
import Comments from './component/members/CommentsFolder/Comments';
import { MemberContext } from "./component/members/MemberContext";

const IndividualStock = () => {
    const [symbolName, setSymbolName] = useState("AAPL");
    const [timePeriod, setTimePeriod] = useState("1day");
    const {updateFeed, setUpdateFeed} = useContext(MemberContext);

    const submitFunc = async (ev) => {
        ev.preventDefault();        
        let tempSy = ev.target[0].value.toUpperCase();
        let tempPe = ev.target[1].value.toLowerCase();
        setSymbolName(tempSy);
        setTimePeriod(tempPe);
    };

    return <Wrapper>
        <Header>
            <PostComments>
                <Post/>
            </PostComments>
            <GotStock>
                <TestChart data={symbolName} timePeriod={timePeriod} />
                <FormD onSubmit={(e) => submitFunc(e) }>
                        <SymbolInput type="text" placeholder="please input Symbol" required  />
                        <PeriodInput type="text" placeholder="1min, 5min, 15min, 30min, 45min, 1h, 2h, 4h, 1day, 1week, 1month" required />
                        <ConfirmBtn type={"submit"} >CONFIRM</ConfirmBtn>
                </FormD>
            </GotStock>
        </Header>
        <Comments key={updateFeed} />

    </Wrapper>
};

const Header = styled.div`
display: flex;
flex-direction: row;
justify-content: space-around;
`;

const PostComments = styled.div`
width: 50%;
`;

const GotStock= styled.div`
display: flex;
flex-direction: row ;
justify-content: center;
align-items: flex-end;
gap: 50px;
height: 400px;
`;

const Wrapper=styled.div`
display: flex;
flex-direction: column;
`;

const FormD = styled.form`

display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 30px;
height: 100%;
padding: 40px;
`;

const SymbolInput = styled.input`
width: 350px;
height: 40px;
`;

const PeriodInput = styled(SymbolInput)`
width: 350px;
`;

const ConfirmBtn = styled.button`
font-size: 100%;
height: 44px;
box-sizing: border-box;
background-color: rgba(246, 0, 38,0.5);
`;



export default IndividualStock;