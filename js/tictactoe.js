const ticTacToeGame = new TicTacToeGame();
ticTacToeGame.start();

function TicTacToeGame() {
  const board = new Board();
  const board_copy = new Board();
  const humanPlayer = new HumanPlayer(board);
  const computerPlayer = new ComputerPlayer(board);
  let turn = 0;

  this.start = function () {
    const config = { childList: true };
    const observer = new MutationObserver(() => takeTurn());
    board.positions.forEach((el) => observer.observe(el, config));
    takeTurn();
  };

  function takeTurn() {
    if (board.checkForWinner()) {
      return;
    }

    if (turn % 2 === 0) {
      humanPlayer.takeTurn();
    } else {
      computerPlayer.takeTurn();
    }

    turn++;
  }
}

function Board() {
  this.positions = Array.from(document.querySelectorAll(".col"));

  this.checkForWinner = function () {
    let winner = false;

    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 4, 8],
      [2, 4, 6],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
    ];

    const positions = this.positions;
    winningCombinations.forEach((winningCombo) => {
      const pos0InnerText = positions[winningCombo[0]].innerText;
      const pos1InnerText = positions[winningCombo[1]].innerText;
      const pos2InnerText = positions[winningCombo[2]].innerText;
      const isWinningCombo =
        pos0InnerText !== "" &&
        pos0InnerText === pos1InnerText &&
        pos1InnerText === pos2InnerText;
      if (isWinningCombo) {
        winner = true;
        winningCombo.forEach((index) => {
          positions[index].className += " winner";
        });
      }
    });

    return winner;
  };
}

function ComputerPlayer(board, board_copy) {
  // Implement Minimax algorithm here to make the computer smarter
  this.takeTurn = function () {
    let availablePositions = board.positions.filter((p) => p.innerText === "");
    let availPos_copy = board_copy.positions.filter((p) => p.innerText === "");

    let bestScore = -Infinity;
    let bestMove;
    let count = 0;

    for (let i = 0; i < availablePositions.length; i++) {
      availPos_copy[i].innerText = "O";
      let score = MiniMax(board_copy, 0, true, availablePositions.length);

      if (score > bestScore) {
        bestScore = score;

        bestMove = i;
      }
    }

    //const move = Math.floor(Math.random() * (availablePositions.length - 0));
    availablePositions[bestMove].innerText = "O";
  };
}

let scores = {
  X: 1,
  O: -1,
  tie: 0,
};

function MiniMax(board, depth, isMaximizing, available_pos) {
  let result = board.checkForWinner();

  if (result) {
    let score = scores[result];
    return score;
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < available_pos; i++) {
      let score = MiniMax(board, depth + 1, true);
      bestScore = Math.max(score, bestScore);
    }
    console.log(bestScore);

    return bestScore;
  }
}

function HumanPlayer(board) {
  this.takeTurn = function () {
    board.positions.forEach((el) =>
      el.addEventListener("click", handleTurnTaken)
    );
  };

  function handleTurnTaken(event) {
    event.target.innerText = "X";
    board.positions.forEach((el) =>
      el.removeEventListener("click", handleTurnTaken)
    );
  }
}
