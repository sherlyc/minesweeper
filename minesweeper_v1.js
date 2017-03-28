document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
 var board = {
   cells: [
           {row:0, col:0, isMine:0, hidden:1},
           {row:0, col:1, isMine:1, hidden:1},
           {row:0, col:2, isMine:0, hidden:1},
           {row:1, col:0, isMine:0, hidden:1},
           {row:1, col:1, isMine:1, hidden:1},
           {row:1, col:2, isMine:0, hidden:1},
           {row:2, col:0, isMine:0, hidden:1},
           {row:2, col:1, isMine:0, hidden:1},
           {row:2, col:2, isMine:0, hidden:1}

          ]


 };


var cellsCount = board.cells.length;





function startGame () {
  // Don't remove this function call: it makes the game work!
  lib.initBoard();
  for (var i=0; i< cellsCount; i++){
      board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);
  }
  document.addEventListener('click', checkForWin);
  document.addEventListener('contextmenu', checkForWin);
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {

  for (i=0; i< cellsCount; i++) {

    var youWin = true;


    if (board.cells[i].isMine == 1) {

      if (board.cells[i].isMarked == 0) {
          youWin = false;
          break;
      }

    } else {

      if (board.cells[i].hidden == 1) {
        youWin = false;
        break;

      }
    }
  }

  if (youWin) {
      lib.displayMessage('You win!')
  }

  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  //   lib.displayMessage('You win!')
}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`:
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines (cell) {
   var surrounding = lib.getSurroundingCells(cell.row, cell.col);
   var count = 0;
   for (var i=0; i< surrounding.length; i++){
     if (surrounding[i].isMine == 1) {
        count +=1;
     }
   }
   return count;

}
