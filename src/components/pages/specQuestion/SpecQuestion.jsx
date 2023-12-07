import { useParams, Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import QuestionsContext from "../../../contexts/QuestionsContext";
import styled from "styled-components";

const SpecQuestionStyled = styled.section`
  max-width: 600px;
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

    &:hover {
      background-color: #0056b3;
    }
  }
`;

const SpecQuestion = () => {
  const { questions, setQuestions } = useContext(QuestionsContext);
  const { id } = useParams();
  console.log("ID from useParams:", id);

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
        </>
      )}
    </SpecQuestionStyled>
  );
};

export default SpecQuestion;
