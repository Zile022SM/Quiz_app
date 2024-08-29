import React from 'react';

function Options({ options, dispatch,answer,question }) {
  return (
    <div className="options">
        {options.map((option, index) => (
          <button key={index} className={`btn btn-option ${index === answer ? 'answer' : ''} ${index === question.correctOption ? "correct" : "wrong"}`} onClick={()=>dispatch({type:'newAnswer',payload:index})} disabled={answer !== null} >{option}</button>
        ))}
      </div>
  );
}

export default Options;