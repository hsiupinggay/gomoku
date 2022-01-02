/* eslint-disable prefer-const */
// event listener call-back for each cell

// ==== DOM: Board Creation ====//
const createGame = async () => {
  const boardContainer = document.querySelector('#board-container');

  const boardDiv = document.createElement('div');
  boardDiv.classList.add('board');
  boardContainer.append(boardDiv);

  const clickBoard = document.createElement('table');
  boardDiv.append(clickBoard);
  clickBoard.classList.add('click-board');
  const grid = document.createElement('table');
  grid.classList.add('grid');
  boardDiv.append(grid);
  // !! need to make table size dynamic
  const tableSize = 19;

  // j is the x axis, i is the y axis
  for (let i = 0; i < tableSize; i += 1) {
    const row = table.insertRow(i);
    row.classList.add('rows');
    for (let j = 0; j < tableSize; j += 1) {
      const cell = row.insertCell();
      cell.classList.add('cells');
      cell.id = `cell-${j}-${i}`;
      // each cell can only be clicked once
      cell.addEventListener('click', () => placeSeed(cell, i, j), { once: true });
    }
  }

  for (let i = 0; i < tableSize - 1; i += 1) {
    const row = grid.insertRow(i);
    for (let j = 0; j < tableSize - 1; j += 1) {
      const cell = row.insertCell();
      cell.classList.add('grid-cells');
    }
  }

  try {
  // post table size to backend
    const response = await axios.post('/games/create', { tableSize });
    // handle success

    const { id, player0, player1 } = response.data;
    console.log('player 0', player0);
    console.log('player 1', player1);
    const player1Div = document.createElement('div');
    player1Div.classList.add('player1-div col-md-2');
    player1Div.innerText = player1.name;
    const dashboardDiv = document.querySelector('#dashboard-div');
    dashboardDiv.append(player1Div);
    currentGameId = id;

    console.log('func create: current game id', currentGameId);
  } catch (error) { console.log(error); }
};
