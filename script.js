// create a module for gameBoard
// first create gameboard object with array inside

const gameBoard = (() => {

  const board = ['x', 'x', 'x', 'o', 'o', 'o', 'x', 'x', 'x'];

  return {
    board
  };
})();

console.log(gameBoard);


// create a module for gameController

const gameController = (() => {
  const readyState = false;

  return {readyState}
})();

console.log(gameController);
// create a facotry for players

const playerFactory = (name, symbol) => {
  const turn = false;
  return {name, symbol, turn}
}

const player1 = playerFactory('player1', 'x');
const player2 = playerFactory('player2', 'o');

console.log(player1);
console.log(player2);

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
      boardDisplay.appendChild(space);
  }
}

renderBoard(gameBoard);