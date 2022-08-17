import styled from "styled-components";
import { Link } from "react-router-dom";


const Comment = ({ comment }) => {
    // console.log("comment--------11111111111111111", comment);
  return (
    <CommentWrapper to={`/`}>
      {/* <Img src={comment.imageSrc}></Img> */}
      <Description>
        {/* <Name>{comment.name}</Name> */}
        <Wrapper2>
          <Context>
            <span>Comment: </span>
            {comment.status}
          </Context>
          <ByAuthor>
            <span>By: </span>
            {comment.author}
          </ByAuthor>
          <PostTime>
            <span>Post time :</span>
            {comment.timestamp}
          </PostTime>
        </Wrapper2>
      </Description>
    </CommentWrapper>
  );
};


// const Wrapper1 = styled.div`
//   display: flex;
//   justify-content: center;
// `;

const CommentWrapper = styled(Link)`
  text-decoration: none;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  float: left;
  /* height: 200px;
  width: 30rem; */
  padding: 10px;
  margin: 12px;
  /* border: 2px solid #2c3639; */
  /* border-radius: 15px; */
  /* :hover {
    border: 2px solid orangered;
  } */
`;
const Description = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 10px 10px 10px 15px;
`;

const Wrapper2 = styled.div`
  margin: auto;
`;

const Img = styled.img`
  width: 150px;
  height: 150px;
`;
const Name = styled.p`
  display: flex;
  font-size: 20px;
  color: #a27b5c;
  font-weight: bold;
  line-height: 1.5rem;
  margin-bottom: 5px;
  font-family: "RolexFont";
`;

const Context = styled.p`
  display: flex;
  color: #2c3639;
  font-size: 15px;
  span {
    font-weight: bold;
    margin-right: 5px;
  }
`;

const ByAuthor = styled.p`
margin-top: 10px;
  display: flex;
  color: #2c3639;
  font-size: 15px;
  span {
    font-weight: bold;
    margin-right: 5px;
  }
`;

const PostTime = styled.p`
margin-top: 10px;
  font-size: 15px;
  display: flex;
  color: #2c3639;
  span {
    font-weight: bold;
    margin-right: 5px;
  }
`;

export default Comment;