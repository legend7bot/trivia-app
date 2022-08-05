import { useState, useEffect } from 'react';
import './quiz.scss'


function Quiz(props) {

    const [selectedAnswer, setSelectedAnswer] = useState(['', '', '', '', '']);
    const [correctAnswers, setCorrectAnswers] = useState(['', '', '', '', '']);

    useEffect(() => {
        console.log(props.questions)
        for (let i = 0; i < props.questions.length; i++) {
            setCorrectAnswers(prevAnswer => {
                prevAnswer[i] = props.questions[i].correct_answer;
                return prevAnswer;
            });
        }

    }, [props.questions]);


    const quizQuestions = props.questions.map((question, index) => {

        const answerArray = question.incorrect_answers.concat(question.correct_answer);

        const options = answerArray.map((answer) => {
            return (
                <div onClick={() => selectAnswer(index, answer)} className="quiz-option">
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
        console.log(`Selected: ${selectedAnswer}`)
        console.log(`Correct: ${correctAnswers}`)
        if (selectedAnswer.every((answer, index) => answer === correctAnswers[index])) {
            props.setWin(true);
        }
        else {
            console.log('You lost!')
        }

    }


    function selectAnswer(index, answer) {
        console.log(index)
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
            {props.win ?
                <button className='ansChecker' onClick={newQuiz}>New Quiz</button> :
                <button className='ansChecker' onClick={checkAnswer}>Check Answer</button>
            }
        </div>
    )
}

export default Quiz;