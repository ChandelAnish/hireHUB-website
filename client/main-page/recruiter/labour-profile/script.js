const profileImg = document.getElementById("profileImg")
const labourName = document.getElementById("name")
const username = document.getElementById("username")
const job = document.getElementById("job")
const min_pay = document.getElementById("min_pay")

const getSingleAvailability = async (id) => {
    try {
        const response = await fetch(`${BASE_URL}/single-Availability/${id}`);
        const data = await response.json();
        return await data;
    } catch (error) {
        console.log("some error occured : ",error)
    }
}

addEventListener("load",async()=>{
    const availabilityId = sessionStorage.getItem("availabilityId");
    console.log(availabilityId)
    const availabilityDetails = await getSingleAvailability(availabilityId)
    console.log(availabilityDetails)
    //attaching profile img
    if(availabilityDetails.postedby.userinfo.profileImgURL){
        profileImg.src=availabilityDetails.postedby.userinfo.profileImgURL
    }
    labourName.textContent = availabilityDetails.name
    username.textContent = availabilityDetails.user
    job.textContent = availabilityDetails.job
    min_pay.textContent = availabilityDetails.min_pay
    console.log(labourName.textContent)
})

