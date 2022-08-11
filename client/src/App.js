import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";


import WatchList from "./WatchList";
import HomePage from "./HomePage";
import StockNews from "./StockNews";
import StockEducation from "./StockEducation";
import ChatRoom from "./ChatRoom";
import IndividualStock from "./IndividualStock";
// import Profile from "./Profile";
import Header from "./Header";
// import TweetDetails from "./TweetDetails";
import GlobalStyles from "./GlobalStyles";
import styled from "styled-components";

const App = () => {
  return (
    <>
      <GlobalStyles/>
      <Wrapper>
        <Router>
          <Header/>
          <Routes>
            <Route exact path="/HomePage" element={<HomePage />} />
            <Route exact path="/WatchList" element={<WatchList/>} />
            <Route exact path="/StockNews" element={<StockNews />} />
            <Route exact path="/StockEducation" element={<StockEducation/>} />
            <Route exact path="/ChatRoom" element={<ChatRoom />} />
            <Route exact path="/IndividualStock" element={<IndividualStock />} />
            {/* <Route exact path="/tweet/:tweetId" element={<TweetDetails />} /> */}
            {/* <Route exact path="/:profileId" element={<Profile />} /> */}
          </Routes>
        </Router>
      </Wrapper>
    </>

  );
}

const Wrapper=styled.div`
display:flex;
flex-direction: column;
/* padding-right: 250px; */
border:2px solid red;
`;


export default App;
