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

// Get the mode toggle button and icon
const modeToggle = document.getElementById('mode-toggle');
const modeIcon = document.getElementById('mode-icon');

// Add an event listener to the mode toggle button
modeToggle.addEventListener('click', () => {
  // Toggle light and dark modes
  document.body.classList.toggle('dark-mode');

  // Update the mode icon
  if (document.body.classList.contains('dark-mode')) {
    modeIcon.textContent = '\u2600'; // Moon symbol for dark mode
  } else {
    modeIcon.textContent = '\u263C'; // Sun symbol for light mode
  }
});