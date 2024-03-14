const loginError = document.getElementById("login-error");
const signupError = document.getElementById("signup-error");

const loginEmail = document.getElementById("login-email-input");
const loginPassword = document.getElementById("login-password-input");
const signupName = document.getElementById("signup-name-input");
const signupEmail = document.getElementById("signup-email-input");
const signupPassword = document.getElementById("signup-password-input");

const loginButton = document.getElementById("login-button");
const signupButton = document.getElementById("signup-button");

const switchLogin = document.getElementById("switch-login");
const switchSignup = document.getElementById("switch-signup");

const signupForm = document.getElementById("signup-form");
const loginForm = document.getElementById("login-form");

const ApiURL = "http://localhost/todolist-full-stack/server";

const loginUser = {
  email: "",
  password: "",
};

const signUpUser = {
  name: "",
  email: "",
  password: "",
};

function switchtoSignUp() {
  signupForm.classList.add("flex");
  signupForm.classList.remove("hidden");
  loginForm.classList.remove("flex");
  loginForm.classList.add("hidden");
}

function switchtoLogin() {
  loginForm.classList.add("flex");
  loginForm.classList.remove("hidden");
  signupForm.classList.add("hidden");
  signupForm.classList.remove("flex");
}

function displayError(param) {
  if (param == "login") {
    loginError.style.display = "block";
  } else {
    signupError.style.display = "block";
  }
}

function removeError() {
  loginError.style.display = "none";

  signupError.style.display = "none";
}

const handleLogin = async () => {
  const user = new FormData();
  user.append("email", loginUser.email);
  user.append("password", loginUser.password);
  try {
    const res = await fetch(`${ApiURL}/users/login.php`, {
      method: "POST",
      body: user,
    });
    const data = await res.json();
    if (data.status == "logged in") {
      window.location.assign(`/client/pages/todo.html?id=${data.user_id}`);
    } else {
      displayError("login");
    }
  } catch (error) {
    console.log(error);
  }
};

const handleSignup = async () => {
  const user = new FormData();
  user.append("name", signUpUser.name);
  user.append("email", signUpUser.email);
  user.append("password", signUpUser.password);
  try {
    const res = await fetch(`${ApiURL}/users/signup.php`, {
      method: "POST",
      body: user,
    });
    const data = await res.json();

    if (data.status == "success") {
      window.location.assign(`/client/pages/todo.html?id=${data.user_id}`);
    } else {
      displayError("singup");
    }
  } catch (error) {
    console.log(error);
  }
};

loginEmail.addEventListener("change", function (e) {
  loginUser.email = e.target.value;
  removeError();
});

loginPassword.addEventListener("change", function (e) {
  loginUser.password = e.target.value;
  removeError();
});
signupEmail.addEventListener("change", function (e) {
  signUpUser.email = e.target.value;
  removeError();
});
signupName.addEventListener("change", function (e) {
  signUpUser.name = e.target.value;
  removeError();
});
signupPassword.addEventListener("change", function (e) {
  signUpUser.password = e.target.value;
  removeError();
});

switchLogin.addEventListener("click", switchtoLogin);
switchSignup.addEventListener("click", switchtoSignUp);

loginButton.addEventListener("click", () => handleLogin());
signupButton.addEventListener("click", () => handleSignup());
