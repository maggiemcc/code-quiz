// variables
var startPage = document.querySelector(".startPage");
var beginQuizBtn = document.querySelector(".beginQuiz");
var viewScoresBtn = document.querySelector(".high-scores");
var yourScore = document.querySelector(".your-score");
var quizSection = document.querySelector(".quiz-section");
var playAgainSection = document.querySelector(".play-again");
var userScoresSection = document.querySelector(".user-scores");


var answerSection = document.createElement("div");
var trueBtn = document.createElement("button");
var falseBtn = document.createElement("button");

answerSection.className = "answer-section";
trueBtn.className = "answer-true";
falseBtn.className = "answer-false";

quizSection.style.visibility = "hidden";
userScoresSection.style.visibility = "hidden";

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
    ask: "The correct way to start a FOR loop is: for (var i = 0; i < 5; i++)",
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
  },
  {
    ask: 'push(): adds the specified elements to the end of an array and returns the new length of the array.',
    choices: [
      { option: "True", answer: true },
      { option: "False", answer: false },
    ]
  },
  {
    ask: 'The correct way to write "Hello World" in an alert box is: alertBox("Hello World")',
    choices: [
      { option: "True", answer: false },
      { option: "False", answer: true },
    ]
  },
  {
    ask: 'In JavaScript, && is a logical operator.',
    choices: [
      { option: "True", answer: true },
      { option: "False", answer: false },
    ]
  },
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
  timerCount = 60;
  beginQuizBtn.disabled = true;
  startPage.style.visibility = "hidden";
  startPage.style.height = "0px";
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
        timerCount -= 10;
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
        timerCount -= 10;
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
    playerName = window.prompt("Congrats, you finished! \n You earned: " + score + "/" + allQuestions + "\n Please write your name:");
    quizSection.style.visibility = "hidden";
    quizSection.style.height = "0px";
    userScoresSection.style.visibility = "visible";
    beginQuizBtn.disabled = true;
    clearInterval(timer);
    storeScores();
    
    // Start new game
    var newGameTimer;
    var gameCount;
    gameCount = 15;

    function newGame() {
      newGameTimer = setInterval(function () {
        gameCount--;
        playAgainSection.textContent = "You can play a new game in " + gameCount + " seconds...";
        if (gameCount <= 0) {
          clearInterval(newGameTimer);
          window.location.reload();
        }
      }, 1000);
    }
    newGame();
  } else {
    // True & false button
    askQuestion.textContent = (currentQuestion + 1) + ". " + quizQuestions[currentQuestion].ask;
    askQuestion.textContent = (currentQuestion + 1) + ". " + quizQuestions[currentQuestion].ask;
    trueBtn.textContent = quizQuestions[currentQuestion].choices[0].option;
    falseBtn.textContent = quizQuestions[currentQuestion].choices[1].option;
  }
};

// TIMER / PLAYER RUNS OUT OF TIME
function startTimer() {
  timer = setInterval(function () {
    timerCount--;
    timeRemaining.textContent = "TIME REMAINING: " + timerCount;
    if (timerCount <= 0) {
      clearInterval(timer);
      beginQuizBtn.disabled = false;
      quizSection.style.visibility = "hidden";
      window.alert("Nice try, please try again!")
      window.location.reload();
    }
  }, 1000);
};


var quizPlayers = [];

// STORE & GET SCORES
function storeScores() {
    var storedPlayers = JSON.parse(localStorage.getItem("quizPlayers"));
  if (storedPlayers !== null) {
    quizPlayers = storedPlayers;
  } 

  var player = {
    theirName: playerName,
    earned: score,
  }
  
  quizPlayers.unshift(player);
  // MDN: Sort and display from highest to lowest score value
  quizPlayers.sort((firstItem, secondItem) => secondItem.earned - firstItem.earned);

  displayScores();
  localStorage.setItem("quizPlayers", JSON.stringify(quizPlayers));
}

// GRAB EACH ITEM FROM quizPlayers
function displayScores() {
      quizPlayers.forEach(function(item) {
        var users = document.createElement("div");
        users.className = "user-info";
        var showName = document.createElement("p");
        var showScore = document.createElement("p");
      
        showName.innerHTML = item.theirName;
        showScore.innerHTML = item.earned + "/" + quizQuestions.length;
        showScore.style.textAlign = "right"
        
        if (item.earned == allQuestions){
          showName.style.color = "green";
          showScore.style.color = "green";
        } else if (item.earned >= 5 && item.earned < allQuestions){
          showName.style.color = "blue";
          showScore.style.color = "blue";
        } else if (item.earned < 5){
          showName.style.color = "red";
          showScore.style.color = "red";
        }

        userScoresSection.appendChild(users);
        users.appendChild(showName);
        users.appendChild(showScore);
      });
}