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
    //     let response=await signup(formdata);//must use await since fetch is used in a the signup function
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

    let response = await signup(formdata);//must use await since fetch is used in a the signup function
    response = await response.json();
    if (!response.login) {
        return warning.innerHTML = response.msg;
    }
    // console.log(response.userdetails.usertype)
    sessionStorage.setItem('userdetails', JSON.stringify(response.userdetails));
    if (response.userdetails.usertype === 'recruiter') {
        return window.open("../main-page/recruiter/index.html", "_parent");
    }
    else if (response.userdetails.usertype === 'labour') {
        return window.open("../main-page/labour/index.html", "_parent");
    }
    if (response.userdetails.usertype === 'admin') {
        return window.open("../main-page/admin/index.html", "_parent");
    }
})

const signup = async (formdata) => {
    const response = fetch('http://localhost:5000/login', {
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