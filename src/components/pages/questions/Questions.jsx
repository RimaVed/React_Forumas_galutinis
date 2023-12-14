import { useContext } from "react";
import { Link } from "react-router-dom";
import QuestionsContext from "../../../contexts/QuestionsContext";
import TheQuestion from "../../UI/theQuestion/TheQuestion";
import UsersContext from "../../../contexts/UsersContext";
import styled from "styled-components";

const StyledQuestions = styled.section`
  max-width: 800px;
  margin: auto;

  h1 {
    font-size: 24px;
    margin-bottom: 20px;
    color: #333;
  }

  button {
    background-color: #3498db;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #2980b9;
    }
  }

  .add-question-button {
    background-color: #4caf50;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: greenyellow;
    }
  }
  div {
  }
`;

const Questions = () => {
  const { questions } = useContext(QuestionsContext);
  const { loggedInUser } = useContext(UsersContext);

  // console.log(question);

  return (
    <StyledQuestions>
      <h1> Questions </h1>
      {loggedInUser && (
        <Link to="/questions/addNewQuestion">
          <button className="add-question-button">AddNewQuestion</button>
        </Link>
      )}

      <div>
        {questions.map((question) => {
          return <TheQuestion key={question.id} data={question} />;
        })}
      </div>
    </StyledQuestions>
  );
};
export default Questions;
