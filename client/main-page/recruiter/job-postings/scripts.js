const BASE_URL = 'http://localhost:5000';

let jobListings;

addEventListener('load', async () => {
    jobListings = await getAllJobs()
    console.log(jobListings)
    displayJobListings()
})


const getAllJobs = async () => {
    const username = JSON.parse(sessionStorage.getItem('userdetails')).username
    const response = await fetch(`${BASE_URL}/recruiter-posted-jobs/${username}`)
    const data = await response.json()
    return data
}

//post Job
const postjob = async (job) => {
    const response = await fetch(`${BASE_URL}/post-jobs`,{
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(job)
    })
    const data = await response.json();
    return data;
}

const postJob = async() => {
    const postjobform = document.getElementById("postjobform")

    const jobtitle = postjobform.jobtitle.value;
    const jobtype = postjobform.jobtype.value;
    let tasks = postjobform.tasks.value.split(/[,]+/g);
    const company = postjobform.company.value;
    const salary = postjobform.salary.value;
    const location = postjobform.location.value;
    const skills = postjobform.skills.value;
    const jobdescription = postjobform.jobdescription.value;
    const state = postjobform.state.value;
    const user = JSON.parse(sessionStorage.getItem('userdetails')).username;
    const posttime = Date.now().toString();

    tasks=tasks.map((item)=>{
        return {task:item,completed:false}
    })
    // console.log(tasks)

    const job = { jobtitle, jobtype, tasks, company, salary, location, skills, jobdescription, state, user,posttime };
    console.log(job)
    const response = await postjob(job)
    console.log(response)
}

const updateJob = async (id, newdata) => {
    const response = await fetch(`${BASE_URL}/post-jobs/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify(newdata)
    })
    const data = await response.json()
    return data
}


function resetForm() {
    // reset the form
    document.getElementById('postjobform').reset();
}

// function to calculate post time
const postTime = (posttime) => {
    const time = Date.now() - posttime;
    // console.log(time)
    let sec = Math.floor((Math.floor(time / 1000)))
    let min = Math.floor(sec / 60)
    let hr = Math.floor(min / 60)
    let day = Math.floor(hr / 24)
    let months = Math.floor(day / 30)
    if (sec < 60) {
        return `${sec} sec ago`
    }
    else if (min < 60) {
        return `${min} min ago`
    }
    else if (hr < 24) {
        return `${hr} hr ago`
    }
    else if (day < 30) {
        return `${day} day ago`
    }
    else {
        return `${months} months ago`
    }
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
        <button type="button" class="btn-close float-end" aria-label="Close" onclick="deleteJob('${jobListings[index].id}',${index})"><i class="fa-solid fa-xmark"></i></button>
        <h5 class="card-title fs-4 fw-semibold text-body-secondary">${job.jobtitle}</h5>

        <h6 class="card-subtitle mb-3 text-muted clearfix">
            <span>${job.jobtype}</span> | 
            <span> ${job.location}</span> |
            <span> ${job.state}</span>
            <span class="float-end" style="font-size: 12px;">${postTime(Number(job.posttime))}</span>
        </h6>

        <p class="card-text mb-1">
            <strong>Salary:</strong>
            ₹<span>${job.salary}</span> /day
        </p>

        <p class="card-text mb-1">
            <strong>Job Description:</strong>
            <span>${job.jobdescription}</span>
        </p>

        <p class="card-text mb-1">
            <strong>Skills:</strong>
            <span>${job.skills}</span>
        </p>

        <div class="card-text mb-1 d-flex gap-4">
            <strong>Tasks: </strong>
            <ul id="jobTasks${index}" style="list-style-type:disc">
            </ul>
        </div>


        <p class="card-text mb-1">
            <strong>Status:</strong>
            <span>${job.status}</span>
        </p>

        <button class="btn btn-warning edit-button" onclick="editJob(${index},${JSON.stringify(job.tasks).replace(/"/g, "&quot;")})">
            <i class="bi bi-pencil-square"></i>
        </button>
    </div>`;

    jobListingsContainer.appendChild(jobCard);
    job.tasks.forEach(item => {
        // console.log(item.task)
        document.getElementById(`jobTasks${index}`).innerHTML+=`<li>${item.task}</li>`
        });
    });
}

function displaySingleCard(job, index) {
    const jobListingsContainer = document.getElementById('job-listings');

    const jobCard = document.createElement('div');
    jobCard.classList.add('card', 'mb-3');
    jobCard.id = `c${index}`
    jobCard.innerHTML = `
    <div class="card-body clearfix" id="${index}">
        <button type="button" class="btn-close float-end" aria-label="Close" onclick="deleteJob('${jobListings[index].id}',${index})"><i class="fa-solid fa-xmark"></i></button>
        <h5 class="card-title fs-4 fw-semibold text-body-secondary">${job.jobtitle}</h5>

        <h6 class="card-subtitle mb-3 text-muted clearfix">
            <span>${job.jobtype}</span> | 
            <span> ${job.location}</span> |
            <span> ${job.state}</span>
            <span class="float-end" style="font-size: 12px;">${postTime(Number(job.posttime))}</span>
        </h6>

        <p class="card-text mb-1">
            <strong>Salary:</strong>
            ₹<span>${job.salary}</span> /day
        </p>

        <p class="card-text mb-1">
            <strong>Job Description:</strong>
            <span>${job.jobdescription}</span>
        </p>

        <p class="card-text mb-1">
            <strong>Skills:</strong>
            <span>${job.skills}</span>
        </p>

        <div class="card-text mb-1 d-flex gap-4">
            <strong>Tasks: </strong>
            <ul id="jobTasks${index}" style="list-style-type:disc">
            </ul>
        </div>


        <p class="card-text mb-1">
            <strong>Status:</strong>
            <span>${job.status}</span>
        </p>

        <button class="btn btn-warning edit-button" onclick="editJob(${index},${JSON.stringify(job.tasks).replace(/"/g, "&quot;")})">
            <i class="bi bi-pencil-square"></i>
        </button>
    </div>`;
    jobListingsContainer.appendChild(jobCard);
    job.tasks.forEach(item => {
        document.getElementById(`jobTasks${index}`).innerHTML+=`<li>${item.task}</li>`
        });
}

//function to add more task
const addTask=(taskElement)=>
{
    const icon = taskElement.lastElementChild;
    icon.remove()
    const inputelement = document.createElement('li')
    inputelement.innerHTML= `<input type="text">`
    taskElement.appendChild(inputelement)
    taskElement.appendChild(icon)
}

//function to delete task
const deleteTask = (item) =>
{
    item.parentElement.remove()
}

//function to edit job posting
function editJob(index,oldtasks) {

    const cardwraper = document.getElementById(`c${index}`)
    const jobcard = document.getElementById(`${index}`)

    if(jobcard.children[2].children[0].children[0]){
        return
    }

    const postbtn = document.createElement("button")
    postbtn.className = "btn btn-warning edit-button ms-2 fw-medium"
    postbtn.textContent = "POST"
    jobcard.appendChild(postbtn)


    // console.log(jobcard.children)
    // console.log(jobcard.children[6].children[1].children)

    // jobcard.children[1].innerHTML = `<input type="text" value="${jobcard.children[1].textContent}">`
    jobcard.children[1].innerHTML = `<select class="form-select mb-3 w-25">
                            <option ${(jobcard.children[1].textContent==='Construction')?'selected':null} value="Construction">Construction</option>
                            <option ${(jobcard.children[1].textContent==='Electrical')?'selected':null} value="Electrical">Electrical</option>
                            <option ${(jobcard.children[1].textContent==='Plumbing')?'selected':null} value="Plumbing">Plumbing</option>
                            <option ${(jobcard.children[1].textContent==='Painting')?'selected':null} value="Painting">Painting</option>
                            <option ${(jobcard.children[1].textContent==='Gardening')?'selected':null} value="Gardening">Gardening</option>
                            <option ${(jobcard.children[1].textContent==='HouseKeeping')?'selected':null} value="HouseKeeping">House Keeping</option>
                            <option ${(jobcard.children[1].textContent==='Carpentry')?'selected':null} value="Carpentry">Carpentry</option>
                            <option ${(jobcard.children[1].textContent==='Mechanic')?'selected':null} value="Mechanic">Mechanic</option>
                        </select>`
    jobcard.children[2].children[0].innerHTML = `<input type="text" value="${jobcard.children[2].children[0].textContent}">`
    jobcard.children[2].children[1].innerHTML = `<input type="text" value="${jobcard.children[2].children[1].textContent}">`
    jobcard.children[2].children[2].innerHTML = `<input type="text" value="${jobcard.children[2].children[2].textContent}">`
    jobcard.children[3].children[1].innerHTML = `<input type="number" value="${jobcard.children[3].children[1].textContent}">`
    jobcard.children[4].children[1].innerHTML = `<input type="text" value="${jobcard.children[4].children[1].textContent}">`//
    jobcard.children[5].children[1].innerHTML = `<input type="text" value="${jobcard.children[5].children[1].textContent}">`

    //putting input tag in all the tasks 
    Array.from(jobcard.children[6].children[1].children).forEach((item)=>{
        // console.log(item)
        item.innerHTML=`<input type="text" value="${item.textContent}"><i class="bi bi-trash3 ms-1 text-danger" onclick="deleteTask(this)"></i>`
    })
    const icon = document.createElement('div')
    icon.innerHTML=`<i class="bi bi-plus-circle fs-4" onclick="addTask(${jobcard.children[6].children[1].id})"></i>`
    icon.classList="text-center"
    jobcard.children[6].children[1].appendChild(icon)


    // handling post button click
    postbtn.addEventListener("click", async () => {
        jobcard.children[6].children[1].lastElementChild.remove();//removing the plus icon

        const jobtitle = jobcard.children[1].children[0].value
        // console.log(jobtitle)
        const inputs = Array.from(jobcard.querySelectorAll("input"))
        const inputsvalue = inputs.map((item) => {
            return item.value.trim()
        })

        //extracting all the new tasks
        const newTasks= Array.from(jobcard.children[6].children[1].children).map((item,index)=>{
            // console.log(item.children[0].value)
            if(index >= oldtasks.length){
                return { task:item.children[0].value,completed: false}
            }
            return { task:item.children[0].value,completed: oldtasks[index].completed}
        })
        // console.log(newTasks)

        let editedJob = {
            jobtitle: jobtitle,
            jobtype: inputsvalue[0],
            location:inputsvalue[1],
            state: inputsvalue[2],
            salary: inputsvalue[3],
            jobdescription: inputsvalue[4],
            skills: inputsvalue[5],
            tasks: newTasks
        };

        // console.log(editedJob, index)
        // console.log(jobcard.children[7].children[1].textContent)
        cardwraper.remove();
        displaySingleCard({...editedJob,status:jobcard.children[7].children[1].textContent}, index)
        const data = await updateJob(jobListings[index].id, editedJob)
        console.log(data)
    })
}

const deleteJob = async(id,index) => {
    // console.log(id,index)
    const cardwraper = document.getElementById(`c${index}`)
    cardwraper.remove();

    //deleting from database
    const response = await fetch(`${BASE_URL}/post-jobs/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': "application/json"
        }
    })
    const data = await response.json()
    // console.log(data)
}
