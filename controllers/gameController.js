/* eslint-disable prefer-const */
//* * Backend */
const go = require('go-game');

let game; // variable for calling go-package in controller
let nextPlayer; // variable for gameState info in controller

// ** Winning Logic */

/**
     * loops through board coordinates to check if a diagonal matrix of 5 '0's or '1's is present
     * @param {*} boardMatrix -1 means no seed, 0 means black seed, 1 means white seed
     * @param {*} player is either 0 or 1
     * @returns boolean
     */
const checkDiagonalWin = (boardMatrix, player) => {
  for (let i = 0; i < boardMatrix.length; i += 1) {
    for (let j = 0; j < boardMatrix.length; j += 1) {
      if (
        // accounting for edge case where there's less than 4 rows below seed
        i <= boardMatrix.length - 5
      ) {
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
  }
  return false;
};

/**
 * loops through board coordinates to check if there are 5 in a row or column
 * @param {*} boardMatrix -1 means no seed, 0 means black seed, 1 means white seed
 * @param {*} player is either 0 or 1
 * @returns boolean
 */
const checkRowOrColumnWin = (boardMatrix, player) => {
  for (let i = 0; i < boardMatrix.length; i += 1) {
    for (let j = 0; j < boardMatrix.length; j += 1) {
      // accounting for edge case where there's less than 4 rows below seed
      if (i > boardMatrix.length - 5) {
        if (
        // check for horizontal win
          boardMatrix[i][j] === player
          && boardMatrix[i][j + 1] === player
          && boardMatrix[i][j + 2] === player
          && boardMatrix[i][j + 3] === player
          && boardMatrix[i][j + 4] === player
        ) {
          return true;
        }
      } else if (i <= boardMatrix.length - 5) {
        if (
        // horizontal win
          (
            boardMatrix[i][j] === player
          && boardMatrix[i][j + 1] === player
          && boardMatrix[i][j + 2] === player
          && boardMatrix[i][j + 3] === player
          && boardMatrix[i][j + 4] === player)
        // vertical win
        || (
          boardMatrix[i][j] === player
          && boardMatrix[i + 1][j] === player
          && boardMatrix[i + 2][j] === player
          && boardMatrix[i + 3][j] === player
          && boardMatrix[i + 4][j] === player
        )

        ) {
          return true;
        }
      }
    }
  }
  return false;
};

/**
 *
 * @param {*} boardMatrix
 * @param {*} player
 * @returns
 */
const checkWin = (boardMatrix, player) => {
  const isDiagonalWin = checkDiagonalWin(boardMatrix, player);
  const isRowOrColumnWin = checkRowOrColumnWin(boardMatrix, player);
  if (isDiagonalWin === true || isRowOrColumnWin === true) {
    return true;
  }
  return false;
};

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

    const currentPlayerId = req.cookies.userId;
    console.log('current player id', currentPlayerId);

    // // find or create new game entry in db
    // const [currentGame, created] = await db.Game.findOrCreate({
    //   where: {
    //     gameState: { status: 'active' },

    //   },
    //   defaults: {
    //     gameState: {
    //       status: 'active',
    //       moves: null,
    //       nextPlayer: 0,
    //     },
    //   },
    // });

    // create new game
    const currentGame = await db.Game.create({
      status: 'active',
      moves: null,
      nextPlayer: 0,
    });
    // handle success
    // if (created) {

    let player1Id; // player numbers are 0-indexed
    // const allUsersExceptCurrentUser = await db.User.findAll({
    //   where: {
    //     id: {
    //       [Op.not]: req.cookies.userId,
    //     },
    //   },
    // });

    // console.log('all users except current user', allUsersExceptCurrentUser);

    if (Number(currentPlayerId) === 4) {
      player1Id = 6;
    } else if (Number(currentPlayerId) === 4) {
      player1Id = 6;
    }
    console.log('player 1 id', player1Id);

    const player0 = await db.User.findOne({
      where: {
        id: currentPlayerId,
      },
    });
    console.log('player 0', player0);

    const player1 = await db.User.findOne({
      where: {
        id: player1Id,
      },
    });

    const joinTableEntry0 = await currentGame.addUser(player0);
    console.log('player0 game users table', joinTableEntry0);

    const joinTableEntry1 = await currentGame.addUser(player1);
    console.log('player1 game users table', joinTableEntry1);
    console.log('player 1', player1);
    console.log('new game id', currentGame.id);
    return res.send({ id: currentGame.id, player0, player1 });
    // }
    // const currentPlayer = await db.User.findByPk(currentPlayerId);
    // const allCurrentPlayerGames = currentPlayer.getGames();
    // const activeGame = allCurrentPlayerGames.findOne
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

    // find game to update in db
    const currentGame = await db.Game.findByPk(id);
    console.log('current game', currentGame);

    // determine win
    const didBlackWin = checkWin(game.field, 0);
    const didWhiteWin = checkWin(game.field, 1);

    console.log('did white win?', didWhiteWin);
    console.log('did black win?', didBlackWin);
    let updatedGame;

    if (didWhiteWin === false && didBlackWin === false) {
      // update current game in db
      updatedGame = await currentGame.update({
        gameState: {
          status: 'active',
          moves: game.moves,
          nextPlayer,
        },
      });
    } else if (
      didWhiteWin === true
    ) {
      updatedGame = await currentGame.update({
        gameState: {
          status: 'completed',
          moves: game.moves,
          winnerPlayer: 'white',
        },
      });
    } else if (
      didBlackWin === true
    ) {
      updatedGame = await currentGame.update({
        gameState: {
          status: 'completed',
          moves: game.moves,
          winnerPlayer: 'black',
        },
      });
    }

    res.status(200).send(updatedGame);
  };
  return {
    index, create, update,
  };
};

module.exports = initGameController;
