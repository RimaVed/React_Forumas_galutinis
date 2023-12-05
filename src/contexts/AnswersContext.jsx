import { createContext, useEffect, useReducer, useState } from "react";

const AnswersContext = createContext();

const AnswersActionTypes = {
  get_all: 'get all questions from db',
  add: 'add one new questions',
  remove: 'remove one specific questions',
  edit: 'edit one specific questions',
};

const reducer = (state, action) => {
  switch(action.type){
    case AnswersActionTypes.get_all:
      return action.data;
    case AnswersActionTypes.add:
      fetch(`http://localhost:8080/answers`, {
        method: "POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify(action.data)
      });
      return [...state, action.data];
    case AnswersActionTypes.remove:
      fetch(`http://localhost:8080/answers/${action.id}`,{
        method: "DELETE"
      });
      return state.filter(el => el.id.toString() !== action.id.toString());
    case AnswersActionTypes.edit:
      return state.map(el => {
          if(el.id.toString() === action.id.toString()){
            fetch(`http://localhost:8080/answers/${action.id}`, {
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

const AnswersProvider = ({ children }) => {

  const [answers, setAnswers] = useReducer(reducer, []);

  useEffect(() => {
    fetch(`http://localhost:8080/answers`)
      .then(res => res.json())
      .then(data => setAnswers({
        type: AnswersActionTypes.get_all,
        data: data
      }));
  }, []);

  return (
    <AnswersContext.Provider
      value={{
        answers,
        setAnswers,
        AnswersActionTypes,
      }}
    >
      { children }
    </AnswersContext.Provider>
  );
}

export { AnswersProvider };
export default AnswersContext;