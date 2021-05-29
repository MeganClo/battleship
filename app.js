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

// Create our boards
const width = 10;
const userSquares = [];
const computerSquares = [];
// function to create each board (computer and user)
function createBoard(grid, squares) {
    for (let i = 0; i < width*width; i++) {
        const square = document.createElement("div");
        square.dataset.id = i;
        grid.appendChild(square);
        squares.push(square);
    }
};
// passing in parameters to create each board
// user board
createBoard(userGrid, userSquares);
// computer board
createBoard(computerGrid, computerSquares);

// placing ships in computer grid
// setting array of computer ships
const shipArr = [
    {
        name: "destroyer",
        directions: [
            [0, 1],
            [0, width]
        ]
    },
    {
        name: "submarine",
        directions: [
            [0, 1, 2],
            [0, width, width*2]
        ]
    },
    {
        name: "cruiser",
        directions: [
            [0, 1, 2],
            [0, width, width*2]
        ]
    },
    {
        name: "battleship",
        directions: [
            [0, 1, 2, 3],
            [0, width, width*2, width*3]
        ]
    },
    {
        name: "carrier",
        directions: [
            [0, 1, 2, 3, 4],
            [0, width, width*2, width*3, width*4]
        ]
    },
];

// placing computer ships in random location on computer grid
function randomPlacement(ship) {
    // randomly setting the computer ship to be placed horizontally or vertically
    let randomDirection = Math.floor(Math.random() * ship.directions.length);
    let current = ship.directions[randomDirection];
    // if horizontal we will incrememt by 1
    if (randomDirection === 0) {
        direction = 1;
    }
    // if vertical we will increment by 10 (our grid is 10 by 10)
    if (randomDirection === 1) {
        direction = 10;
    }
    console.log("this is direction", direction);
    console.log("this is ship.directions", (ship.directions[0].length * direction));
    // setting our random starting square for each ship
    let randomStartSquare = (Math.floor(Math.random() * 99));
    // checking to see if any of squares are already taken by a different ship
    // console.log(computerSquares)
    // console.log(randomStartSquare);
    console.log("this is randomStartSquare", randomStartSquare)
    const isTaken = current.some(index => computerSquares[randomStartSquare + index].classList.contains("taken"));
    
    // checking to see if we're at the right edge
    const isAtRightEdge = current.some(index => (randomStartSquare + index) % width === width - 1);
    // checking to see if we're at the left edge
    const isAtLeftEdge = current.some(index => (randomStartSquare + index) % width === 0);

    if(!isTaken && !isAtRightEdge && !isAtLeftEdge) {
        current.forEach(index => computerSquares[randomStartSquare + index].classList.add("taken", ship.name));
    } else randomPlacement(ship);
};

randomPlacement(shipArr[0]);
// randomPlacement(shipArr[1]);