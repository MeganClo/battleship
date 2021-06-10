// targetting html elements
const userGrid = document.querySelector(".grid-user");
const computerGrid = document.querySelector(".grid-computer");
const displayGrid = document.querySelector(".grid-display");
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

// setting some game logic variables: 
let isGameOver = false;
let currentPlayer = "user";
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

// setting variables to hold the user and computer ship hit counts
// user ships
let destroyerCount = 0;
let submarineCount = 0;
let cruiserCount = 0;
let battleshipCount = 0;
let carrierCount = 0;
// computer ships
let compDestroyerCount = 0;
let compSubmarineCount = 0;
let compCruiserCount = 0;
let compBattleshipCount = 0;
let compCarrierCount = 0;

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
let selectedShipNameWithIndex;

ships.forEach(ship => ship.addEventListener("mousedown", (e) => {
    selectedShipNameWithIndex = e.target.id
}));

// even listener for squares with a function for each drag event
ships.forEach(ship => ship.addEventListener("dragstart", dragStart));
userSquares.forEach(square => square.addEventListener("dragstart", dragStart));
userSquares.forEach(square => square.addEventListener("dragover", dragOver));
userSquares.forEach(square => square.addEventListener("dragenter", dragEnter));
userSquares.forEach(square => square.addEventListener("dragleave", dragLeave));
userSquares.forEach(square => square.addEventListener("drop", dragDrop));
userSquares.forEach(square => square.addEventListener("dragend", dragEnd));

// to know which index in our ship array we've grabbed
let draggedShip;
let draggedShipLength;
// function for dragstart
function dragStart() {
    // "this" is our draggedShip data"
    draggedShip = this;
    // to get the length of our targetted dragged ship
    draggedShipLength = draggedShip.children.length;
};

// function for dragover
function dragOver(e) {
    e.preventDefault();
};

// function for dragstart
function dragEnter(e) {
    e.preventDefault();
};

// function for dragstart
function dragLeave() {
    console.log("drag leave");
};

// function for dragstart
function dragDrop() {
    // getting the ship name and the last index (since we used that for our last id of the div)
    let shipNameWithLastId = draggedShip.lastElementChild.id;

    // getting the ship name (removing the last part of the string above)
    let shipName = selectedShipNameWithIndex.slice(0, -2);

    // getting the last index in our ship array
    let lastShipIndex = parseInt(shipNameWithLastId.substr(-1));

    // getting the last square number our ship will be in on the grid
    let shipLastIdInGrid = lastShipIndex + parseInt(this.dataset.id);
    console.log(shipLastIdInGrid);

    // making sure our ships don't wrap around the grid-setting some squares in our grid that aren't allowed
    const notAllowedHorizontal = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 1, 11, 21, 31, 41, 51, 61, 71, 81, 91, 2, 22, 32, 42, 52, 62, 72, 82, 92, 3, 13, 23, 33, 43, 53, 63, 73, 83, 93];
    const notAllowedVertical = [99, 98, 97, 96, 95, 94, 93, 92, 91, 90, 89, 88, 87, 86, 85, 84, 83, 82, 81, 80, 79, 78, 77, 76, 75, 74, 73, 72, 71, 70, 69, 68, 67, 66, 65, 64, 63, 62, 61, 60];
    // using the ship length to account for the different "not allowed" spaces in the grid
    let newNotAllowedHorizontal = notAllowedHorizontal.splice(0, 10 * lastShipIndex);
    let newNotAllowedVertical = notAllowedVertical.splice(0, 10 * lastShipIndex);

    // get the selected index of ship we're dragging
    selectedShipIndex = parseInt(selectedShipNameWithIndex.substr(-1));

    // capturing where the ship lands in our grid by the last index of ship's grid square number
    shipLastIdInGrid = shipLastIdInGrid - selectedShipIndex;
    console.log(shipLastIdInGrid);
    // if our ship direction is horizontal, we want to increment by 1
    if (isHorizontal && !newNotAllowedHorizontal.includes(shipLastIdInGrid)) {
        console.log(parseInt(this.dataset.id));
        for (let i = 0; i < draggedShipLength; i++) {
            userSquares[parseInt(this.dataset.id) - selectedShipIndex + i].classList.add("taken", shipName);

        }
    }
    else if (!isHorizontal && !newNotAllowedVertical.includes(shipLastIdInGrid)) {
        console.log(parseInt(this.dataset.id));
        console.log(width);
        for (let i = 0; i < draggedShipLength; i++) {
            userSquares[parseInt(this.dataset.id) - selectedShipIndex + width * i].classList.add("taken", shipName);

        }
    }
    else return

    // removing our ship from our choice grid after moving it to our game grid
    displayGrid.removeChild(draggedShip);
    console.log(draggedShip);

};

// function for dragstart
function dragEnd() {
    console.log("dragend")
};

// Game Logic
// seeing who will go first: 
let x = (Math.floor(Math.random() * 2) == 0);

if (x == 1) {
    currentPlayer = "user";
} else {
    currentPlayer = "enemyComputer";
};



//Game Logic below
// function to call to play game for each turn
function playGame() {
    console.log(currentPlayer);
    if (isGameOver) return;
    if (currentPlayer === "user") {
        turnDisplay.innerHTML = "Your Turn!";
        computerSquares.forEach(square => square.addEventListener("click", function (e) {
            revealSquare(square);
        }));
    }
    if (currentPlayer === "enemyComputer") {
        turnDisplay.innerHTML = "Enemy's Turn!";
        setTimeout(computerTurn, 1000);
    };
};

// function to reveal the square the user chooses
function revealSquare(square) {
    if (!square.classList.contains("boom") && !square.classList.contains("miss") && currentPlayer === "user") {
        // checking to see if our chosen square is a particular ship
        if (square.classList.contains("destroyer")) {
            destroyerCount++;
        };
        if (square.classList.contains("submarine")) {
            submarineCount++;
        };
        if (square.classList.contains("cruiser")) {
            cruiserCount++;
        };
        if (square.classList.contains("battleship")) {
            battleshipCount++;
        };
        if (square.classList.contains("carrier")) {
            carrierCount++;
        };



        // checking if our chosen square is ANY ship
        if (square.classList.contains("taken")) {
            square.classList.add("boom");
        } else {
            square.classList.add("miss");
        };
        currentPlayer = "enemyComputer";
        turnDisplay.innerHTML = "Enemy's Turn!";
        playGame();
    }

};

function computerTurn() {
    let compRandomChoice = Math.floor(Math.random() * userSquares.length);
    if (!userSquares[compRandomChoice].classList.contains("boom") && !userSquares[compRandomChoice].classList.contains("miss")) {

        // checking to see if computer chosen square is a particular ship
        if (userSquares[compRandomChoice].classList.contains("destroyer")) {
            compDestroyerCount++;
        };
        if (userSquares[compRandomChoice].classList.contains("submarine")) {
            compSubmarineCount++;
        };
        if (userSquares[compRandomChoice].classList.contains("cruiser")) {
            compCruiserCount++;
        };
        if (userSquares[compRandomChoice].classList.contains("battleship")) {
            compBattleshipCount++;
        };
        if (userSquares[compRandomChoice].classList.contains("carrier")) {
            compCarrierCount++;
        }

        // checking if computer chosen square is ANY ship
        if (userSquares[compRandomChoice].classList.contains("taken")) {
            userSquares[compRandomChoice].classList.add("boom");
        } else {
            userSquares[compRandomChoice].classList.add("miss");
        };
    } else computerTurn();
    currentPlayer = "user";
    turnDisplay.innerHTML = "Your Turn!";
};

// start the game!
startButton.addEventListener("click", playGame);

