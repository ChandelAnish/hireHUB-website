const msg = document.getElementById('msg');
const send = document.getElementById('send');
const chatmessages = document.getElementById('chatmessages');
const userdetails = JSON.parse(sessionStorage.getItem("userdetails"));


msg.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        send.click();
    }
})

function scrollToBottom() {
    chatmessages.scrollTop = chatmessages
        .scrollHeight;
}

send.addEventListener("click", () => {
    const message = msg.value;

    //time stamp of chat
    const currentDate = new Date();
    const timeOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'Asia/Kolkata'
    };
    const time = currentDate.toLocaleTimeString('en-US', timeOptions);
    const dayOptions = {
        weekday: 'short',
        timeZone: 'Asia/Kolkata'
    };
    const day = currentDate.toLocaleDateString('en-US', dayOptions);

    chatmessages.innerHTML += `
                <div class="message reply">
                    <div class="user">${userdetails.username}</div>
                    <div class="time">${time} ${day}</div>
                    <div class="text">${message}</div>
                </div>`;
    msg.value='';
    scrollToBottom()
})