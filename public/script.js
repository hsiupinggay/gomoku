/* eslint-disable prefer-const */
// event listener call-back for each cell

// ==== DOM: Board Creation ====//
const createGame = async () => {
  const table = document.createElement('table');
  const boardContainer = document.querySelector('#board-container');
  boardContainer.append(table);
  table.id = 'board-table';
  const tableSize = 7;

  // j is the x axis, i is the y axis
  for (let i = 0; i < tableSize; i += 1) {
    const row = table.insertRow(i);
    row.class = 'rows';
    row.id = `row-${i}`;
    for (let j = 0; j < tableSize; j += 1) {
      const cell = row.insertCell();
      cell.classList.add('cells');
      cell.id = `cell-${j}-${i}`;
      cell.innerText = `${i}-${j}`;
      cell.addEventListener('click', () => placeSeed(cell, i, j));
    }
  }

  try {
  // post table size to backend
    const response = await axios.post('/games/create', { tableSize });
    // handle success

    const { id } = response.data;
    currentGameId = id;
    console.log('current game id', currentGameId);
  } catch (error) { console.log(error); }
};

// ==== DOM: Create Button (to be replaced by boardsize button) ==== //

const createButton = document.createElement('button');
const buttonDiv = document.querySelector('#button-container');
createButton.innerText = 'create';
buttonDiv.appendChild(createButton);
createButton.addEventListener('click', createGame);
