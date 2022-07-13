// variables for our timer/quiz state
// var time = 60;
// var timer;
// var currentQuestion = 0;
// // variables for dom (our html elements 
// // example is like document.getElementById)
// var startBtn = document.getElementById("startBtn");
// var questionsElement = document.getElementById("questions");
// var choices = document.getElementById("choices");
// var timerElement = document.getElementById("time");



// function start() {
//     // initiate our quiz and the timer
//     var startScreen = document.getElementById("startScreen");
//     startScreen.style.visibility = "hidden";
//     // startScreen.setAttribute("class", "hide");



//     questionsElement.removeAttribute("class");
//     //setInterval()
//     timer = setInterval(clock, 1000);

//     findQuestion();
// }

// function findQuestion() {
//     // go into questions array (questions.js) and display
//     var currentQ = questions[currentQuestion];
//     //display question on screen
//     var questionElement = document.getElementById("questionTitle");
//     console.log(currentQ.question);
//     questionElement.textContent = currentQ.question;
//     choices.innerHTML = "";

//     //display choices
//     currentQ.choices.forEach(function(choice, i) {
//         var choiceBtn = document.createElement("button");
//         //styling
//         choiceBtn.setAttribute("class", "choice");
       
//         choiceBtn.setAttribute("value", choice);
//         // text value of each choice
//         choiceBtn.textContent = i + 1 + choice;

//         choiceBtn.onclick = trackProgress;

//         choices.appendChild(choiceBtn);
//     });


// }

// function trackProgress() {

// // when we click on a choice, we want the answer (correct or wrong) then move on.
// // Deduct time if incorrect
//         if (this.value !== questions[currentQuestion].answer) {
//             console.log("wrong");
//             time -= 10;

//             if(time < 0) {
//                 // we want time at fixed value
//                 time = 0;
//             }
//             //something to display time
//             timerElement.textContent = time;

//         } else {
//             console.log("correct awnser!");
//         }
 
//        currentQuestion++;

//        if (currentQuestion === questions.length) {
//            // end quiz
//        } else {
//            findQuestion();
//        }



// }

// function clock() {
//     //update time, take our var time and deduct 1
//     time--;
//     timerElement.textContent = time;

//     //check if time is 0
// }


// // addEventListener

// startBtn.onclick = start;

// var questions = [
//     {
//       question: "In which HTML element do we put the JavaScript?",
//       choices: ["<Js>", 
//       "<JavaScrip>",

//       "<script>"],
//       answer: "<script>"
//     }, 
//     {
//       question: "what language is primarily used to develop web pages?",
//       choices: ["javascript", 
//       "c#", 
//       "Python"],
//       answer: "javascript"
//     },
//       {
//       question: "Who created JavaScript?",
//       choices: ["Jimmy Neutron",
//       "Brendan Eich", 
//       "Fred Flinstone"],

//       answer: "Brendan Eich"
//     },
//       {
//       question: "What data type is used to store truthy or falsey values?",
//       choices: ["string", 
//       "numbers", 
//       "booleans"],
//       answer: "booleans"
//     },
//   ]
  const jsonData = {
    "quiz":[
        {"question": "Arrays in JavaScript can be used to store ________.",
         "id" : "1",
          "options":[{"id":"1","option":"numbers and strings"}, 
                      {"id":"2", "option": "other arrays"},
                      {"id": "3", "option": "boolens"},
                      {"id": "4", "option" : "all of the above" }
                    ],             
           "answer": "4"         
         },
         {"question": "The following are method of debugging process except one:",
           "id" : "2",
           "options":[{"id":"1","option":"predict a possible cause of the problem"}, 
                      {"id":"2", "option": "console.log"},
                      {"id":"3", "option": "conduct a test to validate the cause of the problem"},
                      {"id":"4", "option" : "delete and start over" }
                    ],             
             "answer": "4"         
           },
           {"question": "One of the concept of React is _______?",
           "id" : "3",
           "options":[{"id":"1","option":"Using multiple page in order to improve the wepage performance."}, 
                      {"id":"2", "option": "Implement multiple class"},
                      {"id":"3", "option": "Built a single-page application using React."},
                      {"id":"4", "option" : "Increases the overall quality of the data." }
                    ],             
             "answer": "3"         
           },
           {"question": "The 4 main of an API are _______?",
           "id" : "4",
           "options":[{"id":"1","option":"Get method, Fork method, Debug method, & Save method."}, 
                      {"id":"2", "option": "Run method, Multply method, Add method, & clone method"},
                      {"id":"3", "option": "Git method, Get method, Subtract method, & Start method"},
                      {"id":"4", "option" : "Get method, Delete method, Put method, & Post method." }
                    ],             
             "answer": "4"         
           }  
       ] 
 };
  

//use body of the html for event propogation since the content of the page will change based on
//button clicks.
var getBodyEl = document.querySelector("body");
var expectedAnswer;
var actualAnswer;
var quizArray = jsonData.quiz;
var timerRunner;
var timer =60;
var scores =[];
var chosenQuestion;
var startPageEl = document.querySelector("#start-page");     
var questionPageEl = document.querySelector("#question-page");  
var quizCompletePageEl = document.querySelector("#quizComplete-page");   
var scoresPageEl = document.querySelector("#scores-page");   
var result;

var pages ={startPageEl: true, 
             };

var printQuestions = function(){
    //Choose one question at a time. pop will remove the question from array.
    chosenQuestion = quizArray.pop(); 
    var questionEl = document.querySelector("#question");
    questionEl.textContent = chosenQuestion.question;  
    //Add div and list containing the possible answers for the question
    var listContainerEl = document.querySelector("#answer");  
    var cleanUpPageEl = document.querySelector(".options"); 
    if(cleanUpPageEl)
    {
        cleanUpPageEl.remove();
    }
    
    var listEl = document.createElement("ul");
    listEl.className ="options";  
    var options = chosenQuestion.options;    
    for (var i=0; i< options.length; i++)
    {
      var listItemEl = document.createElement("li");
      var buttonEl = document.createElement("button");
      buttonEl.type ="button";
      buttonEl.className = "user-choice btn";     
      buttonEl.textContent =options[i].id+". "+options[i].option;
      buttonEl.setAttribute("button-id",options[i].id );
      listItemEl.appendChild(buttonEl);
      listEl.appendChild(listItemEl);
    }     
    listContainerEl.appendChild(listEl);
}

var setTimerValue = function(){
    var timerEl = document.querySelector(".timerValue");   
    timerEl.textContent =timer;
    }
  
var startTimer = function(){
    timerRunner = setInterval(function(){
       
      if(timer <=0 )
      { 
        // Set to 0 incase the timer value has dropped below 0.
        timer = 0;     
        clearInterval(timerRunner);   
        printFinalScore(); 
      }
      else{
        timer -=1;
        setTimerValue();     
      }
    },1000);
  }
  
var printFinalScore = function(){
    var finalScore = timer;
    setTimerValue();
    var scoreEl = document.querySelector("#finalScore");
    scoreEl.textContent = finalScore;
    document.querySelector(".lastpage").textContent = result;  
}

var printAllScores = function(){ 
    // Hide the header for this screen.
    var oldHeaderEl = document.querySelector("header");
    oldHeaderEl.remove();

    var scoreArray = JSON.parse(localStorage.getItem("scores"));
    if(scoreArray)
    {
        var ulListEl = document.querySelector("#score-list");
        for (var i=0; i<scoreArray.length; i++)
        {
            var listEl = document.createElement("li");
            listEl.textContent= (i+1)+". "+scoreArray[i].user +" - "+  scoreArray[i].score;
            ulListEl.appendChild(listEl);
        }      
    }
    scoresPageEl.hidden = false;   
}

// Save the scores in local storage.
var saveScores = function(userId, score)
{
     var scoreObj = {
            user : userId,
            score : score
            }; 
            
            var scoreArray = JSON.parse(localStorage.getItem("scores"));           
            if(!scoreArray)
            {
                scoreArray = [];                
            }   
            scoreArray.push(scoreObj);           
            localStorage.setItem("scores", JSON.stringify(scoreArray));
}

// This function will hide all sections. It will be used as a reset before setting any section to visible.
var hideAllPages = function(){
    startPageEl.hidden= true;        
    questionPageEl.hidden= true;
    quizCompletePageEl.hidden = true;
    scoresPageEl.hidden = true;   
}

var calculateScores = function(event) {
    actualAnswer = event.target.getAttribute("button-id");
    expectedAnswer = chosenQuestion.answer;   
    result = "Wrong!";
    if(expectedAnswer === actualAnswer)
    {
        result = "Correct!";
    }
    else
    {
        timer -=10;        
        if(timer < 0)
        {
            timer =0;
            setTimerValue();
        }
    }
}

/* The following is the main page handler that receives all button click events.
   The function will hide/unhide pages as required. 
   It will also call other functions to display dynamic content on the page. */
var updatePageHandler = function(event){
    var buttonClicked = event.target; 
    event.preventDefault(); 
    // When user clicks the start button start showing the questions and answer choices.
    // Also start the timer run.
    if (buttonClicked.matches("#start-btn"))
    {      
      // Hide all pages to start with. 
      // Conditionally unhide required sections in the following code.
      hideAllPages();
      questionPageEl.hidden= false;
      startTimer();
      printQuestions();      
    }  
    // When user chooses an answer show the next question or final score screen.
    else if(buttonClicked.matches(".user-choice"))
    { 
      hideAllPages();
      // When user chooses an answer calculate the result.
      calculateScores(event);      
      if(quizArray.length === 0)
      {
        //debugger;
        clearInterval(timerRunner);
        quizCompletePageEl.hidden = false;
        printFinalScore();       
      }
      else
      {
        questionPageEl.hidden= false;
        printQuestions();
        document.querySelector(".result").textContent = result;
      }
    }
    // On quiz completion allow user to enter intials and save the score.
    else if(buttonClicked.matches("#submit-score-btn"))
    {                                
        var userId = document.querySelector("input[name='testUser']").value;
        if(userId)
        {
            hideAllPages();
            saveScores(userId, timer);                      
            printAllScores();
        }
        else{
            alert("Please enter initials to save score!");
            return false;
        }  
    } 
    // When clear scores is pressed delete all scores from UI.
    // clean up localStorage.
    else if(buttonClicked.matches("#clearButton"))
    {    
        var ulEl = document.querySelector("#score-list");
        ulEl.remove();  
        ocalStorage.clear();         
    } 
    // Show the start page again. Which can be achieved here by reloading the application.
    else if(buttonClicked.matches("#backButton"))
    {    
        location.reload();
    } 
    // Show user all saved scores when view scores is pressed.
    else if(buttonClicked.matches("#viewScores"))
    {
        hideAllPages();
        scoresPageEl.hidden = false; 
        printAllScores();
    }
}

//Set listeners on the 
getBodyEl.addEventListener("click", updatePageHandler);
getBodyEl.addEventListener("submit", updatePageHandler);