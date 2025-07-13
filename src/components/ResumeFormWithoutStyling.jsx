import React, { useState, useRef } from "react";

export default function ResumeForm() {
  const [currentStep, setCurrentStep] = useState(1);
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
    toolsTechnologies: ["React.js", "Node.js", "Git/GitHub"],
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
  });

  const [generatedResume, setGeneratedResume] = useState(""); // ✅ one definition only
  const previewRef = useRef(null);

  // Handle all changes except file
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file input separately
  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/generate-resume",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();
      setGeneratedResume(data.resume);

      // Scroll to resume preview
      setTimeout(() => {
        if (previewRef.current) {
          previewRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, 100); // Wait a short time to ensure state is updated
    } catch (error) {
      console.error("Error submitting form", error);
      alert("Something went wrong while generating resume.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">
        Resume Generator - Step {currentStep}
      </h1>

      {/* Step 1: Personal Information */}
      {currentStep === 1 && (
        <div className="space-y-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full p-2 border"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border"
          />
          <input
            type="tel"
            name="phone"
            placeholder="Mobile Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border"
          />
          <input
            type="date"
            name="dob"
            placeholder="Date of Birth"
            value={formData.dob}
            onChange={handleChange}
            className="w-full p-2 border"
          />
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-2 border"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer_not">Prefer not to say</option>
          </select>
          <textarea
            name="address"
            placeholder="Permanent Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full p-2 border"
          />
          <input
            type="url"
            name="linkedIn"
            placeholder="LinkedIn Profile URL"
            value={formData.linkedIn}
            onChange={handleChange}
            className="w-full p-2 border"
          />
          <input
            type="url"
            name="github"
            placeholder="GitHub/Portfolio URL"
            value={formData.github}
            onChange={handleChange}
            className="w-full p-2 border"
          />
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 border"
          />
          <input
            type="text"
            name="languages"
            placeholder="Languages Known (e.g., English, Hindi, Gujarati)"
            value={formData.languages}
            onChange={handleChange}
            className="w-full p-2 border"
          />

          <div className="flex justify-end pt-4">
            <button
              type="button"
              onClick={handleNext}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Step 2 */}
      {currentStep === 2 && (
        <div className="space-y-4">
          <input
            type="text"
            name="currentDegree"
            placeholder="Current Degree (e.g., B.Tech in Computer Engineering)"
            value={formData.currentDegree}
            onChange={handleChange}
            className="w-full p-2 border"
          />
          <input
            type="text"
            name="collegeName"
            placeholder="College Name"
            value={formData.collegeName}
            onChange={handleChange}
            className="w-full p-2 border"
          />
          <input
            type="text"
            name="universityName"
            placeholder="University Name"
            value={formData.universityName}
            onChange={handleChange}
            className="w-full p-2 border"
          />
          <input
            type="number"
            name="currentSemester"
            placeholder="Current Semester"
            value={formData.currentSemester}
            onChange={handleChange}
            className="w-full p-2 border"
          />
          <input
            type="number"
            name="graduationYear"
            placeholder="Expected Graduation Year"
            value={formData.graduationYear}
            onChange={handleChange}
            className="w-full p-2 border"
          />
          <input
            type="text"
            name="cgpa"
            placeholder="Latest CGPA or Percentage"
            value={formData.cgpa}
            onChange={handleChange}
            className="w-full p-2 border"
          />

          <div>
            <p className="font-medium mb-1">Have you had any backlogs?</p>
            <label className="mr-4">
              <input
                type="radio"
                name="backlogs"
                value="yes"
                checked={formData.backlogs === "yes"}
                onChange={handleChange}
              />{" "}
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="backlogs"
                value="no"
                checked={formData.backlogs === "no"}
                onChange={handleChange}
              />{" "}
              No
            </label>
          </div>

          <input
            type="text"
            name="twelfthSchool"
            placeholder="12th School Name"
            value={formData.twelfthSchool}
            onChange={handleChange}
            className="w-full p-2 border"
          />
          <input
            type="text"
            name="twelfthBoard"
            placeholder="12th Board Name"
            value={formData.twelfthBoard}
            onChange={handleChange}
            className="w-full p-2 border"
          />
          <input
            type="text"
            name="twelfthMarks"
            placeholder="12th Percentage/Grade"
            value={formData.twelfthMarks}
            onChange={handleChange}
            className="w-full p-2 border"
          />
          <input
            type="text"
            name="tenthSchool"
            placeholder="10th School Name"
            value={formData.tenthSchool}
            onChange={handleChange}
            className="w-full p-2 border"
          />
          <input
            type="text"
            name="tenthBoard"
            placeholder="10th Board Name"
            value={formData.tenthBoard}
            onChange={handleChange}
            className="w-full p-2 border"
          />
          <input
            type="text"
            name="tenthMarks"
            placeholder="10th Percentage/Grade"
            value={formData.tenthMarks}
            onChange={handleChange}
            className="w-full p-2 border"
          />

          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep - 1)}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep + 1)}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Step 3 - Career Goals*/}
      {currentStep === 3 && (
        <div className="space-y-4">
          <p className="font-medium">
            What are your career plans after graduation?
          </p>
          {[
            "Campus Placements",
            "Off-Campus Jobs",
            "Higher Studies (India)",
            "Higher Studies (Abroad)",
            "Start a Business",
            "Government Jobs",
            "Not Sure Yet",
          ].map((option) => (
            <label key={option} className="block">
              <input
                type="checkbox"
                value={option}
                checked={formData.careerPlans.includes(option)}
                onChange={(e) => {
                  const updated = formData.careerPlans.includes(option)
                    ? formData.careerPlans.filter((item) => item !== option)
                    : [...formData.careerPlans, option];
                  setFormData({ ...formData, careerPlans: updated });
                }}
              />{" "}
              {option}
            </label>
          ))}

          <p className="font-medium">Preferred Domain/Field of Work</p>
          {[
            "Software Development",
            "Web Development",
            "Data Science / AI / ML",
            "Cybersecurity",
            "Networking",
            "UI/UX Design",
            "Cloud / DevOps",
            "Embedded / IoT",
            "Blockchain",
          ].map((domain) => (
            <label key={domain} className="block">
              <input
                type="checkbox"
                value={domain}
                checked={formData.preferredDomains.includes(domain)}
                onChange={(e) => {
                  const updated = formData.preferredDomains.includes(domain)
                    ? formData.preferredDomains.filter(
                        (item) => item !== domain
                      )
                    : [...formData.preferredDomains, domain];
                  setFormData({ ...formData, preferredDomains: updated });
                }}
              />{" "}
              {domain}
            </label>
          ))}

          {/* Other domain field */}
          <input
            type="text"
            name="otherDomain"
            placeholder="Other Domain (if any)"
            value={formData.otherDomain}
            onChange={handleChange}
            className="w-full p-2 border"
          />

          {/* Relocation */}
          <p className="font-medium">Are you open to relocation?</p>
          {["Yes", "No", "Depends"].map((val) => (
            <label key={val} className="mr-4">
              <input
                type="radio"
                name="relocation"
                value={val}
                checked={formData.relocation === val}
                onChange={handleChange}
              />{" "}
              {val}
            </label>
          ))}

          {/* Exam Prep */}
          <p className="font-medium">
            Are you preparing for competitive exams?
          </p>
          {["Yes", "No"].map((val) => (
            <label key={val} className="mr-4">
              <input
                type="radio"
                name="preparingExams"
                value={val}
                checked={formData.preparingExams === val}
                onChange={handleChange}
              />{" "}
              {val}
            </label>
          ))}

          {/* Conditionally show exam name field */}
          {formData.preparingExams === "Yes" && (
            <input
              type="text"
              name="examNames"
              placeholder="If yes, mention which exams (e.g., GATE, GRE)"
              value={formData.examNames}
              onChange={handleChange}
              className="w-full p-2 border"
            />
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep - 1)}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep + 1)}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Next
            </button>
          </div>
        </div>
      )}
      {/* Step 4 - Skills*/}
      {currentStep === 4 && (
        <div className="space-y-4">
          {/* Coding Proficiency */}
          <p className="font-medium">
            Rate your coding proficiency (1 - Beginner, 5 - Expert):
          </p>
          {[1, 2, 3, 4, 5].map((level) => (
            <label key={level} className="mr-4">
              <input
                type="radio"
                name="codingProficiency"
                value={level}
                checked={formData.codingProficiency === String(level)}
                onChange={handleChange}
              />{" "}
              {level}
            </label>
          ))}

          {/* Programming Languages */}
          <p className="font-medium">Programming Languages Known:</p>
          {[
            "C",
            "C++",
            "Java",
            "Python",
            "JavaScript",
            "Kotlin",
            "Go",
            "Rust",
          ].map((lang) => (
            <label key={lang} className="block">
              <input
                type="checkbox"
                value={lang}
                checked={formData.programmingLanguages.includes(lang)}
                onChange={(e) => {
                  const updated = formData.programmingLanguages.includes(lang)
                    ? formData.programmingLanguages.filter(
                        (item) => item !== lang
                      )
                    : [...formData.programmingLanguages, lang];
                  setFormData({ ...formData, programmingLanguages: updated });
                }}
              />{" "}
              {lang}
            </label>
          ))}
          {/* Other Language */}
          <input
            type="text"
            name="otherLanguage"
            placeholder="Other Language (if any)"
            value={formData.otherLanguage}
            onChange={handleChange}
            className="w-full p-2 border"
          />

          {/* Technologies / Tools */}
          <p className="font-medium">Technologies/Tools Known:</p>
          {[
            "HTML/CSS",
            "React.js",
            "Node.js",
            "MySQL/PostgreSQL",
            "MongoDB",
            "TensorFlow/PyTorch",
            "Docker/Kubernetes",
            "Figma",
            "Git/GitHub",
          ].map((tool) => (
            <label key={tool} className="block">
              <input
                type="checkbox"
                value={tool}
                checked={formData.toolsTechnologies.includes(tool)}
                onChange={(e) => {
                  const updated = formData.toolsTechnologies.includes(tool)
                    ? formData.toolsTechnologies.filter((item) => item !== tool)
                    : [...formData.toolsTechnologies, tool];
                  setFormData({ ...formData, toolsTechnologies: updated });
                }}
              />{" "}
              {tool}
            </label>
          ))}
          {/* Other Tool */}
          <input
            type="text"
            name="otherTool"
            placeholder="Other Tool/Tech (if any)"
            value={formData.otherTool}
            onChange={handleChange}
            className="w-full p-2 border"
          />

          {/* Certifications */}
          <textarea
            name="certifications"
            placeholder="Certifications (Mention course name, platform, and year)"
            value={formData.certifications}
            onChange={handleChange}
            className="w-full p-2 border"
          />

          {/* Hackathon Participation */}
          <p className="font-medium">
            Have you participated in any Hackathons or Contests?
          </p>
          {["Yes", "No"].map((val) => (
            <label key={val} className="mr-4">
              <input
                type="radio"
                name="hackathonParticipation"
                value={val}
                checked={formData.hackathonParticipation === val}
                onChange={handleChange}
              />{" "}
              {val}
            </label>
          ))}

          {/* Hackathon Details */}
          {formData.hackathonParticipation === "Yes" && (
            <textarea
              name="hackathonDetails"
              placeholder="Mention details of Hackathons or Contests participated"
              value={formData.hackathonDetails}
              onChange={handleChange}
              className="w-full p-2 border"
            />
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep - 1)}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep + 1)}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Step 5 - Projects */}
      {currentStep === 5 && (
        <div className="space-y-6">
          <p className="text-lg font-semibold">Project Details</p>

          {formData.projects.map((project, index) => (
            <div
              key={index}
              className="space-y-3 border p-4 rounded bg-gray-50"
            >
              <h3 className="font-medium text-md">
                Project {index + 1}
                {index === 1 && " (Optional)"}
              </h3>

              <input
                type="text"
                placeholder="Project Title"
                value={project.title}
                onChange={(e) => {
                  const updatedProjects = [...formData.projects];
                  updatedProjects[index].title = e.target.value;
                  setFormData({ ...formData, projects: updatedProjects });
                }}
                className="w-full p-2 border"
              />

              <textarea
                placeholder="Project Description"
                value={project.description}
                onChange={(e) => {
                  const updatedProjects = [...formData.projects];
                  updatedProjects[index].description = e.target.value;
                  setFormData({ ...formData, projects: updatedProjects });
                }}
                className="w-full p-2 border"
              />

              <input
                type="text"
                placeholder="Technologies Used"
                value={project.technologies}
                onChange={(e) => {
                  const updatedProjects = [...formData.projects];
                  updatedProjects[index].technologies = e.target.value;
                  setFormData({ ...formData, projects: updatedProjects });
                }}
                className="w-full p-2 border"
              />

              <input
                type="text"
                placeholder="Your Role"
                value={project.role}
                onChange={(e) => {
                  const updatedProjects = [...formData.projects];
                  updatedProjects[index].role = e.target.value;
                  setFormData({ ...formData, projects: updatedProjects });
                }}
                className="w-full p-2 border"
              />

              <input
                type="url"
                placeholder="GitHub/Link (optional)"
                value={project.link}
                onChange={(e) => {
                  const updatedProjects = [...formData.projects];
                  updatedProjects[index].link = e.target.value;
                  setFormData({ ...formData, projects: updatedProjects });
                }}
                className="w-full p-2 border"
              />
            </div>
          ))}

          {/* Add More Projects Button (Optional Feature Later) */}
          {/* <button
      type="button"
      onClick={() => setFormData({ ...formData, projects: [...formData.projects, { title: "", description: "", technologies: "", role: "", link: "" }] })}
      className="text-blue-600 underline"
    >
      + Add another project
    </button> */}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep - 1)}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep + 1)}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Step 6 -- Internship/Experience */}
      {currentStep === 6 && (
        <div className="space-y-6">
          <p className="text-lg font-semibold">Internships / Work Experience</p>

          {formData.experiences.map((exp, index) => (
            <div
              key={index}
              className="space-y-3 border p-4 rounded bg-gray-50"
            >
              <h3 className="font-medium text-md">Experience {index + 1}</h3>

              <input
                type="text"
                placeholder="Internship/Job Title"
                value={exp.title}
                onChange={(e) => {
                  const updated = [...formData.experiences];
                  updated[index].title = e.target.value;
                  setFormData({ ...formData, experiences: updated });
                }}
                className="w-full p-2 border"
              />

              <input
                type="text"
                placeholder="Company Name"
                value={exp.company}
                onChange={(e) => {
                  const updated = [...formData.experiences];
                  updated[index].company = e.target.value;
                  setFormData({ ...formData, experiences: updated });
                }}
                className="w-full p-2 border"
              />

              <input
                type="text"
                placeholder="Duration (From - To)"
                value={exp.duration}
                onChange={(e) => {
                  const updated = [...formData.experiences];
                  updated[index].duration = e.target.value;
                  setFormData({ ...formData, experiences: updated });
                }}
                className="w-full p-2 border"
              />

              <textarea
                placeholder="Your Responsibilities"
                value={exp.responsibilities}
                onChange={(e) => {
                  const updated = [...formData.experiences];
                  updated[index].responsibilities = e.target.value;
                  setFormData({ ...formData, experiences: updated });
                }}
                className="w-full p-2 border"
              />

              <input
                type="text"
                placeholder="Tools/Technologies Used"
                value={exp.technologies}
                onChange={(e) => {
                  const updated = [...formData.experiences];
                  updated[index].technologies = e.target.value;
                  setFormData({ ...formData, experiences: updated });
                }}
                className="w-full p-2 border"
              />

              <select
                value={exp.workMode}
                onChange={(e) => {
                  const updated = [...formData.experiences];
                  updated[index].workMode = e.target.value;
                  setFormData({ ...formData, experiences: updated });
                }}
                className="w-full p-2 border"
              >
                <option value="">Work Mode (Remote / Onsite / Hybrid)</option>
                <option value="Remote">Remote</option>
                <option value="Onsite">Onsite</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
          ))}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep - 1)}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep + 1)}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Step 7 - Achievements and Co-curricular */}
      {currentStep === 7 && (
        <div className="space-y-6">
          <p className="text-lg font-semibold">
            Achievements & Co-curricular Activities
          </p>

          <textarea
            name="academicAchievements"
            placeholder="Academic Achievements (e.g., Scholarships, Ranks)"
            value={formData.academicAchievements}
            onChange={handleChange}
            className="w-full p-2 border"
          />

          <textarea
            name="coCurricularActivities"
            placeholder="Co-curricular Activities (e.g., Clubs, Events, Competitions)"
            value={formData.coCurricularActivities}
            onChange={handleChange}
            className="w-full p-2 border"
          />

          <textarea
            name="publications"
            placeholder="Paper Publications (if any)"
            value={formData.publications}
            onChange={handleChange}
            className="w-full p-2 border"
          />

          <textarea
            name="openSourceContributions"
            placeholder="Open Source Contributions (if any)"
            value={formData.openSourceContributions}
            onChange={handleChange}
            className="w-full p-2 border"
          />

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep - 1)}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep + 1)}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Step 8 - Personality and Preferences */}
      {currentStep === 8 && (
        <div className="space-y-6">
          <p className="text-lg font-semibold">Personality & Preferences</p>

          {/* Comfortable working in teams? */}
          <p className="font-medium">Are you comfortable working in teams?</p>
          {["Yes", "No"].map((option) => (
            <label key={option} className="mr-4">
              <input
                type="radio"
                name="teamworkComfort"
                value={option}
                checked={formData.teamworkComfort === option}
                onChange={handleChange}
              />{" "}
              {option}
            </label>
          ))}

          {/* Looking for internships */}
          <p className="font-medium">
            Are you currently looking for internships?
          </p>
          {["Yes", "No"].map((option) => (
            <label key={option} className="mr-4">
              <input
                type="radio"
                name="lookingForInternships"
                value={option}
                checked={formData.lookingForInternships === option}
                onChange={handleChange}
              />{" "}
              {option}
            </label>
          ))}

          {/* Strengths */}
          <textarea
            name="strengths"
            placeholder="Your strengths (e.g., teamwork, leadership, problem-solving)"
            value={formData.strengths}
            onChange={handleChange}
            className="w-full p-2 border"
          />

          {/* Hobbies / Interests */}
          <textarea
            name="hobbiesInterests"
            placeholder="Your hobbies or interests"
            value={formData.hobbiesInterests}
            onChange={handleChange}
            className="w-full p-2 border"
          />

          {/* Special Needs / Accommodations */}
          <textarea
            name="specialNeeds"
            placeholder="Any special needs or accommodations?"
            value={formData.specialNeeds}
            onChange={handleChange}
            className="w-full p-2 border"
          />

          {/* Additional Comments / Unique Traits */}
          <textarea
            name="additionalComments"
            placeholder="Any additional comments or unique traits to highlight?"
            value={formData.additionalComments}
            onChange={handleChange}
            className="w-full p-2 border"
          />

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-4">
            <button
              type="button"
              onClick={() => setCurrentStep(currentStep - 1)}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Back
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Submit & Generate Resume
            </button>
          </div>
        </div>
      )}
      {/* </form> */}

      {generatedResume && (
        <div
          ref={previewRef}
          className="mt-8 p-6 border border-gray-300 bg-white rounded shadow"
        >
          <h2 className="text-xl font-bold mb-4">
            🎓 Generated Resume Preview
          </h2>
          <pre className="whitespace-pre-wrap font-mono text-sm text-gray-800">
            {generatedResume}
          </pre>
        </div>
      )}
    </div>
    </form>
  );
}