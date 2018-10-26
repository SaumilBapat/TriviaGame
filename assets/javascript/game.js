var questions = [
  {question: "Mos Eisley spaceport. You will never find a more wretched hive of scum and villainy.", answers: {"QUI-GON JINN": false, "HAN SOLO": false, "ANAKIN SKYWALKER": false, "OBI-WAN KENOBI": true}, image: "./assets/images/question1.jpg"},
  {question: "Name this character", answers: {"ADMIRAL MOTTI": false, "ADMIRAL PIETT": false, "COMMANDER JERJERROD": false, "GRAND MOFF TARKIN": true}, image: "./assets/images/question2.jpg"},
];
var wrongAnswers = 0;
var correctAnswers = 0;
var unanswer = 0;

var timer = 5;
var timerInterval;
var currentQuestion = 0;

$(document).ready(function() {
  startGame();
});

function startGame() {
  renderQuestions();
}

function renderTimer() {
  if(timer < 0) {
    clearInterval(timerInterval);
    $("#Timer").empty();
    wrongAnswers++;
    currentQuestion++;
    timer = 5;
    renderNext();
  } else {
    $("#Timer").empty();
    var time = $("<div>").html("<div class='userMessage timer'><h1>" + timer + "</h1></div>");
    $("#Timer").append(time);
    timer--;
  }
}

function renderQuestions() {
  clearInterval(timerInterval);
  timerInterval = setInterval(renderTimer, 1000);
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
    wrongAnswers++;
    alert("Wrong!");
  }
  currentQuestion++;
  renderNext();
}

function renderNext() {
  if(currentQuestion >= questions.length) {
    displayResults();
  } else {
    renderQuestions();
  }
}

function displayResults() {
  clearInterval(timerInterval);
  $("#Questions").empty();
  $("#Timer").empty();
  var correctAnswersDiv = $("<div>").html("<div class='userMessage'>Correct Answers: " + correctAnswers + "</div>");
  $("#Questions").append(correctAnswersDiv);
  var wrongAnswersDiv = $("<div>").html("<div class='userMessage'>Wrong Answers: " + wrongAnswers + "</div>");
  $("#Questions").append(wrongAnswersDiv);
}
