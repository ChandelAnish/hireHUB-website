const titlefilter = document.getElementById('titlefilter')
const locationfilter = document.getElementById('locationfilter')


let currentjoblist;
let i=0

titlefilter.addEventListener('input', (e) => {
    if(i==0){
        currentjoblist = Array.from(document.querySelectorAll('.jobcard'))
        i=1;
    }

    const jobContainer = document.querySelector('.jobcontainer')
    const searchword = e.target.value;

    const filteredjoblist = currentjoblist.filter((item) => {
        const jobtitle = item.childNodes[4].textContent;
        return jobtitle.toLowerCase().includes(searchword.toLowerCase())
    })

    jobContainer.innerHTML = '';

    filteredjoblist.forEach((item) => {
        jobContainer.appendChild(item);
    })
})


locationfilter.addEventListener('input', (e) => {
    if(i==0){
        currentjoblist = Array.from(document.querySelectorAll('.jobcard'))
        i=1;
    }

    const jobContainer = document.querySelector('.jobcontainer')
    const searchword = e.target.value;

    const filteredjoblist = currentjoblist.filter((item) => {
        const jobtitle = item.childNodes[8].textContent;
        return jobtitle.toLowerCase().includes(searchword.toLowerCase())
    })

    jobContainer.innerHTML = '';

    filteredjoblist.forEach((item) => {
        jobContainer.appendChild(item);
    })
})