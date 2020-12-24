// create a module for gameBoard
// first create gameboard object with array inside



const gameBoard = (() => {
  const board = ['', '', '', '', '', '', '', '', ''];
  function resetBoard() {
      this.board = ['', '', '', '', '', '', '', '', ''];
      const spaces = document.querySelectorAll(".grid-item");
      spaces.forEach(space => space.remove());
      renderBoard(this);
      gameController.turnsTaken = 0;
      gameController.gameOver = false;
      turnDisplay.innerHTML = "Your move, Player 1";
      gameController.activePlayer = player1;
  }
  return {
    board, resetBoard
  };
})();

console.log(gameBoard);

// first of all the board array should be empty
// the game should alternate between the players each time a legal move is played (game controller)
// each div should have an event listener for clicks, which updates the array with the active player's symbol when clicked in the corresponding space
// if player clicks an empty spot on the board, the array is updated and the innerHTML is changed accordingly
// if a player clicks a taken spot on the board, nothing should happen (event listener removed above? game controller)
// symbol needs to be stored in the player object, ready to be added
// active player needs to be kept track of (game controller)
// player 1 should go first

const player1NameDisplay = document.getElementById("player1Name");
const player2NameDisplay = document.getElementById("player2Name");

const resetButton = document.getElementById("reset");
resetButton.addEventListener('click', () => gameBoard.resetBoard());
const restartButton = document.getElementById("restart");
restartButton.addEventListener("click", () => gameController.reload());


const playerFactory = (name, symbol, computer = false) => {
  const score = 0;
  return {name, symbol, score, computer}
}

const humanBtn = document.getElementById("human");
humanBtn.addEventListener("click", () => gameController.assignOpponent("human"));
const computerBtn = document.getElementById("computer");
computerBtn.addEventListener("click", () => gameController.assignOpponent("computer"));

const player1 = playerFactory('Player 1', 'x');
let player2 = null;

// create a module for gameController
const gameController = (() => {
  const readyState = false;
  const activePlayer = player1;
  const turnsTaken = 0;
  const gameOver = false;
  function assignOpponent(playerType) {
    if (playerType == "human") {
      player2 = playerFactory('Player 2', 'o', false);
    } 
    else
    {
      player2 = playerFactory('Player 2', 'o', true);
      player1NameDisplay.innerHTML = "Your Score";
      player2NameDisplay.innerHTML = "CPU Score";
      turnDisplay.innerHTML = "It's your turn";
    }
    document.getElementById("start-screen").style.display = "none";
    document.getElementById("game-container").style.display = "block";
  }
  function reload() {
    location.reload();
  }
  return {readyState, activePlayer, turnsTaken, gameOver, assignOpponent, reload};
})();

console.log(gameController.activePlayer.symbol);
// create a facotry for players


// function that appends gameboard array to page.
// should create 9 divs total and fill them with X's and O's.
// will need to add CSS classes to make it display as a board and not a line
const boardDisplay = document.getElementById("board");
const turnDisplay = document.getElementById("turnDisplay");
function renderBoard(gameBoard) {
  for (let i = 0; i < gameBoard.board.length; i++) {
      const space = document.createElement("div");
      space.setAttribute("id", `space${i}`);
      space.classList.add("grid-item")
      const icon = document.createElement("img");
      space.appendChild(icon);
      icon.id = gameBoard.board[i];
      icon.classList.add("icon")
      console.log(space.innerHTML);
      space.addEventListener('click', () => {
        console.log(icon.src);
        if (icon.id == "") {
          if (gameController.gameOver == true) {
            gameBoard.resetBoard();
          } else {
              if (gameController.activePlayer.symbol === "x") 
              {
                const lightsaber = new Audio("audio/clash.mp3");
                lightsaber.play();
                icon.src="images/obiwan-kenobi.svg";
                console.log("obiwan");

              }
              else
              {
                // const lightsaber2 = new Audio("audio/clash2.mp3");
                // lightsaber2.play();
                const lightsaber = new Audio("audio/clash.mp3");
                lightsaber.play();
                icon.src="images/darth-vader.svg"
                console.log("darth");
              }

            icon.id = gameController.activePlayer.symbol;
            gameBoard.board[i] = gameController.activePlayer.symbol;
            console.log(gameBoard.board);
            gameController.turnsTaken ++;
            
            // swap the active player
            
            if (gameController.activePlayer == player1) {
              gameController.activePlayer = player2;
              turnDisplay.innerHTML = "Your move, Player 2";
            } else {
              gameController.activePlayer = player1;
              turnDisplay.innerHTML = "Your move, Player 1";
            }
            checkEndGame(gameBoard.board);
            if (player2.computer && gameController.gameOver == false) {
              computerPlay();
            }
          }
        }
      })
      boardDisplay.appendChild(space);
  }
}

renderBoard(gameBoard);



// need to look at board array
// what is minimum amount of plays (by either side) required to win? 5.
// what are all the possible winning conditions?
//  0, 1, 2, 
//  3, 4, 5, 
//  6, 7, 8 
// look at the winning combinations, then check for x's and o's in each one. 
// winning combinations are:
// HORIZONTAL
// [0, 1, 2]
// [3, 4, 5]
// [6, 7, 8]
// VERTICAL
// [0, 3, 6]
// [1, 4, 7]
// [2, 5, 8]
// DIAGONAL
// [0, 4, 8]
// [2, 4, 6]
// run the tests as a single function, pass in the values of x and o
// if a match is found, pass out the value 

const player1Score = document.getElementById("player1Score");
const player2Score = document.getElementById("player2Score");
 function checkEndGame(boardArray) {
  if (gameController.turnsTaken > 4 && gameController.gameOver == false) {
    // switch statement?
    console.log(boardArray);
    console.log(gameBoard.board);
    function playerWinCheck(player) {
      let symbol = player.symbol;
      if (  
          // HORIZONTAL
          (boardArray[0] === symbol && boardArray[1] === symbol && boardArray[2] === symbol) ||
          (boardArray[3] === symbol && boardArray[4] === symbol && boardArray[5] === symbol) ||
          (boardArray[6] === symbol && boardArray[7] === symbol && boardArray[8] === symbol) ||
          // VERTICAL
          (boardArray[0] === symbol && boardArray[3] === symbol && boardArray[6] === symbol) ||
          (boardArray[1] === symbol && boardArray[4] === symbol && boardArray[7] === symbol) ||
          (boardArray[2] === symbol && boardArray[5] === symbol && boardArray[8] === symbol) ||
          // DIAGONAL
          (boardArray[0] === symbol && boardArray[4] === symbol && boardArray[8] === symbol) ||
          (boardArray[2] === symbol && boardArray[4] === symbol && boardArray[6] === symbol)
          ) 
          {
            if (player2.computer) {
              if (player == player2) {
                turnDisplay.innerHTML = `You lose!`;
              } else
              {
                turnDisplay.innerHTML = `You win!`;
              }
            } else {
              if (gameController.activePlayer.symbol === "o") {
                const obiWin = new Audio("audio/force.mp3");
                obiWin.play();
              } else
              {
                const darthWin = new Audio("audio/now.mp3");
                darthWin.play();
              }
              turnDisplay.innerHTML = `${player.name} wins the game!`;
              console.log(`${player.name} wins the game!`)
            }
            player.score ++;
            gameController.gameOver = true;
            switch (player) {
              case player1:
                player1Score.innerHTML = player.score;
                break;
              case player2:
                player2Score.innerHTML = player.score;
            }
          }
          else if (gameController.turnsTaken === 9)
          {
            const lightsaberTie = new Audio("audio/tie.mp3");
            lightsaberTie.play();
            turnDisplay.innerHTML = `It's a tie!`;
            gameController.gameOver = true;
          }
      }
      playerWinCheck(player1);
      if (gameController.gameOver == false) {
      playerWinCheck(player2);
      }
  }
 };

 function computerPlay() {
  // create a new array of free spaces
  let choiceArray = [];
    for (let i = 0; i < gameBoard.board.length; i++) {
      if (gameBoard.board[i] === "") {
        choiceArray.push(i);
      }
    }
  // pick a random index from that array
  let randomMoveIndex = Math.floor(Math.random() * choiceArray.length);
    // make CPU play their move into that spot
  if (gameController.activePlayer.symbol === "x") {
    setTimeout(function(){document.getElementById(`space${choiceArray[randomMoveIndex]}`).firstChild.src = "images/obiwan-kenobi.svg";}, 3000);
  } else 
  {
    setTimeout(function(){document.getElementById(`space${choiceArray[randomMoveIndex]}`).firstChild.src = "images/darth-vader.svg";}, 1000);
  }
  
  gameBoard.board[choiceArray[randomMoveIndex]] = gameController.activePlayer.symbol;
  gameController.turnsTaken ++;
  gameController.activePlayer = player1;
  turnDisplay.innerHTML = "It's your turn"; 
  checkEndGame(gameBoard.board);
  }

 