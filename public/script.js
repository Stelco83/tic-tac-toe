const cellElements = document.querySelectorAll('[data-cell]');
const winningText = document.querySelector('[data-winning-message-text]');
const boardElement = document.getElementById('board');
const restartButton = document.getElementById('restartButton');
const winningMessage = document.getElementById('winningMessage');

const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
let circleTurn;
const CIRCLE_CLASS = 'circle';
const X_CLASS = 'x';


startGame();
restartButton.addEventListener('click', startGame)

function startGame() {
    circleTurn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(CIRCLE_CLASS),
            cell.classList.remove(X_CLASS),
            cell.addEventListener('click', handleClick, { once: true })
    })
    setBoardClass();
    winningMessage.classList.remove('show');
}


function handleClick(e) {
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;

    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurns();
        setBoardClass();
    }

}





function endGame(draw) {
    if (draw) {
        winningText.innerText = 'Nobody Win! Play Again?'
    } else {
        winningText.innerText = `${circleTurn ? "0"  : "X" } Wins!!!`
    }

    winningMessage.classList.add('show');
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) ||
            cell.classList.contains(CIRCLE_CLASS)

    })
}

function placeMark(cell, currentClass) {

    cell.classList.add(currentClass)
}

function swapTurns() {
    circleTurn = !circleTurn
}

function setBoardClass() {
    boardElement.classList.remove(X_CLASS);
    boardElement.classList.remove(CIRCLE_CLASS);
    if (circleTurn) {
        boardElement.classList.add(CIRCLE_CLASS)
    } else {
        boardElement.classList.add(X_CLASS)
    }
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(comb => {
        return comb.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}