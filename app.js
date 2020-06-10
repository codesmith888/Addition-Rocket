
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
let timer = document.getElementById("timer");
let gamePlayPage = document.getElementById("gamePlayPage");
let firstAddend = null;
let secondAdded = null;

//winner page items//
let winnerPage = document.getElementById("winnerPage");


// CHOOSE A LEVEL & SWITCH TO GAMEPAGE///
for (i=0; i<3; i++) {
    levelOptions[i].addEventListener("click", function (e) {
        level = e.target.id;
        console.log(e.target.id)
        homepage.style.display = "none";
        gamePlayPage.removeAttribute("hidden");
        flashcard();
        timerCountdown();
    });   
};

////timerCountdown//