import styled from "styled-components";
import { AiOutlineStock } from 'react-icons/ai';
import {BiUser} from 'react-icons/bi';
import { useNavigate} from "react-router-dom";
import { useState } from "react";
import LoginButton from "./component/auth0/LoginButton";
import LogoutButton from "./component/auth0/LogoutButton";

const Header = () => {
    const [liId, setLiId] = useState("HomePage");
    let navigate = useNavigate();

    const handleClick = (e) => {
        setLiId(e.target.id);
        navigate(`/${e.target.id}`);
    };


    return <Wrapper>
        <Titile> 
            <ForumName>
                <AiOutlineStock />&nbsp;&nbsp;<h1 style={{ color: 'gold', fontStyle: "italic" }}> Wavon </h1>&nbsp;&nbsp;<AiOutlineStock />&nbsp;&nbsp;<h4>American Stock Forum</h4>
            </ForumName>
            <UserLoginOut>
                <BiUser/>
                <LoginButton />
                <LogoutButton />
            </UserLoginOut>
        </Titile>
        <MenuUl >
            <Menuli><Menuinput type="radio" name="menu" id="HomePage" isSelected={"HomePage" === liId } onClick={(e) => handleClick(e)} /><label htmlFor="HomePage">Home</label></Menuli>
            <Menuli><Menuinput type="radio" name="menu" id="StockEducation" isSelected={"StockEducation" === liId} onClick={(e) => handleClick(e)} /><label htmlFor="StockEducation"> Stock Education</label></Menuli>
            <Menuli><Menuinput type="radio" name="menu" id="ChatRoom" isSelected={"ChatRoom"=== liId} onClick={(e) => handleClick(e)} /><label htmlFor="ChatRoom"> Chat Room</label></Menuli>
            <Menuli><Menuinput type="radio" name="menu" id="StockNews" isSelected={"StockNews"=== liId} onClick={(e) => handleClick(e)} /><label htmlFor="StockNews">News</label></Menuli>
            <Menuli><Menuinput type="radio" name="menu" id="IndividualStock" isSelected={"IndividualStock"=== liId} onClick={(e) => handleClick(e)} /><label htmlFor="IndividualStock">Individual Stock</label></Menuli>
            <Menuli><Menuinput type="radio" name="menu" id="WatchList" isSelected={"WatchList"=== liId} onClick={(e) => handleClick(e)} /><label htmlFor="WatchList">WatchList</label></Menuli>
        </MenuUl>
    </Wrapper>
};

const Menuinput = styled.input`
display:none;
`;

const ForumName= styled.div`
font-style: italic;
display: flex;
flex-direction: row;
align-items: flex-end;
justify-content: center;
width:85%;
min-height: 100px;
font-size: calc(12px + 2vmin);
color: white;
padding-bottom:15px;
background-color: grey;
`;

const UserLoginOut = styled(ForumName)`
gap: 15px;
padding-bottom:20px;
width: 15%;
`;

const Wrapper = styled.div`
`;

const MenuUl=styled.ul`
  list-style-type: none;
  width: 100vw;
  padding: 0 15px;
  height: 100%;
  background-color: green;
  display: flex;
  overflow: hidden;
  flex-direction: row;
  justify-content: space-evenly;
  align-items:center;
  font-size: 25px;
  `;

const Menuli=styled.li`
text-align: center;
float: left;
display: block;
height: 100%;
padding: 8px 8px;
background-color: ${props => props.children[0].props.isSelected && "gold"};
opacity: ${props => props.children[0].props.isSelected && "0.7"};
&:hover {
    background-color: gold;
    color:white;
};
`; 


const Titile = styled.div`
background-color: #282c34;
background-color: grey;
min-height: 100px;
display: flex;
flex-direction: row;
align-items: flex-end;
justify-content: center;
font-size: calc(12px + 2vmin);
color: white;
padding-bottom:15px;
`;


export default Header;