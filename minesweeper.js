document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = {
  cells: []
}

var boardSize = 25; //Sets the size of the board, must be square of a number
makeCells(board.cells,boardSize);


function startGame () {
  // Don't remove this function call: it makes the game work!
  document.addEventListener('click',checkForWin);
  document.addEventListener('contextmenu',checkForWin);
  // document.getElementById('reset-button').addEventListener('click',reset);

  /**Go through each cell and see how many surrounding mines it has**/
  for (var i = 0; i < board.cells.length; i++){
    board.cells[i]["surroundingMines"] = countSurroundingMines(board.cells[i]);
  }
  lib.initBoard()

}

/** A function that returns false 70% of the time
* Can use to generate mines
*Can change the first conditional statement to change probability of mines **/
function mineGenerator(){
  var point = Math.random();
  if(point < 0.8){
    return false;
  }
  else {
    return true;
  }
}

/* A function that when called sees if the game is won, if it is it displays a winning message **/
function checkForWin () {
  var isGameWon = false;
  for (var i = 0; i < board.cells.length; i++){
    if (board.cells[i].isMine && !board.cells[i].isMarked){ //if the cell is a mine and not marked, return out of the function
      return;
    }
    else if (!board.cells[i].isMine && board.cells[i].hidden){ // if cell is not a mine, then if it is not marked then return
      return;
    }
  }
  lib.displayMessage("You Win!")


  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  // lib.displayMessage('You win!')
};


// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`:
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines (cell) {
  var surrounding = lib.getSurroundingCells(cell.row,cell.col); // get the surrounding cells of 'cell' in an array
  var count = 0; // variable to count how many of the surrounding cells have mines
  for (var i = 0; i < surrounding.length; i++){ //Loop through the array containing all the surrounding mines
    if(surrounding[i].isMine){ // If they have a mine
      count ++; // increment the count
    }
  }
  return count;
}

/** Function that fills a given array with cells that have row,col,isMine etc...  **/
function makeCells(arr,boardSize){
  for (var i=0; i < Math.sqrt(boardSize); i++){ // Go through each row
    for (var j = 0; j < Math.sqrt(boardSize); j++){ // Go through each column
      arr.push( {
        row: i,
        col: j,
        isMine: false,
        isMarked: false,
        hidden: true
      } )
    }
  }
  /** This loop goes through and assigns whether each cell is a mine or not using mineGenerator() **/
  for (var i=0; i < board.cells.length; i++){
    board.cells[i].isMine = mineGenerator();
  }
}

function reset(){
  console.log("Game is resetting...")
  board.cells = [];
  makeCells(board.cells,boardSize);
  for (var i = 0; i < board.cells.length; i++){
    board.cells[i]["surroundingMines"] = countSurroundingMines(board.cells[i]);
  }
  lib.initBoard()
}

function cellsToString(){
  for (var i = 0; i < board.cells.length; i++){
    console.log("Array Index "+i);
    console.log("Row: "+board.cells[i].row)
    console.log("Column: "+board.cells[i].col)
    console.log("Mine: "+board.cells[i].isMine)
  }
}
