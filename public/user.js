const userAuthDiv = document.querySelector('#user-auth-div');
userAuthDiv.classList.add('d-flex', 'justify-content-center');

// sign up
const signUpDiv = document.querySelector('#signup-div');
// signUpDiv.classList.add('signup-div');

// login -- appended later
// const loginDiv = document.createElement('div');
const loginBtn = document.createElement('button');
loginBtn.classList.add('blue-button');
loginBtn.setAttribute('type', 'submit');
loginBtn.textContent = 'log in';

const userInputDiv = document.querySelector('#user-input-div');

const nameDiv = document.createElement('div');
userInputDiv.appendChild(nameDiv);
// const nameLabel = document.createElement('label');
// nameLabel.setAttribute('for', 'name');
// nameLabel.textContent = 'name: ';
// nameDiv.appendChild(nameLabel);
const nameInput = document.createElement('input');
nameInput.classList.add('input-bar');
nameInput.placeholder = 'Name';
nameInput.setAttribute('id', 'name');
nameDiv.appendChild(nameInput);

const emailDiv = document.createElement('div');
userInputDiv.appendChild(emailDiv);
// const emailLabel = document.createElement('label');
// emailLabel.setAttribute('for', 'email');
// emailLabel.textContent = 'email: ';
// emailDiv.appendChild(emailLabel);
const emailInput = document.createElement('input');
emailInput.classList.add('input-bar');
emailInput.placeholder = 'Email';
emailInput.setAttribute('id', 'email');
emailDiv.appendChild(emailInput);

const passwordDiv = document.createElement('div');
userInputDiv.appendChild(passwordDiv);
// const passwordLabel = document.createElement('label');
// passwordLabel.setAttribute('for', 'password');
// passwordLabel.textContent = 'password: ';
// passwordDiv.appendChild(passwordLabel);
const passwordInput = document.createElement('input');
passwordInput.classList.add('input-bar');
passwordInput.placeholder = 'Password';
passwordInput.setAttribute('id', 'password');
passwordDiv.appendChild(passwordInput);

const signUpBtn = document.createElement('button');
signUpBtn.classList.add('blue-button');

signUpBtn.setAttribute('type', 'submit');
signUpBtn.textContent = 'sign up';
userInputDiv.appendChild(signUpBtn);

const loginTab = document.querySelector('#login-tab');
const signupTab = document.querySelector('#signup-tab');
// existingUserBtn.classList.add('existing-user-btn');
// existingUserBtn.setAttribute('type', 'submit');
// existingUserBtn.textContent = 'already a user';
// existingUserDiv.appendChild(existingUserBtn);

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
  nameInput.remove();
  loginTab.classList.add('active');
  signupTab.classList.remove('active');

  signUpBtn.remove();
  userInputDiv.append(loginBtn);

  // signUpDiv.remove();
  // userAuthDiv.appendChild(loginDiv);
  // // reusing email and password input div created above
  // loginDiv.append(emailDiv, passwordDiv, loginBtn);
};

// signup button functionality
signUpBtn.addEventListener('click', signUp);
// login tab
loginTab.addEventListener('click', goToLogin);
// signup tab
const goToSignup = () => {
  nameDiv.append(nameInput);
  loginTab.classList.remove('active');
  signupTab.classList.add('active');
  loginBtn.remove();
  userInputDiv.append(signUpBtn);
};

signupTab.addEventListener('click', goToSignup);

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
    userDiv.classList.add('col-md-6');

    buttonDiv.append(createButton);
    if (loginResponse.data.success === true) {
      userDiv.innerText = loginResponse.data.name;
      message.innerText = `Hello, ${loginResponse.data.name}`;
    } else {
      userDiv.innerText = 'failed';
    }
  } catch (error) { console.log(error); }
};
// login button functionality
loginBtn.addEventListener('click', login);
