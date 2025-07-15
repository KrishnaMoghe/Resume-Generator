import { useState } from "react";

const UseFormData = () => {
  const [formData, setFormData] = useState({
    fullName: "John Doe",
    email: "john.doe@example.com",
    phone: "9876543210",
    dob: "2000-01-01",
    gender: "Male",
    address: "123, ABC Street, Gujarat, India",
    linkedIn: "https://linkedin.com/in/johndoe",
    github: "https://github.com/johndoe",
    languages: "English, Hindi, Gujarati",
    photo: null,

    branch: "",
    preferredDomains: [],
    customDomains: [],
    toolsTechnologies: [],
    customToolInput: "",
    customTools: [],
    currentDegree: "B.Tech in Computer Engineering",
    collegeName: "ABC Institute of Technology",
    universityName: "GTU",
    currentSemester: "6",
    graduationYear: "2026",
    cgpa: "8.5",
    backlogs: "No",
    twelfthSchool: "XYZ School",
    twelfthBoard: "CBSE",
    twelfthMarks: "85%",
    tenthSchool: "XYZ School",
    tenthBoard: "CBSE",
    tenthMarks: "90%",

    careerPlans: ["Campus Placements", "Higher Studies (Abroad)"],
    preferredDomains: ["Web Development", "AI/ML"],
    otherDomain: "",
    relocation: "Yes",
    preparingExams: "Yes",
    examNames: "GATE, GRE",

    codingProficiency: "4",
    programmingLanguages: ["C++", "Python", "JavaScript"],
    otherLanguage: "",
    toolsTechnologies: [],
    customToolInput: "",
    otherTool: "",
    certifications: "Python for Everybody (Coursera, 2023)",
    hackathonParticipation: "Yes",
    hackathonDetails: "Smart India Hackathon Finalist",

    projects: [
      {
        title: "Online Resume Generator",
        description: "A web app that generates resumes using AI.",
        technologies: "React, Node.js, OpenAI",
        role: "Full Stack Developer",
        link: "https://github.com/johndoe/resume-gen",
      },
      {
        title: "Attendance Tracker",
        description: "Tracks student attendance using facial recognition.",
        technologies: "Python, OpenCV, Flask",
        role: "Backend Developer",
        link: "",
      },
    ],

    experiences: [
      {
        title: "Web Developer Intern",
        company: "Tech Solutions",
        duration: "June 2023 - August 2023",
        responsibilities: "Built responsive frontend using React.",
        technologies: "React, Tailwind CSS",
        workMode: "Remote",
      },
    ],

    academicAchievements: "1st Rank in University, Merit Scholarship Recipient",
    coCurricularActivities:
      "Member of Coding Club, Robotics Workshop Participant",
    publications: "Published a paper in IEEE Xplore on Edge Computing",
    openSourceContributions: "Contributed to Mozilla Firefox DevTools",

    teamworkComfort: "Yes",
    lookingForInternships: "Yes",
    strengths: "Teamwork, Problem-solving, Quick learner",
    hobbiesInterests: "Playing chess, Blogging, UI Design",
    specialNeeds: "None",
    additionalComments:
      "Looking forward to work in fast-paced learning environments",

    moocCourses: "NPTEL Software Developement",
    sportsAchievements: [{ sportName: "", level: "" }],

    planningAbroad: "No",
    applyingScholarship: "No",
    scholarshipNames: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file input separately
  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleCheckboxChange = (value, field) => {
    const currentValues = formData[field];
    const updatedValues = currentValues.includes(value)
      ? currentValues.filter((item) => item !== value)
      : [...currentValues, value];
    setFormData({ ...formData, [field]: updatedValues });
  };

  const removeDomain = (domainToRemove) => {
    setFormData((prev) => ({
      ...prev,
      preferredDomains: prev.preferredDomains.filter(
        (domain) => domain !== domainToRemove
      ),
    }));
  };

  const removeTool = (toolToRemove) => {
    setFormData((prev) => ({
      ...prev,
      toolsTechnologies: prev.toolsTechnologies.filter(
        (tool) => tool !== toolToRemove
      ),
    }));
  };
  return {
    formData,
    setFormData,
    handleChange,
    handleFileChange,
    handleCheckboxChange,
    removeDomain,
    removeTool,
  };
};

export default UseFormData;
