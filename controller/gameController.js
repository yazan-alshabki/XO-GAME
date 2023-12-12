let ai = "X";
let human = "O";
function equals3(a, b, c) {
  return a == b && b == c && a != "";
}

function checkWinner(board) {
  let winner = null;
  // horizontal
  for (let i = 0; i < 3; i++) {
    if (equals3(board[i][0], board[i][1], board[i][2])) {
      winner = board[i][0];
    }
  }

  // Vertical
  for (let i = 0; i < 3; i++) {
    if (equals3(board[0][i], board[1][i], board[2][i])) {
      winner = board[0][i];
    }
  }

  // Diagonal
  if (equals3(board[0][0], board[1][1], board[2][2])) {
    winner = board[0][0];
  }
  if (equals3(board[2][0], board[1][1], board[0][2])) {
    winner = board[2][0];
  }

  let openSpots = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == "") {
        openSpots++;
      }
    }
  }

  if (winner == null && openSpots == 0) {
    return "tie";
  } else {
    return winner;
  }
}
let scores = {
  X: 10,
  O: -10,
  tie: 0,
};
function minimax(board, depth, isMaximizing) {
  let result = checkWinner(board);
  if (result !== null) {
    let score = scores[result];
    if (score > 0) {
      score -= depth;
      return score;
    } else if (score < 0) {
      score += depth;
      return score;
    } else {
      return score;
    }
  }
  if (isMaximizing) {
    let bestScore = -100000000;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Is the spot available ?
        if (board[i][j] == "") {
          board[i][j] = ai;
          let score = minimax(board, depth + 1, false);
          board[i][j] = "";
          bestScore = Math.max(bestScore, score);
        }
      }
    }
    return bestScore;
  } else {
    let bestScore = 100000000;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        // Is the spot available ?
        if (board[i][j] == "") {
          board[i][j] = human;
          let score = minimax(board, depth + 1, true);
          board[i][j] = "";
          bestScore = Math.min(bestScore, score);
        }
      }
    }
    return bestScore;
  }
}

function bestMove(board) {
  // Ai to make its turn
  let bestScore = -100000000;
  let bestMove = {
    i: -1,
    j: -1,
  };
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      // Is the spot available ?
      if (board[i][j] == "") {
        board[i][j] = ai;
        let score = minimax(board, 0, false);
        board[i][j] = "";
        if (score > bestScore) {
          bestScore = score;
          bestMove = { i, j };
        }
      }
    }
  }
  board[bestMove.i][bestMove.j] = ai;
  return board;
}

const game_post = async (req, res) => {
  ////////////////////////////////////////////////////////////////////////////
  let boardBefore = req.body.board;
  console.log(boardBefore);
  let board = [
    [, ,],
    [, ,],
    [, ,],
  ];
  let index1 = -1;
  for (let i = 0; i < boardBefore.length; i++) {
    if (i % 3 == 0) {
      index1++;
    }
    board[index1][i % 3] = boardBefore[i];
  }
  console.log(board);
  let newBoardBefore = bestMove(board);
  let newBoard = [];
  let index2 = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      newBoard[index2] = newBoardBefore[i][j];
      index2++;
    }
  }
  console.log(newBoardBefore);

  res.json({ newBoard: newBoard });
};
module.exports = {
  game_post,
};
