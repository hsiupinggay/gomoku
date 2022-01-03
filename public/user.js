// === DOM: User Auth == //

const userAuthDiv = document.querySelector('#user-auth-div');
userAuthDiv.classList.add('d-flex', 'justify-content-center');

// sign up
const signUpDiv = document.querySelector('#signup-div');

const loginBtn = document.createElement('button');
loginBtn.classList.add('blue-button');
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
signUpBtn.classList.add('blue-button');

signUpBtn.setAttribute('type', 'submit');
signUpBtn.textContent = 'SIGN UP';
userInputDiv.appendChild(signUpBtn);

const loginTab = document.querySelector('#login-tab');
const signupTab = document.querySelector('#signup-tab');

// === DOM: Message Related === //
// messageContainer contains
// 1. greeting (Hello,)
// 2. user (Doraemon)
// 3. gameResult (You won!)

const messageContainer = document.querySelector('#message-container');
const greeting = document.createElement('h2');

const user = document.createElement('h1'); // innertext defined in login call back
messageContainer.append(greeting, user);

// === DOM: Logo Related === //
const logo = document.querySelector('#logo-container');
logo.classList.add('top-right');

// sign up event call back
const signUp = async () => {
  const newUser = {
    name: document.querySelector('#name').value,
    email: document.querySelector('#email').value,
    password: document.querySelector('#password').value,
  };

  console.log('new user', newUser);

  try {
    const signUpResponse = await axios.post('/users/signup', newUser);

    console.log(signUpResponse.data);
    console.log('sign up response, new user', signUpResponse.data.newUser);

    signUpDiv.remove();

    const dashboardDiv = document.createElement('div');
    document.body.appendChild(dashboardDiv);

    const userDiv = document.createElement('div');
    dashboardDiv.appendChild(userDiv);
    userDiv.innerText = signUpResponse.data.newUser.name;
  } catch (error) { console.log(error); }
};

// callback when login tab is clicked
const goToLogin = () => {
  nameInput.remove();
  loginTab.classList.add('active');
  signupTab.classList.remove('active');

  signUpBtn.remove();
  userInputDiv.append(loginBtn);
};

// signup button functionality
signUpBtn.addEventListener('click', signUp);

// login tab
loginTab.addEventListener('click', goToLogin);

// call back when signup tab is clicked
const goToSignup = () => {
  nameDiv.append(nameInput);
  loginTab.classList.remove('active');
  signupTab.classList.add('active');
  loginBtn.remove();
  userInputDiv.append(signUpBtn);
};

signupTab.addEventListener('click', goToSignup);

// call back when login button is clicked
const login = async () => {
  const userData = {
    email: document.querySelector('#email').value,
    password: document.querySelector('#password').value,
  };
  try {
    const loginResponse = await axios.post('/users/login', userData);
    const { token } = loginResponse.data;
    localStorage.setItem('authToken', token);
    console.log(localStorage);

    console.log('login response', loginResponse);
    userAuthDiv.remove();

    logo.classList.remove('top-right');
    logo.classList.add('in-game');

    buttonDiv.append(createButton);
    buttonDiv.append(logoutBtn);
    if (loginResponse.data.success === true) {
      // userDiv.innerText = loginResponse.data.name;
      greeting.innerText = 'Hello,';
      user.innerText = loginResponse.data.name;
    } else {
      userDiv.innerText = 'failed';
    }
  } catch (error) { console.log(error); }
};

// login button functionality
loginBtn.addEventListener('click', login);

const logoutBtn = document.createElement('button');
logoutBtn.innerText = 'LOG OUT';
logoutBtn.classList.add('game-button');

const logout = async () => {
  console.log('logout function check current game id', currentGameId);
  try {
    const response = await axios.put(`/users/logout/${currentGameId}`);
    // handle success
    if (response.data.logoutSuccess === true) {
      localStorage.removeItem('authToken');
      location.reload();
    }
  } catch (error) { console.log(error); }
};

logoutBtn.addEventListener('click', logout);
