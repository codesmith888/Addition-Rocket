/// DEFINE VARIABLES//
//GAME PAGES//
let homepage = document.getElementById("homepage");
let gamePlayPage = document.getElementById("gamePlayPage");
let winnerPage = document.getElementById("winnerPage");

//homepage items// 
let levelOptions = document.getElementsByClassName("levelChoice");

//gameplay items//
let level = null; 
let gameOptions = ["answer", "optionTwo", "optionThree"];
let computerChoice = null; 
let levelID = document.getElementById("levelID");

// timer items//
let timer = document.getElementById("timer");
let start = document.getElementById("start");
let STARTING_TIME = 60;
let remainingTime = 0;
let countdown = null; 

//flashcard items//
let firstAddend = null;
let secondAddend = null;
let flashcard = document.getElementById("flashcards");

//Answer Choice Items//
let choiceOne = document.getElementById("optionOne");
let choiceTwo = document.getElementById("optionTwo");
let choiceThree = document.getElementById("optionThree");
choiceOne.disabled = true; 
choiceTwo.disabled = true;
choiceThree.disabled = true;

//Score Tracking Items// 
let answerButtons = document.getElementsByClassName("answer");
let displayedScore = document.getElementById("score");
let answer = null;
let score = 0; 
let title = document.getElementById("title")

//winner page items//
let finalScore = document.getElementById("finalScore");
let babyRocket = document.getElementById("babyRocket");
let mediumRocket = document.getElementById("mediumRocket");
let bigRocket = document.getElementById("bigRocket");
babyRocket.style.display = "none";
mediumRocket.style.display = "none";
bigRocket.style.display = "none";

//RESTART BUTTON ITEMS// 
let restartButton = document.getElementById("restart")
let restartButtonTwo = document.getElementById("restartTwo")

//SET THE HOMEPAGE//
gamePlayPage.style.display = "none";
winnerPage.style.display = "none";
flashcard.style.display = "none";

// CHOOSE A LEVEL & SWITCH TO GAMEPAGE///
for (i=0; i<3; i++) {
    levelOptions[i].addEventListener("click", function (e) {
        level = e.target.id;
        console.log(e.target.id)
        homepage.style.display = "none";
        gamePlayPage.style.display = "block";
        if (level === "levelOne") {
            document.body.style.backgroundImage = "url('file:///Users/caitlinsmith/Downloads/conception-terre-creative-espace/405313-PE7QK3-299.jpg')" 
            levelID.innerText = "Level: 1 - Adding within 5"
        }  else if (level === "levelTwo") {
            document.body.style.backgroundImage = "url('file:///Users/caitlinsmith/Downloads/mars-background-with-spacecraft/485655-PH3GEI-570.jpg')"
            levelID.innerText = "Level: 2 - Adding within 10"
        } else if (level === "levelThree") {
            document.body.style.backgroundImage = "url('file:///Users/caitlinsmith/Downloads/rocket-space-scene/32577.jpg')"
            levelID.innerText = "Level: 3 - Adding within 20"
        }
    });   
};

////Start the Game//
start.addEventListener("click", startClock)
function startClock () {
    countdown = setInterval(updateClock, 1000)
    remainingTime = STARTING_TIME;
    flashcard.style.display = "inline-block";
    start.disabled = true;
    choiceOne.disabled = false;
    choiceTwo.disabled = false;
    choiceThree.disabled = false; 
    flashcard.innerHTML = null;
    displayFlashcard();
};

//updateClock//
function updateClock() {
    remainingTime--
    timer.innerHTML = "00:" + remainingTime;
    if (remainingTime <= 0) {
        displayResultsAndEndGame()
        clearInterval(countdown)
    }

}
//display the flashcard//
function displayFlashcard() {
    if (level === "levelOne") {
        firstAddend = Math.floor(Math.random() * 6);
        secondAddend = Math.floor(Math.random() * 5) + 1;
        flashcard.innerHTML = (firstAddend + " + " + secondAddend);
    } else if (level === "levelTwo") {
        firstAddend = Math.floor(Math.random() * 11);
        secondAddend = Math.floor(Math.random() * 10) + 1;
        flashcard.innerHTML = (firstAddend + " + " + secondAddend);
    } else if  (level === "levelThree") {
        firstAddend = Math.floor(Math.random() * 26);
        secondAddend = Math.floor(Math.random() * 25) + 1
        flashcard.innerHTML = (firstAddend + " + " + secondAddend);
    }
    answerChoice();
};

//Answer Choices//
function answerChoice() {
    gameOptions = ["answer", "optionTwo", "optionThree"]
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
    choiceThree.innerText = thirdPick 
};


  // SCORE TRACKING FUNCTION//
for (i=0; i<3; i++) {
    answerButtons[i].addEventListener("click", function (e) {
    console.log(e.target.innerText)
    if (answer == e.target.innerText) {
        console.log("You earned one point.");
        score = (score + 1)
        console.log("The new score is " + score)
        displayedScore.innerText = ("Score: " + score)
    } else console.log("That is incorrect");
    displayFlashcard();
    });
};




//DISPLAY RESULTS/END GAME FUNCTION //
function displayResultsAndEndGame () {
        gamePlayPage.style.display = "none";
        winnerPage.style.display = "block";
        document.body.style.backgroundImage = "url('file:///Users/caitlinsmith/Downloads/gradient-starry-night-background-purple-shades/2762077.jpg')";
        finalScore.innerText = "Final Score: " + score
        if (score <= 20) {
            babyRocket.style.display = "block";
            moveRocket();
        } else if (score <= 35) {
            mediumRocket.style.display = "block";
            moveRocket();
        } else if (score > 35) {
            bigRocket.style.display = "block";
            moveRocket();
        }
    };

//MOVE ROCKETS//
function moveRocket() {
    let position = 0;
    if (score <= 20) {
        let movement = setInterval(move, 10);
    } else if (score <= 35) {
        movement = setInterval(move, 7);
    } else if (score > 35) {
        movement = setInterval(move, 4);
    }
    function move() {
        if (position == 1950) {
            clearInterval(movement);
        } else {
            position++;
            if (score <= 20) {
                babyRocket.style.bottom = position + "px";
                babyRocket.style.left = position + "px";
            } else if (score <= 35) {
                mediumRocket.style.bottom = position + "px";
                mediumRocket.style.left = position + "px";
            } else {
                bigRocket.style.bottom = position + "px";
                bigRocket.style.left = position + "px";
            }    
        }
    }
};

//RESTART GAME// 
restartButton.addEventListener("click", restartGame);
restartButtonTwo.addEventListener("click", restartGame);
function restartGame () {
    homepage.style.display = "block";
    winnerPage.style.display = "none";
    gamePlayPage.style.display = "none";
    document.body.style.backgroundImage = "url('file:///Users/caitlinsmith/Downloads/roacket-launch-from-earth/25577.jpg')";
    start.disabled = false;
    choiceOne.disabled = true;
    choiceTwo.disabled = true;
    choiceThree.disabled = true;
    flashcard.innerHTML = null;
    answer = null;
    score = null; 
    STARTING_TIME = 60;
    remainingTime = 0;
    countdown = null;
    level = null;
    computerChoice = null;
    babyRocket.style.display = "none";
    mediumRocket.style.display = "none";
    bigRocket.style.display = "none";
};


