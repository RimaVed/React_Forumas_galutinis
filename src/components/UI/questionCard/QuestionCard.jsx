import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledQuestionCard = styled.div`
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
  text-decoration: none;
  color: black;

  h1 {
    font-size: 18px;
    margin-bottom: 8px;
  }
`;

const QuestionCard = ({ data }) => {
  return (
    <Link to={`/questions/${data.id}`} style={{}}>
      <StyledQuestionCard>
        <h1>{data.title}</h1>
        <h1>{data.description}</h1>
      </StyledQuestionCard>
    </Link>
  );
};

export default QuestionCard;
