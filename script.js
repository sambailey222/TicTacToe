// create a module for gameBoard
// first create gameboard object with array inside

const gameBoard = (() => {

  const board = ['', '', '', '', '', '', '', '', ''];

  return {
    board
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





const playerFactory = (name, symbol) => {
  return {name, symbol}
}

const player1 = playerFactory('player1', 'x');
const player2 = playerFactory('player2', 'o');

// create a module for gameController
const gameController = (() => {
  const readyState = false;
  const activePlayer = player1;

  return {readyState, activePlayer};
})();

console.log(gameController.activePlayer.symbol);
// create a facotry for players


// function that appends gameboard array to page.
// should create 9 divs total and fill them with X's and O's.
// will need to add CSS classes to make it display as a board and not a line
const boardDisplay = document.getElementById("board");
function renderBoard(gameBoard) {
  for (let i = 0; i < gameBoard.board.length; i++) {
      const space = document.createElement("div");
      space.setAttribute("id", `space${i}`);
      space.classList.add("grid-item")
      space.innerHTML = gameBoard.board[i];
      console.log(space.innerHTML);
      space.addEventListener('click', () => {
        if (space.innerHTML == '') {
          space.innerHTML = gameController.activePlayer.symbol;
          // swap the active player
          if (gameController.activePlayer == player1) {
            gameController.activePlayer = player2;
          } else {
            gameController.activePlayer = player1;
          }
        }
      })
      boardDisplay.appendChild(space);
  }
}

renderBoard(gameBoard);

 function checkforWin() {};