// variables
var beginQuizBtn = document.querySelector(".beginQuiz");
var viewScoresBtn = document.querySelector(".high-scores");
var yourScore = document.querySelector(".your-score");
var quizSection = document.querySelector(".quiz-section");

var answerSection = document.createElement("div");
answerSection.className = "answer-section";
var controlsSection = document.createElement("div");
controlsSection.className = "controls-section";

var trueBtn = document.createElement("button");
trueBtn.className = "answer-true";

var falseBtn = document.createElement("button");
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
var score = 0;
yourScore.textContent = "YOUR SCORE: " + score + "/" + quizQuestions.length;
var allQuestions = quizQuestions.length;

// Display Question
var askQuestion = document.createElement("h2");


// Shuffle quiz questions
function beginQuiz() {
  timerCount = 30;
  beginQuizBtn.disabled = true;
  quizSection.style.visibility = "visible";
  startTimer();
  displayQuestion();
}

// Display questions on screen
function displayQuestion() {
  yourScore.innerHTML = "YOUR SCORE: " + score + "/" + allQuestions;
  askQuestion.textContent = quizQuestions[currentQuestion].ask;
  trueBtn.textContent = quizQuestions[currentQuestion].choices[0].option;
  falseBtn.textContent = quizQuestions[currentQuestion].choices[1].option;

  // if True button is clicked event
  trueBtn.onclick = function() {
    console.log(">>", quizQuestions[currentQuestion].choices[0].answer)
    if (quizQuestions[currentQuestion].choices[0].answer === true){
      if (score < allQuestions) {
        score++;
        yourScore.innerHTML = "YOUR SCORE: " + score + "/" + allQuestions;
      }
    } else {
      timerCount -= 3;
      yourScore.innerHTML = "YOUR SCORE: " + score + "/" + allQuestions;
    }
    if (currentQuestion < allQuestions) {
      nextQuestion();
    }
  };

  // if false button is clicked event
  falseBtn.onclick = function() {
    console.log(">>", quizQuestions[currentQuestion].choices[1].answer)
    if (quizQuestions[currentQuestion].choices[1].answer === true){
      if (score < allQuestions) {
        score++;
        yourScore.innerHTML = "YOUR SCORE: " + score + "/" + allQuestions;
      }
    } else {
      timerCount -= 3;
      yourScore.innerHTML = "YOUR SCORE: " + score + "/" + allQuestions;
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
  quizSection.appendChild(controlsSection);
};

function nextQuestion() {
  currentQuestion++;

  if (currentQuestion >= allQuestions) {
    alert("congrats you finished!");
    // refresh
    // window.location.reload();
    clearInterval(timer);
  } else {
    // True button
    askQuestion.textContent = quizQuestions[currentQuestion].ask;
    trueBtn.textContent = quizQuestions[currentQuestion].choices[0].option;
    // // False button
    askQuestion.textContent = quizQuestions[currentQuestion].ask;
    falseBtn.textContent = quizQuestions[currentQuestion].choices[1].option;
  }
}

function startTimer() {
  timer = setInterval(function () {
    timerCount--;
    timeRemaining.textContent = "TIME REMAINING: " + timerCount;
    if (timerCount === 0) {
      clearInterval(timer);
      beginQuizBtn.disabled = false;
      quizSection.style.visibility = "hidden";
      alert("OH NO! Sorry you did not finish in time. Please try again.")
      // refresh
      // window.location.reload();
    }
  }, 1000);
}

