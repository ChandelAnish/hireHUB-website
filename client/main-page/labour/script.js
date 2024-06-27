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
        i.style.color = "rgb(41 206 88)"
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

const categories = {
    Construction: `<i class="fa-solid fa-person-digging"></i>`,
    Electrical: `<i class="fa-solid fa-plug"></i>`,
    Plumbing: `<i class="fa-solid fa-toilet"></i>`,
    Painting: `<i class="fa-solid fa-brush"></i>`,
    Gardening: `<i class="fa-solid fa-tree"></i>`,
    HouseKeeping: `<i class="fa-solid fa-house-chimney"></i>`,
    Carpentry: `<i class="fa-solid fa-hammer"></i>`,
    Mechanic: `<i class="fa-solid fa-wrench"></i>`,
};

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

const createjobcards = (jobs) => {
    jobs.forEach((item) => {
        const jobCard = document.createElement('div');
        jobCard.className = 'jobcard';
        jobCard.innerHTML =
            `<div class="joblogo">${categories[item.jobtitle]}</div>
        <div class="time">
            <h3 style="font-weight: 500;">${postTime(Number(item.posttime))}</h3>
            <h3 style="font-weight: 500;">| ${item.jobtype}</h3>
        </div>
        <h2 class="jobtitle" style="font-size: 27px; font-weight: 700; margin-bottom:10px;">${item.jobtitle}</h2>
        <h3 class="company" style="font-weight: 500;">${item.company}</h3>
        <h4 class="state" style="font-weight: 700;">${item.state}</h4>`;

        jobcontainer.appendChild(jobCard);
        jobCard.addEventListener('click', () => {
            window.open('./job-details/index.html', '_parent')
            sessionStorage.setItem('job_id', item.id)
        })
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