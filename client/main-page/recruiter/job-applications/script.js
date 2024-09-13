const BASE_URL = "http://localhost:5000";
const userdetails = JSON.parse(sessionStorage.getItem("userdetails"));

// Get the details of the applicants
const getLabourInfo = async (username) => {
  const response = await fetch(`${BASE_URL}/labour-info/${username}`);
  const data = await response.json();
  return await data;
};

// Get all the pending applications sent to this recruiter
const getApplications = async (username) => {
  const response = await fetch(
    `${BASE_URL}/job-application-recruiter/${username}`
  );
  const data = await response.json();
  return await data;
};

addEventListener("load", async () => {
  let applications = await getApplications(userdetails.username);
  applications = applications.filter((item)=>{
    return item.approved=="pending"
  })
  console.log(applications)
  await displayApplicants(applications);
});

function getStars(rating) {
  return "★".repeat(rating) + "☆".repeat(5 - rating);
}

const displayApplicants = async (applications) => {
  applications.forEach(async (item) => {
    console.log(item);
    const applicantDetails = await getLabourInfo(item.applicant);

    // Generate the HTML with `onclick` for "Hire" and "Reject" buttons
    document.getElementById(
      "applicantsList"
    ).innerHTML += `<div class="d-flex justify-content-between align-items-center mb-3">
                    <div class="d-flex align-items-center">
                        <div>
                            <strong>${item.applicant} &nbsp;
                                <span class="rating" style="color: gold;">${getStars(
                                  applicantDetails.rating
                                )}</span>
                                <small style="font-size: 12px; margin-left: 15px;">Applied for ${
                                  item.job.jobtitle
                                } job</small>
                            </strong><br>
                            <small>${
                              applicantDetails.completions
                            } Jobs Completed</small>
                        </div>
                    </div>
                    <div>
                        <button class="btn btn-outline-success me-2 confirm-btn" onclick="hire(this,'${
                          item.id
                        }')">Hire</button>
                        <button class="btn btn-outline-danger cancel-btn" onclick="reject(this,'${
                          item.id
                        }')">Reject</button>
                    </div>
                </div>`;
  });
};

// Function to hire
const hire = async (button, id) => {
  const response = await fetch(`http://localhost:5000/job-application/${id}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ approved: "assigned" }),
  });
  const data = await response.json();
  console.log(data);
  const requestItem = button.closest(".d-flex");
  requestItem.remove();
};

// Function to reject application
const reject = async (button, id) => {
  const response = await fetch(`http://localhost:5000/job-application/${id}`, {
    method: "PATCH",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ approved: "rejected" }),
  });
  const data = await response.json();
  console.log(data);
  const requestItem = button.closest(".d-flex");
  requestItem.remove();
};
