// Default users (admin user exists)
let users = JSON.parse(localStorage.getItem("users")) || [{username:"admin", password:"1234"}];
let records = JSON.parse(localStorage.getItem('plantations')) || [];

const loginPage = document.getElementById('loginPage');
const signupPage = document.getElementById('signupPage');
const forgotPage = document.getElementById('forgotPage');
const mainPage = document.getElementById('mainPage');
const adminPage = document.getElementById('adminPage');
const form = document.getElementById('plantationForm');
const table = document.getElementById('dataTable');
const userTable = document.getElementById('userTable');

// -------- LOGIN ----------
function login() {
  let user = document.getElementById('username').value;
  let pass = document.getElementById('password').value;
  const found = users.find(u => u.username === user && u.password === pass);

  if (found) {
    localStorage.setItem("loggedIn", user);
    loginPage.classList.add("hidden");

    if (user === "admin") {
      showAdminPanel();
    } else {
      mainPage.classList.remove("hidden");
      renderTable();
    }
  } else {
    alert("Invalid Username or Password!");
  }
}

// -------- SIGN UP ----------
function showSignup() {
  loginPage.classList.add("hidden");
  signupPage.classList.remove("hidden");
}

function signup() {
function signup() {
  let newUser = document.getElementById('newUser').value;
  let newEmail = document.getElementById('newEmail').value;
  let newMobile = document.getElementById('newMobile').value;
  let newPass = document.getElementById('newPass').value;

  // Basic validation
  if (!newUser || !newEmail || !newMobile || !newPass) {
    alert("Please fill all fields!");
    return;
  }

  // Check if user already exists (by email or mobile)
  if (users.find(u => u.email === newEmail || u.mobile === newMobile)) {
    alert("User with this Email or Mobile already exists!");
    return;
  }

  // Save user
  users.push({
    username: newUser,
    email: newEmail,
    mobile: newMobile,
    password: newPass
  });

  localStorage.setItem("users", JSON.stringify(users));
  alert("User Registered Successfully!");
  backToLogin();
}

// -------- FORGOT PASSWORD ----------
function showForgot() {
  loginPage.classList.add("hidden");
  forgotPage.classList.remove("hidden");
}

function resetPassword() {
  let forgotUser = document.getElementById('forgotUser').value;
  let resetPass = document.getElementById('resetPass').value;
  let user = users.find(u => u.username === forgotUser);
  if (user) {
    user.password = resetPass;
    localStorage.setItem("users", JSON.stringify(users));
    alert("Password reset successful!");
    backToLogin();
  } else {
    alert("User not found!");
  }
}

// -------- BACK TO LOGIN ----------
function backToLogin() {
  signupPage.classList.add("hidden");
  forgotPage.classList.add("hidden");
  adminPage.classList.add("hidden");
  loginPage.classList.remove("hidden");
}

// -------- LOGOUT ----------
function logout() {
  localStorage.removeItem("loggedIn");
  mainPage.classList.add("hidden");
  adminPage.classList.add("hidden");
  loginPage.classList.remove("hidden");
}

// -------- RECORDS TABLE ----------
function renderTable() {
  table.innerHTML = `
    <tr>
      <th>Range</th><th>Scheme</th><th>Model</th><th>Village</th>
      <th>Area (Ha)</th><th>Plants</th><th>GPS</th>
    </tr>`;
  records.forEach(r => {
    table.innerHTML += `
      <tr>
        <td>${r.range}</td><td>${r.scheme}</td><td>${r.model}</td>
        <td>${r.village}</td><td>${r.area}</td><td>${r.plants}</td><td>${r.gps}</td>
      </tr>`;
  });
}

// -------- SAVE FORM ----------
form.addEventListener('submit', e => {
  e.preventDefault();
  const record = {
    range: form.range.value,
    scheme: form.scheme.value,
    model: form.model.value,
    village: form.village.value,
    area: form.area.value,
    plants: form.plants.value,
    gps: form.gps.value
  };
  records.push(record);
  localStorage.setItem('plantations', JSON.stringify(records));
  renderTable();
  form.reset();
});

// -------- ADMIN PANEL ----------
function showAdminPanel() {
  adminPage.classList.remove("hidden");
  renderUsers();
}

function renderUsers() {
  userTable.innerHTML = `
    <tr>
      <th>Username</th><th>Password</th><th>Action</th>
    </tr>`;
  users.forEach((u, i) => {
    userTable.innerHTML += `
      <tr>
        <td>${u.username}</td>
        <td>${u.password}</td>
        <td>${u.username !== "admin" ? `<button onclick="deleteUser(${i})">Delete</button>` : "👑"}</td>
      </tr>`;
  });
}

function deleteUser(index) {
  if (users[index].username === "admin") {
    alert("Admin cannot be deleted!");
    return;
  }
  users.splice(index, 1);
  localStorage.setItem("users", JSON.stringify(users));
  renderUsers();
}

function backToMain() {
  adminPage.classList.add("hidden");
  mainPage.classList.remove("hidden");
  renderTable();
}

// -------- AUTO LOGIN CHECK ----------
if (localStorage.getItem("loggedIn")) {
  const currentUser = localStorage.getItem("loggedIn");
  loginPage.classList.add("hidden");
  if (currentUser === "admin") {
    showAdminPanel();
  } else {
    mainPage.classList.remove("hidden");
    renderTable();
  }
    }
