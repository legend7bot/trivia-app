import './home.scss'

function Home(props) {
    return (
        <div className='home-container'>
            <h1>Quizzie</h1>
            <p>Play trivia here by clicking button below!!</p>
            <button onClick={props.startQuiz} className='start-btn'>Start Quiz</button>
        </div>
    )
}

export default Home;