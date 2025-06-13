const ROWS = 6;
const COLS = 7;
let currentPlayer = "red";
let gameBoard = [];
let gameOver = false;

const board = document.getElementById("board");
const statusText = document.getElementById("status");

function createBoard() {
  gameBoard = Array(ROWS).fill(null).map(() => Array(COLS).fill(""));
  board.innerHTML = "";
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = r;
      cell.dataset.col = c;
      cell.addEventListener("click", () => handleMove(c));
      board.appendChild(cell);
    }
  }
}

function handleMove(col) {
  if (gameOver) return;
  for (let row = ROWS - 1; row >= 0; row--) {
    if (!gameBoard[row][col]) {
      gameBoard[row][col] = currentPlayer;
      updateBoard();
      if (checkWin(row, col)) {
        statusText.textContent = `🎉 Player ${currentPlayer === "red" ? "🔴" : "🟡"} wins!`;
        gameOver = true;
      } else {
        currentPlayer = currentPlayer === "red" ? "yellow" : "red";
        statusText.textContent = `Player ${currentPlayer === "red" ? "🔴" : "🟡"}'s turn`;
      }
      break;
    }
  }
}

function updateBoard() {
  document.querySelectorAll(".cell").forEach(cell => {
    const r = +cell.dataset.row;
    const c = +cell.dataset.col;
    cell.classList.remove("red", "yellow");
    if (gameBoard[r][c]) {
      cell.classList.add(gameBoard[r][c]);
    }
  });
}

function checkWin(row, col) {
  const color = gameBoard[row][col];
  const directions = [
    [[0, 1], [0, -1]],  // Horizontal
    [[1, 0], [-1, 0]],  // Vertical
    [[1, 1], [-1, -1]], // Diagonal /
    [[1, -1], [-1, 1]]  // Diagonal \
  ];

  return directions.some(direction => {
    let count = 1;
    direction.forEach(([dx, dy]) => {
      let r = row + dx;
      let c = col + dy;
      while (r >= 0 && r < ROWS && c >= 0 && c < COLS && gameBoard[r][c] === color) {
        count++;
        r += dx;
        c += dy;
      }
    });
    return count >= 4;
  });
}

function resetGame() {
  currentPlayer = "red";
  gameOver = false;
  statusText.textContent = "Player 🔴's turn";
  createBoard();
}

createBoard();
