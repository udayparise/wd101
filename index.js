let userEntries = [];

// Function to validate the form
const validateForm = () => {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const acceptTerms = document.getElementById("acceptTerms").checked;

  // Example validation, you can customize it
  if (!name || !email || !password || !dob || !acceptTerms) {
    alert("Please fill in all fields and accept the Terms & Conditions.");
    return false;
  }

  // Additional validation for age between 18 and 55
  const age = calculateAge(dob);

  if (age < 18 || age > 55) {
    alert("Age must be between 18 and 55.");
    return false;
  }

  // Additional validation for a valid email address
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Invalid email address.");
    return false;
  }

  return true;
};

// Function to save user form data
const saveUserForm = (event) => {
  event.preventDefault();

  if (!validateForm()) {
    return;
  }

  const nameValue = document.getElementById("name").value;
  const emailValue = document.getElementById("email").value;
  const passwordValue = document.getElementById("password").value;
  const dobValue = document.getElementById("dob").value;
  const acceptedTermsAndConditions = document.getElementById("acceptTerms").checked;

  const entry = {
    name: nameValue,
    email: emailValue,
    password: passwordValue,
    dob: dobValue,
    acceptedTermsAndConditions: acceptedTermsAndConditions,
  };

  userEntries.push(entry);

  localStorage.setItem("user-entries", JSON.stringify(userEntries));

  displayUserEntries();

  console.log("Submitted Information:");
  console.log("Name:", nameValue);
  console.log("Email:", emailValue);
  console.log("Password:", passwordValue);
  console.log("Dob:", dobValue);
  console.log("Accepted terms:", acceptedTermsAndConditions);
};

// Event listener for form submission
document.getElementById("registrationForm").addEventListener("submit", saveUserForm);

// Function to calculate age based on date of birth
const calculateAge = (dob) => {
  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
};

// Function to display user entries in a table
const displayUserEntries = () => {
  const tableContainer = document.getElementById("tableContainer");
  tableContainer.innerHTML = ""; // Clear previous content

  const table = document.createElement("table");
  table.classList.add("user-table");

  const headerRow = document.createElement("tr");
  const headerColumns = ["Name", "Email", "Password", "Dob", "Accepted terms?"];
  headerColumns.forEach((column) => {
    const th = document.createElement("th");
    th.textContent = column;
    headerRow.appendChild(th);
  });
  table.appendChild(headerRow);

  userEntries.forEach((entry) => {
    const row = document.createElement("tr");
    const columns = [entry.name, entry.email, entry.password, entry.dob, entry.acceptedTermsAndConditions];
    columns.forEach((column) => {
      const td = document.createElement("td");
      td.textContent = column;
      row.appendChild(td);
    });
    table.appendChild(row);
  });

  tableContainer.appendChild(table);
};

// Retrieve stored entries on page load
const storedEntries = localStorage.getItem("user-entries");
userEntries = storedEntries ? JSON.parse(storedEntries) : [];

// Display the entries on page load
displayUserEntries();
