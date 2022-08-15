// import logo from './logo.svg';
import './App.scss';
import Home from './components/home/home';
import Quiz from './components/quiz/quiz';
import { useState, useEffect } from 'react';

function App() {
  const [quizActive, setQuizActive] = useState(false);

  const [questions, setQuestions] = useState([]);

  const [win, setWin] = useState(false);


  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {

      // Generate random number
      var j = Math.floor(Math.random() * (i + 1));

      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }

    return array;
  }


  useEffect(() => {
    if (quizActive) {
      fetch('https://opentdb.com/api.php?amount=5&category=31&type=multiple')
        .then(res => res.json())
        .then((data) => setQuestions(
          data.results.map((question) => {
            return {
              question: question.question.replace(/&quot;/g, '"')
                .replace(/&amp;/g, "&")
                .replace(/&#039;/g, "'")
                .replace(/&rsquo;/g, "''")
                .replace(/&ouml;/g, "ö"),
              correct_answer: question.correct_answer,
              possible_answers: shuffleArray(
                question.incorrect_answers
                  .concat(question.correct_answer)),
            }
          }
          )))
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
