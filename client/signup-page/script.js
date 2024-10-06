const warning = document.querySelector(".warning")

const form = document.getElementById('form')
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = form.elements.username.value;
    const email = form.elements.email.value;
    const password = form.elements.password.value;
    const confirmpassword = form.elements.confirmpassword.value;
    const usertype = form.elements.usertype.value;

    const formdata = { username, email, password, confirmpassword, usertype };

    let response = await signup(formdata);//must use await since fetch is used in a the signup function
    response = await response.json();
    if (!response.signup) {
        const warning = document.querySelector('.warning');
        warning.innerHTML = response.msg;

        if (response.msg.trim() !== "") {
            warning.classList.add('show-warning');
        }
    }
    console.log('sign-up successfull')
    warning.innerHTML = '';
    sessionStorage.setItem('userdetails',JSON.stringify(response.userdetails));
    window.open("../otpverification/index.html","_self");
})

const signup = async (formdata) => {
    const response = fetch(`${BASE_URL}/signup`, {
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


        document.getElementById('togglePassword').addEventListener('click', function () {
            const passwordField = document.getElementById('password');
            const eyeIcon = document.getElementById('eyeIcon');
            if (passwordField.type === 'password') {
                passwordField.type = 'text';
                eyeIcon.classList.remove('fa-eye');
                eyeIcon.classList.add('fa-eye-slash');
            } else {
                passwordField.type = 'password';
                eyeIcon.classList.remove('fa-eye-slash');
                eyeIcon.classList.add('fa-eye');
            }
        });

        document.getElementById('toggleConfirmPassword').addEventListener('click', function () {
            const confirmPasswordField = document.getElementById('confirmPassword');
            const confirmEyeIcon = document.getElementById('confirmEyeIcon');
            if (confirmPasswordField.type === 'password') {
                confirmPasswordField.type = 'text';
                confirmEyeIcon.classList.remove('fa-eye');
                confirmEyeIcon.classList.add('fa-eye-slash');
            } else {
                confirmPasswordField.type = 'password';
                confirmEyeIcon.classList.remove('fa-eye-slash');
                confirmEyeIcon.classList.add('fa-eye');
            }
        });
