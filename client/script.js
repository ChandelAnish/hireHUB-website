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
