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


const resetButton = document.getElementById("reset");
resetButton.addEventListener('click', () => gameBoard.resetBoard());


const playerFactory = (name, symbol) => {
  const score = 0;
  return {name, symbol, score}
}

const player1 = playerFactory('Player 1', 'x');
const player2 = playerFactory('Player 2', 'o');

// create a module for gameController
const gameController = (() => {
  const readyState = false;
  const activePlayer = player1;
  const turnsTaken = 0;
  const gameOver = false;
  return {readyState, activePlayer, turnsTaken, gameOver};
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
      space.innerHTML = gameBoard.board[i];
      console.log(space.innerHTML);
      space.addEventListener('click', () => {
        if (space.innerHTML == '') {
          if (gameController.gameOver == true) {
            gameBoard.resetBoard();
          } else {
            space.innerHTML = gameController.activePlayer.symbol;
            gameBoard.board[i] = gameController.activePlayer.symbol;
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
            turnDisplay.innerHTML = `${player.name} wins the game!`;
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
            turnDisplay.innerHTML = `It's a tie!`;
            alert(`It's a tie!`);
            gameController.gameOver = true;
          }
      }
      playerWinCheck(player1);
      if (gameController.gameOver == false) {
      playerWinCheck(player2);
      }
  }
 };

 
 