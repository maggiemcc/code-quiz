// variables
var beginQuizBtn = document.querySelector(".beginQuiz");
var viewScoresBtn = document.querySelector(".high-scores");
// var quizQuestion = document.querySelector(".question");
// var answerOptions = document.querySelector(".answer-options");
// var result = document.querySelector(".result");
var questionSection = document.querySelector(".question-section");

// TIMER
var timeRemaining = document.querySelector(".time-remaining");
var timer;
var timerCount;

var score = 0;

// Quiz Array
var quizQuestions = [
    {
        ask: "Where should you place the JavaScript link?",
        choices: [{
            a: "Where should you place the JavaScript link?",
            b: "In the <footer> section",
            c: "After the <footer> section",
        }],
        answer: "a"
    },
    {
        ask: "How does a FOR loop start?",
        choices: [{
            a: "for (i <= 5; i++)",
            b: "for (i = 0; i <= 5)",
            c: "for (var i = 0; i <= 5; i++)"
        }],
        answer: "c"
    },
];



// console.log("quizQuestions:", quizQuestions);
// console.log("ask:", quizQuestions[0].ask);
// console.log("choices:", quizQuestions[0].choices);

// Add event listeners
beginQuizBtn.addEventListener("click", beginQuiz);

// Shuffle quiz questions
function beginQuiz() {
    timerCount = 10;
    beginQuizBtn.disabled = true;
    startTimer();
    showQuestions();
};

function showQuestions() {
    // Loop through and get each question
    for (var i = 0; i < quizQuestions.length; i++) {
        var questionTitle = quizQuestions[i].ask;
        console.log("question:", questionTitle)

        var displayQuestion = document.createElement('h2');
        displayQuestion.textContent = questionTitle;
        questionSection.appendChild(displayQuestion);
        console.log("choices:", quizQuestions[i].choices)
        console.log("choices 2.0:", quizQuestions[i].choices[0])

        // make a button for each answer choice
        quizQuestions[i].choices.forEach(function(option){
            for (var value in option) {
                // console.log(`${option[value]}`);

                var displayChoices = document.createElement('div');
                var choiceBtn = document.createElement('button');
                choiceBtn.textContent = `${option[value]}`;

                questionSection.appendChild(displayChoices);
                questionSection.appendChild(choiceBtn);
            }
        })
    }
}




function startTimer() {
    timer = setInterval(function () {
        timerCount--;
        timeRemaining.textContent = "TIME REMAINING: " + timerCount;
        if (timerCount === 0) {
            clearInterval(timer);
            console.log("you lose");
        }
    }, 1000);
}



// VIEW SCORES
// viewScoresBtn.addEventListener("click", viewScores);
// function viewScores() {
//     console.log("view scores button working")
// }