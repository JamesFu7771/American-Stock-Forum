import { useEffect, useState } from "react";
import styled from "styled-components";
import Comment from "./Comment";
import InfiniteScroll from "react-infinite-scroll-component";

const Comments = () => {
    const [comments, setComments] = useState([]);
    const [hasNext, setHasNext] = useState(true);
    const [status, setStatus] = useState("loading");
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(6);
    const refreshTimeout = 200;

    useEffect(() => {
      fetchNextPage();
    }, []);

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
                setPage(page + 1);
                setHasNext(res.hasNext);
                const temp = comments.concat(Array.from(res.data));
                setComments(temp);
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
        };

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
                            <div style={{ height: "70vh" }}>
                              <Loader>
                                <Spinner />
                              </Loader>
                            </div>
                          }
                        dataLength={{ size }}
                        next={fetchNextPage}
                        hasMore={hasNext}
                    >
                      {comments.map((comment, index) => {
                          return <Comment key={index} comment={comment} />
                      })}

                    </InfiniteScroll>
                </CommentsWrapper>

            }
        </>
    );
};

export default Comments;


const CommentsWrapper = styled.div`
  margin: 0px 5% 100px 10%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
`;


const Loader = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  z-index: 5000;
  top: 0;
  left: 0;
  float: left;
`;

const Span = styled.hr`
  width: 84%;
  margin: 3px 3% 4px 10%;
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
  margin-top: 50px;
  font-family: sans-serif;
  font-size: 32px;
`;