// variables
var beginQuizBtn = document.querySelector(".beginQuiz");
var viewScoresBtn = document.querySelector(".high-scores");
var quizQuestion = document.querySelector(".question");
var answerOptions = document.querySelector(".answer-options");
var feedback = document.querySelector(".feedback");
var score = 0;

// questions for quiz
var quizQuestions = [
    {
        question: "1. Where is the correct place JavaScript link?",
        choices: [
            { option: "In the <body> section", answer: true },
            { option: "In the <footer> section", answer: false },
            { option: "After the <footer> section", answer: false }
        ]
    },
    {
        question: "2. How does a FOR loop start?",
        choices: [
            { option: "for (i <= 5; i++)", answer: false },
            { option: "for (i = 0; i <= 5)", answer: false },
            { option: "for (i = 0; i <= 5; i++)", answer: true },
        ]
    },
    {
        question: "3. Correct way to write a JavaScript array?",
        choices: [
            { option: "var colors = ['red', 'green', 'blue']", answer: true },
            { option: "var colors = 'red', 'green', 'blue'", answer: false },
            { option: "var colors = [1:'red', 2:'green', 3:'blue']", answer: false },
        ]
    }
];


// Add event listeners
beginQuizBtn.addEventListener("click", beginQuiz);
viewScoresBtn.addEventListener("click", viewScores);


// functions
function beginQuiz() {
    console.log("begin button working")
    beginQuizBtn.style.visibility = 'hidden';
    var currentQuestion = 0;

    quizQuestion.textContent = quizQuestions[currentQuestion].question;

      for (let i = 0; i < quizQuestions[currentQuestion].choices.length; i++){
        var choiceBtn = document.createElement("button");
        choiceBtn.textContent = quizQuestions[currentQuestion].choices[i].option;

        answerOptions.appendChild(choiceBtn);
    }
}

function viewScores() {
    console.log("view scores button working")
    beginQuizBtn.style.visibility = 'visible';
}