var questions = [
  {question: "Mos Eisley spaceport. You will never find a more wretched hive of scum and villainy.", answers: {"QUI-GON JINN": false, "HAN SOLO": false, "ANAKIN SKYWALKER": false, "OBI-WAN KENOBI": true}, image: "./assets/images/question1.jpg"},
  {question: "Name this character", answers: {"ADMIRAL MOTTI": false, "ADMIRAL PIETT": false, "COMMANDER JERJERROD": false, "GRAND MOFF TARKIN": true}, image: "./assets/images/question2.jpg"},
  {question: "Who cut off half of Anakin Skywalker's right arm with a lightsaber?", answers: {"GENERAL GREIVOUS": false, "DARTH MAUL": false, "OBI-WAN KENOBI": false, "COUNT DOOKU": true}, image: "./assets/images/question3.jpg"},
  {question: "I find your lack of faith disturbing.", answers: {"OBI-WAN KENOBI": false, "DARTH VADER": true, "THE EMPEROR": false, "QUI-GON JINN": false}, image: "./assets/images/question4.jpg"},
];
var wrongAnswers = 0;
var correctAnswers = 0;
var unanswered = 0;

var timer = 10;
var timerInterval;
var currentQuestion = 0;

$(document).ready(function() {
  startGame();
});


var timer = {
  count: 10,
  timerInterval,
  resetTimer: function() {
    $("#Timer").empty();
    clearInterval(timer.timerInterval);
    this.count = 10;
  },
  renderTimer: function() {
    $("#Timer").empty();
    var time = $("<div>").html("<div class='userMessage timer'><h1>" + this.count + "</h1></div>");
    $("#Timer").append(time);
  },
  countDown: function() {
    timer.count = timer.count - 1;
    if(timer.count < 0) {
      unanswered++;
      renderNext();
    } else {
      timer.renderTimer();
    }
  },
  startTimer: function() {
    timer.timerInterval = setInterval(timer.countDown, 1000);
  },
};

function startGame() {
  renderQuestions();
}

function restart() {
  currentQuestion = 0;
  wrongAnswers = 0;
  correctAnswers = 0;
  unanswered = 0;
  startGame();
}


function renderQuestions() {
  timer.resetTimer();
  timer.startTimer();
  $("#Questions").empty();
  var question = $("<div>").html("<div class='userMessage'>" + questions[currentQuestion].question + "</div>");
  $("#Questions").append(question);
  var questionImage = $("<div>").html("<img class='questionImage' src='" + questions[currentQuestion].image + "'/>");
  $("#Questions").append(questionImage);
  var answersList = $("<ol>");
  for(var answer in questions[currentQuestion].answers) {
    var answerDiv = $("<div>").html(answer);
    answerDiv.attr('class', 'userMessage');
    answerDiv.attr('data-name', answer);
    answerDiv.on('click', checkAnswer);
    answersList.append(answerDiv);
  }
  $("#Questions").append(answersList);
}

function checkAnswer() {
  var answer = $(this).attr("data-name");
  if(questions[currentQuestion].answers[answer]) {
    correctAnswers++;
    alert("Correct!");
  } else {
    var rightAnswer;
    for(var answer in questions[currentQuestion].answers) {
      if(questions[currentQuestion].answers[answer]) {
        rightAnswer = answer;
      }
    }
    wrongAnswers++;
    alert("Wrong! The correct answer is: " + rightAnswer);
  }
  renderNext();
}

function renderNext() {
  currentQuestion++;
  if(currentQuestion >= questions.length) {
    displayResults();
  } else {
    renderQuestions();
  }
}

function displayResults() {
  timer.resetTimer();
  $("#Questions").empty();
  var correctAnswersDiv = $("<div>").html("<div class='userMessage'>Correct Answers: " + correctAnswers + "</div>");
  $("#Questions").append(correctAnswersDiv);
  var wrongAnswersDiv = $("<div>").html("<div class='userMessage'>Wrong Answers: " + wrongAnswers + "</div>");
  $("#Questions").append(wrongAnswersDiv);
  var unansweredDiv = $("<div>").html("<div class='userMessage'>Unanswered Questions: " + unanswered + "</div>");
  $("#Questions").append(unansweredDiv);
  var restartButton = $("<button>").html("Try Again?");
  restartButton.on('click', restart);
  $("#Questions").append(restartButton);
}
