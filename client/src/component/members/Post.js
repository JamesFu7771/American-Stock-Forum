import { useAuth0 } from "@auth0/auth0-react";
import { useState, useContext } from "react";
import { MemberContext } from "./MemberContext";
import moment from "moment";
import { CircularProgress } from '@mui/material';
import styled from "styled-components";


const Post = () => {
    const [postContext, setPostContext] = useState("");
    const [count, setCount] = useState(280);
    const [inLimit, setInLimit] = useState(false);
    const { user } = useAuth0();
    const {updateFeed, setUpdateFeed} = useContext(MemberContext);
    const [cntColor, setCntColor] = useState("black");

    if  (user===null || user===undefined) {
        return <DivForm><h1>not a member, can't post!</h1></DivForm>
    };


    const userEmail = user.email;

    const handleCount = (e) => {
        setPostContext(e.target.value);
        setCount(280-postContext.length);
    
        if (count < 0) {
            setInLimit(true);
            setCntColor("red");
        } else if (count < 56) {
            setCntColor("yellow");
            setInLimit(false);
        } else {
            setCntColor("black");
        };
    };

    const submitFunc = (ev) => {
        const timestamp = new Date().toISOString();
        ev.preventDefault();
        fetch("/api/comment",{
            method: "POST",
            body: JSON.stringify({
                status: postContext,
                author: userEmail,
                nickname:user.nickname,
                timestamp: moment(timestamp).format(),

            }),
            headers : { 
                'Content-Type': 'application/json',
            },
        })
        .then(res => {
            return res.json()})
        .then(data => {
            setUpdateFeed(!updateFeed);
            setPostContext("");
            });

    };

    return (
        <Wrapper>
            <Head> Your comment:</Head>

            {userEmail===null || userEmail===undefined
            ?    <LoadingSpinner>
                    <CircularProgress />
                </LoadingSpinner>
            :    <Form onSubmit={submitFunc}>
                    <PostDiv>
                        <DivForm >
                            <PostInput placeholder="Please input your comment:" value={postContext} onChange={(e) => handleCount(e)} />
                            <CountDiv><SpanColor style={{color:`${cntColor}`}} >{count}</SpanColor> <PostSubmit type={"submit"} disabled={inLimit} style={{opacity: inLimit ? 0.2 : 1}} >Send</PostSubmit></CountDiv>
                        </DivForm>
                    </PostDiv>
                </Form>
            }
        </Wrapper>
    )

};

const LoadingSpinner = styled.div`
    display: flex;
    width: 70vw;
    height: 50vh;
    justify-content: center;
    align-items: center;
`;

const SpanColor=styled.span`
`;

const CountDiv=styled.div`
`;

const DivForm=styled.div`
display: flex;
height:31vh;
width:85%;
flex-direction: column;
align-items: flex-end;
padding-right: 6%;
gap: 3%;
`;


const PostDiv=styled.div`
display:flex;
flex-direction: row;
height:100%;
gap:20px;
`;

const PostSubmit = styled.button`
color: white;
width: 70px;
height: 30px;
border: 1px solid black;
background-color: rgba(0, 30, 255);
border-radius: 14px;
`;

const  Wrapper = styled.div`
    background: white;
    width: 80%;
    height:40vh;
    padding: 16px;
    padding-bottom: 3px;
    margin-left: 110px;
    text-align: left;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Ubuntu, "Helvetica Neue", sans-serif;
    border-bottom:15px solid rgba(101, 119, 134, 0.1);
`;

const Head=styled.div`
font-weight: bold;
font-size: 23px;
`;

const Form=styled.form`
width: 90%;
height:33vh;
margin-top: 6px;
border: 2px solid rgba(101, 119, 134, 0.1);
`;

const PostInput=styled.textarea`
width:98%;
height: 22vh;
padding-bottom:20px;
font-size: 38px;
word-break: break-all;

&:focus::placeholder {
    color: transparent;
}
`;

export default Post;