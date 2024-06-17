const BASE_URL = 'http://localhost:5000';

// // Function to go back (if needed)
// function goBack() {
//     window.history.back();
// }

// // Apply button functionality
// const applyButtons = document.querySelectorAll('.apply-job');

// applyButtons.forEach(button => {
//     button.addEventListener('click', function() {
//         const confirmation = confirm("Are you sure you want to apply for this job?");
//         if (confirmation) {
//             alert("You have successfully applied for the job!");
//             // Here you can add the logic to submit the application
//         } else {
//             alert("Application cancelled.");
//         }
//     });
// });

// // Copy URL button functionality
// document.querySelector('.copy-url').addEventListener('click', function() {
//     const urlInputElement = document.querySelector('.job-url input');
//     urlInputElement.select();
//     document.execCommand('copy');
//     alert("URL Copied to Clipboard: " + urlInputElement.value);
// });

const jobtitle = document.getElementById('jobtitle')
const state = document.getElementById('state')
const joblocation = document.getElementById('joblocation')
const jobdescription = document.getElementById('jobdescription')
const salary = document.getElementById('salary')
const jobtype = document.getElementById('jobtype')
const tasklist = document.getElementById('tasklist')
const roleinfo = document.querySelector('.role-info')
const skills = document.getElementById('skills')

const getSingleJobs = async (job_id) => {
    const response = await fetch(`${BASE_URL}/post-jobs/${job_id}`);
    const data = await response.json();
    return data;
}

addEventListener('load', async () => {
    const job_id = sessionStorage.getItem('job_id')
    const singlejob = await getSingleJobs(job_id)
    // console.log(singlejob)
    jobtitle.innerHTML=singlejob.jobtitle
    joblocation.innerHTML=`at ${singlejob.location}, ${singlejob.state}`
    jobdescription.innerHTML=singlejob.jobdescription
    state.innerHTML=singlejob.state
    salary.innerHTML=`Salary : ₹ ${singlejob.salary}`
    jobtype.innerHTML=singlejob.jobtype


    singlejob.tasks.map((item)=>{
        tasklist.innerHTML+=`<li class="m-2" style="color: #666;">${item}</li>`
    })

    roleinfo.children[0].innerHTML=`${singlejob.jobtitle} (${singlejob.jobtype})`
    roleinfo.children[1].innerHTML=`${singlejob.location}, ${singlejob.state}`
    roleinfo.children[2].innerHTML=`₹ ${singlejob.salary} + Benefits`
    roleinfo.children[3].innerHTML=singlejob.jobdescription

    const skillsArray = singlejob.skills.split(" ");
    skillsArray.map((item)=>{
        skills.innerHTML+=`<span>${item}</span>`
    })
})