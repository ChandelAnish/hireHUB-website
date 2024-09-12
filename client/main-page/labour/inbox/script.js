  // Show job details modal when card is clicked
  function showJobDetailsModal() {
    var myModal = new bootstrap.Modal(document.getElementById('jobDetailsModal'));
    myModal.show();
  }

  // Accept request: remove the card
  function acceptRequest(btn) {
    const card = btn.closest('.col-md-12');
    card.style.transition = 'opacity 0.4s, transform 0.4s';
    card.style.opacity = '0';
    card.style.transform = 'scale(0.95)';
    setTimeout(() => card.remove(), 400); // Delay to let the animation finish
  }

  // Reject request: remove the card
  function rejectRequest(btn) {
    const card = btn.closest('.col-md-12');
    card.style.transition = 'opacity 0.4s, transform 0.4s';
    card.style.opacity = '0';
    card.style.transform = 'scale(0.95)';
    setTimeout(() => card.remove(), 400); // Delay to let the animation finish
  }