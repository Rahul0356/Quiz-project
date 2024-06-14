import React, { useState, useRef } from 'react'; // Added useRef import
import './Quiz.css';
import { data } from '../assets/data';

const Quiz = () => {
  const [index, setIndex] = useState(0); // Changed initial index to 0
  const [question, setQuestion] = useState(data[0]); // Initialize with the first question
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false); // Added result state

  const Option1 = useRef(null);
  const Option2 = useRef(null);
  const Option3 = useRef(null);
  const Option4 = useRef(null);

  const option_array = [Option1, Option2, Option3, Option4];

  const checkAns = (e, ans) => {
    if (lock === false) {
      if (question.ans === ans) {
        e.target.classList.add('correct');
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add('wrong');
        option_array[question.ans - 1].current.classList.add('correct'); // Corrected this line
      }
      setLock(true);
    }
  };

  const next = () => {
    if (index < data.length - 1) {
      setIndex((prevIndex) => prevIndex + 1);
      setQuestion(data[index + 1]);
      setLock(false);
      option_array.forEach((option) => option.current.classList.remove('correct', 'wrong')); // Reset options
    } else {
      setResult(true); // Show result when all questions are done
    }
  };

  const reset = () => {
    setIndex(0);
    setQuestion(data[0]);
    setScore(0);
    setLock(false);
    setResult(false);
    option_array.forEach((option) => option.current.classList.remove('correct', 'wrong')); // Reset options
  };

  return (
    <div className='container'>
      <h1>Quiz App</h1>
      <hr />
      {result ? (
        <>
          <h2>You Scored {score} out of {data.length}</h2>
          <button onClick={reset}>Reset</button>
        </>
      ) : (
        <>
          <h2>{index + 1}. {question.question}</h2>
          <ul>
            <li ref={Option1} onClick={(e) => checkAns(e, 1)}>{question.option1}</li>
            <li ref={Option2} onClick={(e) => checkAns(e, 2)}>{question.option2}</li>
            <li ref={Option3} onClick={(e) => checkAns(e, 3)}>{question.option3}</li>
            <li ref={Option4} onClick={(e) => checkAns(e, 4)}>{question.option4}</li>
          </ul>
          <button onClick={next}>Next</button>
          <div className="index">{index + 1} of {data.length} questions</div>
        </>
      )}
    </div>
  );
};

export default Quiz;
