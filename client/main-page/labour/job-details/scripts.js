const BASE_URL = 'http://localhost:5000';
let appliedToUser;

const jobtitle = document.getElementById('jobtitle')
const state = document.getElementById('state')
const joblocation = document.getElementById('joblocation')
const jobdescription = document.getElementById('jobdescription')
const salary = document.getElementById('salary')
const jobtype = document.getElementById('jobtype')
const tasklist = document.getElementById('tasklist')
const roleinfo = document.querySelector('.role-info')
const skills = document.getElementById('skills')
const alert = document.getElementById('alert')
const applicationstatus = document.getElementById('applicationstatus')
const startWork = document.getElementById('startWork')

// fetch single job details to display
const getSingleJobs = async (job_id) => {
    const response = await fetch(`${BASE_URL}/post-jobs/${job_id}`);
    const data = await response.json();
    return data;
}


addEventListener('load', async () => {
    const job_id = sessionStorage.getItem('job_id')
    const singlejob = await getSingleJobs(job_id)
    console.log(singlejob)
    jobtitle.innerHTML = singlejob.jobtitle
    joblocation.innerHTML = `at ${singlejob.location}, ${singlejob.state}`
    jobdescription.innerHTML = singlejob.jobdescription
    state.innerHTML = singlejob.state
    salary.innerHTML = `Salary : ₹ ${singlejob.salary}`
    jobtype.innerHTML = singlejob.jobtype
    appliedToUser=singlejob.user
    console.log(appliedToUser)


    singlejob.tasks.map((item) => {
        tasklist.innerHTML += `<li class="m-2" style="color: #666;">${item.task}</li>`
    })

    roleinfo.children[0].innerHTML = `${singlejob.jobtitle} (${singlejob.jobtype})`
    roleinfo.children[1].innerHTML = `${singlejob.location}, ${singlejob.state}`
    roleinfo.children[2].innerHTML = `₹ ${singlejob.salary} + Benefits`
    roleinfo.children[3].innerHTML = singlejob.jobdescription

    const skillsArray = singlejob.skills.split(" ");
    skillsArray.map((item) => {
        skills.innerHTML += `<span>${item}</span>`
    })

    // status of application
    const status = await checkApplicationStatus()
    if (status) {
        applicationstatus.innerHTML = status.approved;
        if (status.approved == "pending") {
            applicationstatus.style.color = "yellow"
        }
        else if (status.approved == "assigned") {
            applicationstatus.style.color = "#75ff26"
            startWork.innerHTML = `<button class="btn btn-success" style="height: 45px; background-color: #28b951" id="start" onclick="monitorProgress()">Start Work</button>`
        }
        else {
            applicationstatus.style.color = "red"
        }
    }
    else {
        applicationstatus.innerHTML = "Not Applied";
        applicationstatus.style.color = "grey"
    }
})

// to check application status
const checkApplicationStatus = async (user) => {
    const job_id = sessionStorage.getItem('job_id')
    const username = JSON.parse(sessionStorage.getItem('userdetails')).username
    const response = await fetch(`${BASE_URL}/job-application/${username}/${job_id}`)
    const data = await response.json()
    return data
}


// apply for job
const applyjob = async () => {
    const job_id = sessionStorage.getItem('job_id')
    const username = JSON.parse(sessionStorage.getItem('userdetails')).username
    // console.log(job_id)
    // console.log(username)
    const response = await fetch(`${BASE_URL}/job-application`, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            jobid: job_id,
            applicant: username,
            appliedToUser:appliedToUser
        })
    })
    const data = await response.json()
    console.log(data)
    if (data.msg) {
        showAlert("danger", data.msg, 3000)
    }
    else {
        showAlert("success", "Successfully applied for the job", 2000)
        sessionStorage.setItem("applicationID", data.id)
        const status = await checkApplicationStatus(data.id)
        applicationstatus.innerHTML = status.approved;
        if (status.approved == "pending") {
            applicationstatus.style.color = "yellow"
        }
        else if (status.approved == "assigned") {
            applicationstatus.style.color = "#75ff26"
        }
        else {
            applicationstatus.style.color = "red"
        }
    }
}

// display alert
const showAlert = (type, msg, time) => {
    alert.innerHTML =
        `<div class="alert alert-${type}" role="alert">
        ${msg}
    </div>`
    setTimeout(() => {
        alert.innerHTML = ''
    }, time);
}

//open progress page
const monitorProgress =()=>{
    window.open("../work-progress/index.html","_parent")
}