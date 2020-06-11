
/// DEFINE VARIABLES//
//homepage items// 
let resetButton = document.getElementById("reset");
let homepage = document.getElementById("homepage");
let levelOptions = document.getElementsByClassName("levelChoice");
//gameplay items//
let level = null; 
let scoreContainer = document.getElementById("score");
let score = null; 
let submit = document.getElementById("submit")
let gamePlayPage = document.getElementById("gamePlayPage");
let chosenAnswer = null
let gameOptions = ["answer", "optionTwo", "optionThree"]
let computerChoice = null 
// timer items//
let timer = document.getElementById("timer");
let start = document.getElementById("start");
let STARTING_TIME = 60
let remainingTime = 0
let countdown = null 
//flashcard items//
let firstAddend = null;
let secondAddend = null;
let flashcard = document.getElementById("flashcards");

//Answer Choice Items//
let choiceOne = document.getElementById("optionOne");
let choiceTwo = document.getElementById("optionTwo");
let choiceThree = document.getElementById("optionThree");
let answers = document.getElementsByClassName("answer")

//winner page items//
let winnerPage = document.getElementById("winnerPage");


// CHOOSE A LEVEL & SWITCH TO GAMEPAGE///
for (i=0; i<3; i++) {
    levelOptions[i].addEventListener("click", function (e) {
        level = e.target.id;
        console.log(e.target.id)
        homepage.style.display = "none";
        gamePlayPage.removeAttribute("hidden");
        startGame();
    });   
};

////Start the Game//
function startGame () {
    start.addEventListener("click", function() {
    countdown = setInterval(updateClock, 1000)
    displayFlashcard();
    });
    remainingTime = STARTING_TIME;
};

//updateClock//
function updateClock() {
    remainingTime--
    timer.innerHTML = "00:" + remainingTime;
    if (remainingTime <= 0) {
        return
    }
    displayResults()
}
//display the flashcard//
function displayFlashcard() {
    firstAddend = Math.floor(Math.random() * 6);
    secondAddend = Math.floor(Math.random() * 5) + 1;
    flashcard.innerHTML = (firstAddend + "+" + secondAddend);
    answerChoice();
};

//Answer Choices//
function answerChoice() {
    let gameOptions = ["answer", "optionTwo", "optionThree"]
    //define answer options// 
    answer = firstAddend + secondAddend;
    gameOptions[0] = answer;
    optionTwo = answer - 1;
    gameOptions[1] = optionTwo;
    optionThree = answer + 1;
    gameOptions[2] = optionThree;
 

    //PLACE ANSWER OPTIONS//
    //choose the first answer & splice it from array//
    let firstPick = Math.floor(Math.random() * gameOptions.length);
    computerChoice = gameOptions[firstPick]
    choiceOne.innerText = computerChoice
    let whatsLeft = gameOptions.indexOf(computerChoice);
    gameOptions.splice(whatsLeft, 1);
    //choose the second choice & where it will go// 
    let secondPick = Math.floor(Math.random() * gameOptions.length);
    computerChoice = gameOptions[secondPick]
    choiceTwo.innerText = computerChoice;
    whatsLeft = gameOptions.indexOf(computerChoice)
    gameOptions.splice(whatsLeft, 1);
    // third pick // 
    let thirdPick = gameOptions
    //put text on buttons// 
    choiceThree.innerText = thirdPick 


    // keep track of score // 
    for (i=0; i<3; i++) {
        answers[i].addEventListener("click", function (e) {
            chosenAnswer = e.target.id;
            console.log("The player chose " + chosenAnswer);
            displayFlashcard();
        })
    }
};


function displayResults() {
    console.log("You earned " + score + " points!")
};