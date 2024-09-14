const slidebutton = document.querySelector("#slidebutton");
function changeSlide() {
    setInterval(() => {
        slidebutton.click();
    }, 3000)
}
changeSlide();

const warning = document.querySelector(".warning")

const form = document.getElementById('form')
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = form.elements.username.value;
    const password = form.elements.password.value;
    // const usertype=form.elements.usertype.value;

    const formdata = { username, password };
    // try
    // {
    //     let response=await login(formdata);//must use await since fetch is used in a the login function
    //     response=await response.json();
    //     console.log(response);
    //     if(!response.login)
    //     {
    //         return warning.innerHTML=response.msg;
    //     }
    // }
    // catch(err)
    // {
    //     warning.innerHTML="";
    //     window.location.href='/index1.html'
    // }

    let response = await login(formdata);//must use await since fetch is used in a the login function
    response = await response.json();
    if (!response.login) {
        return warning.innerHTML = response.msg;
    }
    // console.log(response.userdetails.usertype)
    if (response.userdetails.usertype === 'recruiter') {
        sessionStorage.setItem('userdetails', JSON.stringify(response.userdetails));
        return window.open("../main-page/recruiter/index.html", "_parent");
    }
    else if (response.userdetails.usertype === 'labour') {
        sessionStorage.setItem('userdetails', JSON.stringify(response.userdetails));
        return window.open("../main-page/labour/index.html", "_parent");
    }
    else if (response.userdetails.usertype === 'admin') {
        return window.open("../main-page/admin/index.html", "_parent");
    }
})

const login = async (formdata) => {
    const response = fetch(`${BASE_URL}/login`, {
        method: 'post',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(formdata)
    })
    // const data =(await response).json();
    // return data;
    return (await response);
}

const getUserProfile = async (username) => {
    const response = await fetch(`${BASE_URL}/user/${username}`)
    const data = await response.json()
    return data
}

const emailVerification = async () => {
    const username = form.elements.username.value;
    const userdetails = await getUserProfile(username);
    sessionStorage.setItem('userdetails', JSON.stringify(userdetails));
}