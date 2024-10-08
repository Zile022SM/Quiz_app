import "../App.css";
import Header from "./Header";
import Main from "../assets/Main";
import { useEffect, useReducer } from "react";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import Finished from "./Finished";

const initialState = {
  questions: [],

  //loading,error,ready,active,finished
  status: "loading",
  index: 0,
  answer:null,
  points:0
};

function reducer(state, action) {
  switch (action.type) {
    case "dataRecived":
      return { ...state, questions: action.payload, status: "ready" };

    case "dataFailed":
      return { ...state, status: "error" };
    case "active":
      return { ...state, status: "active" };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return { ...state, answer: action.payload,points:action.payload === question.correctOption ? state.points + question.points : state.points};
    case "nextQuestion":
      return {...state, index: state.index + 1, answer:null };
    case "finish":
      return { ...state, status: "finished" };
    default:
      throw new Error("Action unknown");
  }
}

function App() {
  const [{ questions, status, index,answer,points }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((prev,current)=> prev + current.points, 0);

  useEffect(function () {
    setTimeout(() => {
      fetch("http://localhost:9000/questions")
        .then((res) => res.json())
        .then((data) => dispatch({ type: "dataRecived", payload: data }))
        .catch((err) => dispatch({ type: "dataFailed" }));
    }, 2000);
  }, []);

  return (
    <div className="app">
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress index={index} numQuestions={numQuestions} points={points} maxPossiblePoints={maxPossiblePoints} answer={answer}/>
            <Question question={questions[index]} index={index} dispatch={dispatch} answer={answer} />
            <NextButton dispatch={dispatch} answer={answer} index={index} numQuestions={numQuestions} /> 
          </>      
        )}
        {status === "finished" && <Finished points={points} maxPossiblePoints={maxPossiblePoints} />} 
      </Main>
    </div>
  );
}

export default App;
