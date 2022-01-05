/* eslint-disable prefer-const */
// event listener call-back for each cell
// Global Variable //
let isFirstGame = true;

// making the clickable board, that will be layered above the visible grid
// j is the x axis, i is the y axis
const makeClickableBoard = (tableSize, clickBoard) => {
  for (let i = 0; i < tableSize; i += 1) {
    const row = clickBoard.insertRow(i);
    row.classList.add('rows');
    for (let j = 0; j < tableSize; j += 1) {
      const cell = row.insertCell();
      cell.classList.add('cells');
      cell.id = `cell-${j}-${i}`;
      if (i % 3 === 0 && j % 3 === 0 && i !== 18 && j !== 18 && j !== 0 && i !== 0) {
        const star = document.createElement('p');
        star.classList.add('star');
        star.innerText = '●';
        cell.appendChild(star);
      }

      // each cell can only be clicked once
      { cell.addEventListener('click', () => placeSeed(cell, i, j), { once: true }); }
    }
  }
};

// making the visible grid, clickable board will be layered above
const makeVisibleGrid = (tableSize, grid) => {
  for (let i = 0; i < tableSize - 1; i += 1) {
    const row = grid.insertRow(i);
    for (let j = 0; j < tableSize - 1; j += 1) {
      const cell = row.insertCell();
      cell.classList.add('grid-cells');
    }
  }
};
// ==== DOM: Create Button ==== //
const buttonDiv = document.querySelector('#button-container');
const createButton = document.createElement('button');
createButton.classList.add('game-button');
createButton.innerText = 'PLAY';

// === DOM: Replay Button === //
const replayButton = document.createElement('button');
replayButton.classList.add('game-button');
replayButton.innerText = 'REPLAY';

// === DOM: Player 0 Div === //
const blackSeedTag = document.createElement('p');
blackSeedTag.classList.add('seed-tag');
player0Div.append(blackSeedTag);

// === DOM: Player 1 Div === //
const player1Div = document.querySelector('#player1-div');
const whiteSeedTag = document.createElement('p');
whiteSeedTag.classList.add('seed-tag');
const player1Name = document.createElement('h1');
player1Div.append(player1Name, whiteSeedTag);

// ==== DOM: Board Creation ====//
const createGame = async () => {
  // JWT auth

  const token = localStorage.getItem('authToken');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  if (!token) {
    return alert('Please log in again');
  }
  // set board size
  const tableSize = 19;
  // Front End Board Elements

  const boardContainer = document.querySelector('#board-container');
  const boardDiv = document.querySelector('#board');

  // const boardDiv = document.createElement('div');
  // boardDiv.id = '#board';
  // boardDiv.classList.add('board');
  // boardContainer.append(boardDiv);

  const clickBoard = document.createElement('table');
  boardDiv.append(clickBoard);
  clickBoard.classList.add('click-board');
  const grid = document.createElement('table');
  grid.classList.add('grid');
  boardDiv.append(grid);

  makeClickableBoard(tableSize, clickBoard);
  makeVisibleGrid(tableSize, grid);

  // only removes create button and append replay button if it's the first game
  if (isFirstGame === true) {
    createButton.remove();
    buttonDiv.append(replayButton);
    isFirstGame = false;
  }

  // Communicating with backend
  try {
  // post table size and config to backend
    const response = await axios.post('/games/create', { tableSize }, config);

    // handle success
    const { id, player0, player1 } = response.data;
    console.log('player 0', player0);
    console.log('player 1', player1);

    // formats player0Div
    player0Div.classList.add('player0-ingame');
    // tag logged in player as black
    greeting.remove();
    blackSeedTag.innerText = 'plays black';

    // tag second player as white
    whiteSeedTag.innerText = 'plays white';
    player1Name.innerText = player1.name;
    currentGameId = id;

    console.log('func create: current game id', currentGameId);
  } catch (error) {
    alert(`got an error status of ${err.response.status}`);
    console.log(error);
  }
};
// create button created and appended in user.js

createButton.addEventListener('click', createGame);

// replay function, resets board and calls createGame
const replay = () => {
  const boardDiv = document.querySelector('#board');
  while (boardDiv.firstChild) {
    boardDiv.removeChild(boardDiv.firstChild);
  }
  winnerTag.remove();
  createGame();
};

replayButton.addEventListener('click', replay);
