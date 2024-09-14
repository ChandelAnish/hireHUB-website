let jobListings;

addEventListener('load', async () => {
    jobListings = await getAvailability()
    // console.log(jobListings)
    displayJobListings()
})


const getAvailability = async () => {
    const user = JSON.parse(sessionStorage.getItem('userdetails')).username
    const response = await fetch(`${BASE_URL}/post-Availability/${user}`)
    const data = await response.json()
    return data
}

const updateAvailability = async (id, newdata) => {
    const response = await fetch(`${BASE_URL}/post-Availability/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(newdata)
    })
    const data = await response.json()
    return data
}


// let jobListings = [{
//     email: "goxixa1793@lendfash",
//     experienceYrs: "15",
//     job: "carpenter",
//     jobtype: "Part time",
//     min_pay: "10000000",
//     name: "anish",
//     skills: "cutting",
//     state: "bihar",
//     user: "akash"
// }];
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

    // Validation
    if (!name || !state || !email || !min_pay || !experienceYrs || !skills) {
        alert("Please fill out all required fields.");
        return;
    }


    // Create a new job listing object
    const newJob = {
        name,
        state,
        email,
        job,
        jobtype,
        min_pay,
        experienceYrs,
        skills
    };

    // Add the new job listing to the array
    jobListings.push(newJob);

    //posting Availability in database
    const user = JSON.parse(sessionStorage.getItem('userdetails')).username
    post_Availability({...newJob,user})

    // Update the job listings display
    displayJobListings();

    // Clear the form
    document.getElementById('availabilityForm').reset();
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
    <div class="card-body clearfix" id="${index}">
        <button type="button" class="btn-close float-end" aria-label="Close" onclick="removeAvailability('${jobListings[index].id}',${index})"></button>
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

function displaySingleCard(job, index) {
    const jobListingsContainer = document.getElementById('job-listings');

    const jobCard = document.createElement('div');
    jobCard.classList.add('card', 'mb-3');
    jobCard.id = `c${index}`
    jobCard.innerHTML = `
    <div class="card-body clearfix" id="${index}">
        <button type="button" class="btn-close float-end" aria-label="Close" onclick="removeAvailability('${jobListings[index].id}',${index})"></button>
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

    const cardwraper = document.getElementById(`c${index}`)
    const jobcard = document.getElementById(`${index}`)

    const postbtn = document.createElement("button")
    postbtn.className = "btn btn-warning edit-button ms-2 fw-medium"
    postbtn.textContent = "POST"
    jobcard.appendChild(postbtn)


    // console.log(jobcard.children)
    // console.log(jobcard.children[3].children[1])
    jobcard.children[1].innerHTML = `<input type="text" value="${jobcard.children[1].textContent}">`
    jobcard.children[2].children[0].innerHTML = `<input type="text" value="${jobcard.children[2].children[0].textContent}">`
    jobcard.children[2].children[1].innerHTML = `<input type="text" value="${jobcard.children[2].children[1].textContent}">`
    jobcard.children[3].children[1].innerHTML = `<input type="number" value="${jobcard.children[3].children[1].textContent}">`
    jobcard.children[4].children[1].innerHTML = `<input type="number" value="${jobcard.children[4].children[1].textContent}">`
    jobcard.children[5].children[1].innerHTML = `<input type="text" value="${jobcard.children[5].children[1].textContent}">`


    postbtn.addEventListener("click", async () => {

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
        };

        console.log(editedJob, index)
        cardwraper.remove();
        displaySingleCard(editedJob, index)
        const data = await updateAvailability(jobListings[index].id, editedJob)
        console.log(data)
    })
}

const removeAvailability = async(id,index) => {
    // console.log(id,index)
    const cardwraper = document.getElementById(`c${index}`)
    cardwraper.remove();

    //deleting from database
    const response = await fetch(`${BASE_URL}/post-Availability/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': "application/json"
        }
    })
    const data = await response.json()
    // console.log(data)
}


//post Availability
const post_Availability = async (postAvailabilityObject) => {
    const response = await fetch(`${BASE_URL}/post-Availability`,{
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(postAvailabilityObject)
    })
    const data = await response.json();
    return data;
}