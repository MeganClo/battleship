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
const rotateButton = document.getElementById("rotate");
const turnDisplay = document.querySelector("#whose-turn");
const infoDisplay = document.querySelector("#game-stats");

// setting horizontal for ships since that is their default
let isHorizontal = true;

// Create our boards
const width = 10;
const userSquares = [];
const computerSquares = [];
// function to create each board (computer and user)
function createBoard(grid, squares) {
    for (let i = 0; i < width * width; i++) {
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
            [0, width, width * 2]
        ]
    },
    {
        name: "cruiser",
        directions: [
            [0, 1, 2],
            [0, width, width * 2]
        ]
    },
    {
        name: "battleship",
        directions: [
            [0, 1, 2, 3],
            [0, width, width * 2, width * 3]
        ]
    },
    {
        name: "carrier",
        directions: [
            [0, 1, 2, 3, 4],
            [0, width, width * 2, width * 3, width * 4]
        ]
    },
];

// placing computer ships in random location on computer grid
function randomPlacement(ship) {
    // randomly setting the computer ship to be placed horizontally or vertically (choosing which index in our direction array above)
    // will be 0 or 1
    let randomDirection = Math.floor(Math.random() * ship.directions.length);
    // choosing either index 0 or index 1 of array above
    let current = ship.directions[randomDirection];
    // if horizontal we will incrememt by 1
    if (randomDirection === 0) {
        direction = 1;
    }
    // if vertical we will increment by 10 (our grid is 10 by 10)
    if (randomDirection === 1) {
        direction = 10;
    }
    // console.log("this is randomdirection", randomDirection)
    // console.log("this is current", current)
    // console.log("this is direction", direction);
    // console.log("this is ship's length", ship.directions[0].length)
    // checking to see if any of squares are already taken by a different ship

    // setting our random starting square for each ship
    // let randomStartSquare = (Math.floor(Math.random() * 99));

    let randomStartSquare = Math.abs(Math.floor(Math.random() * computerSquares.length - (ship.directions[0].length * direction)))


    // console.log("this is randomStartSquare", randomStartSquare)
    const isTaken = current.some(index => computerSquares[randomStartSquare + index].classList.contains("taken"));

    // checking to see if we're at the right edge (not where we want to be because we can't build out our ship)
    const isAtRightEdge = current.some(index => (randomStartSquare + index) % width === width - 1);
    // checking to see if we're at the left edge
    const isAtLeftEdge = current.some(index => (randomStartSquare + index) % width === 0);

    // if it's not taken, if it's not at the right edge, and its not at the left edge, we can add class taken
    if (!isTaken && !isAtRightEdge && !isAtLeftEdge) {
        current.forEach(index => computerSquares[randomStartSquare + index].classList.add("taken", ship.name));
    } else randomPlacement(ship);
};

// looping though ship array and passing each ship into our function to generate the placement
for (let i = 0; i < shipArr.length; i++) {
    randomPlacement(shipArr[i]);
};

// rotate the ships

//Rotate the ships
function rotateShip() {
    if (isHorizontal) {
        destroyer.classList.toggle('destroyer-container-vertical')
        submarine.classList.toggle('submarine-container-vertical')
        cruiser.classList.toggle('cruiser-container-vertical')
        battleship.classList.toggle('battleship-container-vertical')
        carrier.classList.toggle('carrier-container-vertical')
        isHorizontal = false
        console.log(isHorizontal)
        return
    }
    if (!isHorizontal) {
        destroyer.classList.toggle('destroyer-container-vertical')
        submarine.classList.toggle('submarine-container-vertical')
        cruiser.classList.toggle('cruiser-container-vertical')
        battleship.classList.toggle('battleship-container-vertical')
        carrier.classList.toggle('carrier-container-vertical')
        isHorizontal = true
        console.log(isHorizontal)
        return
    }
};

rotateButton.addEventListener("click", rotateShip);

// user to move around their ships

// even listener for squares with a function for each drag event
ships.forEach(ship => ship.addEventListener("dragstart", dragStart));
userSquares.forEach(square => square.addEventListener("dragstart", dragStart));
userSquares.forEach(square => square.addEventListener("dragover", dragOver));
userSquares.forEach(square => square.addEventListener("dragenter", dragEnter));
userSquares.forEach(square => square.addEventListener("dragleave", dragLeave));
userSquares.forEach(square => square.addEventListener("drop", dragDrop));
userSquares.forEach(square => square.addEventListener("dragend", dragEnd));

// function for dragstart
function dragStart() {

};

// function for dragover
function dragOver() {

};

// function for dragstart
function dragEnter() {

};

// function for dragstart
function dragLeave() {

};

// function for dragstart
function dragDrop() {

};

// function for dragstart
function dragEnd() {

};






