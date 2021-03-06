let circY = window.innerHeight/2-25;
let circX = window.innerWidth/2-25;

let level = 1;
document.getElementById("levelCounter").innerHTML = level;

let minesArray = [];
let distanceArray = [];

let endPoint = {bxCoordinate: 0, byCoordinate: 0};

let soundLoop = 3;
let audio = new Audio('droplet.mp3');

let openingSoundLoop = 1;
let openingAudio = new Audio('openingBeat.mp3');

solveDistance();

let playLoop = function () {
    audio.play();
    console.log("played");
};

let playOpeningLoop = function () {
    openingAudio.play();
    console.log("played");
};

function startGame() {
    document.getElementById("openingDiv").style.display = "none";
    document.getElementById("gameDiv").style.display = "inline";
    document.getElementById("instructionsDiv").style.display = "none";
    clearInterval(this.openingInterval);
}

function showHowToPlay() {
    document.getElementById("openingDiv").style.display = "none";
    document.getElementById("instructionsDiv").style.display = "inline";
}

function checkKey(event) {

    let key = event.which || event.keyCode;

    if (key === 38) {
        // up arrow
        circY = circY - 10;
    }
    else if (key === 40) {
        // down arrow
        circY = circY + 10;
    }
    else if (key === 37) {
        // left arrow
        circX = circX - 10;
    }
    else if (key === 39) {
        // right arrow
        circX = circX + 10;
    }

    updateCircLoc();
    checkForMines();
    checkForFinish();
    solveDistance();
}

function loadDimension() {
    document.getElementById("body").style.height = window.innerHeight+"px";
    document.getElementById("body").style.width = window.innerWidth+"px";
    updateCircLoc();
    setFinish();
    plantMines();
    playSound();
}

function updateCircLoc() {
    document.getElementById("square").style.setProperty("top", circY + "px");
    document.getElementById("square").style.setProperty("left", circX + "px");
}

function setFinish() {
    endPoint.bxCoordinate = Math.floor(Math.random()*(window.innerWidth-110))+10;
    document.getElementById("finish").style.setProperty("top", endPoint.byCoordinate + "px");
    document.getElementById("finish").style.setProperty("left", endPoint.bxCoordinate + "px");
}


function plantMines() {
    let mines = (level * 3) + 8;
    for (i=0; i<mines; i++){
        let xCoord = Math.floor(Math.random()*window.innerWidth);
        let yCoord = Math.floor(Math.random()*window.innerHeight);
        let mineCoords = {xCoordinate: xCoord, yCoordinate: yCoord};
        minesArray.push(mineCoords);
    }
    /*for (j=0; j<mines; j++){
        console.log("xCoord "+j+": "+minesArray[j].xCoordinate);
        console.log("yCoord "+j+": "+minesArray[j].yCoordinate);
    }*/

}

function checkForMines() {

    for (i=0; i<minesArray.length; i++){
        if (minesArray[i].xCoordinate > circX && minesArray[i].xCoordinate < (circX + 50) && minesArray[i].yCoordinate > circY && minesArray[i].yCoordinate < (circY + 50)){
            roundLoss();
        }
    }
}

function checkForFinish() {
    console.log("hi");
    console.log(circY);
    if (endPoint.byCoordinate - 50 < circY && endPoint.byCoordinate + 30 > circY && circX + 50 > endPoint.bxCoordinate && circX < endPoint.bxCoordinate + 100){
        roundWin();
    }

}

function roundWin() {
    minesArray = [];
    level = level + 1;
    document.getElementById("levelCounter").innerHTML = level;
    circY = window.innerHeight/2-25;
    circX = window.innerWidth/2-25;
    plantMines();
    setFinish();
}

function roundLoss() {
    alert("You Lost!");
    circY = window.innerHeight/2-25;
    circX = window.innerWidth/2-25;
}

function playSound() {

    if (soundLoop === 2){
        playLoop();
        this.intervalLong = window.setInterval(playLoop, 1000);
    } else if (soundLoop === 1) {
        playLoop();
        this.intervalMedium = window.setInterval(playLoop, 500);
    } else if (soundLoop === 0) {
        playLoop();
        this.intervalsmall = window.setInterval(playLoop, 100);
    }
}

function playOpeningSound() {

    if (openingSoundLoop === 1){
        playOpeningLoop();
        this.openingInterval = window.setInterval(playOpeningLoop, 1500);
    }
}

function clearTheInterval() {
    clearInterval(this.intervalLong);
    clearInterval(this.intervalMedium);
    clearInterval(this.intervalsmall);
}

function solveDistance() {
    distanceArray = [];
    for (i=0; i<minesArray.length; i++){
        solved = Math.sqrt(Math.pow((minesArray[i].xCoordinate - circX), 2) + Math.pow((minesArray[i].yCoordinate - circY), 2));
        distanceArray.push(solved);
    }
    distanceArray.sort(function(a, b){return a - b});
    console.log(distanceArray);
    let dp = distanceArray[0];
    if (dp < 31){
        soundLoop = 0;
    } else if ( dp >= 31 && dp <61){
        soundLoop = 1;
    } else if (dp >= 61 && dp < 91){
        soundLoop = 2;
    } else if (dp >= 91 ){
        soundLoop = 3;
    }
    console.log(soundLoop);
    clearTheInterval();
    playSound();
}

playOpeningSound();