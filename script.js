const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const resetBtn = document.getElementById('resetBtn');
const message = document.getElementById('message');

let currentPlayer = 'X';
let gameState = Array(9).fill(null);
let isGameActive = true;

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]
];

const handleCellClick = (e) => {
    const clickedCell = e.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== null || !isGameActive) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    checkForWinner();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateMessage();
};

const checkForWinner = () => {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        message.textContent = `Player ${currentPlayer} has won!`;
        isGameActive = false;
        return;
    }

    if (!gameState.includes(null)) {
        message.textContent = "It's a draw!";
        isGameActive = false;
    }
};

const updateMessage = () => {
    if (isGameActive) {
        message.textContent = `Player ${currentPlayer}'s turn`;
    }
};

const resetGame = () => {
    currentPlayer = 'X';
    gameState.fill(null);
    cells.forEach(cell => cell.textContent = '');
    isGameActive = true;
    updateMessage();
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);

updateMessage();
