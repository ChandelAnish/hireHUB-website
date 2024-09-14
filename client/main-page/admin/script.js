const getAllUsers = async () => {
    try {
        const response = await fetch(`${BASE_URL}/users`)
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error)
    }
}
const getAllJobPosts = async () => {
    try {
        const response = await fetch(`${BASE_URL}/post-jobs`)
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error)
    }
}
const getAllJobAvailabilities = async () => {
    try {
        const response = await fetch(`${BASE_URL}/post-Availability`)
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error)
    }
}

const deletePostedJob = async (tableRowID, id) => {
    const response = await fetch(`${BASE_URL}/post-jobs/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': "application/json"
        }
    })
    const data = await response.json()
    console.log(data)
    document.getElementById(tableRowID).remove();
}

const deleteAvailability = async (tableRowID, id) => {
    const response = await fetch(`${BASE_URL}/post-Availability/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': "application/json"
        }
    })
    const data = await response.json()
    console.log(data)
    console.log(tableRowID)
    document.getElementById(tableRowID).remove();
}

let allUsers = [];
let allJobPosts = [];
let allJobAvailabilities = [];

addEventListener("load", async () => {
    allUsers = await getAllUsers();
    // console.log(allUsers)
    allUsers = allUsers.filter((item) => {
        return (item.usertype != "admin");
    })
    allJobPosts = await getAllJobPosts()
    allJobAvailabilities = await getAllJobAvailabilities()
    console.log(allJobPosts)
    console.log(allJobAvailabilities)

    displayUsers(allUsers);
})



//display all users

const displayUsers = (allUsers) => {
    const usersList = document.getElementById('usersList')
    usersList.innerHTML = '';

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
        const response = await fetch(`${BASE_URL}/update-status/${username}`, {
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

const manageType = (type) => {
    const filterbuttons = document.getElementById('filter-buttons')
    const manageType = document.getElementById('manageType')
    const tableheader = document.getElementById('tableheader')
    const usersList = document.getElementById('usersList')
    usersList.innerHTML = '';
    if (type == 'Users') {
        console.log(type)
        manageType.textContent = 'Users';
        filterbuttons.innerHTML = '';
        tableheader.innerHTML = '';
        tableheader.innerHTML = `                            
                            <th>Username</th>
                            <th>Usertype</th>
                            <th>Profile image</th>
                            <th>Email</th>
                            <th>Status</th>
                            <th>Change Status</th>`;

        displayUsers(allUsers);
    }
    else if (type == 'JobPost') {
        console.log(type)
        manageType.textContent = 'Job Posts';
        filterbuttons.innerHTML = '';
        tableheader.innerHTML = '';
        tableheader.innerHTML = `
                            <th>Username</th>
                            <th>Job title</th>
                            <th>Job Type</th>
                            <th>Job Description</th>
                            <th>Salary</th>
                            <th>Location</th>
                            <th>State</th>
                            <th>Skills</th>
                            <th>Job Status</th>
                            <th>Delete</th>`;

        allJobPosts.forEach((item, index) => {
            usersList.innerHTML += `
                            <tr class="application-row" data-status="on-hold" id="tablerow${index}">
                                <td>${item.user}</td>
                                <td>${item.jobtitle}</td>
                                <td>${item.jobtype}</td>
                                <td>${item.jobdescription}</td>
                                <td>₹${item.salary}</td>
                                <td>${item.location}</td>
                                <td>${item.state}</td>
                                <td>${item.skills}</td>
                                <td>${item.status}</td>
                                <td><button class="toggle-btn" onclick="deletePostedJob('tablerow${index}','${item.id}')" style="background-color: red;">Delete</button></td>
                            </tr>`
        })
    }
    else if (type == 'JobAvailability') {
        console.log(type)
        manageType.textContent = 'Job Availabilities';
        filterbuttons.innerHTML = '';
        tableheader.innerHTML = '';
        tableheader.innerHTML = `                            
                            <th>Username</th>
                            <th>Name</th>
                            <th>Job title</th>
                            <th>Job Type</th>
                            <th>Min. Pay</th>
                            <th>State</th>
                            <th>Skills</th>
                            <th>Delete</th>`;

        allJobAvailabilities.forEach((item, index) => {
            usersList.innerHTML += `
                            <tr class="application-row" data-status="on-hold" id="tablerow${index}">
                                <td>${item.user}</td>
                                <td>${item.name}</td>
                                <td>${item.job}</td>
                                <td>${item.jobtype}</td>
                                <td>₹${item.min_pay}</td>
                                <td>${item.state}</td>
                                <td>${item.skills}</td>
                                <td><button class="toggle-btn" onclick="deleteAvailability('tablerow${index}','${item.id}')" style="background-color: red;">Delete</button></td>
                            </tr>`
        })
    }
}