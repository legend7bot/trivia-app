// import logo from './logo.svg';
import './App.scss';
import Home from './components/home/home';
import Quiz from './components/quiz/quiz';
import { useState, useEffect } from 'react';

function App() {
  const [quizActive, setQuizActive] = useState(false);

  const [questions, setQuestions] = useState([]);

  const [win, setWin] = useState(false);


  useEffect(() => {
    if (quizActive) {
      fetch('https://opentdb.com/api.php?amount=5&category=31&type=multiple')
        .then(res => res.json())
        .then(data => { setQuestions(data.results) })
    }
  }, [quizActive]);

  function startQuiz() {
    setQuizActive(true);
  }

  return (
    <main>
      <div className="bgpoly poly-1"></div>
      <div className="bgpoly poly-2"></div>
      <div className="bgpoly poly-3"></div>
      <div className="bgpoly poly-4"></div>

      <div className="main-container">
        {quizActive ?
          <Quiz
            questions={questions}
            win={win}
            setWin={setWin}
            quizActive={quizActive}
            setQuizActive={setQuizActive}
          /> :
          <Home
            startQuiz={startQuiz}
          />}
      </div>
    </main>
  );
}

export default App;
