let btn = document.getElementById("nextbtn");
setInterval(() => {
  btn.click();
}, 2500);

// Dark mode toggle functionality
const darkModeToggle = document.getElementById("darkModeToggle");
const body = document.body;

// Check for saved dark mode preference
const isDarkMode = localStorage.getItem("darkMode") === "enabled";

// Set initial dark mode state
if (isDarkMode) {
  body.classList.add("dark-mode");
  darkModeToggle.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
}

// Toggle dark mode
darkModeToggle.addEventListener("click", () => {
  body.classList.toggle("dark-mode");

  if (body.classList.contains("dark-mode")) {
    localStorage.setItem("darkMode", "enabled");
    darkModeToggle.innerHTML = '<i class="fas fa-sun"></i> Light Mode';
  } else {
    localStorage.setItem("darkMode", "disabled");
    darkModeToggle.innerHTML = '<i class="fas fa-moon"></i> Dark Mode';
  }
});
