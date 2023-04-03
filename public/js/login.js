//users are able to login with a email and password
const loginFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    console.log(response);

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to log in.');
    }
  }
};

//users are able to create an account with a valid username, email and password
const signupFormHandler = async (event) => {
  event.preventDefault();

  const username = document.querySelector('#username-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (username && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to sign up.');
    }
  }
};

//user can login when button is clicked
if (document.getElementById('loginbtn')) {
  document
  .getElementById('loginbtn')
  .addEventListener('click', loginFormHandler);
};

//user can log out when button is clicked
if (document.getElementById('signupbtn')) {
  document
  .getElementById('signupbtn')
  .addEventListener('click', signupFormHandler);
}




