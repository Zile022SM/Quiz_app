import React from "react";
import Options from "./Options";

function Question({ question, index, dispatch,answer }) {
  console.log(question);

  return (
    <>
      <h4>
        {index + 1}. {question.question}
      </h4>
      
      <Options options={question.options} dispatch={dispatch} answer={answer} question={question} />
    </>
  );
}

export default Question;
