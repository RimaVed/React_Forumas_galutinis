import { useContext, useEffect } from "react";
import AnswersContext from "./../../../contexts/AnswersContext";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const AnswersStyled = styled.div`
  margin-top: 20px;

  h2 {
    font-size: 20px;
    margin-bottom: 10px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    margin-bottom: 10px;
  }
`;

const Answers = () => {
  const { id } = useParams();
  const { answers, setAnswers } = useContext(AnswersContext);
  useEffect(() => {
    fetch(`http://localhost:8080/answers?questionId=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setAnswers(data);
      })
      .catch((error) => {
        console.error("Klaida gaunant atsakymus", error);
      });
  }, [id, setAnswers]);
  return (
    <AnswersStyled>
      <h2>Answers</h2>
      <ul>
        {answers.map((answer) => (
          <li key={answer.id}>
            <p>{answer.text}</p>
          </li>
        ))}
      </ul>
    </AnswersStyled>
  );
};

export default Answers;
