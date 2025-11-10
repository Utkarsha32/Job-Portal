// Apply saved theme on page load
document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark");
    } else {
        document.body.classList.remove("dark");
    }

    // Attach toggle button listener
    const themeToggle = document.getElementById("themeToggle");
    if (themeToggle) {
        themeToggle.addEventListener("click", toggleTheme);
    }
});

// Toggle theme
const toggleTheme = () => {
    document.body.classList.toggle("dark");

    // Save the current theme in localStorage
    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
};

/*const toggleTheme = () => {
    document.body.classList.toggle("dark");
}*/

// Login
async function loginUser(e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (data.token) {
        localStorage.setItem("token", data.token);
        alert(data.message);
        window.location.href = "index.html";
    } else {
        alert(data.error);
    }
}

// Register
async function registerUser(e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
    });
    const data = await res.json();
    alert(data.message || data.error);
    if(data.message) window.location.href = "login.html";
}

// Post job
/* async function postJob(e) {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const company = document.getElementById("company").value;
    const description = document.getElementById("description").value;
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:5000/api/jobs/post", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        body: JSON.stringify({ title, company, description })
    });
    const data = await res.json();
    alert(data.message || data.error);
    window.location.href = "jobs.html";
}*/

async function postJob(e) {
    e.preventDefault();
    const title = document.getElementById("title").value;
    const company = document.getElementById("company").value;
    const location = document.getElementById("location").value; // add location
    const description = document.getElementById("description").value;
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:5000/api/jobs/post", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token
        },
        body: JSON.stringify({ title, company, location, description }) // include location
    });

    const data = await res.json();
    alert(data.message || data.error);
    window.location.href = "jobs.html";
}

// Fetch jobs
/*async function loadJobs() {
    const token = localStorage.getItem("token");
    if(!token) { window.location.href = "login.html"; return; }
    const res = await fetch("http://localhost:5000/api/jobs", {
        headers: { "Authorization": token }
    });
    const jobs = await res.json();
    const container = document.getElementById("jobsContainer");
    container.innerHTML = "";
    jobs.forEach(job => {
        const div = document.createElement("div");
        div.innerHTML = `
            <h3>${job.title} - ${job.company}</h3>
            <p>${job.description}</p>
            <button onclick="applyJob()">Apply</button>
            <hr/>
        `;
        container.appendChild(div);
    });
}
*/

async function loadJobs() {
    const token = localStorage.getItem("token");
    if (!token) { 
        window.location.href = "login.html"; 
        return; 
    }

    const res = await fetch("http://localhost:5000/api/jobs", {
        headers: { "Authorization": token }
    });

    const jobs = await res.json();
    const container = document.getElementById("jobsContainer");
    if(!container) return; // make sure container exists on the page

    container.innerHTML = "";

    jobs.forEach(job => {
        const div = document.createElement("div");
        div.classList.add("job-card"); // use CSS class for styling
        div.innerHTML = `
            <h3>${job.title}</h3>
            <p><strong>Company:</strong> ${job.company}</p>
            <p><strong>Location:</strong> ${job.location || 'N/A'}</p>
            <p>${job.description}</p>
            <button onclick="applyJob('${job.title}')">Apply</button>
        `;
        container.appendChild(div);
    });
}

/*function applyJob() {
    alert("Applied successfully");
}*/

function applyJob(title) {
    alert(`Applied successfully to ${title}`);
}



