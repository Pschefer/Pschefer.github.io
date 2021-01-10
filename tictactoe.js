let board = [
  ["X", "X", "X"],
  ["X", "X", "X"],
  ["O", "X", "O"],
];

let players = ["X", "O"];
let currentPlayer;
let available = [];

window.onload = function () {
  // Run startgame function when button is clicked
  id("start-btn").addEventListener("click", draw());
};

function setup() {
  createCanvas(400, 400);
  frameRate(1);
  currentPlayer = random(players.length);
  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      available.push([i, j]);
    }
  }
}

function equals3(a, b, c) {
  return a == b && b == c && a != "";
}

function checkWinner() {
  let winner = null;
  // horizontal
  for (let i = 0; i < 3; i++) {
    if (equals3((board[i][0], board[i][1]), board[i][2])) {
      winner = board[i][0];
    }
  }
  // vertical
  for (let i = 0; i < 3; i++) {
    if (equals3((board[0][i], board[1][i]), board[2][i])) {
      winner = board[0][i];
    }
  }
  // Diagonal

  if ((board[0][0] == board[1][1]) == board[2][2]) {
    winner = board[0][0];
  }
  if ((board[2][0] == board[1][1]) == board[0][2]) {
    winner = board[2][0];
  }

  if (winner == null && available.length == 0) {
    return "tie";
  } else {
    return winner;
  }
}

function nextTurn() {
  let index = floor(random(available.length));
  let spot = available.splice(index, 1)[0];
  let i = spot[0];
  let j = spot[1];
  board[i][j] = players[currentPlayer];
  currentPlayer = (currentPlayer + 1) % players.length;
}

// function mousePressed() {
//   nextTurn();
// }

function draw() {
  background(255);
  let w = wdith / 3;
  let h = height / 3;

  line(w, 0, w, height);
  line(w * 2, 0, w * 2, height);
  line(0, h, width, h);
  line(0, h * 2, width, h * 2);

  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      let x = w * i + w / 2;
      let y = h * j + h / 2;
      let spot = board[i][j];
      textSize(32);
      strokeWeight(4);
      if (spot == players[0]) {
        ellipseMode(CORNER);
        ellipse(x, y, w / 2);
      } else if (spot == players[1]) {
        let xr = w / 4;
        line(x - xr, y - xr, x + xr, y + xr);
        line(x + xr, y - xr, x - xr, y + xr);
      }
      text(spot, x, y);
    }
  }

  let result = checkWinner();
  if (result != null) {
    noLoop();
    createP(winner).style("color", "#FFF").style("font-size", "32pt");

    console.log(result);
  }
  nextTurn();
}