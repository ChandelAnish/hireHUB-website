// // scripts.js

// // Function to go back (if needed)
// function goBack() {
//     window.history.back();
// }

// // Apply button functionality
// const applyButtons = document.querySelectorAll('.apply-job');

// applyButtons.forEach(button => {
//     button.addEventListener('click', function() {
//         const confirmation = confirm("Are you sure you want to apply for this job?");
//         if (confirmation) {
//             alert("You have successfully applied for the job!");
//             // Here you can add the logic to submit the application
//         } else {
//             alert("Application cancelled.");
//         }
//     });
// });

// // Copy URL button functionality
// document.querySelector('.copy-url').addEventListener('click', function() {
//     const urlInputElement = document.querySelector('.job-url input');
//     urlInputElement.select();
//     document.execCommand('copy');
//     alert("URL Copied to Clipboard: " + urlInputElement.value);
// });
