/* eslint-disable prefer-const */
// Global Variable //

// used in createGame function in create.js
let isFirstGame = true;

// used in update.js
let playerTurn = 0; // black starts
let currentGameId; // for req.params on `/games/update/${currentGameId}`
