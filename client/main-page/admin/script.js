document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const rows = document.querySelectorAll('.application-row');
    const searchInput = document.querySelector('.header input');

    // Add event listener for search input
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.trim().toLowerCase();

        rows.forEach(row => {
            const nameColumn = row.querySelector('td:nth-child(6)'); // Adjust this based on your table structure

            if (nameColumn) {
                const name = nameColumn.textContent.trim().toLowerCase();

                // Check if the name includes the search term
                if (name.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            }
        });
    });

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');

            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            rows.forEach(row => {
                const status = row.getAttribute('data-status');

                if (filter === 'all') {
                    row.style.display = '';
                } else {
                    if (status === filter) {
                        row.style.display = '';
                    } else {
                        row.style.display = 'none';
                    }
                }
            });
        });
    });
});
