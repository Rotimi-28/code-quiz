//variables for our timer/quiz state// variables
var timer;
var time;
var result;
var i = 0;//Quiz count index
var headerDiv = document.getElementById("header");
var highScoreDiv = document.getElementById("highscore");
var startQuizDiv = document.getElementById("start");
var quizDiv = document.getElementById("quiz");
var resultDiv = document.getElementById("result");
var scoreDiv = document.getElementById("score");
var start = document.getElementById("startButton");
var viewScore = document.getElementById("header");
var back = document.getElementById("back");
var result = document.getElementById("correctResult");
var wrong = document.getElementById("wrongResult");
var clearHighscoreButton = document.getElementById("clear");
var question = document.createElement("h2");
var correctAnswer1 = document.createElement("button");
var wrongAnswer1 = document.createElement("button");
var wrongAnswer2 = document.createElement("button");
var wrongAnswer3 = document.createElement("button");
var score;
var initial;
var highscoreList = document.getElementById("highscoreList");
var submit = document.getElementById("submit");
var quiz1 = { question: "What data type is used to store truthy or falsey values?", answer: "booleans", 
wrong: ["string", "array", "numbers"] }
var quiz2 = { question: "In which HTML element do we put the JavaScript?", answer: "script with open & close", 
wrong: ["JavaScript", "js", "assets"] }
var quiz3 = { question: "Arrays in JavaScript can be used to store _________.", answer: "all of the above", 
wrong: ["numbers and strings", "other arrays", "booleans"] };
var quiz4 = { question: "Who created JavaScript?", answer: "Brendan Eich", 
wrong: ["Fred Flinstone", "Brian Eich", "Jimmy Neutro"] };
var quiz = [quiz1, quiz2, quiz3, quiz4];

//Event Listeners
start.addEventListener("click", startQuiz);
start.addEventListener("click", displayQuiz);
viewScore.addEventListener("click", showHighscores);
back.addEventListener("click", showHome);
correctAnswer1.addEventListener("click", correctResult);
wrongAnswer1.addEventListener("click", wrongResult);
wrongAnswer2.addEventListener("click", wrongResult);
wrongAnswer3.addEventListener("click", wrongResult);
submit.addEventListener("click", logScore);
submit.addEventListener("submit", logScore);
clearHighscoreButton.addEventListener("click", clearHighscore);

//on Load conditions
highScoreDiv.style.display = "none";
headerDiv.style.display = "none";
quizDiv.style.display = "none";
resultDiv.style.display = "none";
scoreDiv.style.display = "none";
startQuizDiv.style.display = "flex"

// Event Handlers
function startQuiz() { 
    headerDiv.style.display = "flex";
    startQuizDiv.style.display = "none";
    quizDiv.style.display = "flex";
    resultDiv.style.display = "none";
    scoreDiv.style.display = "none";
    highScoreDiv.style.display = "none";
    i = 0;
    // correct.style.display = "none";
    // wrong.style.display = "none";
    timer = setInterval(myTimer, 1000);
    time = 50;//set quiz timer
}//show quiz div, reset quizCount index, and set quiz time
function showHome() {
    headerDiv.style.display = "none";
    startQuizDiv.style.display = "flex";
    highScoreDiv.style.display = "none";
    resultDiv.style.display = "none";
    scoreDiv.style.display = "none";
    quizDiv.style.display = "none";
}//show home div
function showHighscores() {
    while (highscoreList.hasChildNodes()) {
        highscoreList.removeChild(highscoreList.firstChild);
    }
    headerDiv.style.display = "none";
    startQuizDiv.style.display = "none";
    quizDiv.style.display = "none";
    resultDiv.style.display = "none";
    highScoreDiv.style.display = "flex";
    scoreDiv.style.display = "none";
    clearInterval(timer);
    var highscores = JSON.parse(localStorage.getItem("Score"));
    if (highscores !== "null") {
        highscores.sort(function (a, b) { return b.score - a.score });
        for (var x = 0; x < highscores.length; x++) {
            var highscore = document.createElement("li");
            highscore.innerHTML = `${x + 1}. ${highscores[x].initial} - ${highscores[x].score}`;
            highscoreList.appendChild(highscore);
        }
    }

}//show highScore div
function myTimer() {
    if (time <= -1) {
        clearInterval(timer);
        endQuiz();
    }
    else {
        document.getElementById("timer").innerHTML = `Time: ${time}`;
        time--;
    }

}// control timer
function displayQuiz() {
    headerDiv.style.display = "flex";
    startQuizDiv.style.display = "none";
    quizDiv.style.display = "flex";
    resultDiv.style.display = "none";
    scoreDiv.style.display = "none";
    highScoreDiv.style.display = "none";
    if (i === quiz.length) {//if end of quiz
        endQuiz();
    }
    else {//display next quiz
        resultDiv.style.display = "flex";
        result.innerHTML = "";
        var rand = Math.floor(Math.random()) * 4;
        //put answers into an array to allow shuffling
        var answerArray = [correctAnswer1, wrongAnswer1, wrongAnswer2, wrongAnswer3];
        correctAnswer1.innerHTML = `${quiz[i].answer}`;
        wrongAnswer1.innerHTML = `${quiz[i].wrong[0]}`;
        wrongAnswer2.innerHTML = `${quiz[i].wrong[1]}`;
        wrongAnswer3.innerHTML = `${quiz[i].wrong[2]}`;
        question.innerHTML = quiz[i].question;
        quizDiv.append(question);
        for (var x = answerArray.length - 1; x > 0; x--) {//shuffle answer display order
            const j = Math.floor(Math.random() * x)
            const temp = answerArray[x]
            answerArray[x] = answerArray[j]
            answerArray[j] = temp
        }
        for (var x = 0; x < answerArray.length; x++) {
            answerArray[x].innerHTML = `${x + 1}. ${answerArray[x].innerHTML}`;
            quizDiv.appendChild(answerArray[x]);
        }
    }
}//display quiz

function correctResult() {
    result.innerHTML = "Correct!";
    i++;
    var timeout = setTimeout(displayQuiz, 200);
}//display correct
function wrongResult() {
    result.innerHTML = "Wrong!";
    i++;
    time -= 10;
    var timeout = setTimeout(displayQuiz, 200);
}// display wrong
function endQuiz() {
    headerDiv.style.display = "flex";
    startQuizDiv.style.display = "none";
    quizDiv.style.display = "none";
    resultDiv.style.display = "none";
    scoreDiv.style.display = "flex";
    clearInterval(timer);
    var scoreText = document.getElementById("scoreH3");
    score = ((document.getElementById("timer").innerHTML).split(" "))[1];
    scoreText.innerHTML = `Your final score is ${score}`;
}//end quiz and show final score
function logScore() {
    headerDiv.style.display = "flex";
    startQuizDiv.style.display = "none";
    quizDiv.style.display = "none";
    resultDiv.style.display = "none";
    scoreDiv.style.display = "flex";
    event.preventDefault();
    initial = (document.getElementById("initials").value).toUpperCase();
    if (typeof (Storage) !== "undefined") {
        //Store
        if (localStorage.getItem("Score") !== null) {
            var temp = [];
            temp = (JSON.parse(localStorage.getItem("Score")));
            temp.push({ initial: `${initial}`, score: `${score}` });
            localStorage.setItem("Score", JSON.stringify(temp));
        }
        else {
            var temp = [];
            temp.push({ initial: `${initial}`, score: `${score}` });
            localStorage.setItem("Score", JSON.stringify(temp));
        }

    }
    else {//notify user
        var ns = document.createElement("p");
        ns.innerHTML = "Sorry, your browser does not support Web Storage...";
        scoreDiv.appendChild(ns);
    }
    showHighscores();

}
function clearHighscore() {
    localStorage.removeItem("Score");
    while (highscoreList.hasChildNodes()) {
        highscoreList.removeChild(highscoreList.firstChild);
    }
}