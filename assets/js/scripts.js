
let game = {
    currentGame: [],
    playerMoves: [],
    score: 0,
    highScore: 0,
    turnNumber: 0,
    lastButton: "",
    turnInProgress: false,
    choices: ["up", "left", "right", "down"]
};

function newGame() {
    game.currentGame = [];
    game.playerMoves = [];
    game.score = 0;

    for (let arrow of document.getElementsByClassName("arrow")) {
        if (arrow.getAttribute("data-listener") !== "true") {
            arrow.addEventListener("click", (e) => {
                if (game.currentGame.length > 0 && !game.turnInProgress) {
                    let move = e.target.getAttribute("id");
                    game.lastButton = move;
                    game.playerMoves.push(move);
                    lightsOn(move);
                    playerTurn();
                }
            });
            arrow.setAttribute("data-listener", "true");
        }
    }
    showScore();
    addTurn();
}

function addTurn() {
    game.playerMoves = [];
    game.currentGame.push(game.choices[(Math.floor(Math.random() * 4))]);
    showTurns();
}

function showTurns() {
    game.turnInProgress = true;
    game.turnNumber = 0;
    let turns = setInterval(function () {
        lightsOn(game.currentGame[game.turnNumber]);
        game.turnNumber++;
        if (game.turnNumber >= game.currentGame.length) {
            clearInterval(turns);
            game.turnInProgress = false;
        }
    }, 800);
}

function lightsOn(circ) {
    document.getElementById(circ).classList.add("light-up");
    setTimeout(function () {
        document.getElementById(circ).classList.remove("light-up");
    }, 400);
}

function playerTurn() {
    let i = game.playerMoves.length - 1;
    if (game.currentGame[i] === game.playerMoves[i]) {
        if (game.currentGame.length === game.playerMoves.length) {
            game.score++;
            game.highScore++;
            showScore();
            addTurn();
        }
    } else {
        alert("Oh no! that was the wrong one! try again?");
        // showGameOverModal();
        if (game.score >= game.highScore){
            highScore();
        };
        newGame();
    }
}

function showScore() {
    document.getElementById("score").innerText = game.score;
}

function highScore() {
    document.getElementById("high-score").innerText = game.highScore;
}

// function showGameOverModal() {

// }