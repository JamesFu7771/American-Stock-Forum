import styled from "styled-components";
import { Link } from "react-router-dom";


const Comment = ({ comment }) => {
  return (
    <CommentWrapper to={`/`}>
      <Description>
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

const CommentWrapper = styled(Link)`
  text-decoration: none;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  float: left;
  width: 98%;
  margin: 12px;
  :hover {
    background-color: #DEDEDE;
  }
`;
const Description = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 10px 10px 10px 15px;
`;

const Wrapper2 = styled.div`
`;

const Img = styled.img`
  width: 150px;
  height: 150px;
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