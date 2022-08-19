import { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import Comment from "./Comment";
import InfiniteScroll from "react-infinite-scroll-component";
import { MemberContext } from "../MemberContext";


const Comments = () => {
    const {updateFeed, setUpdateFeed} = useContext(MemberContext);
    const [comments, setComments] = useState([]);
    const [hasNext, setHasNext] = useState(true);
    const [status, setStatus] = useState("loading");
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(21);
    const refreshTimeout = 200;

    
    useEffect(() => {
        fetchNextPage();
    }, []);
    
    useEffect(() => {
        
        console.log("updateFeed  8888888888888888 in Effect", updateFeed);
        fetchComments();
    },[updateFeed]);

    // useEffect(() => {
    //     const fetchUsers = async () => {
    //       const response = await fetch('/api/users');
    //       const fetchedUsers = await response.json();
    //       setUsers(fetchedUsers.data);
    //     };
    //     fetchUsers();
    //   }, []);
    

    const fetchComments = () => {
        const url = `/api/comments?page=${page}&size=${size}`;
        fetch(url, {
            method: "GET",
            headers: {
                Accept: "application/json, text/plain, */*",
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                setPage(page + 1);
                setHasNext(res.hasNext);
                const temp = Object.values(res.data);
                console.log("in Comments 3333333333333333333", res.data,temp[0].comment, typeof(temp));
                setComments(temp.reverse());

                setStatus("loaded");
            })
            .catch((error) => {
                console.log(error);
                setStatus("error");
            });
    };

    const fetchNextPage = () => {
        if (!hasNext) {
            return;
        }

        setTimeout(function () {
            fetchComments();
        }, refreshTimeout);
    };

    return (
        <>
            <Title>Comments:</Title>
            <Span></Span>
            {
                <CommentsWrapper id="scrollableCommentsWrapper">
                    <InfiniteScroll
                        loader={
                            <div style={{ height: "100vh" }}>
                              <Loader>
                                <Spinner />
                              </Loader>
                            </div>
                          }
                        dataLength={{ size }}
                        next={fetchNextPage}
                        hasMore={hasNext}
                    >
                        <ViewComment >
                            {comments.map((comment, index) => {
                                // console.log("comment22222222222222222", comment.status);
                                return <Comment key={index} comment={comment} />;
                            })}

                        </ViewComment>
                    </InfiniteScroll>
                </CommentsWrapper>

            }
        </>
    );
};

export default Comments;

const ViewComment = styled.div`
display: flex;
flex-direction: column;
justify-content: flex-start;
align-items: flex-start;
/* border: 1px solid red; */
`;

const CommentsWrapper = styled.div`
  /* overflow: auto; */
  /* height: 300, */
  margin: 0px 5% 100px 10%;
  display: flex;
  justify-content: flex-start;
  float: left;
  /* align-content: center; */
`;


const Loader = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  z-index: 5000;
  top: 0;
  left: 0;
  float: left;
  /* text-align: center; */
`;

const Span = styled.hr`
  border: 2px solid black;
  text-decoration: underline;
  margin-top: 70px;
  margin-left: 175px;
  margin-right: 175px;
  margin-bottom: 70px;
`;

const OurComments = styled.h2`
  display: flex;
  justify-content: center;
  margin-top: 250px;
  margin-left: -80px;
  font-family: sans-serif;
  font-size: 32px;
`;

const Spinner = styled.div`
  margin: 25% auto;
  margin-top: 500px;
  height: 64px;
  width: 64px;
  animation: rotate 0.8s infinite linear;
  border: 5px solid #2c3639;
  border-right-color: transparent;
  border-radius: 50%;
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Title = styled.h2`
  display: flex;
  justify-content: center;
  margin-top: 250px;
  font-family: sans-serif;
  font-size: 32px;
`;