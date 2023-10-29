const readline = require("readline");

let winplayer1 = false,
  winplayer2 = false;

function createGrid(grid) {
  for (i = 0; i < 6; i++) {
    const g = [];
    for (j = 0; j < 7; j++) {
      g.push(0);
    }
    grid.push(g);
  }
}

function insertInColumns(grid, col, playerName, visited) {
  if (visited[col] >= 0) {
    const row = visited[col];
    grid[row][col] = playerName;
    visited[col]--;
    return row;
  }
}

function visiualizeGrid(grid) {
  console.log("\n");
  for (i = 0; i < 6; i++) {
    let s = "| ";
    for (j = 0; j < 7; j++) {
      s += grid[i][j] + " | ";
    }
    console.log(s);
  }
  console.log("\n");
}

function checkVertically(grid, row, col) {
  let delrow = [];
  for (i = 0; i < 6; i++) {
    delrow.push(grid[i][col]);
  }

  for (i = 0; i <= delrow.length - 4; i++) {
    if (
      delrow[i] == 1 &&
      delrow[i + 1] == 1 &&
      delrow[i + 2] == 1 &&
      delrow[i + 3] == 1
    ) {
      winplayer1 = true;
      break;
    } else if (
      delrow[i] == 2 &&
      delrow[i + 1] == 2 &&
      delrow[i + 2] == 2 &&
      delrow[i + 3] == 2
    ) {
      winplayer2 = true;
      break;
    }
  }
}

function checkHorizontally(grid, row, col) {
  let delcol = [];
  for (j = 0; j < 7; j++) {
    delcol.push(grid[row][j]);
  }

  for (i = 0; i <= delcol.length - 4; i++) {
    if (
      delcol[i] == 1 &&
      delcol[i + 1] == 1 &&
      delcol[i + 2] == 1 &&
      delcol[i + 3] == 1
    ) {
      winplayer1 = true;
      break;
    } else if (
      delcol[i] == 2 &&
      delcol[i + 1] == 2 &&
      delcol[i + 2] == 2 &&
      delcol[i + 3] == 2
    ) {
      winplayer2 = true;
      break;
    }
  }
}

function checkLeftDiagonals(grid) {
  for (i = 0; i < 6; i++) {
    for (j = 0; j < 7; j++) {
      if (
        i < 6 - 3 &&
        j < 7 - 3 &&
        grid[i][j] == 1 &&
        grid[i + 1][j + 1] == 1 &&
        grid[i + 2][j + 2] == 1 &&
        grid[i + 3][j + 3] == 1
      ) {
        winplayer1 = true;
        break;
      }

      if (
        i < 6 - 3 &&
        j < 7 - 3 &&
        grid[i][j] == 2 &&
        grid[i + 1][j + 1] == 2 &&
        grid[i + 2][j + 2] == 2 &&
        grid[i + 3][j + 3] == 2
      ) {
        winplayer2 = true;
        break;
      }
    }
    if (winplayer1 || winplayer2) {
      return;
    }
  }
}

function checkRightDiagonals(grid) {
  for (i = 0; i < 6; i++) {
    for (j = 0; j < 7; j++) {
      if (
        i < 6 - 3 &&
        j >= 3 &&
        grid[i][j] == 1 &&
        grid[i + 1][j - 1] == 1 &&
        grid[i + 2][j - 2] == 1 &&
        grid[i + 3][j - 3] == 1
      ) {
        winplayer1 = true;
        break;
      }

      if (
        i < 6 - 3 &&
        j >= 3 &&
        grid[i][j] == 2 &&
        grid[i + 1][j - 1] == 2 &&
        grid[i + 2][j - 2] == 2 &&
        grid[i + 3][j - 3] == 2
      ) {
        winplayer2 = true;
        break;
      }
    }
    if (winplayer1 || winplayer2) {
      return;
    }
  }
}

function checkForWinner(grid, row, col) {
  checkVertically(grid, row, col);

  if (winplayer1 || winplayer2) {
    return;
  }

  checkHorizontally(grid, row, col);

  if (winplayer1 || winplayer2) {
    return;
  }

  checkLeftDiagonals(grid);

  if (winplayer1 || winplayer2) {
    return;
  }

  checkRightDiagonals(grid);
}

let rl = readline.createInterface(process.stdin, process.stdout);
let ctr = 0;

function declareResult(grid, visited) {
  if (winplayer1 || winplayer2) {
    if (winplayer1) {
      console.log(`Player1 Wins!`);
    } else {
      console.log(`Player2 Wins!`);
    }
    rl.close();
  } else if (ctr == 42) {
    console.log("It is a Draw");
    rl.close();
  } else {
    interfaceCreation(grid, visited);
  }
}

function interfaceCreation(grid, visited) {
  ctr++;
  let playerName = ctr % 2 == 1 ? 1 : 2;

  rl.question(`Enter a column for Player${playerName}: `, (col) => {
    if (col >= 0 && col < 7 && visited[col] >= 0) {
      console.log(`Player${playerName} entered: ` + col);

      const row = insertInColumns(grid, col, playerName, visited);
      visiualizeGrid(grid);
      checkForWinner(grid, row, col);
      declareResult(grid, visited);
    } else {
      if (col >= 0 && col < 7) {
        console.log(
          `Player${playerName} this column is already filled. Please choose another column.` +
            "\n"
        );
      } else {
        console.log(
          `Player${playerName} this column is invalid. Please enter a column between 0 to 6.` +
            "\n"
        );
      }
      ctr--;
      interfaceCreation(grid, visited);
    }
  });
}

function main() {
  let grid = [];
  createGrid(grid);
  let visited = [5, 5, 5, 5, 5, 5, 5];
  visiualizeGrid(grid);
  interfaceCreation(grid, visited);
}
main();
