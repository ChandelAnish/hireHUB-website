const slidebutton=document.querySelector("#slidebutton");
function changeSlide()
{
    setInterval(()=>{
        slidebutton.click();
    },3000)
}
changeSlide();

const warning=document.querySelector(".warning")

const form=document.getElementById('form')
form.addEventListener('submit',async(e)=>{
    e.preventDefault();
    const username=form.elements.username.value;
    const password=form.elements.password.value;
    const usertype=form.elements.usertype.value;
    
    const formdata={username,password,usertype};
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

        let response=await signup(formdata);//must use await since fetch is used in a the signup function
        response=await response.json();
        if(!response.login)
        {
            return warning.innerHTML=response.msg;
        }
        window.location.href='/mainpage'
})

const signup=async(formdata)=>{
    const response=fetch('http://localhost:5000/login',{
        method:'post',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(formdata)
    })
    // const data =(await response).json();
    // return data;
    return (await response);
}