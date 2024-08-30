import React from 'react';

function Options({ options, dispatch,answer,question }) {
  const hasAnswered = answer !== null;
  return (
    <div className="options">
        {options.map((option, index) => (
          <button key={index} className={`btn btn-option ${index === answer ? 'answer' : ''} 
          
            ${hasAnswered ? index === question.correctOption ? "correct" : "wrong":""}`}
            
            onClick={()=>dispatch({type:'newAnswer',payload:index})} disabled={hasAnswered}

          >{option}</button>
        ))}
      </div>
  );
}

export default Options;