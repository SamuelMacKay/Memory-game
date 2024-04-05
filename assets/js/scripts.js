let game = {
    score: 0,
    currentGame: [],
    playerMoves: [],
    turnNumber: 0,
    choices: ["up", "left", "right", "down"],
}

function newGame() {
    game.score = 0;
    game.currentGame = [];
    game.playerMoves = [];
    showScore();
    addTurn();
}

function addTurn() {
    game.playerMoves = [];
    game.currentGame.push(game.choices[(Math.floor(Math.random() * 4))]);
    showTurns();
}

function showScore() {
    document.getElementById("score").innerText = game.score;
}

function lightsOn(arr) {
    document.getElementById(arr).classList.add("light-up");
    setTimeout(() => {
        document.getElementById(arr).classList.remove("light-up");
    }, 400)
}

function showTurns() {
    game.turnNumber = 0;
    let turns = setInterval(() => {
        lightsOn(game.currentGame[game.turnNumber]);
        game.turnNumber++;
        if (game.turnNumber >= game.currentGame.length) {
            clearInterval(turns);
        }
    }, 800);
}