/* eslint-disable prefer-const */

// MAIN FUNCTION: runs everytime a seed is placed on board
// AJAX: sends coordinates and player no. everytime a seed is placed, checks for win
// DOM: renders the black and white seeds on board

const placeSeed = async (cell, i, j) => {
  const data = {
    player: playerTurn,
    coordinates: [i, j],
  };
  // toggles between black and white seeds
  // player 0 is black, player 1 is white
  if (playerTurn === 0) {
    cell.innerText = '⚫️';
    playerTurn = 1;
  } else if (
    playerTurn === 1
  ) {
    cell.innerText = '⚪️';
    playerTurn = 0;
  }

  // get coordinates of current position
  // note i: y-coord; j: x-cord -- this is to accomodate how go-package reads coords
  // const coordinates = [i, j];

  console.log('currentMove', data);
  try {
    // get current game id that was sent to /games/create for gameController.create

    // post coordinates to backend
    console.log('update function game id', currentGameId);
    const response = await axios.put(`/games/update/${currentGameId}`, data);
    // handle success updated game from gameController.update
    console.log(response.data.gameState);

    // if there is a winner, winnerPlayer key with value of player number will exist
    if (response.data.gameState.winnerPlayer) {
      console.log('player who won', response.data.gameState.winnerPlayer);
      winnerTag.classList.add('winner-tag');
      const boardDiv = document.querySelector('#board');
      boardDiv.append(gameOverOverlay);

      if (response.data.gameState.winnerPlayer === 'black') {
        player0Div.append(winnerTag);
      } else if (response.data.gameState.winnerPlayer === 'white') {
        player1Div.append(winnerTag);
      }
    }
  } catch (error) { console.log(error); }
};
