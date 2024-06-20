const BASE_URL = 'http://localhost:5000';

const applicationList = [];

addEventListener('load', async () => {
    displayApplicationList(applicationList);
});

const getApplications = async () => {
    const userDetails = sessionStorage.getItem('userdetails');
    const user = JSON.parse(userDetails).username;

    const response = await fetch(`${BASE_URL}/job-application/${user}`);
    if (!response.ok) {
        console.error('Failed to fetch job listings');
        return [];
    }
    const data = await response.json();
    console.log(data);
    return data;
};

async function displayApplicationList(applicationList) {
    const applicationListContainer = document.getElementById('job-listings');
    if (!applicationListContainer) {
        console.error('No element found with ID job-listings');
        return;
    }
    applicationList = await getApplications();
    applicationListContainer.innerHTML = '';

    applicationList.forEach((application, index) => {
        const job = application.job;

        let statusColor = "text-success";
        if (application.approved === "pending") {
            statusColor = "text-warning";
        }

        const jobCard = document.createElement('div');
        jobCard.classList.add('card', 'mb-3');
        jobCard.id = `c${index}`;

        jobCard.innerHTML = `
            <div class="card-body" id="${index}">
                <h5 class="card-title">${job.jobtitle}</h5>
                <h6 class="card-subtitle mb-2 text-muted">
                    <span>${job.jobtype}</span> | 
                    <span>${job.state}</span>
                </h6>
                <p class="card-text">
                    <strong>Job Description:</strong>
                    <span>${job.jobdescription}</span>
                </p>
                <p class="card-text">
                    <strong>Location:</strong>
                    <span>${job.location}</span>
                </p>
                <p class="card-text">
                    <strong>Salary:</strong>
                    ₹<span>${job.salary}</span>
                </p>
                <p class="card-text">
                    <strong>Skills:</strong>
                    <span>${job.skills}</span>
                </p>
                <p class="card-text">
                    <strong>Tasks:</strong>
                    <span>${job.tasks.join(', ')}</span>
                </p>
                <p class="card-text">
                    <strong>Application Status:</strong>
                    <span class="${statusColor}">${application.approved}</span>
                </p>
            </div>
        `;
        applicationListContainer.appendChild(jobCard);
    });
}
