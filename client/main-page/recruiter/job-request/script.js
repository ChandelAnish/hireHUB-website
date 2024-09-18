document.addEventListener("DOMContentLoaded", () => {
    // Select all close buttons and decline buttons
    const closeButtons = document.querySelectorAll('.close-btn');
    const declineButtons = document.querySelectorAll('.decline-btn');

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove the parent card when the close button is clicked
            button.closest('.job-card').remove();
        });
    });

    declineButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove the parent card when the decline button is clicked
            button.closest('.job-card').remove();
        });
    });
});
