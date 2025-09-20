// Default credentials
const USERNAME = "admin";
const PASSWORD = "1234";

const loginPage = document.getElementById('loginPage');
const mainPage = document.getElementById('mainPage');
const form = document.getElementById('plantationForm');
const table = document.getElementById('dataTable');
let records = JSON.parse(localStorage.getItem('plantations')) || [];

// Login function
function login() {
  let user = document.getElementById('username').value;
  let pass = document.getElementById('password').value;
  if (user === USERNAME && pass === PASSWORD) {
    localStorage.setItem("loggedIn", "true");
    loginPage.classList.add("hidden");
    mainPage.classList.remove("hidden");
    renderTable();
  } else {
    alert("Invalid Username or Password!");
  }
}

// Logout function
function logout() {
  localStorage.removeItem("loggedIn");
  loginPage.classList.remove("hidden");
  mainPage.classList.add("hidden");
}

// Render table
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

// Save record
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

// Auto login check
if (localStorage.getItem("loggedIn") === "true") {
  loginPage.classList.add("hidden");
  mainPage.classList.remove("hidden");
  renderTable();
}
