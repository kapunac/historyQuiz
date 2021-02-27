const question = document.getElementById('question');
const choices =  Array.from( document.getElementsByClassName('choiceText') );
const questionCounterText = document.getElementById('questionCounter');
const scoreText = document.getElementById('score');


let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];

fetch("https://opentdb.com/api.php?amount=10&category=23&difficulty=medium&type=multiple").then( response =>{

    return response.json();
}).then( loadedQuestions => {
    questions = loadedQuestions.results.map( loadedQuestion =>{
        const formattedQuestion ={
            question: loadedQuestion.question
        };


        const answerChoices =[...loadedQuestion.incorrect_answers];
        formattedQuestion.answer = Math.floor(Math.random()*3) + 1;
        answerChoices.splice(formattedQuestion.answer -1, 0, loadedQuestion.correct_answer);

        answerChoices.forEach((choice, index) =>{
            formattedQuestion["choice" + (index+1)] = choice;
        });

        return formattedQuestion;

    });
     startGame();
}).catch(error => {
    console.error(error);
});

//constant
const CORRECT_BONUS = 10;
const MAX_QUESTION = 10;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
     if(acceptingAnswers.length === 0 || questionCounter >= MAX_QUESTION){
         localStorage.setItem('mostRecentScore', score);
         //GO TO END PAGE
         return window.location.assign("historyQuiz/end.html");
     }
    questionCounter++;
    questionCounterText.innerText = `${questionCounter}/${MAX_QUESTION}`;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach( choice =>{
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    });

    availableQuestions.splice(questionIndex, 1);

    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        const classToApply = 
        selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
        
        if(classToApply === 'correct'){
            updateScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);
        


        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        },1500)

    });
});


updateScore = num => {
    score += num;
    scoreText.innerText = score;
}