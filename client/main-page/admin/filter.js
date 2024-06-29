const filterSuspended = () => {
    const filteredUsers = allUsers.filter((item) => {
        return (item.status == "Suspended");
    })
    // console.log(filteredUsers)
    displayUsers(filteredUsers)
}

const filterUnverified = () => {
    const filteredUsers = allUsers.filter((item) => {
        return (item.status == "Unverified");
    })
    // console.log(filteredUsers)
    displayUsers(filteredUsers)
}

const displayAllUsers = () => {
    displayUsers(allUsers)
}

//search filter
const searchFilter = document.getElementById('searchFilter')

searchFilter.addEventListener('input', (e) => {

    const usersList = document.getElementById('usersList')
    const searchword = e.target.value;

    const filteredUsersList = allUsers.filter((item) => {
        return item.username.toLowerCase().includes(searchword.toLowerCase())
    })

    usersList.innerHTML = '';
    displayUsers(filteredUsersList)
})