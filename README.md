# Job-Portal
Job Portal Website

A full-stack Job Portal Web Application that allows users to register, log in, browse available jobs, and post new job listings.  
This project is built using Node.js, Express, and MongoDB for the backend, and HTML, CSS, and JavaScript for the frontend.

job-portal/
├── backend/
│ ├── package.json
│ ├── server.js
│ ├── .env
│ ├── config/db.js
│ ├── models/User.js
│ ├── models/Job.js
│ ├── routes/auth.js
│ ├── routes/jobs.js
│ ├── controllers/authController.js
│ ├── controllers/jobController.js
│ └── middleware/auth.js
└── frontend/
├── index.html
├── jobs.html
├── login.html
├── register.html
├── post-job.html
├── css/style.css
└── js/script.js

/backend/config/db.js : Handles MongoDB connection setup.

/backend/models/ : Contains Mongoose models for User and Job.

/backend/routes/ : Defines API routes for authentication and job operations.

/backend/controllers/ : Contains logic for handling user and job-related requests.

/backend/middleware/auth.js : JWT authentication middleware for protecting routes.

/frontend/ : Contains all the client-side files for the UI.
