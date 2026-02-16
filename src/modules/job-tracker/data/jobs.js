const indianCompanies = [
    "Infosys", "TCS", "Wipro", "Accenture", "Capgemini", "Cognizant",
    "IBM", "Oracle", "SAP", "Dell", "Amazon", "Flipkart", "Swiggy",
    "Razorpay", "PhonePe", "Paytm", "Zoho", "Freshworks", "Juspay", "CRED",
    "Urban Company", "Zerodha", "Groww", "HDFC Bank", "ICICI Bank",
    "Tech Mahindra", "HCLLink", "Mindtree", "L&T Infotech", "Mphasis"
];

const roles = [
    "SDE Intern", "Graduate Engineer Trainee", "Junior Backend Developer",
    "Frontend Intern", "QA Intern", "Data Analyst Intern",
    "Java Developer", "Python Developer", "React Developer"
];

const locations = [
    "Bengaluru", "Hyderabad", "Pune", "Mumbai", "Chennai",
    "Gurugram", "Noida", "Delhi", "Remote"
];

const skillsList = [
    "Java", "Python", "React", "Node.js", "SQL", "AWS", "Docker",
    "Kubernetes", "Spring Boot", "Django", "Flask", "TypeScript",
    "JavaScript", "HTML/CSS", "Git", "C++", "C#"
];

const sources = ["LinkedIn", "Naukri", "Indeed", "Instahyre", "Wellfound"];

function getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateJobs(count) {
    const jobs = [];
    for (let i = 1; i <= count; i++) {
        const company = getRandom(indianCompanies);
        const role = getRandom(roles);
        const location = getRandom(locations);
        const mode = location === "Remote" ? "Remote" : getRandom(["Hybrid", "Onsite"]);
        const exp = role.includes("Intern") || role.includes("Trainee") ? "Fresher" : getRandom(["0-1 Years", "1-3 Years", "3-5 Years"]);

        let salary;
        if (role.includes("Intern")) {
            salary = `₹${getRandomInt(15, 40)}k/month`;
        } else {
            const min = getRandomInt(3, 12);
            salary = `${min}–${min + getRandomInt(2, 6)} LPA`;
        }

        const posted = getRandomInt(0, 10);

        jobs.push({
            id: i,
            title: role,
            company: company,
            location: location,
            mode: mode,
            experience: exp,
            skills: Array.from({ length: getRandomInt(3, 6) }, () => getRandom(skillsList)),
            source: getRandom(sources),
            postedDaysAgo: posted,
            salaryRange: salary,
            applyUrl: `https://example.com/apply/${i}`,
            description: `We are looking for a passionate ${role} to join our team at ${company}. 
      You will be working on cutting-edge technologies and contributing to our core products.
      Ideal candidates should have strong problem-solving skills and a willingness to learn.
      Join us to build scalable solutions that impact millions of users.
      This is a great opportunity to kickstart your career in a fast-paced environment.`,
        });
    }
    return jobs.sort((a, b) => a.postedDaysAgo - b.postedDaysAgo);
}

export const jobs = generateJobs(60);
