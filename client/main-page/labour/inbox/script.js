document.addEventListener("DOMContentLoaded", function() {
    const requests = [
        { jobtitle: "Frontend Developer", jobtype: "Full-Time", company: "TechCorp", salary: "$80,000", location: "New York" },
        { jobtitle: "Backend Developer", jobtype: "Part-Time", company: "Innovatech", salary: "$60,000", location: "San Francisco" },
        { jobtitle: "UX Designer", jobtype: "Contract", company: "DesignStudio", salary: "$70,000", location: "Remote" }
    ];

    const container = document.getElementById("requests-container");

    requests.forEach(request => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <p><strong>Job Title:</strong> ${request.jobtitle}</p>
            <p><strong>Job Type:</strong> ${request.jobtype}</p>
            <p><strong>Company:</strong> ${request.company}</p>
            <p><strong>Salary:</strong> ${request.salary}</p>
            <p><strong>Location:</strong> ${request.location}</p>
            <button class="accept" onclick="acceptRequest(this)">Accept</button>
            <button class="delete" onclick="deleteRequest(this)">Delete</button>
        `;
        container.appendChild(card);
    });
});

function acceptRequest(button) {
    const card = button.parentElement;
    card.style.backgroundColor = "#d4edda";
    card.style.borderColor = "#c3e6cb";
    button.disabled = true;
    button.nextElementSibling.disabled = true;
}

function deleteRequest(button) {
    const card = button.parentElement;
    card.remove();
}

function acceptVideoCall() {
    alert("Video call interview accepted!");
}
