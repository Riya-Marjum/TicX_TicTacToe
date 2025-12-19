const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const gameScreen = document.getElementById("gameScreen");
const resultScreen = document.getElementById("resultScreen");
const resultText = document.getElementById("resultText");

let currentPlayer = "X";
let gameActive = true;

const winConditions = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
];

cells.forEach((cell, index) => {
    cell.addEventListener("click", () => handleClick(cell, index));
});

function handleClick(cell) {
    if (cell.textContent !== "" || !gameActive) return;

    cell.textContent = currentPlayer;
    checkResult();
}

function checkResult() {
    let winner = null;

    for (let condition of winConditions) {
        const [a, b, c] = condition;
        if (
            cells[a].textContent &&
            cells[a].textContent === cells[b].textContent &&
            cells[a].textContent === cells[c].textContent
        ) {
            winner = currentPlayer;
            break;
        }
    }

    if (winner) {
        showResult(`Player ${winner} Wins 🎉`);
        return;
    }

    if ([...cells].every(cell => cell.textContent !== "")) {
        showResult("It's a Draw 😐");
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function showResult(message) {
    gameActive = false;
    gameScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");
    resultText.textContent = message;
}

function newGame() {
    currentPlayer = "X";
    gameActive = true;
    statusText.textContent = "Player X's Turn";
    cells.forEach(cell => cell.textContent = "");

    resultScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
}
