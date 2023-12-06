import { useContext } from "react";
import QuestionsContext from "../../../contexts/QuestionsContext";
import TheQuestion from "../../UI/theQuestion/TheQuestion";

const Questions = () => {
  const { questions } = useContext(QuestionsContext);

  // console.log(question);

  return (
    <section>
      <h1> Questions </h1>
      <div>
        {questions.map((question) => {
          return <TheQuestion key={question.id} data={question} />;
        })}
      </div>
    </section>
  );
};
export default Questions;
