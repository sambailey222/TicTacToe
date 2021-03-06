// gameboard module
const gameBoard = (() => {
  const board = ['', '', '', '', '', '', '', '', ''];

  const player1NameDisplay = document.getElementById("player1Name");
  const player2NameDisplay = document.getElementById("player2Name");

  const player1Score = document.getElementById("player1Score");
  const player2Score = document.getElementById("player2Score");

  const resetButton = document.getElementById("reset");
  resetButton.addEventListener('click', () => gameBoard.resetBoard());

  const restartButton = document.getElementById("restart");
  restartButton.addEventListener("click", () => gameController.reload());

  const boardDisplay = document.getElementById("board");
  const turnDisplay = document.getElementById("turnDisplay"); 

  function renderBoard(gameBoard) {
    for (let i = 0; i < gameBoard.board.length; i++) {
        const space = document.createElement("div");
        space.setAttribute("id", `space${i}`);
        space.classList.add("grid-item");
        const icon = document.createElement("img");
        space.appendChild(icon);
        icon.id = gameBoard.board[i];
        icon.classList.add("icon");
        space.addEventListener('click', () => {
          if (icon.id == "") {
            if (gameController.gameOver == true) {
              gameBoard.resetBoard();
            } else {
              icon.src = gameController.activePlayer.icon;
              // used in computerPlay to check for empty spaces
              icon.id = gameController.activePlayer.symbol;
              gameBoard.board[i] = gameController.activePlayer.symbol;
              gameController.turnsTaken ++;
              const lightsaber = new Audio("audio/clash.mp3");
              lightsaber.play();
              // swap the active player
              if (gameController.activePlayer == gameController.player1) {
                gameController.activePlayer = gameController.player2;
              } else {
                gameController.activePlayer = gameController.player1;
              }
              // change the turn text
              if (gameController.activePlayer.name == 'Rebellion') 
              {
                turnDisplay.innerHTML = "It's the Rebellion's turn";
              } else {
                turnDisplay.innerHTML = "It's the Empire's turn";
              }
              // check if that move won the game
              gameController.checkEndGame(gameBoard.board);
              // if it didnt and player2 is CPU, make computer play
              if (gameController.player2.computer && gameController.gameOver == false) {
                gameController.computerPlay();
              }
            }
          }
        })
        gameBoard.boardDisplay.appendChild(space);
    }
  }; // /RENDERBOARD

  function resetBoard() {
      this.board = ['', '', '', '', '', '', '', '', ''];
      const spaces = document.querySelectorAll(".grid-item");
      spaces.forEach(space => space.remove());
      renderBoard(this);
      gameController.turnsTaken = 0;
      gameController.gameOver = false;
      gameController.activePlayer = gameController.player1;
      turnDisplay.innerHTML = `It's the ${gameController.activePlayer.name}'s turn`;
  }
  return {
    board, player1NameDisplay, player2NameDisplay, player1Score, player2Score, boardDisplay, turnDisplay, renderBoard, resetBoard
  };
})(); 
// /GAMEBOARD MODULE

// create players and give them audio for victory declaration
const playerFactory = (name, symbol, icon, computer = false) => {
  let winAudio = null;
  if (icon === "rebels") {
    icon = "images/obiwan-kenobi.svg";
    winAudio = new Audio("audio/force.mp3");
  } else {
    icon = "images/darth-vader.svg"
    winAudio = new Audio("audio/now.mp3");
  }
  const score = 0;
  return {name, symbol, icon, score, computer, winAudio}
}; 

// module for gameController
const gameController = (() => {
  let gameStart = false;
  let activePlayer = null;
  let player1 = null;
  let player2 = null;
  const turnsTaken = 0;
  const gameOver = false;

  // when player chooses a side, assign players 1 and 2 accordingly
  const rebelBtn = document.getElementById("rebel");
  rebelBtn.addEventListener("click", (e) => gameController.assignPlayers(e, "rebels"));
  const empireBtn = document.getElementById("empire");
  empireBtn.addEventListener("click", (e) => gameController.assignPlayers(e, "empire"));

  // when player chooses an opponent type, make the corresponding button 'active' (will be checked on game start)
  const humanBtn = document.getElementById("human");
  humanBtn.addEventListener("click", (e) => gameController.assignOpponent(e));
  const computerBtn = document.getElementById("computer");
  computerBtn.addEventListener("click", (e) => gameController.assignOpponent(e));

  // begin the game
  const startBtn = document.getElementById("startGame");
  startBtn.addEventListener("click", () => gameController.startGame());

  function assignPlayers(e, side) {
    // remove 'active' highlight from both buttons, then highlight the targeted one
    e.target.parentNode.querySelectorAll('.button').forEach(child => child.classList.remove('active'));
    e.target.classList.add('active');
    // set Rebels or Empire to players 1 and 2 respectively
    if (side == "rebels") {
      this.player1 = playerFactory('Rebellion', 'x', 'rebels');
      this.player2 = playerFactory('Empire', 'o', 'empire');
      gameBoard.player1NameDisplay.innerHTML = "$";
      gameBoard.player2NameDisplay.innerHTML = "#";
      turnDisplay.innerHTML = "It's the Rebellion's turn";
    } 
    else
    {
      this.player1 = playerFactory('Empire', 'x', 'empire');
      this.player2 = playerFactory('Rebellion', 'o', 'rebels');
      gameBoard.player1NameDisplay.innerHTML = "#";
      gameBoard.player2NameDisplay.innerHTML = "$";
      turnDisplay.innerHTML = "It's the Empire's turn";
    }
  };

  function assignOpponent(e) {
    e.target.parentNode.querySelectorAll('.button').forEach(child => child.classList.remove('active'));
    e.target.classList.add('active');
  };

  function startGame() {
    // check to see if one of the buttons has been highlighted in each case
    const alignmentActiveArray = document.getElementById("alignment").querySelectorAll('.active');
    const playerTypeActiveArray = document.getElementById("playerType").querySelectorAll('.active');
    const errorDiv = document.getElementById("errorMessage");
    const error = document.createElement("h2");
    if (errorDiv.hasChildNodes()) {
      errorDiv.removeChild(errorDiv.firstChild);
    }
    // do not allow game start if player has not selected a side
    if (alignmentActiveArray.length === 0) {
      error.textContent = "You must choose a side to begin!"
      errorDiv.appendChild(error);
    } 
    // do not allow game start if player has not selected an opponent
    else if (playerTypeActiveArray.length === 0) 
    {
      error.textContent = "You must choose an opponent to begin!"
      errorDiv.appendChild(error);
    } 
    // begin the game if above conditions are met
    else 
    {
      // make opponent computer if computer button highlighted, otherwise will default to human
      if (computer.classList.contains('active')) 
      {
        gameController.player2.computer = true;
      }
      // replace start screen with gameboard
      document.getElementById("start-screen").style.display = "none";
      document.getElementById("game-container").style.display = "block";
      this.activePlayer = gameController.player1;
      gameStart = true;
      gameBoard.renderBoard(gameBoard);
    }
  };

  // reload the page (reset the game)
  function reload() {
    location.reload();
  };

  // computer "AI"
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
      
    // make CPU play their move into that spot after 1 second
    setTimeout(function(){document.getElementById(`space${choiceArray[randomMoveIndex]}`).firstChild.src = gameController.player2.icon;}, 1000);
    gameBoard.board[choiceArray[randomMoveIndex]] = gameController.activePlayer.symbol;

    gameController.turnsTaken ++;
    gameController.activePlayer = gameController.player1;
    turnDisplay.innerHTML = `It's the ${gameController.player1.name}'s turn`; 
    this.checkEndGame(gameBoard.board);
    }

  function checkEndGame(boardArray) {
    // if it is possible for someone to win at this point, proceed
    if (gameController.turnsTaken > 4 && gameController.gameOver == false) {
    
      function playerWinCheck(player) {
        let symbol = player.symbol;
        if (  
            // HORIZONTAL WIN CONDITIONS
            (boardArray[0] === symbol && boardArray[1] === symbol && boardArray[2] === symbol) ||
            (boardArray[3] === symbol && boardArray[4] === symbol && boardArray[5] === symbol) ||
            (boardArray[6] === symbol && boardArray[7] === symbol && boardArray[8] === symbol) ||
            // VERTICAL WIN CONDITIONS
            (boardArray[0] === symbol && boardArray[3] === symbol && boardArray[6] === symbol) ||
            (boardArray[1] === symbol && boardArray[4] === symbol && boardArray[7] === symbol) ||
            (boardArray[2] === symbol && boardArray[5] === symbol && boardArray[8] === symbol) ||
            // DIAGONAL WIN CONDITIONS
            (boardArray[0] === symbol && boardArray[4] === symbol && boardArray[8] === symbol) ||
            (boardArray[2] === symbol && boardArray[4] === symbol && boardArray[6] === symbol)
            ) 
            {
              player.winAudio.play();
              turnDisplay.innerHTML = `${player.name} wins the game!`;
              player.score ++;
              gameController.gameOver = true;
              // increment the winning player's score
              switch (player) {
                case gameController.player1:
                  gameBoard.player1Score.innerHTML = player.score;
                  break;
                case gameController.player2:
                  gameBoard.player2Score.innerHTML = player.score;
              }
            }
             else if (gameController.turnsTaken === 9)
            {
              const lightsaberTie = new Audio("audio/tie.mp3");
              lightsaberTie.play();
              turnDisplay.innerHTML = `It's a tie!`;
              gameController.gameOver = true;
            } // /tiecheck  
      } // /playerWinCheck
      playerWinCheck(gameController.player1);
      if (gameController.gameOver == false) {
      playerWinCheck(gameController.player2);
      } // /second playerwincheck
    } // /if statement within checkEndGame
  }; // /checkEndGame
  
  return {gameStart, activePlayer, player1, player2, turnsTaken, gameOver, 
    assignPlayers, assignOpponent, startGame, reload, computerPlay, checkEndGame};
})();











 

 