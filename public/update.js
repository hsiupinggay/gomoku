/* eslint-disable prefer-const */
// ===== GLOBAL VARIABLE ===== //

let playerTurn = 0; // black starts
let currentGameId; // for req.params on `/games/update/${currentGameId}`

// update function
// i: y-coord; j: x-cord

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
  // const coordinates = [i, j];

  console.log('currentMove', data);
  try {
    // get current game id that was sent to /games/create for gameController.create

    // post coordinates to backend
    console.log('update function game id', currentGameId);
    const response = await axios.put(`/games/update/${currentGameId}`, data);
    // handle success
    console.log(response);
  } catch (error) { console.log(error); }
};
