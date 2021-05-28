// targetting html elements
const userGrid = document.querySelector(".grid-user");
const computerGrid = document.querySelector(".grid-computer");
const diplayGrid = document.querySelector(".grid-display");
const ships = document.querySelectorAll(".ship");
const destroyer = document.querySelector(".destroyer-container");
const submarine = document.querySelector(".submarine-container");
const cruiser = document.querySelector(".cruiser-container");
const battleship = document.querySelector(".battleship-container");
const carrier = document.querySelector(".carrier-container");
const startButton = document.querySelector("#start");
const rotateButton = document.querySelector("#rotate");
const turnDisplay = document.querySelector("#whose-turn");
const infoDisplay = document.querySelector("#game-stats");

// Create our board
const width = 10;
const userSquares = [];
const computerSquares = [];
// function to create each board (computer and user)
function createBoard(grid, squares, width) {
    for (let i = 0; i < width*width; i++) {
        const square = document.createElement("div");
        square.dataset.id = i;
        grid.appendChild(square);
        squares.push(square);
    }
};

createBoard(userGrid, userSquares, width);
createBoard(computerGrid, computerSquares, width);