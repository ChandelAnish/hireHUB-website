async function sendUserEmailId(email) {
    let response = await fetch("http://localhost:5000/otpverification", {
        method: "post",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ email: email })
    })
    const data = await response.json();
    document.getElementById('warning').innerHTML = '';
    document.getElementById('warning').innerHTML = data.msg;
}

document.getElementById('sendotp').addEventListener('click', async () => {
    document.getElementById('warning').innerHTML = `<div class="text-center text-success">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>`
    const userdetails = JSON.parse(sessionStorage.getItem('userdetails'))
    await sendUserEmailId(userdetails.email)
})

//verify OTP
async function verifyotp(userotp) {
    let response = await fetch('http://localhost:5000/otpverification',
        {
            method: 'post',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ userotp: userotp })
        });
    const data = await response.json();
    console.log(data)
    document.getElementById('warning').innerHTML = data.msg;

    if (data.success) {
        try {
            const userdetails = JSON.parse(sessionStorage.getItem('userdetails'))
            const response = await fetch(`http://localhost:5000/update-status/${userdetails.username}`, {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ status: "Active" })
            })
            const data = await response.json();
            console.log(data)
            return window.open("../login-page/index.html", "_parent");
        } catch (error) {
            console.log(error)
        }
    }
}

let verifybtn = document.getElementById('verifybtn');

verifybtn.addEventListener('click', async (e) => {
    e.preventDefault();
    let userotp = document.getElementById('userotp').value;
    console.log(userotp)
    await verifyotp(userotp);
})

