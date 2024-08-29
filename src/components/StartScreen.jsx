import React from 'react';

function StartScreen({numQuestions,dispatch}) {
  return (
    <div className='start'>
      <h2>Welcome to The React Quiz!</h2>
      <h3>{numQuestions} questions to test your React mastery</h3>
      <button className='btn bnt-ui' onClick={()=>{dispatch({type:'active'})}}>Let's start</button>
    </div>
  );
}

export default StartScreen;