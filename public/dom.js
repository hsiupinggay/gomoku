// =========================== //
// ========= PRE GAME ========= //

// === DOM: USER AUTH PRE-GAME === //

const userAuthDiv = document.querySelector('#user-auth-div');
userAuthDiv.classList.add();

// USER AUTH: sign up + login (input elements are reused)
const signUpDiv = document.querySelector('#signup-div');

const loginBtn = document.createElement('button');
loginBtn.classList.add('user-auth-button');
loginBtn.setAttribute('type', 'submit');
loginBtn.textContent = 'LOG IN';

const userInputDiv = document.querySelector('#user-input-div');

const nameDiv = document.createElement('div');
userInputDiv.appendChild(nameDiv);

const nameInput = document.createElement('input');
nameInput.classList.add('input-bar');
nameInput.placeholder = 'NAME';
nameInput.setAttribute('id', 'name');
nameDiv.appendChild(nameInput);

const emailDiv = document.createElement('div');
userInputDiv.appendChild(emailDiv);

const emailInput = document.createElement('input');
emailInput.classList.add('input-bar');
emailInput.placeholder = 'EMAIL';
emailInput.setAttribute('id', 'email');
emailDiv.appendChild(emailInput);

const passwordDiv = document.createElement('div');
userInputDiv.appendChild(passwordDiv);
const passwordInput = document.createElement('input');
passwordInput.classList.add('input-bar');
passwordInput.placeholder = 'PASSWORD';
passwordInput.setAttribute('id', 'password');
passwordInput.type = 'password';
passwordDiv.appendChild(passwordInput);

const signUpBtn = document.createElement('button');
signUpBtn.classList.add('user-auth-button');

signUpBtn.setAttribute('type', 'submit');
signUpBtn.textContent = 'SIGN UP';
userInputDiv.appendChild(signUpBtn);

const loginTab = document.querySelector('#login-tab');
const signupTab = document.querySelector('#signup-tab');

// USER AUTH: error message
const errorText = document.querySelector('#error-text');

// USER AUTH: logout
const logoutBtn = document.createElement('button');
logoutBtn.innerText = 'LOG OUT';
logoutBtn.classList.add('logout-button');

// === DOM: GOMOKU LOGO === //
const logoDiv = document.querySelector('#logo-container');
logoDiv.classList.add('top-right');
const logo = document.querySelector('#logo');

// =========================== //
// ========= IN GAME ========= //

// === DOM: MESSAGE IN-GAME === //
// player0Div contains
// 1. greeting (Hello,)
// 2. user (Doraemon)
// 3. gameResult (You won!)

const player0Div = document.querySelector('#player0-div');
const greeting = document.createElement('h2');
const user = document.createElement('h1'); // innertext defined in login call back
player0Div.append(greeting, user);

// ==== DOM: CREATE BUTTON (PLAY) ==== //
const buttonDiv = document.querySelector('#button-container');
const createButton = document.createElement('button');
createButton.classList.add('game-button');
createButton.innerText = 'PLAY';

// === DOM: REPLAY === //
const replayButton = document.createElement('button');
replayButton.classList.add('game-button');
replayButton.innerText = 'REPLAY';

// === DOM: PLAYER 0 DIV === //
const blackSeedTag = document.createElement('p');
blackSeedTag.classList.add('seed-tag');
player0Div.append(blackSeedTag);

// === DOM: PLAYER 1 DIV === //
const player1Div = document.querySelector('#player1-div');
const whiteSeedTag = document.createElement('p');
whiteSeedTag.classList.add('seed-tag');
const player1Name = document.createElement('h1');
player1Div.append(player1Name, whiteSeedTag);

// ==== DOM: GAME RESULT DIV ==== //
const winnerTag = document.createElement('img');
winnerTag.src = '/images/winner-tag.png';

// ==== DOM: GAMEOVER OVERLAY ==== //
// overlays board to prevent clicking on board once game is over
const gameOverOverlay = document.createElement('div');
gameOverOverlay.classList.add('gameover-overlay');
