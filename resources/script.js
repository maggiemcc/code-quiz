// variables
var beginQuizBtn = document.querySelector(".beginQuiz");
var viewScoresBtn = document.querySelector(".high-scores");
var yourScore = document.querySelector(".your-score");
var quizSection = document.querySelector(".quiz-section");
var userScoresSection = document.querySelector(".user-scores");


var answerSection = document.createElement("div");
var trueBtn = document.createElement("button");
var falseBtn = document.createElement("button");

answerSection.className = "answer-section";
trueBtn.className = "answer-true";
falseBtn.className = "answer-false";

quizSection.style.visibility = "hidden";

// Add event listeners
beginQuizBtn.addEventListener("click", beginQuiz);


// TIMER
var timeRemaining = document.querySelector(".time-remaining");
var timer;
var timerCount;

// Quiz Array
var quizQuestions = [
  {
    ask: "The JavaScript link should go in the <footer>",
    choices: [
      { option: "True", answer: false },
      { option: "False", answer: true },
    ]
  },
  {
    ask: "The correct way to start a FOR loop is: for (var i = 0; i <= 5; i++)",
    choices: [
      { option: "True", answer: true },
      { option: "False", answer: false },
    ]
  },
  {
    ask: 'The correct way to write a JavaScript array is: var colors = "red", "green", "blue"',
    choices: [
      { option: "True", answer: false },
      { option: "False", answer: true },
    ]
  },
  {
    ask: 'Local Scope: variables can be accessed everywhere in a JavaScript code.',
    choices: [
      { option: "True", answer: false },
      { option: "False", answer: true },
    ]
  },
  {
    ask: 'pop(): removes the last element from an array and returns that element.',
    choices: [
      { option: "True", answer: true },
      { option: "False", answer: false },
    ]
  }
];

var currentQuestion = 0;
var playerName = "";
var score = 0;
yourScore.textContent = "YOUR SCORE: ";
var allQuestions = quizQuestions.length;

// Display Question
var askQuestion = document.createElement("h2");


// Shuffle quiz questions
function beginQuiz() {
  init();
  timerCount = 20;
  beginQuizBtn.disabled = true;
  quizSection.style.visibility = "visible";
  startTimer();
  displayQuestion();

}

// Display questions on screen
function displayQuestion() {
  yourScore.innerHTML = "YOUR SCORE: " + score + "/" + allQuestions;

  askQuestion.textContent = (currentQuestion + 1) + ". " + quizQuestions[currentQuestion].ask;
  trueBtn.textContent = quizQuestions[currentQuestion].choices[0].option;
  falseBtn.textContent = quizQuestions[currentQuestion].choices[1].option;

  // if True button is clicked event
  trueBtn.onclick = function (event) {
    event.preventDefault();
    if (quizQuestions[currentQuestion].choices[0].answer === true) {
      if (score < allQuestions) {
        score++;
        yourScore.innerHTML = "YOUR SCORE: " + score + "/" + allQuestions;
      }
    } else {
      if (timerCount > 0) {
        timerCount -= 5;
        yourScore.innerHTML = "YOUR SCORE: " + score + "/" + allQuestions;
      } else if (timerCount < 0) {
        clearInterval(timer);
        yourScore.innerHTML = "YOUR SCORE: " + score + "/" + allQuestions;
      }
    }
    if (currentQuestion < allQuestions) {
      nextQuestion();
    }
  };

  // if false button is clicked event
  falseBtn.onclick = function (event) {
    event.preventDefault();

    if (quizQuestions[currentQuestion].choices[1].answer === true) {
      if (score < allQuestions) {
        score++;
        yourScore.innerHTML = "YOUR SCORE: " + score + "/" + allQuestions;
      }
    } else {
      if (timerCount > 0) {
        timerCount -= 5;
        yourScore.innerHTML = "YOUR SCORE: " + score + "/" + allQuestions;
      } else if (timerCount < 0) {
        clearInterval(timer);
        yourScore.innerHTML = "YOUR SCORE: " + score + "/" + allQuestions;
      }
    }
    if (currentQuestion < allQuestions) {
      nextQuestion();
    }
  };

  // APPENDING
  quizSection.appendChild(askQuestion);
  quizSection.appendChild(answerSection);
  answerSection.appendChild(trueBtn);
  answerSection.appendChild(falseBtn);
};

// GO TO NEXT QUESTION
function nextQuestion() {
  currentQuestion++;

  if (currentQuestion >= allQuestions) {
    window.alert("congrats you finished!");
    playerName = window.prompt("Congrats, you finished! \n Please write your name:");
    // quizSection.style.visibility = "hidden";
    clearInterval(timer);
    storeScores();
  } else {
    // True & false button
    askQuestion.textContent = (currentQuestion + 1) + ". " + quizQuestions[currentQuestion].ask;
    askQuestion.textContent = (currentQuestion + 1) + ". " + quizQuestions[currentQuestion].ask;
    trueBtn.textContent = quizQuestions[currentQuestion].choices[0].option;
    falseBtn.textContent = quizQuestions[currentQuestion].choices[1].option;
  }
};

// TIMER
function startTimer() {
  timer = setInterval(function () {
    timerCount--;
    timeRemaining.textContent = "TIME REMAINING: " + timerCount;
    if (timerCount <= 0) {
      clearInterval(timer);
      beginQuizBtn.disabled = false;
      quizSection.style.visibility = "hidden";
      window.alert("Nice try, please try again!")
    }
  }, 1000);
};


var quizPlayers = [];
// console.log(">> player score:", score);
// console.log(">> player name:", playerName);

function init() {
  var storedTodos = JSON.parse(localStorage.getItem("quizPlayers"));
  if (storedTodos !== null) {
    todos = storedTodos;
  }
  displayScores();
}

// STORE & GET SCORES
function storeScores() {
  console.log("happen store");
  var player = {
    name: playerName,
    earned: score,
  }
  quizPlayers.push(player);
  console.log("quizPlayers", quizPlayers);

  displayScores();
}

function displayScores() {
  for (var i = 0; quizPlayers.length; i++){
    var users = document.createElement("div");
    users.className = "user-info";
    var showName = document.createElement("p");
    var showScore = document.createElement("p");
  
    showName.innerHTML = playerName;
    showScore.innerHTML = score + "/" + "5";

    userScoresSection.appendChild(users);
    users.appendChild(showName);
    users.appendChild(showScore);
  }

}

// init();