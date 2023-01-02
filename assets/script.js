// Acceptance Criteria

// GIVEN I am taking a code quiz
// WHEN I click the start button
// THEN a timer starts and I am presented with a question
// WHEN I answer a question
// THEN I am presented with another question
// WHEN I answer a question incorrectly
// THEN time is subtracted from the clock
// WHEN all questions are answered or the timer reaches 0
// THEN the game is voer
// WHEN the game is over
// THEN I can save my initials and score

// DEFINE VARIABLES
// assignment code to each section

var welcome = document.querySelector("#intro");
var startBtn = document.querySelector("#start_button");
var introPage = document.querySelector("#intro_page");

var questionPage = document.querySelector("#question_page");
var askQuestion = document.querySelector("#ask_question");

var reactButtons = document.querySelectorAll(".choices_button");
var answerBtn1 = document.querySelector("#answer_btn1");
var answerBtn2 = document.querySelector("#answer_btn2");
var answerBtn3 = document.querySelector("#answer_btn3");
var answerBtn4 = document.querySelector("#answer_btn4");

var checkLine = document.querySelector("#check_line");
var scoreBoard = document.querySelector("#submit_page");
var finalScore = document.querySelector("#final_score");
var userInitials = document.querySelector("#initials");

var submitBtn = document.querySelector("#submit_button");
var highScorePage = document.querySelector("#highscore_page");
var scoreRecord = document.querySelector("#score_record");
var scoreCheck = document.querySelector("#score_check");
var finish = document.querySelector("#finish");

var backBtn = document.querySelector("#back_button");
var clearBtn = document.querySelector("#clear_button");

// DEFINE QUESTIONS (object)
var questionSource = [
    {
        question: "Question 1: Commonly used data types DO NOT include:",
        choices: ["a. strings", "b. booleans", "c. alerts", "d. numbers"],
        answer: "c"
    },
    {
        question: "Question 2: Arrays in Javascript can be used to store:",
        choices: ["a. numbers and strings", "b. other arrays ", "c. booleans", "d. all of the above"],
        answer: "d"
    },

    {
        question: "Question 3: The condition in an if / else statement is stored within",
        choices: ["a. quotes", "b. curly brackets", "c. parentheses", "d. square brackets"],
        answer: "c"
    },

    {
        question: "Question 4: String variables are enclosed within ________ when being assigned to variables",
        choices: ["a. commas ", "b. curly brackets", "c. quotes", "d. parentheses"],
        answer: "c"
    },

    {
        question: "Question 5: A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["a. Javascript", "b. console.log", "c. terminal/bash", "d. for loops"],
        answer: "b"
    }
];

// set other variables

var timeLeft = document.getElementById("timer");
var secondsLeft = 60;
var questionNumber = 0;
var totalScore = 0;
var questionCount = 1;

// FUNCTIONS
// WHEN I click the start button, THEN a timer starts
function countdown() {
    var timerInterval = setInterval(function () {

        secondsLeft--;
        timeLeft.textContent = "Time left: " + secondsLeft + " s";

        if (secondsLeft <= 0) {
            clearInterval(timerInterval);
            timeLeft.textContent = "Time is up!";
            finish.textContent = "Time is up!";
            gameOver();

        } else if(questionCount >= questionSource.length +1) {
            clearInterval(timerInterval);
            gameOver();
        }
    }, 1000)
}

// click button to start the quiz
function startQuiz () {
    introPage.style.display = "none";
    questionPage.style.display = "block";
    questionNumber = 0;
    countdown();
    showQuestion(questionNumber);
}

// present the questions and answers
function showQuestion (n) {
    askQuestion.textContent = questionSource[n].question;
    answerBtn1.textContent = questionSource[n].choices[0];
    answerBtn2.textContent = questionSource[n].choices[1];
    answerBtn3.textContent = questionSource[n].choices[2];
    answerBtn4.textContent = questionSource[n].choices[3];
    questionNumber = n;
}

// WHEN I answer a question, show if answer is correct or wrong
function checkAnswer(event) {
    event.preventDefault();
    checkLine.style.display = "block";
    setTimeout(function () {
        checkLine.style.display = "none";
    }, 1000);

// answer check
if (questionSource[questionNumber].answer == event.target.value) {
    checkLine.textContent = "Correct!";
    totalScore = totalScore + 1;

} else {
    secondsLeft = secondsLeft - 10;
    checkLine.textContent = "Wrong! The correct answer is " + questionSource[questionNumber].answer + ".";

}
// THEN I am presented with another question
if (questionNumber < questionSource.length -1 ) {
    showQuestion(questionNumber +1);
} else {
    gameOver();
}
questionCount++;
}
// WHEN all questions are answered or the timer reaches 0, game is over
function gameOver() {
    questionPage.style.display = "none";
    scoreBoard.style.display = "block";
    console.log(scoreBoard);
    //show final score
    finalScore.textContent = "Your final score is : " + totalScore;
    timeLeft.style.display = "none";
};

// get current score and initials from local storage
function getScore() {
    var currentList = localStorage.getItem("ScoreList");
    if (currentList !== null) {
        freshList = JSON.parse(currentList);
        return freshList;
    } else {
        freshList = [];
    }
    return freshList;
};

// render score to the score board
function renderScore () {
    scoreRecord.innerHTML = "";
    scoreRecord.style.display = "block";
    var highScores = sort();
    //show score list on score board
    var topFive = highScores.slice(0,5);
    for (var i = 0; i < topFive.length; i++){
        var item = topFive[i];

    var li = document.createElement("li");
    li.textContent = item.user + " - " + item.score;
    li.setAttribute("data-index", i);
    scoreRecord.appendChild(li);
    }
};

// sort score and ranking the high score list
function sort () {
    var unsortedList = getScore();
    if (getScore == null) {
        return;
    } else {
        unsortedList.sort(function(a,b) {
        return b.score - a.score;

    })
    return unsortedList;
    }};


// push new score and initals to local storage
function addItem (n)  {
    var addedList = getScore();
    addedList.push(n);
    localStorage.setItem("ScoreList", JSON.stringify(addedList));
};

function saveScore () {
    var scoreItem ={
        user: userInitials.value,
        score: totalScore
    }
    addItem(scoreItem);
    renderScore();
};

// ADD EVENT LISTENERS
// start_button to start the quiz
startBtn.addEventListener("click", startQuiz);

// click any choices button, go to the next question
reactButtons.forEach(function(click) {
    click.addEventListener("click", checkAnswer);
});

// save info and go to the next page
submitBtn.addEventListener("click", function(event) {
    event.preventDefault();
    scoreBoard.style.display = "none";
    introPage.style.display = "none";
    highScorePage.style.display = "block";
    questionPage.style.display = "none";
    saveScore();
});

// check highscores list
scoreCheck.addEventListener("click", function(event) {
    event.preventDefault();
    scoreBoard.style.display = "none";
    introPage.style.display = "none";
    highScorePage.style.display = "block";
    questionPage.style.display = "none";
    renderScore();
});

// go back to the main page
backBtn.addEventListener("click", function(event) {
    event.preventDefault();
    scoreBoard.style.display = "none";
    introPage.style.display = "block";
    highScorePage.style.display = "none";
    questionPage.style.display = "none";
    location.reload();
});

// clear local storage and clear page shows
clearBtn.addEventListener("click", function(event){
    event.preventDefault();
    localStorage.clear();
    renderScore();
});

