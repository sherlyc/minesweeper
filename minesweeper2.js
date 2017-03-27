document.addEventListener('DOMContentLoaded', startGame);

function initGlobalVariables() {
        board = {cells: []};
        cellsCount = 36;  //change number of cells here.
        sqRoot = Math.sqrt(cellsCount); //get the square root of cells Count  sqRoot of 9 cells will return 3
        mineCount = Math.floor(cellsCount * 0.15); //get the number of mine with the ratio of 0.15 per cell.
}

function setMine (mineCount, cellsCount) {
    var minePlanted = 0
    while (minePlanted < mineCount){

            var randomNum = Math.floor(Math.random() * cellsCount);
            if (board.cells[randomNum].isMine!=1){

                 board.cells[randomNum].isMine=1;
                 minePlanted++;
             }

    } //end of while loop


}

function createBoard () {
    //create a 9 cells board

    for (var i=0; i< sqRoot ; i++){

        for (var j=0; j< sqRoot; j++){

            board.cells.push({
                    row: i,
                    col: j,
                 isMine: 0,
                 hidden: 1,
               isMarked: 0,
            })
         //}
        }
    }
    setMine(mineCount,cellsCount);
    return board;

}


function startGame () {
  // Don't remove this function call: it makes the game work!
    initGlobalVariables();
    createBoard();
    lib.initBoard();
    for (i=0; i< cellsCount; i++){

        board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);

    }
    document.addEventListener('click', checkForWin);
    document.addEventListener('contextmenu', checkForWin);

}

function resetBoard (){ //my custom function to clear the board html on the screen.
    document.getElementsByClassName('board')[0].innerHTML="";
}

function resetGame () { //this function is triggered when user click on reset button
    resetBoard();
    startGame();
}

function checkForWin () {

  var youWin = true;
  var playBomb = false;

  for (var i=0; i< cellsCount; i++) {

        if (board.cells[i].isMine == 1) {

            if (board.cells[i].hidden != 1) {
                youWin = false;
                playBomb = true;
                break;
            }

            if (board.cells[i].isMarked != 1) {
                youWin = false;
            }

        } else {

                if (board.cells[i].hidden == 1) {
                    youWin = false;

                    }
                }
  }

  if (youWin) {
      lib.displayMessage('You win!');
      playAudio("victory");
  } else {
      if (playBomb) {
          lib.displayMessage('HAHA! KABOOM!');
          playAudio("boom");
      } else {
          playAudio("beep");
      }
  }

}

function countSurroundingMines (cell) { //count the number of mines around the cell
   var surrounding = lib.getSurroundingCells(cell.row, cell.col);
   var count = 0;
   for (var i=0; i< surrounding.length; i++){
     if (surrounding[i].isMine == 1) {
        count +=1;
     }
   }
   return count;

}


function playAudio (audioType) {
    if (audioType=="victory") {
        var audio = document.getElementsByTagName("audio")[0];
    }
    if (audioType=="boom") {
        var audio = document.getElementsByTagName("audio")[1];
    }
    if (audioType=="beep") {
        var audio = document.getElementsByTagName("audio")[2];
    }

    audio.play();
}
