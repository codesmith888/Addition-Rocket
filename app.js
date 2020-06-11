
document.body.style.backgroundImage = "url('file:///Users/caitlinsmith/Downloads/roacket-launch-from-earth/25577.jpg')";
/// DEFINE VARIABLES//
//homepage items// 
let resetButton = document.getElementById("reset");
let homepage = document.getElementById("homepage");
let levelOptions = document.getElementsByClassName("levelChoice");
//gameplay items//
let level = null; 
let levelOne = document.getElementById("levelOne");
let levelTwo = document.getElementById("levelTwo");
let levelThree = document.getElementById("levelThree")
let scoreContainer = document.getElementById("score");
let gamePlayPage = document.getElementById("gamePlayPage");
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

//Score Tracking Items// 
let answerButtons = document.getElementsByClassName("answer");
let displayedScore = document.getElementById("score");
let answer = null
let score = null; 
let title = document.getElementById("title")

//winner page items//
let winnerPage = document.getElementById("winnerPage");


// CHOOSE A LEVEL & SWITCH TO GAMEPAGE///
for (i=0; i<3; i++) {
    levelOptions[i].addEventListener("click", function (e) {
        level = e.target.id;
        console.log(e.target.id)
        homepage.style.display = "none";
        gamePlayPage.removeAttribute("hidden");
        if (level === "levelOne") {
            document.body.style.backgroundImage = "url('file:///Users/caitlinsmith/Downloads/conception-terre-creative-espace/405313-PE7QK3-299.jpg')" 
        }  else if (level === "levelTwo") {
            document.body.style.backgroundImage = "url('file:///Users/caitlinsmith/Downloads/mars-background-with-spacecraft/485655-PH3GEI-570.jpg')"
        } else if (level === "levelThree") {
            document.body.style.backgroundImage = "url('file:///Users/caitlinsmith/Downloads/rocket-space-scene/32577.jpg')"
        }
    });   
};



////Start the Game//
start.addEventListener("click", startClock)
function startClock () {
    countdown = setInterval(updateClock, 100)
    remainingTime = STARTING_TIME;
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
        firstAddend = Math.floor(Math.random() * 21);
        secondAddend = Math.floor(Math.random() * 20) + 1
        flashcard.innerHTML = (firstAddend + " + " + secondAddend);
    }
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
        winnerPage.removeAttribute("hidden");
        document.body.style.backgroundImage = "url('file:///Users/caitlinsmith/Downloads/gradient-starry-night-background-purple-shades/2762077.jpg')";
        title.innerText = "3...2...1.... BLASTOFF!!"
        document.createTextNode("Final Score: " + displayedScore);

    };
