import React from 'react';

function Finished({points,maxPossiblePoints }) {

  const percentage = (points / maxPossiblePoints) * 100;

  return (
    <p className='result'>
      You scored <strong>{points}</strong> out of <strong>{maxPossiblePoints} ({Math.ceil(percentage)}%)</strong>
    </p>
  );
}

export default Finished;