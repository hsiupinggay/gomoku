const userAuthDiv = document.createElement('div');
document.body.append(userAuthDiv);

// sign up
const signUpDiv = document.createElement('div');
userAuthDiv.appendChild(signUpDiv);

// login -- appended later
const loginDiv = document.createElement('div');
const loginBtn = document.createElement('button');
loginBtn.setAttribute('type', 'submit');
loginBtn.textContent = 'log in';

const nameDiv = document.createElement('div');
signUpDiv.appendChild(nameDiv);
const nameLabel = document.createElement('label');
nameLabel.setAttribute('for', 'name');
nameLabel.textContent = 'name: ';
nameDiv.appendChild(nameLabel);
const nameInput = document.createElement('input');
nameInput.setAttribute('id', 'name');
nameDiv.appendChild(nameInput);

const emailDiv = document.createElement('div');
signUpDiv.appendChild(emailDiv);
const emailLabel = document.createElement('label');
emailLabel.setAttribute('for', 'email');
emailLabel.textContent = 'email: ';
emailDiv.appendChild(emailLabel);
const emailInput = document.createElement('input');
emailInput.setAttribute('id', 'email');
emailDiv.appendChild(emailInput);

const passwordDiv = document.createElement('div');
signUpDiv.appendChild(passwordDiv);
const passwordLabel = document.createElement('label');
passwordLabel.setAttribute('for', 'password');
passwordLabel.textContent = 'password: ';
passwordDiv.appendChild(passwordLabel);
const passwordInput = document.createElement('input');
passwordInput.setAttribute('id', 'password');
passwordDiv.appendChild(passwordInput);

const signUpBtn = document.createElement('button');
signUpBtn.setAttribute('type', 'submit');
signUpBtn.textContent = 'sign up';
signUpDiv.appendChild(signUpBtn);

const existingUserBtn = document.createElement('button');
existingUserBtn.setAttribute('type', 'submit');
existingUserBtn.textContent = 'already a user';
signUpDiv.appendChild(existingUserBtn);

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

const goToLogin = () => {
  signUpDiv.remove();
  userAuthDiv.appendChild(loginDiv);
  // reusing email and password input div created above
  loginDiv.append(emailDiv, passwordDiv, loginBtn);
};

// signup button functionality
signUpBtn.addEventListener('click', signUp);

// already a user functionality
existingUserBtn.addEventListener('click', goToLogin);

const login = async () => {
  const userData = {
    email: document.querySelector('#email').value,
    password: document.querySelector('#password').value,
  };
  const loginResponse = await axios.post('/users/login', userData);
  try {
    console.log('login response', loginResponse);
    userAuthDiv.remove();

    const dashboardDiv = document.querySelector('#dashboard-div');

    const userDiv = document.createElement('div');
    dashboardDiv.appendChild(userDiv);
    userDiv.classList.add('user-div col-md-2');
    buttonDiv.appendChild(createButton);
    if (loginResponse.data.success === true) {
      userDiv.innerText = loginResponse.data.name;
    } else {
      userDiv.innerText = 'failed';
    }
  } catch (error) { console.log(error); }
};
// login button functionality
loginBtn.addEventListener('click', login);

// ==== DOM: Create Button ==== //

const createButton = document.createElement('button');
const buttonDiv = document.querySelector('#button-container');
createButton.innerText = 'create';
// appending of createButton is in login callback, i.e. button will only appear after login success
createButton.addEventListener('click', createGame);
