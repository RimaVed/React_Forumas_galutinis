import { useParams, Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import QuestionsContext from "../../../contexts/QuestionsContext";
import Answers from "./answers/Answers";
import AnswersContext from "../../../contexts/AnswersContext";
import styled from "styled-components";

const SpecQuestionStyled = styled.section`
  max-width: 800px;
  height: 600px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;

  h1 {
    font-size: 24px;
    margin-bottom: 10px;
  }

  p {
    margin-bottom: 20px;
    font-size: 20px;
  }

  span {
    display: block;
    margin-top: 10px;
    color: #888;
  }

  .back {
    margin-top: 20px;
  }

  button {
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  button:hover {
    background-color: #0056b3;
  }
  button.edit {
    background-color: #4caf50;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  button.edit:hover {
    background-color: #2ecc71;
  }

  button.delete {
    background-color: #ff4444;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  button.delete:hover {
    background-color: #d63031;
  }
`;

const SpecQuestion = () => {
  const { questions, setQuestions } = useContext(QuestionsContext);
  const { id } = useParams();
  const { answers, setAnswers } = useContext(AnswersContext);
  const navigate = useNavigate();
  const [myQuestion, setMyQuestion] = useState({});
  useEffect(() => {
    console.log("Effect is running!");
    fetch(`http://localhost:8080/questions/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.title) {
          navigate("/questions");
        } else {
          setMyQuestion(data);
        }
      })
      .catch((error) => {
        console.error("Klaida gaunant klausimą", error);
      });
  }, [id, navigate]);

  return (
    <SpecQuestionStyled>
      <button className="edit">Edit Question </button>
      <button className="delete">Delete Question</button>
      {myQuestion && (
        <>
          <h1>{myQuestion.title}</h1>
          <div>
            <p>{myQuestion.description}</p>
          </div>
          <div>
            <span> Question date: {myQuestion.registerDate}</span>
          </div>
          <div>
            <Answers questionId={id} />
          </div>

          {/*  AnswerForm komponentą su questionId prop */}
          <div>
            <AnswerForm questionId={id} />
          </div>
          <Link to="/questions" className="back">
            <button>Back to Questions</button>
          </Link>
        </>
      )}
    </SpecQuestionStyled>
  );
};

export default SpecQuestion;
