var startbtn = document.getElementById('start-button');
var wordHeader  = document.getElementById('word-header');
var w  = document.getElementById('wins');
var l  = document.getElementById('losses');
var timeremaining  = document.getElementById('time-remaining');
var resetButton = document.getElementById("reset");

var words = ["government", "big", "untidy", "ruthless", "wicked", "angle", "cheap", "beg", "gigantic", "destruction"];
var keyword = "";
var progress = "";
var timeLeft = 60;

var timer;
var wins = 0;
var losses = 0;

startbtn.addEventListener('click', startGame);
resetButton.addEventListener('click', newGame);

document.addEventListener('keyup', function(event) {
    if(timeLeft > 0) {
        var keyPressed = event.key;

        var newWord = "";
        for(var i = 0; i < keyword.length; i++) {
            if(keyword.charAt(i) == keyPressed) {
                newWord += keyword.charAt(i);
            } else  {
                newWord += progress.charAt(i);
            }
        }

        progress = newWord;
        wordHeader.textContent = newWord;

        for(var i = 0; i < progress.length; i++) {
            if(progress.charAt(i) == "_") {
                return;
            }
        }

        clearInterval(timer);
        updateWins();
    }
});

function startGame() {
    clearInterval(timer);
    timeLeft = 60;
    progress = "";
    keyword = words[Math.floor(Math.random() * words.length)];
    
    for(var i = 0; i < keyword.length; i++) {
        if(Math.random() < 0.1 && i !== 0) {
            progress += keyword.charAt(i);
        } else {
            progress += "_";
        }
    }
    wordHeader.textContent = progress;

    timeremaining.textContent = timeLeft;
    timer = setInterval(function() {
        if (timeLeft > 0) {
            timeLeft--;
        } else {
            clearInterval(timer);
            updateLosses();
            message = alert("You Suck!");
        }
        timeremaining.textContent = timeLeft;
    }, 1000);

}

function updateWins() {
    wins++;
    w.textContent = "Wins: " + wins;
    localStorage.setItem("wins", wins);
}

function updateLosses() {
    losses++;
    l.textContent = "Losses: " + losses;
    localStorage.setItem("losses", losses);
}

wins = localStorage.getItem('wins');
if(wins != null) {
    w.textContent = "Wins: " + wins;
}

losses = localStorage.getItem('losses');
if(losses != null) {
    l.textContent = "Losses: " + losses;
}

function newGame() {
    wins = -1;
    losses = -1;
    updateLosses();
    updateWins();
}


    