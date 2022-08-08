import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";


// import Bookmarks from "./Bookmarks";
import HomePage from "./HomePage";
// import Notifications from "./Notifications";
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
            <Route path="/" element={<HomePage />} />
            {/* <Route path="/notifications" element={<Notifications/>} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/tweet/:tweetId" element={<TweetDetails />} />
            <Route path="/:profileId" element={<Profile />} /> */}
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
