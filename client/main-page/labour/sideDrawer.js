//userprofile

const userProfile = () => {
    const userdetails = JSON.parse(sessionStorage.getItem("userdetails"))
    console.log(userdetails)
    console.log(userdetails.username)
    const userProfileContent = document.getElementById('userProfileContent')
    userProfileContent.innerHTML=
    `<img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="">
    <span class="ms-3 mt-1">${userdetails.username}</span>
    <span class="ms-3 mt-1">${userdetails.email}</span>
    <span class="ms-3 mt-1 text-uppercase font-bold text-gray-400">${userdetails.usertype}</span>`
}
userProfile()