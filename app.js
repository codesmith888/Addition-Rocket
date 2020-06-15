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
let spaceSounds = document.getElementById("spaceSounds");

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
let launchSound = document.getElementById("launchSound");
let uhOhMessage = document.getElementById("uhOhMessage");
uhOhMessage.style.display = "none";
let blastOff = document.getElementById("blastOff");
blastOff.style.display = "none";
let failSound = document.getElementById("failSound")

//RESTART BUTTON ITEMS// 
let restartButton = document.getElementById("restart");
let restartButtonTwo = document.getElementById("restartTwo");
let restartButtonThree = document.getElementById("restartThree");

//Local Storage Items//
let savedName = document.getElementById("name");
let submitButton = document.getElementById("submitButton")
let saveDirections = document.getElementById("saveDirections");
let savedScores = [];
let form = document.getElementById("form");
let winResults = document.getElementById("winResults");
winResults.style.display = "none";

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
            levelID.innerText = "Level: 1 - Adding within 10"
        }  else if (level === "levelTwo") {
            document.body.style.backgroundImage = "url('file:///Users/caitlinsmith/Downloads/mars-background-with-spacecraft/485655-PH3GEI-570.jpg')"
            levelID.innerText = "Level: 2 - Adding within 20"
        } else if (level === "levelThree") {
            document.body.style.backgroundImage = "url('file:///Users/caitlinsmith/Downloads/rocket-space-scene/32577.jpg')"
            levelID.innerText = "Level: 3 - Adding within 50"
        }
    });   
};

////Start the Game//
start.addEventListener("click", startClock)
function startClock () {
    countdown = setInterval(updateClock, 50)
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

//updateClock//
function updateClock() {
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
    gameOptions = ["answer", "optionTwo", "optionThree"]
    //define answer options// 
    answer = firstAddend + secondAddend;
    gameOptions[0] = answer;
    optionTwo = answer - 1;
    gameOptions[1] = optionTwo;
    optionThree = answer + 7;
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
        score = (score + 1)
        displayedScore.innerText = ("Fuel Points: " + score)
    } else console.log("That is incorrect");
    displayFlashcard();
    });
};

//DISPLAY RESULTS/END GAME FUNCTION //
function displayResultsAndEndGame () {
        gamePlayPage.style.display = "none";
        winnerPage.style.display = "block";
        document.body.style.backgroundImage = "url('file:///Users/caitlinsmith/Downloads/gradient-starry-night-background-purple-shades/2762077.jpg')";
        finalScore.innerText = "Total Fuel Earned: " + score
        if (score <= 10) {
            babyRocket.style.display = "block";
            uhOhMessage.style.display = "block";
            playFailSound();
        } else if (score > 10 && score <= 20) {
            babyRocket.style.display = "block";
            blastOff.style.display = "block";
            moveRocket();
            rocketSound();
        } else if (score <= 35) {
            mediumRocket.style.display = "block";
            blastOff.style.display = "block";
            moveRocket();
            rocketSound();
        } else {
            bigRocket.style.display = "block";
            blastOff.style.display = "block";
            moveRocket();
            rocketSound();
        }
    };

//MOVE ROCKETS//
function moveRocket() {
    let position = 0;
    if (score <= 20) {
        let movement = setInterval(move, 10);
    } else if (score <= 35) {
        movement = setInterval(move, 7);
    } else {
        movement = setInterval(move, 4);
    }
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
    }
};

//ROCKET SOUND// 
function rocketSound () {
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
    compareHighScores();
    savedScores.push(savedScore);
    localStorage.setItem("myScores", JSON.stringify(savedScores));
};

//compare high scores//
    let highScore = localStorage.getItem("myScores")
    console.log(highScore.values(highScore.Score));

    
        // for (highScore.keys in highScore) {
        //     if (highScore.name == savedScore.name) {
        //         for (highScore.level in highScore) {
        //             if (highScore.level == savedScore.level) {
        //                 for (highScore.score in highScore) {
        //                     if (highScore.score > savedScore.score) {
        //                         localStorage.setItem("myScores", JSON.stringify(savedScores));
        //                         saveDirections.style.display = "none";
        //                         form.style.display = "none";
        //                         winResults.style.display = "block";
        //                     }
        //                 }
        //             }
        //         }
        //     }
        // }
        form.reset();

    


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
    score = 0; 
    STARTING_TIME = 60;
    remainingTime = 0;
    countdown = null;
    level = null;
    computerChoice = null;
    babyRocket.style.display = "none";
    mediumRocket.style.display = "none";
    bigRocket.style.display = "none";
    displayedScore.innerText = null;
    saveDirections.style.display = "block";
    form.style.dispaly = "block";
    winResults.style.display = "none";
};

