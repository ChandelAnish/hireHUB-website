let applicationList = [];

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
    return data;
};

async function displayApplicationList() {
    const applicationListContainer = document.getElementById('job-listings');
    const jobDetailsContainer = document.getElementById('job-details');
    if (!applicationListContainer) {
        console.error('No element found with ID job-listings');
        return;
    }
    applicationList = await getApplications();
    console.log(applicationList)
    if(applicationList == 0)
    {
        applicationListContainer.innerHTML += `<div class="card"><p class="card-text placeholder-glow p-3 rounded">
                        <span class="placeholder col-7"></span>
                        <span class="placeholder col-4"></span>
                        <span class="placeholder col-4"></span>
                        <span class="placeholder col-6"></span>
                        <span class="placeholder col-8"></span>
                      </p></div>`;

        jobDetailsContainer.innerHTML = `
                      <div class="text-center mt-5">
                          <h4 class="text-muted">All your applications will appear here.</h4>
                          <img src="../../../assets/no-job-application.png" alt="">
                      </div>
                  `;
                  jobDetailsContainer.classList.add('show-job-details');
          return
    }
    applicationListContainer.innerHTML = '';  // Clear previous content

    applicationList.forEach((application, index) => {
        const job = application.job;
        let tasksArray = Array.isArray(job.tasks) 
            ? job.tasks.map((item) => item.task) 
            : [];

        let skillsArray = Array.isArray(job.skills) 
            ? job.skills.join(', ') 
            : job.skills || 'No specific skills mentioned';

        let statusColor = "text-success";
        if (application.approved === "pending") {
            statusColor = "text-warning";
        }

        const jobCard = document.createElement('div');
        jobCard.classList.add('card', 'mb-3');
        jobCard.id = `c${index}`;
        jobCard.innerHTML = `
            <div class="card-header rounded">
                <h5>${job.jobtitle} | <span class="${statusColor}">${application.approved}</span></h5>
                <h6 class="card-subtitle mb-2 text-muted">${job.jobtype} | ${job.state}</h6>
            </div>
        `;

        jobCard.addEventListener('click', () => {
            loadJobDetails(index, application, tasksArray, skillsArray, statusColor);
        });

        applicationListContainer.appendChild(jobCard);
    });
    if(applicationListContainer.firstElementChild){
        applicationListContainer.firstElementChild.click();
    }
}

function loadJobDetails(index, application, tasksArray, skillsArray, statusColor) {
    const jobDetailsContainer = document.getElementById('job-details');
    const job = application.job;
    // console.log(job)

    jobDetailsContainer.innerHTML = `
        <div class="job-details">
            <h3>${job.jobtitle}</h3>
            <p><strong>Job Description:</strong> ${job.jobdescription}</p>
            <p><strong>Location:</strong> ${job.location}</p>
            <p><strong>Salary:</strong> ₹${job.salary}</p>
            <p><strong>Skills:</strong> ${skillsArray}</p>
            <p><strong>Tasks:</strong> ${tasksArray.join(', ')}</p>
            <p><strong>Application Status:</strong> <span class="${statusColor}">${application.approved}</span></p>
            ${application.approved === 'assigned' ? `<a onclick="monitorProgress('${job.id}')" class="btn btn-success">Resume Work</a>` : ''}
        </div>
    `;

    jobDetailsContainer.classList.add('show-job-details');
    jobDetailsContainer.style.opacity = 0;

    setTimeout(() => {
        jobDetailsContainer.style.opacity = 1;
    }, 100);  // Adding slight delay for smoother animation
}

//open progress page
function monitorProgress(assignedJobId) {
    sessionStorage.setItem("job_id", assignedJobId);
    window.open("../work-progress/index.html", "_parent");
  }