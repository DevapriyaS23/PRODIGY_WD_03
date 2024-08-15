const board = document.getElementById("board");
const cells = board.getElementsByClassName("cell");
const status = document.getElementById("status");
const resetButton = document.getElementById("reset");

let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

function checkWinner() {
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (const [a, b, c] of winningCombos) {
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return gameBoard[a];
        }
    }
    return gameBoard.includes("") ? null : "Draw";
}

function handleClick(e) {
    const index = e.target.dataset.index;
    if (gameBoard[index] === "" && gameActive) {
        gameBoard[index] = currentPlayer;
        e.target.textContent = currentPlayer;
        const winner = checkWinner();

        if (winner) {
            gameActive = false;
            status.textContent = winner === "Draw" ? "It's a draw!" : `Player ${winner} wins!`;
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            status.textContent = `Player ${currentPlayer}'s turn`;
        }
    }
}

function resetGame() {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    status.textContent = "Player X's turn";
    Array.from(cells).forEach(cell => cell.textContent = "");
}

board.addEventListener("click", handleClick);
resetButton.addEventListener("click", resetGame);
