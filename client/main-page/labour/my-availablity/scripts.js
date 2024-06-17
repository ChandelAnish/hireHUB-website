let jobListings = [{
    email: "goxixa1793@lendfash",
    experienceYrs: "15",
    job: "carpenter",
    jobtype: "Part time",
    min_pay: "10000000",
    name: "anish",
    skills: "cutting",
    state: "bihar",
    user: "akash"
}];
// console.log(jobListings)

function postAvailability() {
    // Retrieve form data
    const name = document.getElementById('name').value;
    const state = document.getElementById('state').value;
    const email = document.getElementById('email').value;
    const job = document.getElementById('job').value;
    const jobtype = document.getElementById('jobtype').value;
    const min_pay = document.getElementById('min_pay').value;
    const experienceYrs = document.getElementById('experienceYrs').value;
    const skills = document.getElementById('skills').value;

    // const postAvailabilityObj = { email, experienceYrs, job, jobtype, min_pay, name, skills, state }
    // console.log(postAvailabilityObj)

    // Validation
    if (!name || !state || !email || !min_pay || !experienceYrs || !skills) {
        alert("Please fill out all required fields.");
        return;
    }

    // Create a new job listing object
    const newJob = {
        // name,
        state,
        // email,
        job,
        jobtype,
        min_pay,
        experienceYrs,
        skills
    };

    // Add the new job listing to the array
    jobListings.push(newJob);

    // Update the job listings display
    displayJobListings();

    // Clear the form
    document.getElementById('availabilityForm').reset();

    // Display success message
    alert("Availability posted successfully!");
}

function resetForm() {
    // reset the form
    document.getElementById('availabilityForm').reset();
}

function displayJobListings() {
    const jobListingsContainer = document.getElementById('job-listings');
    jobListingsContainer.innerHTML = '';

    jobListings.forEach((job, index) => {
        const jobCard = document.createElement('div');
        jobCard.classList.add('card', 'mb-3');
        jobCard.id = `c${index}`
        jobCard.innerHTML = `
    <div class="card-body" id="${index}">
        <h5 class="card-title">${job.job}</h5>

        <h6 class="card-subtitle mb-2 text-muted">
            <span>${job.jobtype}</span> | 
            <span> ${job.state}</span>
        </h6>

        <p class="card-text">
            <strong>Min Pay:</strong>
            ₹<span>${job.min_pay}</span>
        </p>

        <p class="card-text">
            <strong>experienceYrs:</strong>
            <span>${job.experienceYrs}</span>years
        </p>

        <p class="card-text">
            <strong>Skills:</strong>
            <span>${job.skills}</span>
        </p>

        <button class="btn btn-warning edit-button" onclick="editJob(${index})">
            <i class="bi bi-pencil-square"></i>
        </button>
    </div>
        `;
        jobListingsContainer.appendChild(jobCard);
    });
}
displayJobListings()

function displaySingleCard(job,index) {
    const jobListingsContainer = document.getElementById('job-listings');

    const jobCard = document.createElement('div');
    jobCard.classList.add('card', 'mb-3');
    jobCard.id = `c${index}`
    jobCard.innerHTML = `
    <div class="card-body" id="${index}">
        <h5 class="card-title">${job.job}</h5>

        <h6 class="card-subtitle mb-2 text-muted">
            <span>${job.jobtype}</span> | 
            <span> ${job.state}</span>
        </h6>

        <p class="card-text">
            <strong>Min Pay:</strong>
            ₹<span>${job.min_pay}</span>
        </p>

        <p class="card-text">
            <strong>experienceYrs:</strong>
            <span>${job.experienceYrs}</span>years
        </p>

        <p class="card-text">
            <strong>Skills:</strong>
            <span>${job.skills}</span>
        </p>

        <button class="btn btn-warning edit-button" onclick="editJob(${index})">
            <i class="bi bi-pencil-square"></i>
        </button>
    </div>
        `;
    jobListingsContainer.appendChild(jobCard);
}



function editJob(index) {
    // const job = jobListings[index];
    // document.getElementById('name').value = job.name;
    // document.getElementById('state').value = job.state;
    // document.getElementById('email').value = job.email;
    // document.getElementById('job').value = job.job;
    // document.getElementById('jobtype').value = job.jobtype;
    // document.getElementById('min_pay').value = job.min_pay;
    // document.getElementById('experienceYrs').value = job.experienceYrs;
    // document.getElementById('skills').value = job.skills;
    // const togglebtn = document.getElementById('togglebtn')
    // togglebtn.innerHTML = "Edit";

    // const name = document.getElementById('name').value;
    // const state = document.getElementById('state').value;
    // const email = document.getElementById('email').value;
    // const jobs = document.getElementById('job').value;
    // const jobtype = document.getElementById('jobtype').value;
    // const min_pay = document.getElementById('min_pay').value;
    // const experienceYrs = document.getElementById('experienceYrs').value;
    // const skills = document.getElementById('skills').value;

    // togglebtn.addEventListener("click",()=>{
    //     jobListings=
    // })

    const cardwraper = document.getElementById(`c${index}`)
    const jobcard = document.getElementById(`${index}`)

    const postbtn = document.createElement("button")
    postbtn.className = "btn btn-warning edit-button ms-2 fw-medium"
    postbtn.textContent = "POST"
    jobcard.appendChild(postbtn)


    // console.log(jobcard.children)
    // console.log(jobcard.children[3].children[1])
    jobcard.children[0].innerHTML = `<input type="text" value="${jobcard.children[0].textContent}">`
    jobcard.children[1].children[0].innerHTML = `<input type="text" value="${jobcard.children[1].children[0].textContent}">`
    jobcard.children[1].children[1].innerHTML = `<input type="text" value="${jobcard.children[1].children[1].textContent}">`
    jobcard.children[2].children[1].innerHTML = `<input type="number" value="${jobcard.children[2].children[1].textContent}">`
    jobcard.children[3].children[1].innerHTML = `<input type="number" value="${jobcard.children[3].children[1].textContent}">`
    jobcard.children[4].children[1].innerHTML = `<input type="text" value="${jobcard.children[4].children[1].textContent}">`


    postbtn.addEventListener("click", () => {

        const inputs = Array.from(jobcard.querySelectorAll("input"))
        const inputsvalue = inputs.map((item) => {
            return item.value
        })

        let editedJob = {
            job: inputsvalue[0],
            jobtype: inputsvalue[1],
            state: inputsvalue[2],
            min_pay: inputsvalue[3],
            experienceYrs: inputsvalue[4],
            skills: inputsvalue[5]
        }
        // console.log(editedJob,index)
        cardwraper.remove();
        displaySingleCard(editedJob,index)
    })
}