/* eslint-disable prefer-const */
//* * Backend */
const go = require('go-game');

let game; // variable for calling go-package in controller
let nextPlayer; // variable for gameState info in controller

// ** Winning Logic */

/**
     * determines whether a diagonal matrix of 5 '0's or '1's is present
     * @param {*} boardMatrix -1 means no seed, 0 means black seed, 1 means white seed
     * @param {*} player is either 0 or 1
     * @returns boolean
     */
const isDiagonalMatrix = (boardMatrix, player) => {
  for (let i = 0; i < boardMatrix.length; i += 1) {
    for (let j = 0; j < boardMatrix.length; j += 1) {
      if (
      // right to left diagonal
        (
          boardMatrix[i][j] === player
          && boardMatrix[i + 1][j - 1] === player
          && boardMatrix[i + 2][j - 2] === player
          && boardMatrix[i + 3][j - 3] === player
          && boardMatrix[i + 4][j - 4] === player
        )
          || (
            // left to right diagonal
            boardMatrix[i][j] === player
          && boardMatrix[i + 1][j + 1] === player
          && boardMatrix[i + 2][j + 2] === player
          && boardMatrix[i + 3][j + 3] === player
          && boardMatrix[i + 4][j + 4] === player)
      ) { return true; }
    }
  }

  return false;
};

const isWhiteDiagonal = isDiagonalMatrix(game.field, Number(1));
const isBlackDiagonal = isDiagonalMatrix(game.field, Number(0));
console.log('did white win?', isWhiteDiagonal);
console.log('did black win?', isBlackDiagonal);

//* * Controller */
const initGameController = (db) => {
  const index = (req, res) => {
    console.log('inside of controller.index');
    // console.log(game);

    res.render('index');
  };

  const create = async (req, res) => {
    console.log(req.body);
    const { tableSize } = req.body;
    console.log('table size', tableSize);
    // create backend game play with go-package
    game = new go(Number(tableSize));
    // create new game entry in db
    const newGame = await db.Game.create({
      gameState: {
        status: 'active',
        moves: null,
        nextPlayer: 0,
      },
    });
    // handle success

    console.log('new game id', newGame.id);
    res.send({ id: newGame.id });
  };

  const update = async (req, res) => {
    console.log('request body!!');
    console.log(req.body);
    // get coordinates and player turn from frontend
    const { coordinates, player } = req.body;

    // get game id via req.params
    console.log('request params!!');
    console.log(req.params);
    const { id } = req.params;

    // run function from go-package that executes the current move

    if (player === 0) {
      game.playerTurn(go.BLACK, coordinates);
      nextPlayer = 1;
    } else if (player === 1) {
      game.playerTurn(go.WHITE, coordinates);
      nextPlayer = 0;
    }
    console.log('really cool board!!');
    console.log(game.field);

    // // find game to update in db
    const currentGame = await db.Game.findByPk(id);
    console.log('current game', currentGame);

    // update current game in db
    const updatedGame = await currentGame.update({
      gameState: {
        status: 'active',
        moves: game.moves,
        nextPlayer,
      },
    });

    res.status(200).send(updatedGame);
    console.log(game.printField());
  };
  return {
    index, create, update,
  };
};

module.exports = initGameController;
