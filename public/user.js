// callback for login tab
const goToLogin = () => {
  nameInput.remove();
  loginTab.classList.add('active');
  signupTab.classList.remove('active');

  signUpBtn.remove();
  userInputDiv.append(loginBtn);
};

// add event listener to login tab
loginTab.addEventListener('click', goToLogin);

// callback for sign up button
const signUp = async () => {
  const newUser = {
    name: document.querySelector('#name').value,
    email: document.querySelector('#email').value,
    password: document.querySelector('#password').value,
  };

  console.log('new user', newUser);

  try {
    const signUpResponse = await axios.post('/users/signup', newUser);

    // error handling in case input fields are empty
    if (signUpResponse.data.error) {
      errorText.innerText = signUpResponse.data.error;
      return;
    }

    console.log(signUpResponse.data);
    console.log('sign up response, new user', signUpResponse.data.newUser);

    // signUpDiv.remove();
    goToLogin();

    errorText.innerText = `Hello ${signUpResponse.data.newUser.name}, log in to start playing.`;
  } catch (error) { console.log(error); }
};

// add event listener to signup tab
signUpBtn.addEventListener('click', signUp);

// call back for signup tab
const goToSignup = () => {
  nameDiv.append(nameInput);
  loginTab.classList.remove('active');
  signupTab.classList.add('active');
  loginBtn.remove();
  userInputDiv.append(signUpBtn);
};

// add eventlistener to signup tab
signupTab.addEventListener('click', goToSignup);

// callback for login button
const login = async () => {
  const userData = {
    email: document.querySelector('#email').value,
    password: document.querySelector('#password').value,
  };
  try {
    const loginResponse = await axios.post('/users/login', userData);

    // handle success
    if (loginResponse.data.success === true) {
      // store jwt in local storage
      const { token } = loginResponse.data;
      localStorage.setItem('authToken', token);
      console.log(localStorage);

      // dom manipulation
      console.log('login response', loginResponse);
      userAuthDiv.remove();
      logoDiv.classList.remove('top-right');
      logoDiv.classList.add('in-game');
      logo.classList.add('logo-in-game');
      buttonDiv.append(createButton);
      const sideDiv = document.querySelector('#side-container');
      sideDiv.append(logoutBtn);
      console.log(loginResponse.data);
      greeting.innerText = 'Hello,';
      user.innerText = loginResponse.data.name;
    } else if (loginResponse.data.error) {
      // handle error
      console.log('error detected');
      errorText.innerHTML = loginResponse.data.error;
    }
  } catch (error) { console.log(error); }
};

// add event listener to login button
loginBtn.addEventListener('click', login);

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
