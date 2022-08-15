import { useState, useEffect } from 'react';
import './quiz.scss'


function Quiz(props) {

    const [selectedAnswer, setSelectedAnswer] = useState(['', '', '', '', '']);
    const [correctAnswers, setCorrectAnswers] = useState(['', '', '', '', '']);
    const [readyForNew, setReadyForNew] = useState(false);
    const [quizError, setQuizError] = useState();


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
        for (let i = 0; i < props.questions.length; i++) {
            setCorrectAnswers(prevAnswer => {
                prevAnswer[i] = props.questions[i].correct_answer;
                return prevAnswer;
            });
        }

    }, [props.questions]);


    const quizQuestions = props.questions.map((question, index) => {

        const answerArray = question.possible_answers;
        const options = answerArray.map((answer) => {
            return (
                <div ansvalue={answer} onClick={(event) => selectAnswer(event, index, answer)} className={`quiz-option que${index}`}>
                    <span>{answer}</span>
                </div>
            )
        })

        return (
            <div className='quiz-question-container'>
                <p className='quiz-question'>{index + 1}. {question.question}</p>
                <div className='quiz-options'>
                    {options}
                </div>
            </div>
        )
    })

    function checkAnswer() {
        if (selectedAnswer.includes('')) {
            setQuizError('Please answer all the questions!!!');
            console.log("Please Answer All Questions");
            return;
        }
        for (let i = 0; i < props.questions.length; i++) {
            const a = document.getElementsByClassName(`que${i} selected`)
            const b = document.getElementsByClassName(`que${i}`)
            if (correctAnswers[i] === selectedAnswer[i]) {
                a[0].classList.add('correct')
            }
            else {
                a[0].classList.add('incorrect')
            }
            for (let j = 0; j < b.length; j++) {
                const c = b[j].getAttribute('ansvalue')
                if (correctAnswers[i] === c) {
                    b[j].classList.add('correct')
                }
            }
        }

        if (selectedAnswer.every((answer, index) => answer === correctAnswers[index])) {
            props.setWin(true);
            setReadyForNew(true);
            console.log('You win!')
        }
        else {
            setReadyForNew(true);
            console.log('You lose!')
        }

    }


    function selectAnswer(event, index, answer) {
        const selected = document.getElementsByClassName(`que${index}`)
        for (let i = 0; i < selected.length; i++) {
            selected[i].classList.remove('selected');
        }
        event.currentTarget.classList.add('selected')
        setSelectedAnswer(prevAnswer => {
            const ayooo = prevAnswer;
            ayooo[index] = answer;
            return ayooo;
        });
    }

    function newQuiz() {
        props.setQuizActive(false);
    }

    return (
        <div className='quiz-container'>
            <h1>Quizzie</h1>
            {quizQuestions}
            {quizError && <p className='quiz-error'>{quizError}</p>}
            {readyForNew ?
                <button className='ansChecker' onClick={newQuiz}>New Quiz</button> :
                <button className='ansChecker' onClick={checkAnswer}>Check Answer</button>
            }
        </div>
    )
}

export default Quiz;