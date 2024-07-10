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
    const jobcards = Array.from(document.querySelectorAll('.availability-card'))
    const jobtitles = Array.from(document.querySelectorAll('.jobtitle'))
    const container = Array.from(document.querySelectorAll('.container'))
    const categoryCard = Array.from(document.querySelectorAll('.category-card'))
    jobcards.forEach(i => {
        i.style.backgroundColor = 'rgb(14, 41, 12)'
    });
    jobtitles.forEach(i => {
        i.style.color = "rgb(18 136 51 / 94%)"
    });
    container.forEach(i => {
        i.style.backgroundColor = 'rgb(21 27 38)'
        i.style.boxShadow = '10px 5px 5px rgb(17 17 17)'
    });
    categoryCard.forEach(i => {
        i.style.backgroundColor = 'rgb(14, 41, 12)'
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
    const jobcards = Array.from(document.querySelectorAll('.availability-card'))
    const jobtitles = Array.from(document.querySelectorAll('.jobtitle'))
    const container = Array.from(document.querySelectorAll('.container'))
    const categoryCard = Array.from(document.querySelectorAll('.category-card'))
    jobcards.forEach(i => {
        i.style.backgroundColor = 'white'
    });
    jobtitles.forEach(i => {
        i.style.color = "rgb(106 248 146 / 94%)"
    });
    container.forEach(i => {
        i.style.backgroundColor = 'white'
        i.style.boxShadow = '10px 5px 5px rgb(226 226 226)'
    });
    categoryCard.forEach(i => {
        i.style.backgroundColor = 'white'
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


const getAvailability = async () => {
    const response = await fetch(`${BASE_URL}/post-Availability`);
    const data = await response.json();
    return await data;
}

const getLabourInfo = async (username) => {
    const response = await fetch(`${BASE_URL}/labour-info/${username}`);
    const data = await response.json();
    return await data;
}

let availabilityList = [
    // {
    //     email: "aditripathi1357@gmail.com",
    //     experienceYrs: "41",
    //     id: "20ca63c2-46cd-4017-b5f0-73639202846e",
    //     job: "Plumber",
    //     jobtype: "Part time",
    //     min_pay: "454545",
    //     name: "anish",
    //     posttime: "2024-06-17T15:59:09.517Z",
    //     skills: "irutoi hoiupf gopifsdujg op",
    //     state: "bihar",
    //     user: "ram"
    // }
];

const categories = [
    { icon: `<i class="fa-solid fa-person-digging"></i>`, name: 'Construction', available: 123 },
    { icon: `<i class="fa-solid fa-plug"></i>`, name: 'Electrical', available: 67 },
    { icon: `<i class="fa-solid fa-toilet"></i>`, name: 'Plumbing', available: 98 },
    { icon: `<i class="fa-solid fa-brush"></i>`, name: 'Painting', available: 45 },
    { icon: `<i class="fa-solid fa-tree"></i>`, name: 'Gardening', available: 50 },
    { icon: `<i class="fa-solid fa-house-chimney"></i>`, name: 'House Keeping', available: 77 },
    { icon: `<i class="fa-solid fa-hammer"></i>`, name: 'Carpentry', available: 89 },
    { icon: `<i class="fa-solid fa-wrench"></i>`, name: 'Mechanic', available: 29 },
];

addEventListener("load", async () => {
    const availability = await getAvailability();

    availabilityList = [...availabilityList, ...availability]

    // console.log(availabilityList)
    displayAvailability(availabilityList);
    displayCategories();
    if (sessionStorage.getItem('darkmode') === 'true') {
        darkbtn.checked = true;
        enableDark()
    }
    else {
        darkbtn.checked = false;
        enableLight()
    }
})


function displayAvailability(availabilityList) {
    const availabilityCards = document.getElementById('availability-cards');
    availabilityCards.innerHTML = '';
    // console.log(availabilityList)

    availabilityList.forEach(async (job) => {
        const availabilityCard = document.createElement('div');
        availabilityCard.classList.add('availability-card');

        const skills = job.skills.split(/[ ]+/g)
        const labourinfo = await getLabourInfo(job.user)
        // console.log(labourinfo)
        // console.log(skills)
        availabilityCard.innerHTML = `
                        <div class="profile row">
                            <img class="col-3 img-fluid" src=${labourinfo.userinfo.profileImgURL}
                                alt="profile-pic">
                            <div class="name col-7">
                                <h3 class="fs-3 fw-medium">${job.name}</h3>
                                <p>~${job.user}</p>
                            </div>
                        </div>
                        <div class="mt-1 fw-bold">${labourinfo.rating}⭐ | ${labourinfo.completions}</div>
                        <p class="mb-1 fw-bold">${job.state}</p>
            <h3 class="fs-5 fw-bold" style="color: rgb(83 232 125);">${job.job}</h3>
            <p class="fw-bold">₹${job.min_pay} /day</p>`;
        let i = 4;
        skills.map((item) => {
            if (i == 0) return;
            availabilityCard.innerHTML += `<span class="badge rounded-pill me-2 mt-2" style="background-color: rgb(83 232 125);">${item}</span>`
            i--;
        })

        availabilityCards.appendChild(availabilityCard);
    });
}

function displayCategories() {
    const categoryCards = document.getElementById('category-cards');
    categoryCards.innerHTML = '';

    categories.forEach(category => {
        const categoryCard = document.createElement('div');
        categoryCard.classList.add('category-card');

        categoryCard.innerHTML = `
            <div class="fs-1 mb-3" style="color: rgb(40, 185, 81);">${category.icon}</div>
            <h3 class="fs-6 fw-bold mb-2">${category.name}</h3>
            <p style="color: rgb(40, 185, 81);">${category.available} Available</p>
        `;

        categoryCards.appendChild(categoryCard);
    });
}

document.getElementById('featuredBtn').click();
function filterByType(type) {
    const filteredJobs = availabilityList.filter(job => job.jobtype === type || type === 'Featured');
    const availabilityCards = document.getElementById('availability-cards');
    if (type == 'Featured') {
        document.getElementById('featuredLine').style.backgroundColor = "rgb(40, 185, 81)"
        document.getElementById('fullTimeLine').style.backgroundColor = "#e2e3e5"
        document.getElementById('partTimeLine').style.backgroundColor = "#e2e3e5"
    }
    else if (type == 'Full Time') {
        document.getElementById('featuredLine').style.backgroundColor = "#e2e3e5"
        document.getElementById('fullTimeLine').style.backgroundColor = "rgb(40, 185, 81)"
        document.getElementById('partTimeLine').style.backgroundColor = "#e2e3e5"
    }
    else {
        document.getElementById('featuredLine').style.backgroundColor = "#e2e3e5"
        document.getElementById('fullTimeLine').style.backgroundColor = "#e2e3e5"
        document.getElementById('partTimeLine').style.backgroundColor = "rgb(40, 185, 81)"
    }
    availabilityCards.innerHTML = '';

    displayAvailability(filteredJobs)
}