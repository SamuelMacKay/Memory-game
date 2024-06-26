/**  
 * Game objects
 */
let game = {
    currentGame: [],
    playerMoves: [],
    score: 0,
    highScore: 0,
    turnNumber: 0,
    lastButton: "",
    turnInProgress: false,
    choices: ["up", "left", "right", "down"],
    timer: [],
    interval: []

  };

/**  
 * Waits until DOM is loaded, and then writes local storage highscore into "high-score" div or sets it to "0" if its empty
 */
document.addEventListener("DOMContentLoaded", (event) => {
    game.highScore = localStorage.getItem("High-Score") || "0";
    document.getElementById("high-score").innerText = game.highScore;
    
  });

/**  
 * Function that starts the game when you click "start-button", and will reset the current game if pressed during the game
 */
function newGame() {
    for (let timerId of game.timer) {
      clearTimeout (timerId);
    }
    for (let intervalId of game.interval) {
      clearInterval (intervalId);
    }
    game.timer = [];
    game.interval = [];
    game.currentGame = [];
    game.playerMoves = [];
    game.score = 0;

    for (let arrow of document.getElementsByClassName("arrow")) {
        if (arrow.getAttribute("data-listener") !== "true") {
          
            arrow.addEventListener("click", (e) => {
                if (game.currentGame.length > 0 && !game.turnInProgress) {
                    let move = e.currentTarget.getAttribute("id");
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

/**  
 * starts newGame when clicking start, pressing "space" and "enter"
 */
document.addEventListener("DOMContentLoaded", (event) => {
    let start = document.getElementById("start-button");
    start.addEventListener ("click", () => {
      newGame();
    });
  });

/**  
 * This adds ability to activate the buttons via the arrow keys, 
 * as well as starting the game with space or enter
 */
window.addEventListener(
    "keydown",
    (event) => {
      if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
      }
  
      switch (event.key) {
        case "ArrowDown":
            document.getElementById("down").click();
          break;
        case "ArrowUp":
            document.getElementById("up").click();
          break;
        case "ArrowLeft":
            document.getElementById("left").click();
          break;
        case "ArrowRight":
            document.getElementById("right").click();
          break;
        case "Enter":
            document.getElementById("start-button").click();
          break;
        case " ":
            document.getElementById("start-button").click();
          break;
        default:
          return; // Quit when this doesn't handle the key event.
      }
  
      // Cancel the default action to avoid it being handled twice
      event.preventDefault();
    },
    true
  );

/**  
 * Randomises which of the 4 buttons will light up to start and during each computer turn 
 */
function addTurn() {
    game.playerMoves = [];
    game.currentGame.push(game.choices[(Math.floor(Math.random() * 4))]);
    showTurns();
}

/**
 * This is the computer's turn, setting the pattern to follow, 
 * and how long there is inbetween each light up display
 */
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
    }, 1000);
    game.interval.push(turns);
}

/**  
 * Adds and then removes the "light-up" class during the computers and players turn, to indicate which button has been pressed 
 */
function lightsOn(arr) {
    document.getElementById(arr).classList.add("light-up");
    let timerId = setTimeout(function () {
        document.getElementById(arr).classList.remove("light-up");
    }, 400);
    game.timer.push(timerId);
}

/**  
 * Activates when the computer has finished their turn, 
 * will add one more to the sequence if the player matches it, otherwise 
 * activates the "game over" screen
 * will update highscore if current score is higher
 */
function playerTurn() {
    let i = game.playerMoves.length - 1;
    if (game.currentGame[i] === game.playerMoves[i]) {
        if (game.currentGame.length === game.playerMoves.length) {
            game.score++;
            showScore();
            addTurn();
        }
    } else {
        let showGameOverModal = document.getElementById("game-over-modal");
        showGameOverModal.style.display = "block";
        if (game.score >= game.highScore){
        highScore();
    }
}
}

/**
 * increments the current games score
 */
function showScore() {
    document.getElementById("score").innerText = game.score;
}

/** 
 * increments the highscore 
*/
function highScore() {
    game.highScore = game.score;
    document.getElementById("high-score").innerText = game.highScore;
    localStorage.setItem("High-Score", game.highScore);
}