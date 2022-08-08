import styled from "styled-components";
import { AiOutlineStock } from 'react-icons/ai';
import {BiUser, BiLogIn, BiLogOut} from 'react-icons/bi';
import { useNavigate} from "react-router-dom";
import { useState } from "react";

const Header = () => {
    const [liId, setLiId] = useState("Home");
    let navigate = useNavigate();

    const handleClick = (e) => {
        console.log(e.target.id);
        setLiId(e.target.id);
        
    }


    return <Wrapper>
        <Titile> <ForumName><AiOutlineStock />&nbsp;&nbsp;<h1 style={{ color: 'gold', fontStyle: "italic" }}> Wavon </h1>&nbsp;&nbsp;<AiOutlineStock />&nbsp;&nbsp;<h4>American Stock Forum</h4></ForumName><BiUser/></Titile>
        <Menuul >
            <Menuli><Menuinput type="radio" name="menu" id="Home" isSelected={"Home" === liId } onClick={(e) => handleClick(e)} /><label for="Home">Home</label></Menuli>
            <Menuli><Menuinput type="radio" name="menu" id="Stock Education" isSelected={"Stock Education" === liId} onClick={(e) => handleClick(e)} /><label for="Knowledges"> Knowledges</label></Menuli>
            <Menuli><Menuinput type="radio" name="menu" id="Chat" isSelected={"Chat"=== liId} onClick={(e) => handleClick(e)} /><label for="Chat"> Chat Room</label></Menuli>
            <Menuli><Menuinput type="radio" name="menu" id="Stock" isSelected={"Stock"=== liId} onClick={(e) => handleClick(e)} /><label for="Stock">Stock News</label></Menuli>
            <Menuli><Menuinput type="radio" name="menu" id="Individual" isSelected={"Individual"=== liId} onClick={(e) => handleClick(e)} /><label for="Individual">Individual Stock</label></Menuli>
            <Menuli><Menuinput type="radio" name="menu" id="WatchList" isSelected={"WatchList"=== liId} onClick={(e) => handleClick(e)} /><label for="WatchList">WatchList</label></Menuli>
        </Menuul>
    </Wrapper>
};
const Menuinput = styled.input`
display:none;
`;

const ForumName= styled.div`
width:75%;
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

const Wrapper = styled.div`
/* border:4px solid red; */
`;

const Menuul=styled.ul`
  list-style-type: none;
  width: 100vw;
  padding: 0 15px;
  height: 100%;
  /* margin-left: 27vw; */
  /* padding-right: 5vw; */
  /* margin-top: 11vh; */
  background-color: green;
  /* border: 2px solid red; */
  display: flex;
  overflow: hidden;
  flex-direction: row;
  justify-content: space-evenly;
  justify-items: baseline;
  align-items:center;
  font-size: 25px;
  /* border: 2px solid white; */
  `;

const Menuli=styled.li`
text-align: center;
/* border: 2px solid red; */
float: left;
display: block;
height: 100%;
padding: 8px 8px;
/* display:flex;  */
/* vertical-align: middle; */
/* text-align:center; */
background-color: ${props => props.children[0].props.isSelected && "gold"};
opacity: ${props => props.children[0].props.isSelected && "0.7"};
&:hover {
    background-color: gold;
    color:white;
};
`; 


const Titile = styled.div`
/* width: 180vw;
height:50px; */
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
/* border:2px solid blue; */
`;



export default Header;