const titlefilter = document.getElementById('titlefilter')
const locationfilter = document.getElementById('locationfilter')


let currentAvailabilityList;
let i=0

titlefilter.addEventListener('input', (e) => {
    if(i==0){
        currentAvailabilityList = Array.from(document.querySelectorAll('.availability-card'))
        i=1;
    }

    const availabilityContainer = document.querySelector('.availability-cards')
    const searchword = e.target.value;

    const filteredAvailabilityList = currentAvailabilityList.filter((item) => {
        // console.log(item.childNodes[5])
        const jobtitle = item.childNodes[7].textContent;
        return jobtitle.toLowerCase().includes(searchword.toLowerCase())
    })

    availabilityContainer.innerHTML = '';

    filteredAvailabilityList.forEach((item) => {
        availabilityContainer.appendChild(item);
    })
})


locationfilter.addEventListener('input', (e) => {
    if(i==0){
        currentAvailabilityList = Array.from(document.querySelectorAll('.availability-card'))
        i=1;
    }

    const availabilityContainer = document.querySelector('.availability-cards')
    const searchword = e.target.value;

    const filteredAvailabilityList = currentAvailabilityList.filter((item) => {
        const state = item.childNodes[5].textContent;
        return state.toLowerCase().includes(searchword.toLowerCase())
    })

    availabilityContainer.innerHTML = '';

    filteredAvailabilityList.forEach((item) => {
        availabilityContainer.appendChild(item);
    })
})