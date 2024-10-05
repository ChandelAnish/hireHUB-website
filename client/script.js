let btn=document.getElementById("nextbtn")
setInterval(()=>{
    btn.click()
},2500)

// Get the Back to Top button and the top anchor
const backToTopButton = document.getElementById('back-to-top');
const topAnchor = document.getElementById('top');

// Add an event listener to the Back to Top button
backToTopButton.addEventListener('click', () => {
  // Scroll to the top of the page
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// JavaScript to handle Dark Mode Toggle
// JavaScript to handle Dark Mode Toggle

const toggleButton = document.getElementById('darkModeToggle');
const body = document.body;

// Check for saved user preference in localStorage and apply the theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    body.setAttribute('data-theme', savedTheme);
}

// Event listener for toggle button click
toggleButton.addEventListener('click', function () {
    let currentTheme = body.getAttribute('data-theme');
    
    // Toggle between dark and light modes
    if (currentTheme === 'dark') {
        body.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        toggleButton.innerHTML = '<i class="fas fa-sun"></i>'; // Change icon to sun
    } else {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        toggleButton.innerHTML = '<i class="fas fa-moon"></i>'; // Change icon to moon
    }
});
