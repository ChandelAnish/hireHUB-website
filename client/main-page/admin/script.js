const BASE_URL = 'http://localhost:5000';

const getAllUsers = async () => {
    try {
        const response = await fetch(`${BASE_URL}/users`)
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error)
    }
}

let allUsers = [];

addEventListener("load", async () => {
    allUsers = await getAllUsers();
    // console.log(allUsers)
    allUsers=allUsers.filter((item)=>{
        return (item.usertype!="admin");
    })

    displayUsers(allUsers);
})



//display all users

const displayUsers = (allUsers) => {
    const usersList = document.getElementById('usersList')
    usersList.innerHTML='';

    allUsers.forEach((item, index) => {
        let statusColor;
        let toggleBtnColor;
        if (item.status == "Active") {
            statusColor = "#53ce72";
            toggleBtnColor = "red";
            toggleBtnText = "Suspend";
        }
        else if (item.status == "Suspended") {
            statusColor = "red";
            toggleBtnColor = "#53ce72";
            toggleBtnText = "Reinstate";
        }
        else {
            statusColor = "#FFA5002";
            toggleBtnColor = "#bdbdbd";
            toggleBtnText = "Dormant";
        }
        usersList.innerHTML += `
        <tr class="application-row" data-status="on-hold">
            <td>${item.username}</td>
            <td>${item.usertype}</td>
            <td style="width: 30px; height: 30px;"><img src=${item.profileImgURL} class="img-fluid" alt=""></td>
            <td>${item.email}</td>
            <td><div class="status on-hold" id="status${index}" style="background-color: ${statusColor};width: 78px;text-align: center;">${item.status}</div></td>
            <td><button class="toggle-btn" id="toggle-btn${index}" onclick="toggleStatus(${index},'${item.username}')" style="background-color: ${toggleBtnColor};">${toggleBtnText}</button></td>
        </tr>`
        if (item.status == "Unverified") {
            document.getElementById(`toggle-btn${index}`).disabled = true;
        }
    })
}

const toggleStatus = async (index, username) => {
    const statusElement = document.getElementById(`status${index}`);
    const status = statusElement.textContent;
    let setStatus;

    if (status == 'Active') {
        setStatus = "Suspended";
    }
    else if (status == 'Suspended') {
        setStatus = "Active";
    }

    try {
        const response = await fetch(`http://localhost:5000/update-status/${username}`, {
            method: 'PATCH',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ status: setStatus })
        })
        const data = await response.json();
        // console.log(data)
        statusElement.textContent = setStatus;
        const toggleBtn = document.getElementById(`toggle-btn${index}`);
        if (setStatus == "Active") {
            toggleBtn.textContent = "Suspend"
            toggleBtn.style.backgroundColor = "red"
            statusElement.style.backgroundColor = "#53ce72"
        }
        else if (setStatus == "Suspended") {
            toggleBtn.textContent = "Reinstate"
            toggleBtn.style.backgroundColor = "#53ce72"
            statusElement.style.backgroundColor = "red"
        }
    } catch (error) {
        console.log(error);
    }
}