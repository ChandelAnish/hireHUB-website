const userdetails = JSON.parse(sessionStorage.getItem("userdetails"));

function loadWorkDetails(jobTitle, labourers,jobDescription,tasks,ongoingJobId) {
  tasks=JSON.parse(tasks)
  const workDetails = document.getElementById("workDetails");

  workDetails.classList.remove("animate__fadeIn"); // Reset animation
  void workDetails.offsetWidth; // Trigger reflow to restart animation

  workDetails.innerHTML = `
        <div class="card-body">
            <h5 class="card-title">${jobTitle}</h5>
            <p class="card-text">Assigned Labourers: ${labourers}</p>
            <div class="row gap-3 ms-1">
                <div class="col-7 shadow-sm p-3 mb-5 bg-body-tertiary rounded">${jobDescription}</div>
                <div class="col-3 shadow-sm p-3 mb-5 bg-body-tertiary rounded">
                    <ul id="tasks">
                        <li>task</li>
                        <li>task</li>
                        <li>task</li>
                    </ul>
                </div>
            </div>
            <button onclick="monitorProgress('${ongoingJobId}')">Monitor Progress</button>
        </div>
    `;
  workDetails.classList.add("animate__fadeIn"); // Add animation class
  document.getElementById("tasks").innerHTML="";
  tasks.forEach((item)=>{
    document.getElementById("tasks").innerHTML+=`<li>${item.task}</li>`;
  })
}

//open progress page
function monitorProgress(ongoingJobId) {
    sessionStorage.setItem("ongoingJobId",ongoingJobId)
  window.open("../work-progress/index.html", "_parent");
}

// Get the details of the applicants
const getLabourInfo = async (username) => {
  const response = await fetch(`${BASE_URL}/labour-info/${username}`);
  const data = await response.json();
  return await data;
};

// Get all the assigned applications sent to this recruiter
const getApplications = async (username) => {
  const response = await fetch(
    `${BASE_URL}/job-application-recruiter/${username}`
  );
  const data = await response.json();
  return await data;
};

addEventListener("load", async () => {
  let applications = await getApplications(userdetails.username);
  applications = applications.filter((item) => {
    return item.approved == "assigned";
  });
  // console.log(applications);
  await displayOngoingJobs(applications);
});


const displayOngoingJobs = async (applications) => {
  if(applications.length == 0)
    {
      document.getElementById(
        "workList"
      ).innerHTML += `<p class="card-text placeholder-glow p-3">
                    <span class="placeholder col-7"></span>
                    <span class="placeholder col-4"></span>
                    <span class="placeholder col-4"></span>
                    <span class="placeholder col-6"></span>
                    <span class="placeholder col-8"></span>
                  </p>`;
      return
    }
    for (const item of applications) {
      // console.log(item);
      const applicantDetails = await getLabourInfo(item.applicant);
      // console.log(applicantDetails);
      const tasks = JSON.stringify(item.job.tasks).replace(/"/g, '&quot;');
    //   console.log(tasks);
  
      document.getElementById(
        "workList"
      ).innerHTML += `<a href="#" class="list-group-item list-group-item-action" onclick="loadWorkDetails('${item.job.jobtitle}', '${item.applicant}','${item.job.jobdescription}','${tasks}','${item.job.id}')">${item.job.jobtitle}</a>`;
    }
    if (document.querySelector(".ongoing-work-list").firstElementChild) {
      document.querySelector(".ongoing-work-list").firstElementChild.click();
    }
  };