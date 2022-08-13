const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreCounter = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
const loader = document.getElementById("loader");
const game = document.getElementById("game");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];

fetch("https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple")
    .then(res =>{
        return res.json();
    })
    .then(loadedquestions => {
        console.log(loadedquestions.results);
        questions = loadedquestions.results.map(loadedquestions =>{
            const formattedquestion = {
                question: loadedquestions.question
            };

            const answerchoices = [...loadedquestions.incorrect_answers];
            formattedquestion.answer = Math.floor(Math.random()*3) +1;
            answerchoices.splice(formattedquestion.answer -1, 0, loadedquestions.correct_answer);

            answerchoices.forEach((choice, index) => {
                formattedquestion["choice" + (index+1)] = choice;
            });

            return formattedquestion;
        })

        startGame();
    })
    .catch(err => {
        console.error(err);
    })

//CONSTANTS

const CORRECT_BONUS = 10;
const MAX_QUESTION = 3;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
    game.classList.remove("hidden");
    loader.classList.add("hidden");
} 

getNewQuestion = () => {
    
    if(availableQuestions.length == 0 || questionCounter >= MAX_QUESTION) {
        localStorage.setItem('mostRecentScore', score);
        //go to the end page
        return window.location.assign("end.html");
    }
    questionCounter++;
    progressText.innerText = "Question " + questionCounter + "/" + MAX_QUESTION;

    progressBarFull.style.width = `${(questionCounter/MAX_QUESTION) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach( choice =>{
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    })

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
}

choices.forEach(choice => {
    choice.addEventListener("click", e =>{
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        classToApply = "incorrect";
        if(selectedAnswer == currentQuestion.answer){
            classToApply = "correct";
        }

        if(classToApply === "correct"){
            incrementScore(CORRECT_BONUS);
        }

        // const classToApply = 
        //     selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
        
        selectedChoice.parentElement.classList.add(classToApply);
        
        setTimeout(() =>{
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
        
    })
});

incrementScore = num => {
    score += num;
    scoreCounter.innerText = score;
}

