
import { useState } from "react";
import styled from "styled-components";


const WatchList = () => {
    const [syList, setSylist] = useState(null);
    console.log("here is watchlist");
  
    // const url = `/api/watchlist`;
    // fetch(url, {
    //     method: "GET",
    //     headers: {
    //         Accept: "application/json, text/plain, */*",
    //         "Content-Type": "application/json",
    //     },
    // })
    // .then((res) => res.json())
    // .then((res) => {
    //     console.log(res.data,typeof(res.data));
    //     // const temp = Object.values(res.data);
    //     setSylist(res.data);
    // })
    // .catch((error) => {
    //     console.log(error);
    // });


    return <Wrapper>coming soon!
        {/* {syList.map((item) => {
            return item
        })} */}

    </Wrapper>


};
const Wrapper = styled.div``;


export default WatchList;