const darkbtn = document.querySelector('#flexSwitchCheckChecked')
const body = document.getElementsByTagName('body')[0]
const nav = document.getElementsByTagName('nav')[0]
const inputs = Array.from(document.getElementsByTagName('input'))
const jobcontainer = document.querySelector('.jobcontainer')
const BASE_URL = 'http://localhost:5000';


const enableDark = () => {
    sessionStorage.setItem('darkmode', true)
    body.style.backgroundColor = '#121721';
    nav.style.backgroundColor = 'rgb(14 41 12)';
    inputs.forEach(i => {
        i.style.backgroundColor = 'rgb(14, 41, 12)'
        i.style.color = 'white'
    });
    const jobcards = Array.from(document.querySelectorAll('.jobcard'))
    const jobtitles = Array.from(document.querySelectorAll('.jobtitle'))
    jobcards.forEach(i => {
        i.style.backgroundColor = 'rgb(14, 41, 12)'
    });
    jobtitles.forEach(i => {
        i.style.color = "rgb(18 136 51 / 94%)"
    });
}

const enableLight = () => {
    sessionStorage.setItem('darkmode', false)
    nav.style.backgroundColor = 'white';
    body.style.backgroundColor = 'rgb(243, 243, 243)';
    inputs.forEach(i => {
        i.style.backgroundColor = 'white'
        i.style.color = 'black'
    });
    const jobcards = Array.from(document.querySelectorAll('.jobcard'))
    const jobtitles = Array.from(document.querySelectorAll('.jobtitle'))
    jobcards.forEach(i => {
        i.style.backgroundColor = 'white'
    });
    jobtitles.forEach(i => {
        i.style.color = "rgb(106 248 146 / 94%)"
    });
}

darkbtn.addEventListener('change', (evt) => {
    if (evt.target.checked) {
        enableDark();
    }
    else {
        enableLight()
    }
})


const getjobs = async () => {
    const response = await fetch(`${BASE_URL}/post-jobs`);
    const data = await response.json();
    return await data;
}

const createjobcards = (jobs) => {
    jobs.forEach((item) => {
        const jobCard = document.createElement('div');
        jobCard.className = 'jobcard';
        jobCard.innerHTML =
            `<div class="joblogo"><img src="../../assets/plumber-logo.png" alt=""></div>
        <div class="time">
            <h3>${item.posttime}</h3>
            <h3>${item.jobtype}</h3>
        </div>
        <h2 class="jobtitle">${item.jobtitle}</h2>
        <h3 class="company">${item.company}</h3>
        <h4 class="state">${item.state}</h4>`;

        jobcontainer.appendChild(jobCard);
    });
    //if dark mode already enabled
    if (darkbtn.checked) {
        const jobcards = document.querySelectorAll('.jobcard');
        const jobtitles = document.querySelectorAll('.jobtitle');
        jobcards.forEach(i => {
            i.style.backgroundColor = 'rgb(14, 41, 12)';
        });
        jobtitles.forEach(i => {
            i.style.color = 'rgb(18 136 51 / 94%)';
        });
    }
}

addEventListener("load", async () => {
    const jobs = await getjobs();
    createjobcards(jobs);
    if (sessionStorage.getItem('darkmode') === 'true') {
        darkbtn.checked = true;
        enableDark()
    }
    else {
        darkbtn.checked = false;
        enableLight()
    }
})


//userprofile

const userProfile = () => {
    const userdetails = JSON.parse(sessionStorage.getItem("userdetails"))
    console.log(userdetails)
}