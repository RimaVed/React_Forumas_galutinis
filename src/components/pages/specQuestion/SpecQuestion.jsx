import { useParams, Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import AnswersContext from "../../../contexts/AnswersContext";
import QuestionsContext from "../../../contexts/QuestionsContext";
import Answers from "../answers/Answers";
import AddNewAnswer from "../addAnswer/AddAnswer";
import UsersContext from "../../../contexts/UsersContext";
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
  /* Question */

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
  /* Answer */

  button.edit_answer {
    background-color: #4caf50;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  button.edit_answer:hover {
    background-color: #2ecc71;
  }

  button.delete_answer {
    background-color: #ff4444;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  button.delete_answer:hover {
    background-color: #d63031;
  }
`;

const SpecQuestion = () => {
  const { id } = useParams();
  const { setQuestions, QuestionsActionTypes } = useContext(QuestionsContext);
  const { AnswersActionTypes } = useContext(AnswersContext);
  const [answers, setAnswers] = useState("");
  const navigate = useNavigate();
  const [myQuestion, setMyQuestion] = useState("");
  const { loggedInUser } = useContext(UsersContext);
  // const [myQuestion, setMyQuestion] = useState({});

  useEffect(() => {
    fetch(`http://localhost:8080/questions/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.title) {
          navigate("/questions");
        }
        setMyQuestion(data); //klausimo info ateina čia.
      });
    // Užklausama serverio dėl visų atsakymų
    fetch("http://localhost:8080/answers")
      .then((res) => res.json())
      .then((data) => {
        console.log("All Answers:", data);
        const atsakymai = data.filter((answer) => answer.questionId == id);
        console.log("Filtered Answers:", atsakymai);
        setAnswers(atsakymai); // Nustato gautus atsakymus į 'answers' state
      });
  }, [id, navigate]);
  console.log("My Question:", myQuestion);

  return (
    <SpecQuestionStyled>
      {loggedInUser.id == myQuestion.userId && (
        <>
          <button
            className="edit"
            onClick={() => navigate(`/questions/edit/${id}`)}
          >
            Edit Question
          </button>

          <button
            className="delete"
            onClick={() => {
              setQuestions({ type: QuestionsActionTypes.remove, id: id });
              navigate("/questions/");
            }}
          >
            Delete Question
          </button>
        </>
      )}

      {myQuestion && (
        <>
          <h1>{myQuestion.title}</h1>
          <div>
            <p>{myQuestion.description}</p>
          </div>
          <div>
            <span> Question date: {myQuestion.releaseDate}</span>
          </div>
          <Link to="/questions" className="back">
            <button>Back to Questions</button>
          </Link>

          {answers && (
            <div>
              <ul>
                {answers.map((answer) => (
                  <li key={answer.id}>
                    <p>{answer.answer}</p>
                    {loggedInUser && loggedInUser.id == answer.userId && (
                      <>
                        <button className="edit_answer">Edit Answer</button>
                        <button
                          className="delete_answer"
                          onClick={() => {
                            setAnswers({
                              type: AnswersActionTypes.remove, // Use AnswersActionTypes
                              id: answer.id
                            });
                            navigate("/questions/");
                          }}
                        >
                          Delete Answer
                        </button>
                      </>
                    )}
                  </li>
                ))}
              </ul>
              {loggedInUser && (
                <Link to={`/questions/add-answer/${id}`} className="add_answer">
                  <button>Add Answer</button>
                </Link>
              )}
            </div>
          )}
        </>
      )}
    </SpecQuestionStyled>
  );
};

export default SpecQuestion;
