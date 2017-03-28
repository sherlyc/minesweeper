document.addEventListener('DOMContentLoaded', startGame);
userCells=0;


function initGlobalVariables() {
        board = {cells: []};
        if (userCells!=0) { //check if user selected difficulty mode, if not use default value = 25;
            cellsCount = userCells;
        } else {
            cellsCount = 25;
        }

        sqRoot = Math.sqrt(cellsCount); //get the square root of cells Count  sqRoot of 9 cells will return 3
        mineCount = Math.floor(cellsCount * 0.15); //get the number of mine with the ratio of 0.15 per cell.
}


function setMine (mineCount, cellsCount) { //this function will plant bomb based on the mineCount returned from initGlobalVariables function.
    var minePlanted = 0
    while (minePlanted < mineCount){

            var randomNum = Math.floor(Math.random() * cellsCount);
            if (board.cells[randomNum].isMine!=1){

                 board.cells[randomNum].isMine=1;
                 minePlanted++;
             }

    } //end of while loop


}

function createBoard () { //create a dynamic board

    for (var i=0; i< sqRoot ; i++){

        for (var j=0; j< sqRoot; j++){

            board.cells.push({
                    row: i,
                    col: j,
                 isMine: 0,
                 hidden: 1,
               isMarked: 0,
            })

        }
    }
    setMine(mineCount,cellsCount); //call setMine function to plant bombs
    return board;

}


function startGame () {
  // Don't remove this function call: it makes the game work!
    initGlobalVariables();
    console.log(cellsCount);
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

function setCells (cellsNum) { //this function is called when user clicked on difficulty buttons
    userCells = cellsNum;
    resetGame();
}

function resetGame () { //this function is triggered when user click on reset button
    resetBoard();
    startGame();
}

function bombCount () { //display the total number of mines
    document.getElementById("panel").innerHTML = "Total mines: " +mineCount;
}

function checkForWin () {

  bombCount();
  var youWin = true;
  var playBomb = false;


  for (var i=0; i< cellsCount; i++) {

        if (board.cells[i].isMine == 1) { //if it is mine
            if (board.cells[i].hidden != 1) { //mine is not hidden, kaboom!
                youWin = false;
                playBomb = true;
                break;
            }

            if (board.cells[i].isMarked != 1) { //if mine is not marked, game is not done yet
                youWin = false;
            }

        } else {
            if (board.cells[i].hidden == 1) {//if there is hidden cell left on the board - set youWin to false
                        youWin = false;
                    }
                }
  }

  if (youWin) {
      lib.displayMessage('You win!'); //display winning message
      playAudio("victory"); //play the applause sound.
  } else {
      if (playBomb) {
          lib.displayMessage('HAHA! KABOOM!'); //display game over message.
          playAudio("boom"); //play the explosion sound
      } else {
          playAudio("beep"); //play the toggle sound.
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


function playAudio (audioType) {  //this function will play audio file
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
