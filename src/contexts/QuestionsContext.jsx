import { createContext, useEffect, useReducer, useState } from "react";

const QuestionsContext = createContext();

const QuestionsActionTypes = {
  get_all: 'get all questions from db',
  add: 'add one new questions',
  remove: 'remove one specific questions',
  edit: 'edit one specific questions',
};

const reducer = (state, action) => {
  switch(action.type){
    case QuestionsActionTypes.get_all:
      return action.data;
    case QuestionsActionTypes.add:
      fetch(`http://localhost:8080/questions`, {
        method: "POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify(action.data)
      });
      return [...state, action.data];
    case QuestionsActionTypes.remove:
      fetch(`http://localhost:8080/questions/${action.id}`,{
        method: "DELETE"
      });
      return state.filter(el => el.id.toString() !== action.id.toString());
    case QuestionsActionTypes.edit:
      return state.map(el => {
          if(el.id.toString() === action.id.toString()){
            fetch(`http://localhost:8080/questions/${action.id}`, {
              method: "PUT",
              headers:{
                "Content-Type":"application/json"
              },
              body: JSON.stringify({ registerDate:el.registerDate, ...action.data})
            });
            return { id:action.id, registerDate:el.registerDate, ...action.data };
          } else {
            return el;
          }
        });
    default:
      console.log("error: action type not found", action.type);
      return state;
  }
}

const QuestionsProvider = ({ children }) => {

  const [questions, setQuestions] = useReducer(reducer, []);

  useEffect(() => {
    fetch(`http://localhost:8080/questions`)
      .then(res => res.json())
      .then(data => setQuestions({
        type: QuestionsActionTypes.get_all,
        data: data
      }));
  }, []);

  return (
    <QuestionsContext.Provider
      value={{
        questions,
        setQuestions,
        QuestionsActionTypes,
      }}
    >
      { children }
    </QuestionsContext.Provider>
  );
}

export { QuestionsProvider };
export default QuestionsContext;