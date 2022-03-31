// variables for our timer/quiz state
var time = 60;
var timer;
var currentQuestion = 0;
// variables for dom (our html elements 
// example is like document.getElementById)
var startBtn = document.getElementById("startBtn");
var questionsElement = document.getElementById("questions");
var choices = document.getElementById("choices");



function start() {
    // initiate our quiz and the timer
    var startScreen = document.getElementById("startScreen");
    startScreen.style.visibility = "hidden";
    // startScreen.setAttribute("class", "hide");



    questionsElement.removeAttribute("class");
    //setInterval()
    timer = setInterval(clock, 1000);

    findQuestion();
}

function findQuestion() {
    // go into questions array (questions.js) and display
    var currentQ = questions[currentQuestion];
    //display question on screen
    var questionElement = document.getElementById("questionTitle");
    console.log(currentQ.questions);
    questionElement.textContent = currentQ.question;

    //display choices
    currentQ.choices.forEach(function(choice, i) {
        var choiceBtn = document.createElement("button");
        //styling
        choiceBtn.setAttribute("class", "choice");
       
        choiceBtn.setAttribute("value", choice);
        // text value of each choice
        choiceBtn.textContent = i + 1 + choice;

        choices.onclick = trackProgress();

        choices.appendChild(choiceBtn);
    });


}

function trackProgress() {
    // this function will track the state of the quiz
    // example: wrong answer is clicked, we subtract time.
}

function clock() {
    //update time

    //check if time is 0
}


// addEventListener

startBtn.onclick = start;