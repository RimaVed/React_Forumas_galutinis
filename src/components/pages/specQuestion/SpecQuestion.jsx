import { useParams, Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AnswersContext from "../../../contexts/AnswersContext";
import QuestionsContext from "../../../contexts/QuestionsContext";
import Answers from "../answers/Answers";
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
  const { id } = useParams();
  const { setQuestions, QuestionsActionTypes } = useContext(QuestionsContext);
  const { answers, setAnswers } = useContext(AnswersContext);
  const navigate = useNavigate();
  const [myQuestion, setMyQuestion] = useState("");
  // const [myQuestion, setMyQuestion] = useState({});

  useEffect(() => {
    fetch(`http://localhost:8080/questions/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.title) {
          navigate("/questions");
        }
        setMyQuestion(data);
      });
    // Užklausama serverio dėl visų atsakymų
    fetch("http://localhost:8080/answers")
      .then((res) => res.json())
      .then((data) => {
        setAnswers(data); // Nustato gautus atsakymus į 'answers' state
        console.log("All Answers:", data);
      });
  }, [id, navigate]);

  // Filtruoju atsakymus, palieku tik tuos, kurie priklauso tam tikram klausimui
  const questionAnswers = answers.filter(
    (answer) => answer.questionId === myQuestion.id
  );
  console.log("Filtered Answers:", questionAnswers);

  return (
    <SpecQuestionStyled>
      <button className="edit"> Edit Question</button>

      <button
        className="delete"
        onClick={() => {
          setQuestions({ type: QuestionsActionTypes.remove, id: id });
          navigate("/questions/");
        }}
      >
        Delete Question
      </button>
      {myQuestion && (
        <>
          <h1>{myQuestion.title}</h1>
          <div>
            <p>{myQuestion.description}</p>
          </div>
          <div>
            <span> Question date: {myQuestion.registerDate}</span>
          </div>
          <Link to="/questions" className="back">
            <button>Back to Questions</button>
          </Link>
          <Answers questionId={myQuestion.id} answers={questionAnswers} />
          <div>
            <ul>
              {questionAnswers.map((answer) => (
                <li key={answer.id}>
                  <p>{answer.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </SpecQuestionStyled>
  );
};

export default SpecQuestion;
