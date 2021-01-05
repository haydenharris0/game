//jquery to set variables
let $redClick = $(".redPiece");
let $blackClick = $(".blackPiece");

let turn = 1;
blackScore = 12;
redScore = 12;
let $scoreBoard = $("#score").html(`Black has ${blackScore} pieces left | Red has ${redScore} pieces left`);

const rules = function (){
    x === 1;
    x ++;
    return x;
}


const blackAlertClicked = function(){
    console.log(`black clicked turn = ${turn}`);
}

const redAlertClicked = function(){
    console.log(`red clicked turn = ${turn}`);
}

$redClick.click(redAlertClicked);
$blackClick.click(blackAlertClicked);