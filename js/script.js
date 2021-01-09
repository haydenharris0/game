//setting varialbes

let currentPiece = {
    pieceLocation: 0, boardLocation: 0, plusSeven: false,
    plusNine: false, plusSevenJump: false, plusNineJump: false,
    minusSeven: false, minusNine: false, minusSevenJump: false,
    minusNineJump: false, king: false
}

let turn = 0;
let blackScore = 12;
let redScore = 12;
let playerRemainingPieces;

//DOM variables
const $squares = document.querySelectorAll("td");
let $blackPiece = document.querySelectorAll("span");
let $redPiece = document.querySelectorAll("p");
const $blacksTurn = document.querySelector("#blacksTurn");
const $redsTurn = document.querySelector("#redsTurn");
let $scoreBoard = $("#score").html(`Black has ${blackScore} pieces left | Red has ${redScore} pieces left`);


//null are the parts where no pieces can go
const boardStructure = [
    null, 1, null, 2, null, 3, null, 4,
    5, null, 6, null, 7, null, 8, null,
    null, 9, null, 10, null, 11, null, 12,
    null, null, null, null, null, null, null, null,
    null, null, null, null, null, null, null, null,
    13, null, 14, null, 15, null, 16, null,
    null, 17, null, 18, null, 19, null, 20,
    21, null, 22, null, 23, null, 24, null
];

// gives the pieces event listeners
const makePiecesClickable = function() {
    if (turn === 0) {
        for (let i = 0; i < $blackPiece.length; i++) {
            $blackPiece[i].addEventListener("click", remainingPieces);
        }
    }
    else {
        for (let i = 0; i < $redPiece.length; i++) {
            $redPiece[i].addEventListener("click", remainingPieces);
        }
    }
}

// highlights the piece you click on. only if it can make a move
const highlightClick = function() {
    if (currentPiece.plusSeven === true || currentPiece.plusNine === true || currentPiece.plusSevenJump === true || 
        currentPiece.plusNineJump === true || currentPiece.minusSeven === true || currentPiece.minusNine === true ||
        currentPiece.minusSevenJump === true || currentPiece.minusNineJump === true) {
            if (turn === 0) document.getElementById(currentPiece.pieceLocation).style.border = "4px solid goldenRod"
            else document.getElementById(currentPiece.pieceLocation).style.border = "4px solid darkOliveGreen"

        makeSquaresClickable();
    }
    else {
        return;
    }
}

//holds the length of remaining pieces
const remainingPieces = function() {
    if (turn === 0) {
        playerRemainingPieces = $blackPiece;
    } 
    else {
        playerRemainingPieces = $redPiece;
    }

    cancelClick();
    resetHighlightClick();
}

// resets piece's possible moves and location so they don't stack from new clicks
const resetCurrentPiece = function() {
    currentPiece.pieceLocation = 0; currentPiece.boardLocation = 0; currentPiece.plusSeven = false;
    currentPiece.plusNine = false; currentPiece.plusSevenJump = false; currentPiece.plusNineJump = false;
    currentPiece.minusSeven = false; currentPiece.minusNine = false; currentPiece.minusSevenJump = false;
    currentPiece.minusNineJump = false; currentPiece.king = false;
}

// resets the highlighted peice back to noraml
const resetHighlightClick = function() {
    for (let i = 0; i < playerRemainingPieces.length; i++) {
        playerRemainingPieces[i].style.border = "1px solid white";
    }

    resetCurrentPiece();
    locationOfCurrentPiece();
}

// removes attribute so you can click on a new piece
const cancelClick = function() {
    for (let i = 0; i < $squares.length; i++) {
        $squares[i].removeAttribute("onclick");
    }
}

// turns the Id into a string to help get location of the piece on the board
let findPiece = function (pieceId) {
    let parsed = parseInt(pieceId);
    return boardStructure.indexOf(parsed);
};

//get the location of the piece on the board
const locationOfCurrentPiece = function() {
    currentPiece.pieceLocation = parseInt(event.target.id);
    currentPiece.boardLocation = findPiece(currentPiece.pieceLocation);

    makeKing();
}

//  makes the nearby square clickable if its a valid move
const makeSquaresClickable = function() {
    if (currentPiece.plusSeven) $squares[currentPiece.boardLocation + 7].setAttribute("onclick", "movePiece(7)");
    
    if (currentPiece.minusSeven) $squares[currentPiece.boardLocation - 7].setAttribute("onclick", "movePiece(-7)");

    if (currentPiece.plusNine) $squares[currentPiece.boardLocation + 9].setAttribute("onclick", "movePiece(9)");
    
    if (currentPiece.minusNine) $squares[currentPiece.boardLocation - 9].setAttribute("onclick", "movePiece(-9)");
    
    if (currentPiece.plusSevenJump) $squares[currentPiece.boardLocation + 14].setAttribute("onclick", "movePiece(14)");
    
    if (currentPiece.minusSevenJump) $squares[currentPiece.boardLocation - 14].setAttribute("onclick", "movePiece(-14)");
    
    if (currentPiece.plusNineJump)  $squares[currentPiece.boardLocation + 18].setAttribute("onclick", "movePiece(18)");

    if (currentPiece.minusNineJump) $squares[currentPiece.boardLocation - 18].setAttribute("onclick", "movePiece(-18)"); 
}

// checks empty spaces nearby, if a piece can move there
const legalMoves = function() {
    if (boardStructure[currentPiece.boardLocation + 7] === null &&
        $squares[currentPiece.boardLocation + 7].classList.contains("empty") === false) {
            currentPiece.plusSeven = true;
    }
    if (boardStructure[currentPiece.boardLocation - 7] === null &&
        $squares[currentPiece.boardLocation - 7].classList.contains("empty") === false) {
            currentPiece.minusSeven = true;
    }
    if (boardStructure[currentPiece.boardLocation + 9] === null &&
        $squares[currentPiece.boardLocation + 9].classList.contains("empty") === false) {
            currentPiece.plusNine = true;
    }
    if (boardStructure[currentPiece.boardLocation - 9] === null &&
        $squares[currentPiece.boardLocation - 9].classList.contains("empty") === false) {
            currentPiece.minusNine = true;
    }

    legalJumpMoves();
}

// checks empty spaces nearby, for a jump move
const legalJumpMoves = function() {
    if (turn === 0) {
        if (boardStructure[currentPiece.boardLocation + 14] === null &&
            boardStructure[currentPiece.boardLocation + 7] >= 12 &&
            $squares[currentPiece.boardLocation + 14].classList.contains("empty") === false) {
                currentPiece.plusSevenJump = true;
        }
        if (boardStructure[currentPiece.boardLocation - 14] === null &&
            boardStructure[currentPiece.boardLocation - 7] >= 12 &&
            $squares[currentPiece.boardLocation - 14].classList.contains("empty") === false) {
                currentPiece.minusSevenJump = true;
        }
        if (boardStructure[currentPiece.boardLocation + 18] === null &&
            boardStructure[currentPiece.boardLocation + 9] >= 12 &&
            $squares[currentPiece.boardLocation + 18].classList.contains("empty") === false) {
                currentPiece.plusNineJump = true;
        }
        if (boardStructure[currentPiece.boardLocation - 18] === null &&
            boardStructure[currentPiece.boardLocation - 9] >= 12 &&
            $squares[currentPiece.boardLocation - 18].classList.contains("empty") === false) {
                currentPiece.minusNineJump = true;
        }
    } 
    else {
        if (boardStructure[currentPiece.boardLocation + 14] === null &&
            boardStructure[currentPiece.boardLocation + 7] < 12 && boardStructure[currentPiece.boardLocation + 7] !== null &&
            $squares[currentPiece.boardLocation + 14].classList.contains("empty") === false) {
                currentPiece.plusSevenJump = true;
        }
        if (boardStructure[currentPiece.boardLocation - 14] === null &&
            boardStructure[currentPiece.boardLocation - 7] < 12 && boardStructure[currentPiece.boardLocation - 7] !== null &&
            $squares[currentPiece.boardLocation - 14].classList.contains("empty") === false) {
                currentPiece.minusSevenJump = true;
        }
        if (boardStructure[currentPiece.boardLocation + 18] === null &&
            boardStructure[currentPiece.boardLocation + 9] < 12 && boardStructure[currentPiece.boardLocation + 9] !== null &&
            $squares[currentPiece.boardLocation + 18].classList.contains("empty") === false) {
                currentPiece.plusNineJump = true;
        }
        if (boardStructure[currentPiece.boardLocation - 18] === null &&
            boardStructure[currentPiece.boardLocation - 9] < 12 && boardStructure[currentPiece.boardLocation - 9] !== null &&
            $squares[currentPiece.boardLocation - 18].classList.contains("empty") === false) {
                currentPiece.minusNineJump = true;
        }
    }

    kingRules();
}

// checks if peice is king. turns king value to true
const makeKing = function() {
    if (document.getElementById(currentPiece.pieceLocation).classList.contains("king")) {
        currentPiece.king = true;
    }
     else {
        currentPiece.king = false;
    }

    legalMoves();
}

//gives king full movement. restricts movement to one direction for other pieces
const kingRules = function() {
    if (currentPiece.king === false) {
        if (turn === 0) {
            currentPiece.minusSeven = false; currentPiece.minusNine = false;
            currentPiece.minusSevenJump = false; currentPiece.minusNineJump = false;
        } 
        else {
            currentPiece.plusSeven = false; currentPiece.plusNine = false;
            currentPiece.plusSevenJump = false; currentPiece.plusNineJump = false;
        }

        highlightClick();
    }
    else {
        highlightClick();
    }
}

// removes the piece from the current square and moves it to the sqaure that was picked. changes html
const movePiece = function(number) {
    document.getElementById(currentPiece.pieceLocation).remove();
    $squares[currentPiece.boardLocation].innerHTML = "";

    if (turn === 0) {
        if (currentPiece.king) {
            $redPiece = document.querySelectorAll("p");
            $squares[currentPiece.boardLocation + number].innerHTML = `<span class="blackPiece king" id="${currentPiece.pieceLocation}"></span>`;
        }
        else {
            $redPiece = document.querySelectorAll("p");
            $squares[currentPiece.boardLocation + number].innerHTML = `<span class="blackPiece" id="${currentPiece.pieceLocation}"></span>`;
        }
    } 
    else {
        if (currentPiece.king) {
            $blackPiece = document.querySelectorAll("span");
            $squares[currentPiece.boardLocation + number].innerHTML = `<p class="redPiece king" id="${currentPiece.pieceLocation}"></p>`;
        } 
        else {
            $blackPiece = document.querySelectorAll("span");
            $squares[currentPiece.boardLocation + number].innerHTML = `<p class="redPiece" id="${currentPiece.pieceLocation}"></p>`;
        }
    }

    let pieceLocation = currentPiece.boardLocation;

    if (number === 14 || number === -14 || number === 18 || number === -18) boardStructureChanges(pieceLocation, pieceLocation + number, pieceLocation + number / 2);
    
    else boardStructureChanges(pieceLocation, pieceLocation + number);

    removeEventListeners();
}

// changes the boardstructure declared at the very beginning
const boardStructureChanges = function(indexOfBoardPiece, modifiedIndex, removePiece) {
    if (turn === 0 && currentPiece.pieceLocation < 12 && modifiedIndex >= 56) document.getElementById(currentPiece.pieceLocation).classList.add("king")
    
    if (turn === 1 && currentPiece.pieceLocation >= 12 && modifiedIndex <= 7) document.getElementById(currentPiece.pieceLocation).classList.add("king");
    
    if (removePiece) {
        boardStructure[removePiece] = null;

        if (turn === 0 && currentPiece.pieceLocation < 12) {
            $squares[removePiece].innerHTML = "";
            redScore--
        }
        if (turn === 1 && currentPiece.pieceLocation >= 12) {
            $squares[removePiece].innerHTML = "";
            blackScore--
        }
    }

    boardStructure[indexOfBoardPiece] = null;
    boardStructure[modifiedIndex] = parseInt(currentPiece.pieceLocation);


    resetCurrentPiece();
    cancelClick();
}

// Switches players turn
const switchTurn = function() {
    if (turn === 0) {
        $blacksTurn.style.color = "white";
        $redsTurn.style.color = "red";
        turn = 1;
    } 
    else {
        $blacksTurn.style.color = "black";
        $redsTurn.style.color = "white";
        turn = 0;
    }

    makePiecesClickable();
}

const removeEventListeners = function() {
    if (turn === 0) {
        for (let i = 0; i < $blackPiece.length; i++) {
            $blackPiece[i].removeEventListener("click", remainingPieces);
        }
    } 
    else {
        for (let i = 0; i < $redPiece.length; i++) {
            $redPiece[i].removeEventListener("click", remainingPieces);
        }
    }
    winLogic();
}

//updates the scoreboard
const updateScoreBoard = function(){
    $scoreBoard = $("#score").html(`Black has ${blackScore} pieces left | Red has ${redScore} pieces left`);
}

// Checks for a win
const winLogic = function() {
    if (blackScore === 0) {
            alert("Red Wins");
            location.reload();
    }
    if (redScore === 0) {          
            alert("Black Wins");
            location.reload();
        
    }

    updateScoreBoard();
    switchTurn();
}


makePiecesClickable();