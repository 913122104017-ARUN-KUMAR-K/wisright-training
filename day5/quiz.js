// DOM Elements
const start = document.getElementById("start");
const startQuiz = document.getElementById("start-quiz");
const quizQuestion = document.getElementById("quiz-question");
const quizScore = document.getElementById("quiz-score");
const quizHistory = document.getElementById("quiz-history");

const questionNumber = document.getElementById("question-number");
const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");

const pre = document.getElementById("pre");
const next = document.getElementById("next");
const submit = document.getElementById("submit");

// Quiz Questions
const questions = [
{
question:"What does HTML stand for?",
options:[
"Hyper Text Markup Language",
"Home Tool Markup Language",
"Hyperlinks Text Markup Language",
"Hyper Tool Markup Language"
],
answer:0
},
{
question:"Which tag creates a paragraph?",
options:["<div>","<h1>","<p>","<span>"],
answer:2
},
{
question:"Which CSS property changes text color?",
options:["font","background","color","text"],
answer:2
},
{
question:"Which keyword declares a variable?",
options:["var","let","const","All of these"],
answer:3
},
{
question:"Which method stores data in LocalStorage?",
options:["saveItem()","setItem()","store()","push()"],
answer:1
}
];

let currentQuestion = 0;
let score = 0;
let selected = -1;

// Start Quiz
start.addEventListener("click",function(){

startQuiz.style.display="none";
quizQuestion.style.display="block";

displayQuestion();

});

// Display Question
function displayQuestion(){

questionNumber.textContent=`Question ${currentQuestion+1} of ${questions.length}`;

questionText.textContent=questions[currentQuestion].question;

optionsContainer.innerHTML="";

questions[currentQuestion].options.forEach(function(option,index){

let btn=document.createElement("button");

btn.textContent=option;

btn.className="op-btn";

btn.addEventListener("click",function(){

selectOption(index);

});

optionsContainer.appendChild(btn);

});

selected=-1;

}

// Select Option
function selectOption(index){

selected=index;

const buttons=document.querySelectorAll(".op-btn");

buttons.forEach(btn=>{
btn.classList.remove("selected");
});

buttons[index].classList.add("correct");

}

// Next
next.addEventListener("click",function(){

if(currentQuestion<questions.length-1){

currentQuestion++;

displayQuestion();

}

});

// Previous
pre.addEventListener("click",function(){

if(currentQuestion>0){

currentQuestion--;

displayQuestion();

}

});
// More DOM Elements
const finalScore = document.getElementById("final-score");
const historyBtn = document.getElementById("history");
const restart = document.getElementById("restart");
const clear = document.getElementById("clear");
const historyList = document.getElementById("history-list");

// Submit Quiz
submit.addEventListener("click", function () {

    if (selected === -1) {
        alert("Please select an answer.");
        return;
    }

    if (selected === questions[currentQuestion].answer) {
        score++;
    }

    if (currentQuestion === questions.length - 1) {

        quizQuestion.style.display = "none";
        quizScore.style.display = "block";

        finalScore.textContent = `Score : ${score} / ${questions.length}`;

        saveScore();

    } else {

        currentQuestion++;
        displayQuestion();

    }

});

// Save Score
function saveScore() {

    let data = localStorage.getItem("history");

    let history = data ? JSON.parse(data) : [];

    let result = {
        score: score,
        total: questions.length,
        percentage: (score / questions.length) * 100,
        date: new Date().toLocaleDateString()
    };

    history.push(result);

    localStorage.setItem("history", JSON.stringify(history));
}

// Display History
function displayHistory() {

    let data = localStorage.getItem("history");

    let history = data ? JSON.parse(data) : [];

    historyList.innerHTML = "";

    history.forEach(function (item) {

        let li = document.createElement("li");

        li.textContent =
            `Score: ${item.score}/${item.total} | ${item.percentage}% | ${item.date}`;

        historyList.appendChild(li);

    });

}

// History Button
historyBtn.addEventListener("click", function () {

    quizScore.style.display = "none";

    quizHistory.style.display = "block";

    displayHistory();

});

// Restart Quiz
restart.addEventListener("click", function () {

    score = 0;
    currentQuestion = 0;
    selected = -1;

    quizScore.style.display = "none";
    quizQuestion.style.display = "block";

    displayQuestion();

});

// Clear History
clear.addEventListener("click", function () {

    let ok = confirm("Clear quiz history?");

    if (ok) {

        localStorage.removeItem("history");

        displayHistory();

    }

});

// Load History on Page Load
displayHistory();