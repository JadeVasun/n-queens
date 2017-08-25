/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {

  var board = new Board({'n': n});
  board.get(0)[0] = 1;
  var size = board.get('n');
  var solution = [];

  for (var i = 0; i < size; i++) {
    for (var j = 0; j < size; j++) {
      board.get(i)[j] = 1;
      if (board.hasAnyRooksConflicts()) {
        board.get(i)[j] = 0;
      }
    }
  }

  for (var k = 0; k < size; k++) {
    solution.push(board.get(k));
  }
  


  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = factorial(n); //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

window.factorial = function(n) {
  if (n === 0) {
    return 1;
  }
  return n * factorial(n-1);
}

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  // 
  var board = new Board({n: n});
  var solution = [];

  var recurseQueens = function(row) {
    for (var col = 0; col < n; col++) {
      if (!solution.length) {
        board.togglePiece(row, col);
      }
      if (!board.hasAnyQueensConflicts() && !solution.length) {
        if (row === (n - 1)) {
          solution = board.rows();
        } else {
          recurseQueens(row + 1);
        }
      }
      if (!solution.length) {
        board.togglePiece(row, col);
      }
    }
  }
  recurseQueens(0);

  if (!solution.length) {
    solution = board.rows();
  }

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n: n});
  var recurseQueens = function(row) {
    for (var col = 0; col < n; col++) {
      board.togglePiece(row, col);
      if (!board.hasAnyQueensConflicts()) {
        if (row === (n - 1)) {
          solutionCount++;
        } else {
          recurseQueens(row + 1);
        }
      }
      board.togglePiece(row, col);
    }
  }
  
  if (!n) {
    solutionCount++;
  } else {
    recurseQueens(0);
  }

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
