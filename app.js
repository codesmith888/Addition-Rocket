//SET THE HOMEPAGE//
let homepage = document.getElementById("homepage");
let gamePlayPage = document.getElementById("gamePlayPage");
let winnerPage = document.getElementById("winnerPage");
let flashcard = document.getElementById("flashcards");

gamePlayPage.style.display = "none";
winnerPage.style.display = "none";
flashcard.style.display = "none";

//timer variables//
let start = document.getElementById("start");
let spaceSounds = document.getElementById("spaceSounds");
let countdown = null; 
let STARTING_TIME = 60;
let choiceOne = document.getElementById("optionOne");
let choiceTwo = document.getElementById("optionTwo");
let choiceThree = document.getElementById("optionThree");
choiceOne.disabled = true; 
choiceTwo.disabled = true;
choiceThree.disabled = true;
let remainingTime = 0;

//level variables// 
let level = null; 

//flashcard variables// 
let firstAddend = null;
let secondAddend = null;

//answer choice variables// 
let displayedScore = document.getElementById("score");
let answer = null;
let score = 0; 

//winner page variables// 
let previouslySavedScores = JSON.parse(localStorage.getItem("savedScores"));
let finalScore = document.getElementById("finalScore");
let babyRocket = document.getElementById("babyRocket");
let mediumRocket = document.getElementById("mediumRocket");
let bigRocket = document.getElementById("bigRocket");
let uhOhMessage = document.getElementById("uhOhMessage");
let launchSound = document.getElementById("launchSound");
let failSound = document.getElementById("failSound")
let blastOff = document.getElementById("blastOff");

babyRocket.style.display = "none";
mediumRocket.style.display = "none";
bigRocket.style.display = "none";
uhOhMessage.style.display = "none";
blastOff.style.display = "none";
let movement = null
let position = 0;

//local storage variables// 
let savedName = document.getElementById("name");
let submitButton = document.getElementById("submitButton")
let saveDirections = document.getElementById("saveDirections");
let savedScores = [];
let form = document.getElementById("form");
let winResults = document.getElementById("winResults");
winResults.style.display = "none";
let cheering = document.getElementById("cheering");

//restart game variables// 
let restartButton = document.getElementById("restart");
let restartButtonTwo = document.getElementById("restartTwo");

//event listeners// 
restartButton.addEventListener("click", restartGame);
restartButtonTwo.addEventListener("click", restartGame);
start.addEventListener("click", startClock)

// CHOOSE A LEVEL & SWITCH TO GAMEPAGE///
for (i=0; i<3; i++) {
    let levelOptions = document.getElementsByClassName("levelChoice");
    let levelID = document.getElementById("levelID");
    levelOptions[i].addEventListener("click", function (e) {
        level = e.target.id;
        homepage.style.display = "none";
        gamePlayPage.style.display = "block";
        if (level === "levelOne") {
            document.body.style.backgroundImage="url('Images_Sounds/405313-PE7QK3-299.jpg')" 
            levelID.innerText = "Level 1 - Adding within 10"
        }  else if (level === "levelTwo") {
            document.body.style.backgroundImage="url('Images_Sounds/485655-PH3GF1-585.jpg')"
            levelID.innerText = "Level 2 - Adding within 20"
        } else if (level === "levelThree") {
            document.body.style.backgroundImage="url('Images_Sounds/32577.jpg')"
            levelID.innerText = "Level 3 - Adding within 50"
        }
    });   
};

////Start the Game//
function startClock () {
    countdown = setInterval(updateClock, 1000)
    remainingTime = STARTING_TIME;
    flashcard.style.display = "inline-block";
    start.disabled = true;
    choiceOne.disabled = false;
    choiceTwo.disabled = false;
    choiceThree.disabled = false; 
    flashcard.innerHTML = null;
    spaceSounds.currentTime = 0;
    spaceSounds.play();
    displayFlashcard();
};

function updateClock() {
    let timer = document.getElementById("timer");
    remainingTime--
    timer.innerHTML = "00:" + remainingTime;
    if (remainingTime <= 0) {
        displayResultsAndEndGame()
        clearInterval(countdown)
        spaceSounds.pause();
    }
};

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
    let computerChoice = null;
    let gameOptions = ["answer", "optionTwo", "optionThree"]; 
    answer = firstAddend + secondAddend;
    gameOptions[0] = answer;
    optionTwo = answer - 1;
    gameOptions[1] = optionTwo;
    optionThree = answer + 7;
    gameOptions[2] = optionThree;
 
    let firstPick = Math.floor(Math.random() * gameOptions.length);
    computerChoice = gameOptions[firstPick]
    choiceOne.innerText = computerChoice
    let whatsLeft = gameOptions.indexOf(computerChoice);
    gameOptions.splice(whatsLeft, 1);
    
    let secondPick = Math.floor(Math.random() * gameOptions.length);
    computerChoice = gameOptions[secondPick]
    choiceTwo.innerText = computerChoice;
    whatsLeft = gameOptions.indexOf(computerChoice)
    gameOptions.splice(whatsLeft, 1);
 
    let thirdPick = gameOptions
    choiceThree.innerText = thirdPick 
};

  // SCORE TRACKING FUNCTION//
for (i=0; i<3; i++) {
    let answerButtons = document.getElementsByClassName("answer");
    answerButtons[i].addEventListener("click", function (e) {
        if (answer == e.target.innerText) {
        score = (score + 1)
        displayedScore.innerText = ("Fuel Points: " + score)
        } 
        displayFlashcard();
    })
};

//DISPLAY RESULTS/END GAME FUNCTION //
function displayResultsAndEndGame () {
        gamePlayPage.style.display = "none";
        winnerPage.style.display = "block";
        document.body.style.backgroundImage = "url('Images_Sounds/2762074.jpg')";
        finalScore.innerText = "Total Fuel Earned: " + score
        if (score <= 10) {
            babyRocket.style.display = "block";
            uhOhMessage.style.display = "block";
            playFailSound();
        } else if (score > 10 && score <= 20) {
            babyRocket.style.display = "block";
            blastOff.style.display = "block";
            moveRocket();
            playRocketSound();
        } else if (score <= 35) {
            mediumRocket.style.display = "block";
            blastOff.style.display = "block";
            moveRocket();
            playRocketSound();
        } else {
            bigRocket.style.display = "block";
            blastOff.style.display = "block";
            moveRocket();
            playRocketSound();
        }
    };


//MOVE ROCKETS//
function moveRocket() {
    if (score <= 20) {
        movement = setInterval(move, 10);
    } else if (score <= 35) {
        movement = setInterval(move, 7);
    } else {
        movement = setInterval(move, 4);
    }
};
function move() {
    if (position == 1500) {
        clearInterval(movement);
    } else {
        position++;
        if (score > 10 && score <= 20) {
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
};

//ROCKET SOUNDS// 
function playRocketSound () {
    launchSound.play();
} 

function playFailSound() {
    failSound.play();
}

// SAVE TO LOCAL STORAGE// 
submitButton.addEventListener("click", saveData);
function saveData(e) {
    e.preventDefault() 
    savedScore = {
        Name: savedName.value, 
        Level: level,
        Score: score, 
    }
    makePreviousScoresList();
    localStorage.setItem("savedScore", JSON.stringify(savedScore));
    if(previouslySavedScores == null){
        previouslySavedScores = [];
    }
    previouslySavedScores.push(savedScore);
    localStorage.setItem("savedScores", JSON.stringify(previouslySavedScores))
    form.reset();
};

//compare high scores//
function getScores(singleScore) {
    return singleScore.Score;
}

function makePreviousScoresList () {
    let previousScoresList = previouslySavedScores.map(getScores);
    let highScore = Math.max(...previousScoresList);    
    if (highScore < score) {
        winResults.style.display = "block";
        form.style.display = "none";
        saveDirections.style.display = "none";
        playCheering();
    }
};


//sound//
function playCheering() {
    cheering.play();
}

//RESTART GAME// 
function restartGame () {
    homepage.style.display = "block";
    winnerPage.style.display = "none";
    clearInterval(countdown);
    gamePlayPage.style.display = "none";
    document.body.style.backgroundImage = "url('Images_Sounds/25577.jpg')";
    winResults.style.display = "none";
    babyRocket.style.display = "none";
    mediumRocket.style.display = "none";
    bigRocket.style.display = "none";
    saveDirections.style.display = "block";
    form.style.display = "block";
    winResults.style.display = "none";
    start.disabled = false;
    choiceOne.disabled = true;
    choiceTwo.disabled = true;
    choiceThree.disabled = true;
    choiceOne.innerText = "Answer";
    choiceTwo.innerText = "Answer";
    choiceThree.innerText = "Answer";
    flashcard.innerHTML = null;
    answer = null;
    score = 0; 
    STARTING_TIME = 60;
    remainingTime = 0;
    countdown = null;
    level = null;
    displayedScore.innerText = null;
    clearInterval(movement);
    position = 0
    spaceSounds.pause();
};

