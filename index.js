document.addEventListener("DOMContentLoaded", function () {
  let usersDetails = localStorage.getItem("users");
  let users;
  
  if (usersDetails) {
    let storedData = JSON.parse(usersDetails);
    users = { ...storedData };
    let usersCount = users.count;

    let tableBody = document.getElementById("tableBody");

    for (let userKey in users) {
      if (userKey !== "count") {
        let user = users[userKey];
        tableBody.innerHTML += `<tr>
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td>${user.password}</td>
          <td>${user.dob}</td>
          <td>${user.terms ? "true" : "false"}</td>
        </tr>`;
      }
    }
  } else {
    users = { count: 0 };
  }
});

function showError(message) {
  let errorContainer = document.querySelector(".error-msg");
  errorContainer.textContent = "";
  errorContainer.textContent = message;
}

let users = {};
let tableBody = document.getElementById("tableBody");

let form = document.getElementById("regform");
let nameElement = document.getElementById("name");
let emailElement = document.getElementById("email");
let passwordElement = document.getElementById("password");
let dobElement = document.getElementById("dob");
let checkBoxElement = document.getElementById("agree");

function isNameEmpty(name) {
  return name === "";
}

function isEmailEmpty(email) {
  return email === "";
}

function isPasswordEmpty(password) {
  return password === "";
}

function isAgeEmpty(age) {
  return age === "";
}

function isInvalidAge(age) {
  let currentDate = new Date();
  let userDob = new Date(age);
  let userAge = currentDate.getFullYear() - userDob.getFullYear();
  return userAge < 18 || userAge > 55;
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  let userName = nameElement.value;
  let userEmail = emailElement.value;
  let userPassword = passwordElement.value;
  let userDob = dobElement.value;
  let acceptedTerms = checkBoxElement.checked;

  if (isNameEmpty(userName)) {
    showError("Name Cannot Be Empty, Please Fill That field");
    return;
  }
  if (isEmailEmpty(userEmail)) {
    showError("Email is Required, Please Fill That Field");
    return;
  }
  if (isPasswordEmpty(userPassword)) {
    showError("Please Fill The Password");
    return;
  }
  if (isAgeEmpty(userDob)) {
    showError("Date of Birth is Required");
    return;
  }
  if (isInvalidAge(userDob)) {
    showError("Your Age Should be Between 18 and 55");
    return;
  }

  showError("");
  users.count++;

  let userKeyName = "user" + users.count;
  let user = {
    name: userName,
    email: userEmail,
    password: userPassword,
    dob: userDob,
    terms: acceptedTerms,
  };
  users[userKeyName] = { ...user };
  localStorage.setItem("users", JSON.stringify(users));

  tableBody.innerHTML += `<tr>
    <td>${user.name}</td>
    <td>${user.email}</td>
    <td>${user.password}</td>
    <td>${user.dob}</td>
    <td>${user.terms ? "true" : "false"}</td>
  </tr>`;

  // Clear the form fields after submission
  form.reset();
});
