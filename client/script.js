let btn=document.getElementById("nextbtn")
setInterval(()=>{
    btn.click()
},2500)

// Store the mouse coordinates
const coords = { x: 0, y: 0 };

// Select all circles (you can add more circles to HTML as needed)
const circles = document.querySelectorAll(".circle");

// Customize the colors for the circles (optional)
const colors = ["#ffb56b", "#fdaf69", "#f89d63", "#f59761", "#ef865e", "#ec805d", "#e36e5c", "#df685c", "#d5585c", "#d1525c", "#c5415d", "#c03b5d", "#b22c5e", "#ac265e", "#9c155f", "#950f5f", "#830060", "#7c0060", "#680060", "#60005f", "#48005f", "#3d005e"];

// Initialize circle positions
circles.forEach((circle, index) => {
  circle.x = 0;
  circle.y = 0;
  circle.style.backgroundColor = colors[index % colors.length];  // Assign colors
});

// Update mouse coordinates on move
window.addEventListener("mousemove", (e) => {
  coords.x = e.clientX;
  coords.y = e.clientY;
});

// Animation loop for circles
function animateCircles() {
  let x = coords.x;
  let y = coords.y;

  circles.forEach((circle, index) => {
      circle.style.left = `${x - 12}px`;   // Offset for center alignment
      circle.style.top = `${y - 12}px`;

      circle.style.transform = `scale(${(circles.length - index) / circles.length})`;  // Shrink effect

      circle.x = x;
      circle.y = y;

      const nextCircle = circles[index + 1] || circles[0];
      x += (nextCircle.x - x) * 0.3;
      y += (nextCircle.y - y) * 0.3;
  });

  requestAnimationFrame(animateCircles);
}

// Start animation
animateCircles();