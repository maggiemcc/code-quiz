// variables
var beginQuizBtn = document.querySelector(".beginQuiz");
var viewScoresBtn = document.querySelector(".high-scores");
var quizQuestion = document.querySelector(".question");
var answerOptions = document.querySelector(".answer-options");
var feedback = document.querySelector(".feedback");

var score = 0;
var currentQuestion = 0;

// questions for quiz
var questions = [
    {
        question: "Where is the correct place JavaScript link?",
        answer: [
            {option: "In the <body> section", isCorrect: true},
            {option: "After the <footer> section", isCorrect: false}
        ]
    },
    {
        question: "How does a FOR loop start?",
        answer: [
            {option: "for (i <= 5; i++)", isCorrect: false},
            {option: "for (i = 0; i <= 5)", isCorrect: false},
            {option: "for (i = 0; i <= 5; i++)", isCorrect: true},
        ]
    },
    {
        question: "Correct way to write a JavaScript array?",
        answer: [
            {option: "var colors = ['red', 'green', 'blue']", isCorrect: true},
            {option: "var colors = 'red', 'green', 'blue'", isCorrect: false},
            {option: "var colors = [1:'red', 2:'green', 3:'blue']", isCorrect: false},
        ]
    }
 
]

// Add event listeners
beginQuizBtn.addEventListener("click", beginQuiz);
viewScoresBtn.addEventListener("click", viewScores);


// functions
function beginQuiz(){
    console.log("begin button working")
    quizQuestion.textContent = questions[currentQuestion].question;

    for (let i = 0; i <questions[currentQuestion].answer.length; i++){
        var li = document.createElement("li");
        li.textContent = questions[currentQuestion].answer[i].option;

        answerOptions.appendChild(li);
    }
}

function viewScores(){
    console.log("view scores button working")
}