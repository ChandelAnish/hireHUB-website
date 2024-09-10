document.addEventListener("DOMContentLoaded", () => {
    const userData = {
        id: "6036ce6e-3f6d-4fc7-8735-4fe6905041c1",
        username: "rohit",
        rating: 3,
        completions: 0,
        userinfo: {
            username: "rohit",
            profileImgURL: "http://res.cloudinary.com/dtve737fm/image/upload/v1719648307/iuhr8ta8t8xjmmihh3ca.png",
            location: "Chennai, India"
        }
    };

    const invitationsContainer = document.querySelector('.invitations');
    const modal = document.getElementById('modal');
    const modalContent = document.querySelector('.modal-content');
    const modalDetails = document.querySelector('.modal-details');
    const closeModal = document.querySelector('.close');

    function getStars(rating) {
        return '★'.repeat(rating) + '☆'.repeat(5 - rating);
    }

    // Create invitation card
    const card = document.createElement('div');
    card.classList.add('invitation-card');

    card.innerHTML = `
        <img src="${userData.userinfo.profileImgURL}" alt="Avatar">
        <div class="details">
            <p><strong>${userData.userinfo.username}</strong></p>
            <p class="rating">${getStars(userData.rating)}</p>
            <p>${userData.userinfo.location}</p>
            <p>Completions: ${userData.completions}</p>
        </div>
        <div class="actions">
            <button class="accept">Accept</button>
            <button class="ignore">Ignore</button>
        </div>
    `;

    card.addEventListener('click', () => {
        modalDetails.innerHTML = `
            <img src="${userData.userinfo.profileImgURL}" alt="Avatar" style="width: 100px; height: 100px; border-radius: 50%;">
            <h2>${userData.userinfo.username}</h2>
            <p class="rating">${getStars(userData.rating)}</p>
            <p>Location: ${userData.userinfo.location}</p>
            <p>Completions: ${userData.completions}</p>
        `;
        modal.style.display = 'flex';
    });

    invitationsContainer.appendChild(card);

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    invitationsContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('accept')) {
            event.stopPropagation();
            alert("Successfully accepted");
            event.target.closest('.invitation-card').remove();
        }

        if (event.target.classList.contains('ignore')) {
            event.stopPropagation();
            alert("Successfully ignored");
            event.target.closest('.invitation-card').remove();
        }
    });
});
