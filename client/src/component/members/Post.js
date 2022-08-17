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

    // const userInfo = JSON.stringify(user, null, 2);

    console.log("user5555555555555555555555555",user );
    const userEmail = user.email;
    // const userEmail = user.email === undefined ? "" : userInfo["email"] ;

    // console.log("user5555555555555555555555555",typeof(userEmail),userEmail,updateFeed );

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
        console.log("inLimit: ",inLimit);
    };

    const submitFunc = (ev) => {
        const timestamp = new Date().toISOString();
        ev.preventDefault();
        console.log("==========================postContext: ",postContext);
        if (userEmail !==null & userEmail !== undefined) {
            fetch("/api/comment",{
                method: "POST",
                body: JSON.stringify({
                    status: postContext,
                    author: userEmail,
                    nickname:user.nickname,
                    timestamp: moment(timestamp).format("LLLL"),

                }),
                headers : { 
                    'Content-Type': 'application/json',
                },
            })
            .then(res => {
                // if (res.status !== "200") {
                //     console.log(res.status);
                //     throw new Error("error ------------")
                // };
                return res.json()})
            .then(data => {
                console.log("post ok?  b4 updateFeed: ", updateFeed);
                setUpdateFeed(!updateFeed);
                // if (data.profile.handle !==undefined) {
                setPostContext("");
                console.log("post ok?after updateFeed: ", updateFeed);

                    // }
            });
        };

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
                        {/* <AvatarImg src={currentAvatarSrc}/> */}
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
    /* border: 10px solid blue; */
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
/* border: 10px solid blue; */
gap: 3%;
`;


const PostDiv=styled.div`
display:flex;
flex-direction: row;
height:100%;
gap:20px;
/* border: 10px solid red; */
`;

const PostSubmit = styled.button`
color: white;
width: 70px;
height: 30px;
border: 1px solid black;
background-color: rgba(0, 30, 255);
/* ${({inLimit}) => inLimit ? 'background-color: rgba(0, 30, 255, 0.2);' : 'background-color: rgba(0, 30, 255, 1);'} */
border-radius: 14px;
/* margin-top: 20%; */
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
    /* border: 1px solid red; */
    border-bottom:15px solid rgba(101, 119, 134, 0.1);
`;

const Head=styled.div`
font-weight: bold;
font-size: 23px;
/* margin-left: 110px; */
`;

const Form=styled.form`
width: 90%;
height:33vh;
margin-top: 6px;
border: 2px solid rgba(101, 119, 134, 0.1);

`;

const AvatarImg=styled.img`
    margin-top:8px;
    margin-left: 8px;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    
`;

const PostInput=styled.textarea`
width:98%;
height: 22vh;
padding-bottom:20px;
font-size: 38px;
word-break: break-all;
/* border: px solid rgba(101, 119, 134, 0.1); */
/* border: 1px solid red; */
&:focus::placeholder {
    color: transparent;
}
`;

export default Post;