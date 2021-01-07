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


//option 2 of trying to handle the click
let currentSelection = [
    $("#black1"), $("#black2"), $("#black3"), $("#black4"),
    $("#black5"), $("#black6"), $("#black7"), $("#black8"),
    $("#black9"), $("#black10"), $("#black11"), $("#black12"),
];

//setting varialbes
let $blackClick = $(".blackPiece");
let $redClick = $(".redPiece");
let turn = 0;
let blackScore = 12;
let redScore = 12;
let $scoreBoard = $("#score").html(`Black has ${blackScore} pieces left | Red has ${redScore} pieces left`);

//update scoreboard function ---works but does it instantly.. need to find a good place to put it
const updateScoreBoard = function(){
    $scoreBoard = $("#score").html(`Black has ${blackScore} pieces left | Red has ${redScore} pieces left`);
}

//function handles click for black ---option 2. switch back to one if i can't get it working
const blackClick = function(){
    for (let i = 0; i < currentSelection.length; i++){
        currentSelection[i].click(blackAlertClicked);

        //currentSelection[i].css({'border': 'solid yellow'});
    }
}

//function handles click for red
const redClick = function(){
    $redClick.click(redAlertClicked);
}

//log to check its working ---delete when done
const blackAlertClicked = function(){
    console.log(`black clicked turn = ${turn}`);
    console.log(currentSelection);
}

//log to check its working --delete when done
const redAlertClicked = function(){
    console.log(`red clicked turn = ${turn}`);
    $redClick.css({'border': 'solid yellow'});
}

//function that switches players turn -----Doesn't work
const whosTurn = function(){
    if(turn === 0) {
        blackClick();
        turn = 1;
    }
    else {
        console.log("red turn");
        redClick();
        turn = 0;
    }
    
}

//blackClick();
//redClick();
//console.log(currentSelection);

makePiecesClickable();