const userdetails = JSON.parse(sessionStorage.getItem("userdetails"));

const userProfile = () => {
    const userProfileContent = document.getElementById('userProfileContent');
    userProfileContent.innerHTML =
        `<form id="profileForm">
            <i class="fa-regular fa-square-plus float-left fs-4" style="position: relative; color: rgb(107 114 128); right: 49px;" onclick="openImageUpload()"></i>

            <input type="file" placeholder="" style="display: none;" id="imageUpload" name="profile-img">

            <button type="submit" id="uploadBtn" class="btn btn-secondary btn-sm">Upload</button>
        </form>
        <img src="${userdetails.profileImgURL}" alt="" id="profileImg">
        <span class="ms-3 mt-1">${userdetails.username}</span>
        <span class="ms-3 mt-1">${userdetails.email}</span>
        <span class="ms-3 mt-1 text-uppercase font-bold text-gray-400">${userdetails.usertype}</span>`;

    document.getElementById('profileForm').addEventListener('submit', uploadProfileImage);
}

const openImageUpload = () => {
    document.getElementById('imageUpload').click();
}

const uploadProfileImage = async (event) => {
    event.preventDefault();

    const form = document.getElementById('profileForm');
    const formData = new FormData(form);

    const oldImgURL = document.getElementById('profileImg').src;

    try {
        const response = await fetch(`${BASE_URL}/upload-profile-img/${userdetails.username}?oldImgURL=${oldImgURL}`, {
            method: 'POST',
            body: formData
        });

        const result = await response.json();
        console.log(result);


        if (response.ok) {
            sessionStorage.setItem('userdetails', JSON.stringify({ ...userdetails, profileImgURL: result.profileImgURL }))
            const profileImg = document.getElementById('profileImg');
            profileImg.src = result.profileImgURL;
        } else {
            console.error('Failed to upload profile image');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

userProfile();

// const getUserProfile = async () => {
//     const response = await fetch(`${BASE_URL}/user/${userdetails.username}`)
//     const data = await response.json()
//     return data
// }