const form = document.getElementById('postAvailabilityForm')
const closeModel = document.getElementById('closeModelBtn')

const postAvailability = async () => {
    const name = form.name.value
    const state = form.state.value
    const email = form.email.value
    const job = form.job.value
    const jobtype = form.jobtype.value
    const min_pay = form.min_pay.value
    const experienceYrs = form.experienceYrs.value
    const skills = form.skills.value
    const user = JSON.parse(sessionStorage.getItem('userdetails')).username
    const post = { name, state, email, job, jobtype, min_pay, experienceYrs, skills,user }
    // console.log(post)
    const data = await post_Availability(post)
    console.log(data)
    closeModel.click();
}

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