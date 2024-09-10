const BASE_URL = "http://localhost:5000";
const userdetails = JSON.parse(sessionStorage.getItem("userdetails"));

// Handle Confirm button clicks
document.querySelectorAll(".confirm-btn").forEach((button) => {
  button.addEventListener("click", () => {
    // Remove the parent element of the clicked button (the request item)
    const requestItem = button.closest(".d-flex");
    requestItem.remove();
  });
});

// Handle Cancel button clicks
document.querySelectorAll(".cancel-btn").forEach((button) => {
  button.addEventListener("click", () => {
    // Remove the parent element of the clicked button (the request item)
    const requestItem = button.closest(".d-flex");
    requestItem.remove();
  });
});

//get the details of the applicants
const getLabourInfo = async (username) => {
  const response = await fetch(`${BASE_URL}/labour-info/${username}`);
  const data = await response.json();
//   console.log(data);
  return await data;
};

//get all the applications sent to this recruiter
const getApplications = async (username) => {
  const response = await fetch(
    `${BASE_URL}/job-application-recruiter/${username}`
  );
  const data = await response.json();
  //   console.log(data);
  return await data;
};

addEventListener("load", async () => {
  const applications = await getApplications(userdetails.userdetails);
  displayApplicants(applications);
});

function getStars(rating) {
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
}

const displayApplicants = async(applications) => {
  applications.forEach(async(item) => {
    console.log(item);
    const applicantDetails = await getLabourInfo(item.applicant);
    console.log(applicantDetails);
    document.getElementById(
      "applicantsList"
    ).innerHTML += `<div class="d-flex justify-content-between align-items-center mb-3">
                    <div class="d-flex align-items-center">
                        <div>
                            <strong>${item.applicant} &nbsp;<span class="rating" style="color: gold;">${getStars(2)}</span> </strong><br>
                            <small>${applicantDetails.completions} Jobs Completed</small>
                        </div>
                    </div>
                    <div>
                        <button class="btn btn-outline-success me-2 confirm-btn">Hire</button>
                        <button class="btn btn-outline-danger cancel-btn">Reject</button>
                    </div>
                </div>`;
  });
};
