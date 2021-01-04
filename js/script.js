//odds are the turn for black. red are even
let turn = 2;
game = 0;


//handles the click
if (turn  === 2){
    $(".blackPiece").click(function(){
        x.preventDefault();
        turn += 1;
        console.log(turn);
        return false;
});
}

else if(turn  === 3) {
    $(".redPiece").click(function(){
        turn += 1;
        return console.log(turn);
});
}
