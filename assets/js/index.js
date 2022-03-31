// variables for our timer/quiz state
var time = 60;
var timer;
var currentQuestion = 0;
// variables for dom (our html elements 
// example is like document.getElementById)
var startBtn = document.getElementById("startBtn");
var questionsElement = document.getElementById("questions");
var choices = document.getElementById("choices");
var timerElement = document.getElementById("time");



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
    console.log(currentQ.question);
    questionElement.textContent = currentQ.question;
    choices.innerHTML = "";

    //display choices
    currentQ.choices.forEach(function(choice, i) {
        var choiceBtn = document.createElement("button");
        //styling
        choiceBtn.setAttribute("class", "choice");
       
        choiceBtn.setAttribute("value", choice);
        // text value of each choice
        choiceBtn.textContent = i + 1 + choice;

        choiceBtn.onclick = trackProgress;

        choices.appendChild(choiceBtn);
    });


}

function trackProgress() {

// when we click on a choice, we want the answer (correct or wrong) then move on.
// Deduct time if incorrect
        if (this.value !== questions[currentQuestion].answer) {
            console.log("wrong");
            time -= 10;

            if(time < 0) {
                // we want time at fixed value
                time = 0;
            }
            //something to display time
            timerElement.textContent = time;

        } else {
            console.log("correct awnser!");
        }
 
       currentQuestion++;

       if (currentQuestion === questions.length) {
           // end quiz
       } else {
           findQuestion();
       }



}

function clock() {
    //update time, take our var time and deduct 1
    time--;
    timerElement.textContent = time;

    //check if time is 0
}


// addEventListener

startBtn.onclick = start;