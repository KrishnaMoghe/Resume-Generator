import React, { useState, useRef } from "react";
import "./ResumeForm.css";

export default function ResumeForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
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
    coCurricularActivities: "Member of Coding Club, Robotics Workshop Participant",
    publications: "Published a paper in IEEE Xplore on Edge Computing",
    openSourceContributions: "Contributed to Mozilla Firefox DevTools",

    teamworkComfort: "Yes",
    lookingForInternships: "Yes",
    strengths: "Teamwork, Problem-solving, Quick learner",
    hobbiesInterests: "Playing chess, Blogging, UI Design",
    specialNeeds: "None",
    additionalComments: "Looking forward to work in fast-paced learning environments",
  });

  const [generatedResume, setGeneratedResume] = useState("");
  const previewRef = useRef(null);

  const stepTitles = {
    1: "Personal Information",
    2: "Educational Background",
    3: "Career Goals & Preferences",
    4: "Technical Skills",
    5: "Projects Portfolio",
    6: "Experience & Internships",
    7: "Achievements & Activities",
    8: "Personality & Final Details"
  };

  // Handle all changes except file
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  // Handle file input separately
  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
    setError("");
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("http://localhost:5000/api/generate-resume", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to generate resume");
      }

      const data = await response.json();
      setGeneratedResume(data.resume);
      setSuccess("Resume generated successfully! 🎉");

      // Scroll to resume preview
      setTimeout(() => {
        if (previewRef.current) {
          previewRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    } catch (error) {
      console.error("Error submitting form", error);
      setError("Something went wrong while generating resume. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckboxChange = (value, field) => {
    const currentValues = formData[field];
    const updatedValues = currentValues.includes(value)
      ? currentValues.filter((item) => item !== value)
      : [...currentValues, value];
    setFormData({ ...formData, [field]: updatedValues });
  };

  const renderFormGroup = (label, name, type = "text", placeholder = "", required = false, options = null) => {
    return (
      <div className="form-group">
        <label className="form-label" htmlFor={name}>
          {label} {required && <span style={{color: '#dc2626'}}>*</span>}
        </label>
        {type === "textarea" ? (
          <textarea
            id={name}
            name={name}
            placeholder={placeholder}
            value={formData[name]}
            onChange={handleChange}
            className="form-input form-textarea"
            required={required}
          />
        ) : type === "select" ? (
          <select
            id={name}
            name={name}
            value={formData[name]}
            onChange={handleChange}
            className="form-input form-select"
            required={required}
          >
            <option value="">{placeholder}</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : type === "file" ? (
          <div className="file-input-wrapper">
            <input
              type="file"
              id={name}
              name={name}
              accept="image/*"
              onChange={handleFileChange}
              className="file-input"
            />
            <label htmlFor={name} className="file-input-label">
              Choose Profile Photo (Optional)
            </label>
          </div>
        ) : (
          <input
            type={type}
            id={name}
            name={name}
            placeholder={placeholder}
            value={formData[name]}
            onChange={handleChange}
            className="form-input"
            required={required}
          />
        )}
      </div>
    );
  };

  const renderCheckboxGroup = (label, options, field) => {
    return (
      <div className="form-group">
        <label className="form-label">{label}</label>
        <div className="checkbox-group">
          {options.map((option) => (
            <label
              key={option}
              className={`checkbox-item ${formData[field].includes(option) ? 'checked' : ''}`}
            >
              <input
                type="checkbox"
                value={option}
                checked={formData[field].includes(option)}
                onChange={() => handleCheckboxChange(option, field)}
              />
              {option}
            </label>
          ))}
        </div>
      </div>
    );
  };

  const renderRadioGroup = (label, options, field) => {
    return (
      <div className="form-group">
        <label className="form-label">{label}</label>
        <div className="radio-group">
          {options.map((option) => (
            <label
              key={option}
              className={`radio-item ${formData[field] === option ? 'checked' : ''}`}
            >
              <input
                type="radio"
                name={field}
                value={option}
                checked={formData[field] === option}
                onChange={handleChange}
              />
              {option}
            </label>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="resume-form-container">
      <div className="form-wrapper">
        <div className="form-header">
          <h1 className="form-title">Resume Generator</h1>
          <p className="form-subtitle">Create your professional resume in minutes</p>
        </div>

        <div className="progress-container">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${(currentStep / 8) * 100}%` }}></div>
          </div>
          <div className="step-indicator">
            <span className="step-number">Step {currentStep} of 8</span>
            <span>{stepTitles[currentStep]}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-content">
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <div className="step-section">
              <h2 className="section-title">{stepTitles[currentStep]}</h2>

              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div>
                  {renderFormGroup("Full Name", "fullName", "text", "Enter your full name", true)}
                  {renderFormGroup("Email Address", "email", "email", "Enter your email address", true)}
                  {renderFormGroup("Mobile Number", "phone", "tel", "Enter your mobile number", true)}
                  {renderFormGroup("Date of Birth", "dob", "date", "", true)}
                  {renderFormGroup("Gender", "gender", "select", "Select your gender", false, [
                    { value: "male", label: "Male" },
                    { value: "female", label: "Female" },
                    { value: "other", label: "Other" },
                    { value: "prefer_not", label: "Prefer not to say" }
                  ])}
                  {renderFormGroup("Permanent Address", "address", "textarea", "Enter your permanent address", true)}
                  {renderFormGroup("LinkedIn Profile", "linkedIn", "url", "https://linkedin.com/in/yourprofile")}
                  {renderFormGroup("GitHub/Portfolio", "github", "url", "https://github.com/yourusername")}
                  {renderFormGroup("Languages Known", "languages", "text", "e.g., English, Hindi, Gujarati")}
                  {renderFormGroup("Profile Photo", "photo", "file")}
                </div>
              )}

              {/* Step 2: Educational Background */}
              {currentStep === 2 && (
                <div>
                  {renderFormGroup("Current Degree", "currentDegree", "text", "e.g., B.Tech in Computer Engineering", true)}
                  {renderFormGroup("College Name", "collegeName", "text", "Enter your college name", true)}
                  {renderFormGroup("University Name", "universityName", "text", "Enter your university name", true)}
                  {renderFormGroup("Current Semester", "currentSemester", "number", "Enter current semester", true)}
                  {renderFormGroup("Expected Graduation Year", "graduationYear", "number", "Enter graduation year", true)}
                  {renderFormGroup("Latest CGPA/Percentage", "cgpa", "text", "Enter your CGPA or percentage", true)}
                  
                  {renderRadioGroup("Have you had any backlogs?", ["Yes", "No"], "backlogs")}
                  
                  {renderFormGroup("12th School Name", "twelfthSchool", "text", "Enter your 12th school name")}
                  {renderFormGroup("12th Board", "twelfthBoard", "text", "e.g., CBSE, GSEB")}
                  {renderFormGroup("12th Marks", "twelfthMarks", "text", "Enter percentage or grade")}
                  {renderFormGroup("10th School Name", "tenthSchool", "text", "Enter your 10th school name")}
                  {renderFormGroup("10th Board", "tenthBoard", "text", "e.g., CBSE, GSEB")}
                  {renderFormGroup("10th Marks", "tenthMarks", "text", "Enter percentage or grade")}
                </div>
              )}

              {/* Step 3: Career Goals */}
              {currentStep === 3 && (
                <div>
                  {renderCheckboxGroup("Career Plans After Graduation", [
                    "Campus Placements",
                    "Off-Campus Jobs",
                    "Higher Studies (India)",
                    "Higher Studies (Abroad)",
                    "Start a Business",
                    "Government Jobs",
                    "Not Sure Yet"
                  ], "careerPlans")}

                  {renderCheckboxGroup("Preferred Domain/Field of Work", [
                    "Software Development",
                    "Web Development",
                    "Data Science / AI / ML",
                    "Cybersecurity",
                    "Networking",
                    "UI/UX Design",
                    "Cloud / DevOps",
                    "Embedded / IoT",
                    "Blockchain"
                  ], "preferredDomains")}

                  {renderFormGroup("Other Domain", "otherDomain", "text", "Specify other domain if any")}
                  {renderRadioGroup("Are you open to relocation?", ["Yes", "No", "Depends"], "relocation")}
                  {renderRadioGroup("Are you preparing for competitive exams?", ["Yes", "No"], "preparingExams")}
                  
                  {formData.preparingExams === "Yes" && (
                    renderFormGroup("Exam Names", "examNames", "text", "e.g., GATE, GRE, CAT")
                  )}
                </div>
              )}

              {/* Step 4: Technical Skills */}
              {currentStep === 4 && (
                <div>
                  {renderRadioGroup("Rate your coding proficiency", ["1", "2", "3", "4", "5"], "codingProficiency")}
                  
                  {renderCheckboxGroup("Programming Languages Known", [
                    "C", "C++", "Java", "Python", "JavaScript", "Kotlin", "Go", "Rust"
                  ], "programmingLanguages")}
                  
                  {renderFormGroup("Other Programming Language", "otherLanguage", "text", "Specify other language if any")}
                  
                  {renderCheckboxGroup("Technologies/Tools Known", [
                    "HTML/CSS", "React.js", "Node.js", "MySQL/PostgreSQL", "MongoDB", 
                    "TensorFlow/PyTorch", "Docker/Kubernetes", "Figma", "Git/GitHub"
                  ], "toolsTechnologies")}
                  
                  {renderFormGroup("Other Tools/Technologies", "otherTool", "text", "Specify other tools if any")}
                  {renderFormGroup("Certifications", "certifications", "textarea", "Mention course name, platform, and year")}
                  {renderRadioGroup("Have you participated in Hackathons/Contests?", ["Yes", "No"], "hackathonParticipation")}
                  
                  {formData.hackathonParticipation === "Yes" && (
                    renderFormGroup("Hackathon Details", "hackathonDetails", "textarea", "Mention details of hackathons or contests")
                  )}
                </div>
              )}

              {/* Step 5: Projects */}
              {currentStep === 5 && (
                <div>
                  {formData.projects.map((project, index) => (
                    <div key={index} className="project-card">
                      <h3 className="card-title">
                        Project {index + 1} {index === 1 && "(Optional)"}
                      </h3>
                      <div className="form-group">
                        <input
                          type="text"
                          placeholder="Project Title"
                          value={project.title}
                          onChange={(e) => {
                            const updatedProjects = [...formData.projects];
                            updatedProjects[index].title = e.target.value;
                            setFormData({ ...formData, projects: updatedProjects });
                          }}
                          className="form-input"
                        />
                      </div>
                      <div className="form-group">
                        <textarea
                          placeholder="Project Description"
                          value={project.description}
                          onChange={(e) => {
                            const updatedProjects = [...formData.projects];
                            updatedProjects[index].description = e.target.value;
                            setFormData({ ...formData, projects: updatedProjects });
                          }}
                          className="form-input form-textarea"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          placeholder="Technologies Used"
                          value={project.technologies}
                          onChange={(e) => {
                            const updatedProjects = [...formData.projects];
                            updatedProjects[index].technologies = e.target.value;
                            setFormData({ ...formData, projects: updatedProjects });
                          }}
                          className="form-input"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          placeholder="Your Role"
                          value={project.role}
                          onChange={(e) => {
                            const updatedProjects = [...formData.projects];
                            updatedProjects[index].role = e.target.value;
                            setFormData({ ...formData, projects: updatedProjects });
                          }}
                          className="form-input"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="url"
                          placeholder="GitHub/Demo Link (Optional)"
                          value={project.link}
                          onChange={(e) => {
                            const updatedProjects = [...formData.projects];
                            updatedProjects[index].link = e.target.value;
                            setFormData({ ...formData, projects: updatedProjects });
                          }}
                          className="form-input"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Step 6: Experience */}
              {currentStep === 6 && (
                <div>
                  {formData.experiences.map((exp, index) => (
                    <div key={index} className="experience-card">
                      <h3 className="card-title">Experience {index + 1}</h3>
                      <div className="form-group">
                        <input
                          type="text"
                          placeholder="Internship/Job Title"
                          value={exp.title}
                          onChange={(e) => {
                            const updated = [...formData.experiences];
                            updated[index].title = e.target.value;
                            setFormData({ ...formData, experiences: updated });
                          }}
                          className="form-input"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          placeholder="Company Name"
                          value={exp.company}
                          onChange={(e) => {
                            const updated = [...formData.experiences];
                            updated[index].company = e.target.value;
                            setFormData({ ...formData, experiences: updated });
                          }}
                          className="form-input"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          placeholder="Duration (From - To)"
                          value={exp.duration}
                          onChange={(e) => {
                            const updated = [...formData.experiences];
                            updated[index].duration = e.target.value;
                            setFormData({ ...formData, experiences: updated });
                          }}
                          className="form-input"
                        />
                      </div>
                      <div className="form-group">
                        <textarea
                          placeholder="Your Responsibilities"
                          value={exp.responsibilities}
                          onChange={(e) => {
                            const updated = [...formData.experiences];
                            updated[index].responsibilities = e.target.value;
                            setFormData({ ...formData, experiences: updated });
                          }}
                          className="form-input form-textarea"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          placeholder="Tools/Technologies Used"
                          value={exp.technologies}
                          onChange={(e) => {
                            const updated = [...formData.experiences];
                            updated[index].technologies = e.target.value;
                            setFormData({ ...formData, experiences: updated });
                          }}
                          className="form-input"
                        />
                      </div>
                      <div className="form-group">
                        <select
                          value={exp.workMode}
                          onChange={(e) => {
                            const updated = [...formData.experiences];
                            updated[index].workMode = e.target.value;
                            setFormData({ ...formData, experiences: updated });
                          }}
                          className="form-input form-select"
                        >
                          <option value="">Select Work Mode</option>
                          <option value="Remote">Remote</option>
                          <option value="Onsite">Onsite</option>
                          <option value="Hybrid">Hybrid</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Step 7: Achievements */}
              {currentStep === 7 && (
                <div>
                  {renderFormGroup("Academic Achievements", "academicAchievements", "textarea", "e.g., Scholarships, Ranks, Awards")}
                  {renderFormGroup("Co-curricular Activities", "coCurricularActivities", "textarea", "e.g., Clubs, Events, Competitions")}
                  {renderFormGroup("Paper Publications", "publications", "textarea", "Mention any research papers or publications")}
                  {renderFormGroup("Open Source Contributions", "openSourceContributions", "textarea", "Mention any open source projects you've contributed to")}
                </div>
              )}

              {/* Step 8: Final Details */}
              {currentStep === 8 && (
                <div>
                  {renderRadioGroup("Are you comfortable working in teams?", ["Yes", "No"], "teamworkComfort")}
                  {renderRadioGroup("Are you currently looking for internships?", ["Yes", "No"], "lookingForInternships")}
                  {renderFormGroup("Your Strengths", "strengths", "textarea", "e.g., teamwork, leadership, problem-solving")}
                  {renderFormGroup("Hobbies & Interests", "hobbiesInterests", "textarea", "Share your hobbies and interests")}
                  {renderFormGroup("Special Needs/Accommodations", "specialNeeds", "textarea", "Any special needs or accommodations?")}
                  {renderFormGroup("Additional Comments", "additionalComments", "textarea", "Any additional comments or unique traits to highlight?")}
                </div>
              )}

              <div className="button-group">
                {currentStep > 1 && (
                  <button type="button" onClick={handleBack} className="btn btn-secondary">
                    ← Back
                  </button>
                )}
                <div></div>
                {currentStep < 8 ? (
                  <button type="button" onClick={handleNext} className="btn btn-primary">
                    Next →
                  </button>
                ) : (
                  <button type="submit" className="btn btn-success" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <span className="loading-spinner"></span>
                        Generating Resume...
                      </>
                    ) : (
                      "Generate Resume"
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </form>

        {generatedResume && (
          <div ref={previewRef} className="resume-preview">
            <div className="preview-header">
              <span style={{ fontSize: '2rem' }}>🎓</span>
              <h2 className="preview-title">Generated Resume Preview</h2>
            </div>
            <div className="preview-content">
              {generatedResume}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}