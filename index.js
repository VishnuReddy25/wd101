document.addEventListener("DOMContentLoaded", function () {
  loadUsersData();
});

function loadUsersData() {
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
}

// Rest of your code...

form.addEventListener("submit", function (event) {
  // Existing code...

  // Update the table after a new user is added
  loadUsersData();
});
