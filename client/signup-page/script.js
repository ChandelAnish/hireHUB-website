const warning=document.querySelector(".warning")

const form=document.getElementById('form')
form.addEventListener('submit',async(e)=>{
    e.preventDefault();
    const username=form.elements.username.value;
    const email=form.elements.email.value;
    const password=form.elements.password.value;
    const confirmpassword=form.elements.confirmpassword.value;
    const usertype=form.elements.usertype.value;
    
    const formdata={username,email,password,confirmpassword,usertype};

        let response=await signup(formdata);//must use await since fetch is used in a the signup function
        response=await response.json();
        if(!response.signup)
        {
            return warning.innerHTML=response.msg;
        }
        // window.location.href='/mainpage'
        console.log('sign-up successfull')
})

const signup=async(formdata)=>{
    const response=fetch('http://localhost:5000/signup',{
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