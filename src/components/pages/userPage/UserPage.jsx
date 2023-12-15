import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import QuestionsContext from "../../../contexts/QuestionsContext";
import AnswersContext from "../../../contexts/AnswersContext";
import styled from "styled-components";
import SpecQuestion from "../specQuestion/SpecQuestion";
import UsersContext from "../../../contexts/UsersContext";
// import QuestionCard from "../../UI/questionCard/questionCard";

const UserPage = () => {
  //   const { answers } = useContext(AnswersContext);
  //   const { loggedInUser } = useContext(UsersContext);
  //   const [userAnswer, setUserAnswer] = useState(
  //     answers.filter(
  //       (answer) => answer.userId.toString() === loggedInUser.id.toString()
  //     )
  //   );
  return (
    <>
      <h1>All questions & answers</h1>
      {/* <div>
        {userAnswer.length ? (
          userAnswer.map((answer) => {
            return <AnswerCard key={answer.id} data={answer} />;
          })
        ) : (
          <h1>You have no answers.</h1>
        )}
      </div> */}
    </>
  );
};

export default UserPage;
