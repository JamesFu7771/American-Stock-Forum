import { useState } from "react";
import styled from "styled-components";
import TestChart from "./component/data/TestChart";
import Post from "./component/members/Post";
import Comments from './component/members/Comments/Comments';

const IndividualStock = () => {
    const [symbolName, setSymbolName] = useState("AAPL");
    const [timePeriod, setTimePeriod] = useState("1day");
    // let symbolName = "AAPL";
    // let timePeriod = "1day";

    const submitFunc = async (ev) => {
        ev.preventDefault();
        console.log("Form click and HERE:========================================================");
        
        let tempSy = ev.target[0].value.toUpperCase();
        let tempPe = ev.target[1].value.toLowerCase();
        setSymbolName(tempSy);
        setTimePeriod(tempPe);

        // const oldSeatNo = await checkReservation(email, setHasReservation, seatNo, flight);

        // console.log("oldSeatNo----updateResult",oldSeatNo);
 
        //     let updateResult= await updateSeatStatus(flight, seatNo, false);

            console.log("go to fetch:", symbolName, timePeriod);

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
        <Comments/>


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
/* justify-content: space-around; */
`;

const FormD = styled.form`

display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 30px;
/* height: 150px; */
height: 100%;
/* width: 550px; */
padding: 40px;
/* border: 3px solid red; */
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