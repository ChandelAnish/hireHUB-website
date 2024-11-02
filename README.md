
![Logo](https://drive.google.com/uc?id=17OoYp2m-gLVwmmrjyDE_yrjzGpyZ1Zul)


# 🌟 HireHub – Connecting Recruiters & Skilled Laborers 🚀

HireHub is a comprehensive labor hiring platform designed to bridge the gap between recruiters and skilled laborers. With advanced features like real-time chat, video interviews, labor availability tracking, and more, HireHub makes the hiring process seamless and efficient.


## 🌐 Live Demo

 https://asc-hirehub.netlify.app/ (Link to live deployment)
 
Note: The server takes approximately 50 seconds to spin up, so please be patient.


## ✨ Key Features

- 🛠 Admin Dashboard
Full control over recruiters, laborers, job posts, and user activities to ensure smooth operations.

- 🧑‍💼 Job Postings
Recruiters can post jobs with detailed descriptions, including salary, skills, location, and job type.

- 👷‍♂️ Laborer Profiles & Availability
Laborers can create and maintain profiles, showcasing their skills, experience, and availability.

- 📝 Applications & Status Tracking
Laborers can apply for jobs, and recruiters can manage applications with status tracking (accepted, rejected, in progress).

- 💬 Real-Time Chat & Video Interviews
Instant messaging and video interviews between recruiters and laborers for effective communication.

- 📊 Progress Monitoring
Track laborers’ progress on their assigned jobs with real-time updates.

- 🔎 Advanced Job Search Filters
Powerful filtering options by location, salary, skills, and job type to find the perfect match.

- 🌗 Dark Mode
Switch to dark mode for a visually appealing and comfortable user experience.

- 📱 Responsive UI
Modern, responsive design using Tailwind CSS to ensure seamless usage on any device.


## 🛠️ Tech Stack

**Client:** HTML5, Bootstrap, CSS, TailwindCSS, JS

**Server:** Node.js, Express.js, Prisma ORM (for database management)

**Database:** MySQL

**Cloud Services:** Cloudinary, Clever Cloud


## 🚀 How to Get Started

Follow these steps to set up the project locally:
1. Clone the repository:
```bash
  git clone https://github.com/ChandelAnish/hireHUB-website.git
  cd hireHUB-website
```

2. Install dependencies:
```bash
  cd server
  npm install
```

3. Create a .env file in the root directory and add your MySQL database connection details:
```bash
PORT=5000
SENDER_EMAIL=<your email>
PASS=<your email App password>

DATABASE_URL="mysql://root:<password>@localhost:3306/hirehub_db"
or
DATABASE_URL=<clever cloud connection URI>

CLOUD_NAME=<cloudinary cloud name >
API_KEY=<cloudinary API_KEY>
API_SECRET=<cloudinary API_SECRET>
```

4. Set up Prisma:
```bash
npx prisma db push

```
5. Run the server:
```bash
npm start
```
6. Visit the application:
Launch the live server for the landing page.

## 🖼️ Highlighted Features with Screenshots
**📋 Job Postings**

Post jobs with detailed descriptions, including salary, skills, and location.
![Job Postings](https://drive.google.com/uc?id=1a8FUokutzHA4Hg-zgbBk1t1V_c6rX8t3)

**💬 Real-Time Chat & Video Interviews**

Communicate with laborers via instant messaging or schedule video interviews.
![Job Postings](https://drive.google.com/uc?id=1FpJGGI_QpMnJH9o0BvQcGdJNzc170IiP)

**📊 Progress Monitoring**

Monitor the progress of laborers on jobs with real-time tracking.
![Job Postings](https://drive.google.com/uc?id=1BrXUfmAxf50yduq6VSQqAo3mibSOmmuE)


## 👨‍💻 Contributing

Feel free to fork this repository and contribute by submitting a pull request. For major changes, please open an issue first to discuss what you'd like to change.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a pull request

**Please adhere to this project's `code of conduct`.**


## 💬 Feedback & Support

If you have any feedback, questions, or issues, feel free to reach out or open a GitHub Issue.


For support, feel free to reach out via email at anish8427singh@gmail.com.

