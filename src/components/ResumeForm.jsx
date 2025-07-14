import React, { useState, useRef } from "react";
import "./ResumeForm.css";
import ResumePreview from "./ResumePreview";
import html2pdf from "html2pdf.js";
import jsPDF from "jspdf";

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

    branch: "",
    preferredDomains: [],
    customDomains: [],
    toolsTechnologies: [],
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
    8: "Personality & Final Details",
  };

  // Branch wise domain and tool options
  const domainOptions = {
    Computer: [
      "Software Development",
      "Web Development",
      "Data Science / AI / ML",
      "Cybersecurity",
      "UI/UX Design",
      "Cloud / DevOps",
      "Embedded Systems",
      "Blockchain",
    ],
    Mechanical: [
      "Design Engineering",
      "Manufacturing",
      "Automobile",
      "CAD/CAE",
      "Robotics",
    ],
    Civil: [
      "Structural Engineering",
      "Construction Management",
      "Surveying",
      "Transportation",
    ],
    Electrical: [
      "Power Systems",
      "Control Systems",
      "Automation",
      "VLSI",
      "Energy Systems",
    ],
    EC: [
      "Embedded Systems",
      "Signal Processing",
      "IoT",
      "Communication Systems",
    ],
    Chemical: [
      "Process Engineering",
      "Environmental Engineering",
      "Petrochemicals",
    ],
  };

  const toolOptions = {
    Computer: ["Python", "Java", "React", "Node.js", "MongoDB"],
    Mechanical: ["AutoCAD", "SolidWorks", "ANSYS"],
    Civil: ["STAAD Pro", "AutoCAD Civil 3D"],
    Electrical: ["MATLAB", "Simulink", "PSpice"],
    EC: ["Arduino", "Verilog", "MATLAB"],
    Chemical: ["ASPEN", "CHEMCAD"],
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
      setError(
        "Something went wrong while generating resume. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const resumeRef = useRef(null);
  const downloadPDF = () => {
    const pdf = new jsPDF();

    // Set default font
    pdf.setFont("helvetica");

    let yPosition = 20;
    const lineHeight = 6;
    const pageHeight = pdf.internal.pageSize.height;
    const pageWidth = pdf.internal.pageSize.width;
    const leftMargin = 15;
    const rightMargin = 15;
    const contentWidth = pageWidth - leftMargin - rightMargin;

    // Helper function to check if we need a new page
    const checkNewPage = (requiredHeight = 15) => {
      if (yPosition + requiredHeight > pageHeight - 20) {
        pdf.addPage();
        yPosition = 20;
      }
    };

    // Helper function to add text with line breaks and formatting
    const addText = (text, fontSize = 10, isBold = false, isCenter = false) => {
      if (!text || text.trim() === "") return;

      checkNewPage();

      pdf.setFontSize(fontSize);
      pdf.setFont("helvetica", isBold ? "bold" : "normal");

      const lines = pdf.splitTextToSize(text.toString(), contentWidth);
      lines.forEach((line) => {
        const xPosition = isCenter
          ? (pageWidth - pdf.getTextWidth(line)) / 2
          : leftMargin;

        pdf.text(line, xPosition, yPosition);
        yPosition += lineHeight;
      });
      yPosition += 2; // Extra spacing after text block
    };

    // Helper function to add section divider
    const addSectionDivider = () => {
      checkNewPage();
      pdf.setDrawColor(0, 0, 0);
      pdf.setLineWidth(0.5);
      pdf.line(leftMargin, yPosition, pageWidth - rightMargin, yPosition);
      yPosition += 8;
    };

    // Helper function to add bullet points
    const addBulletPoint = (text, fontSize = 10) => {
      if (!text || text.trim() === "") return;

      checkNewPage();

      pdf.setFontSize(fontSize);
      pdf.setFont("helvetica", "normal");

      const lines = pdf.splitTextToSize(text.toString(), contentWidth - 10);

      // Add bullet point
      pdf.text("•", leftMargin + 5, yPosition);

      lines.forEach((line, index) => {
        const xPosition = index === 0 ? leftMargin + 15 : leftMargin + 15;
        pdf.text(line, xPosition, yPosition);
        yPosition += lineHeight;
      });
      yPosition += 1;
    };

    // HEADER SECTION
    addText(formData.fullName, 18, true, true);
    yPosition += 2;

    // Contact Information
    const contactInfo = [];
    if (formData.email) contactInfo.push(formData.email);
    if (formData.phone) contactInfo.push(formData.phone);
    if (contactInfo.length > 0) {
      addText(contactInfo.join(" | "), 11, false, true);
    }

    if (formData.address) {
      addText(formData.address, 10, false, true);
    }

    // Social Links
    const socialLinks = [];
    if (formData.linkedIn) socialLinks.push(`LinkedIn: ${formData.linkedIn}`);
    if (formData.github) socialLinks.push(`GitHub: ${formData.github}`);
    if (socialLinks.length > 0) {
      addText(socialLinks.join(" | "), 9, false, true);
    }

    yPosition += 5;
    addSectionDivider();

    // EDUCATION SECTION
    addText("EDUCATION", 14, true);
    yPosition += 2;

    addText(`${formData.currentDegree}`, 12, true);
    addText(`${formData.collegeName}, ${formData.universityName}`, 11);

    const educationDetails = [];
    if (formData.currentSemester)
      educationDetails.push(`Current Semester: ${formData.currentSemester}`);
    if (formData.cgpa) educationDetails.push(`CGPA: ${formData.cgpa}`);
    if (formData.graduationYear)
      educationDetails.push(`Expected Graduation: ${formData.graduationYear}`);
    if (educationDetails.length > 0) {
      addText(educationDetails.join(" | "), 10);
    }

    if (formData.backlogs && formData.backlogs !== "No") {
      addText(`Backlogs: ${formData.backlogs}`, 10);
    }

    // 12th and 10th details
    if (formData.twelfthSchool) {
      yPosition += 3;
      addText(
        `12th Grade: ${formData.twelfthSchool} (${formData.twelfthBoard}) - ${formData.twelfthMarks}`,
        10
      );
    }
    if (formData.tenthSchool) {
      addText(
        `10th Grade: ${formData.tenthSchool} (${formData.tenthBoard}) - ${formData.tenthMarks}`,
        10
      );
    }

    yPosition += 5;
    addSectionDivider();

    // TECHNICAL SKILLS SECTION
    addText("TECHNICAL SKILLS", 14, true);
    yPosition += 2;

    if (
      formData.programmingLanguages &&
      formData.programmingLanguages.length > 0
    ) {
      let languages = formData.programmingLanguages.join(", ");
      if (formData.otherLanguage) languages += `, ${formData.otherLanguage}`;
      addText(`Programming Languages: ${languages}`, 10, true);
    }

    if (formData.toolsTechnologies && formData.toolsTechnologies.length > 0) {
      let tools = formData.toolsTechnologies.join(", ");
      if (formData.otherTool) tools += `, ${formData.otherTool}`;
      addText(`Tools & Technologies: ${tools}`, 10, true);
    }

    if (formData.codingProficiency) {
      addText(`Coding Proficiency: ${formData.codingProficiency}/5`, 10, true);
    }

    yPosition += 5;
    addSectionDivider();

    // PROJECTS SECTION
    const hasProjects =
      formData.projects && formData.projects.some((p) => p.title);
    if (hasProjects) {
      addText("PROJECTS", 14, true);
      yPosition += 2;

      formData.projects.forEach((project, index) => {
        if (project.title) {
          checkNewPage(25); // Ensure enough space for project

          addText(`${project.title}`, 12, true);
          if (project.role) addText(`Role: ${project.role}`, 10);
          if (project.technologies)
            addText(`Technologies: ${project.technologies}`, 10);
          if (project.description) addText(project.description, 10);
          if (project.link) addText(`Link: ${project.link}`, 9);
          yPosition += 3;
        }
      });

      yPosition += 2;
      addSectionDivider();
    }

    // EXPERIENCE SECTION
    const hasExperience =
      formData.experiences && formData.experiences.some((exp) => exp.title);
    if (hasExperience) {
      addText("EXPERIENCE", 14, true);
      yPosition += 2;

      formData.experiences.forEach((exp) => {
        if (exp.title) {
          checkNewPage(25); // Ensure enough space for experience

          addText(`${exp.title} - ${exp.company}`, 12, true);
          if (exp.duration) addText(`Duration: ${exp.duration}`, 10);
          if (exp.workMode) addText(`Work Mode: ${exp.workMode}`, 10);
          if (exp.technologies)
            addText(`Technologies: ${exp.technologies}`, 10);
          if (exp.responsibilities)
            addText(`Responsibilities: ${exp.responsibilities}`, 10);
          yPosition += 3;
        }
      });

      yPosition += 2;
      addSectionDivider();
    }

    // CERTIFICATIONS SECTION
    if (formData.certifications) {
      addText("CERTIFICATIONS", 14, true);
      yPosition += 2;
      addText(formData.certifications, 10);
      yPosition += 5;
      addSectionDivider();
    }

    // ACHIEVEMENTS SECTION
    const hasAchievements =
      formData.academicAchievements ||
      formData.coCurricularActivities ||
      formData.publications ||
      formData.openSourceContributions ||
      (formData.sportsAchievements &&
        formData.sportsAchievements.some((s) => s.sportName));

    if (hasAchievements) {
      addText("ACHIEVEMENTS & ACTIVITIES", 14, true);
      yPosition += 2;

      if (formData.academicAchievements) {
        addText("Academic Achievements:", 11, true);
        addBulletPoint(formData.academicAchievements);
      }

      if (formData.coCurricularActivities) {
        addText("Co-curricular Activities:", 11, true);
        addBulletPoint(formData.coCurricularActivities);
      }

      if (formData.publications) {
        addText("Publications:", 11, true);
        addBulletPoint(formData.publications);
      }

      if (formData.openSourceContributions) {
        addText("Open Source Contributions:", 11, true);
        addBulletPoint(formData.openSourceContributions);
      }

      if (
        formData.sportsAchievements &&
        formData.sportsAchievements.some((s) => s.sportName)
      ) {
        addText("Sports Achievements:", 11, true);
        formData.sportsAchievements.forEach((achievement) => {
          if (achievement.sportName) {
            addBulletPoint(
              `${achievement.sportName} - ${
                achievement.level || "College"
              } Level`
            );
          }
        });
      }

      if (
        formData.hackathonParticipation === "Yes" &&
        formData.hackathonDetails
      ) {
        addText("Hackathons & Contests:", 11, true);
        addBulletPoint(formData.hackathonDetails);
      }

      yPosition += 2;
      addSectionDivider();
    }

    // ADDITIONAL INFORMATION SECTION
    const hasAdditionalInfo =
      formData.languages ||
      formData.strengths ||
      formData.hobbiesInterests ||
      formData.moocCourses;

    if (hasAdditionalInfo) {
      addText("ADDITIONAL INFORMATION", 14, true);
      yPosition += 2;

      if (formData.languages) {
        addText(`Languages: ${formData.languages}`, 10);
      }

      if (formData.strengths) {
        addText(`Strengths: ${formData.strengths}`, 10);
      }

      if (formData.hobbiesInterests) {
        addText(`Hobbies & Interests: ${formData.hobbiesInterests}`, 10);
      }

      if (formData.moocCourses) {
        addText(`MOOC Courses: ${formData.moocCourses}`, 10);
      }

      // Career preferences
      if (formData.careerPlans && formData.careerPlans.length > 0) {
        addText(`Career Plans: ${formData.careerPlans.join(", ")}`, 10);
      }

      if (formData.preferredDomains && formData.preferredDomains.length > 0) {
        addText(
          `Preferred Domains: ${formData.preferredDomains.join(", ")}`,
          10
        );
      }

      if (formData.relocation) {
        addText(`Open to Relocation: ${formData.relocation}`, 10);
      }

      if (formData.lookingForInternships) {
        addText(
          `Looking for Internships: ${formData.lookingForInternships}`,
          10
        );
      }
    }

    // ADDITIONAL COMMENTS
    if (formData.additionalComments) {
      yPosition += 5;
      addText("ADDITIONAL COMMENTS", 14, true);
      yPosition += 2;
      addText(formData.additionalComments, 10);
    }

    // Footer
    yPosition = pageHeight - 15;
    pdf.setFontSize(8);
    pdf.setFont("helvetica", "normal");
    pdf.text("Generated using Resume Generator", leftMargin, yPosition);

    // Save the PDF
    pdf.save(`${formData.fullName.replace(/\s/g, "_")}_Resume.pdf`);
  };
  const handleCheckboxChange = (value, field) => {
    const currentValues = formData[field];
    const updatedValues = currentValues.includes(value)
      ? currentValues.filter((item) => item !== value)
      : [...currentValues, value];
    setFormData({ ...formData, [field]: updatedValues });
  };

  const renderFormGroup = (
    label,
    name,
    type = "text",
    placeholder = "",
    required = false,
    options = null
  ) => {
    return (
      <div className="form-group">
        <label className="form-label" htmlFor={name}>
          {label} {required && <span style={{ color: "#dc2626" }}>*</span>}
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
              className={`checkbox-item ${
                formData[field].includes(option) ? "checked" : ""
              }`}
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
              className={`radio-item ${
                formData[field] === option ? "checked" : ""
              }`}
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
          <p className="form-subtitle">
            Create your professional resume in minutes
          </p>
        </div>

        <div className="progress-container">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${(currentStep / 8) * 100}%` }}
            ></div>
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
                  {renderFormGroup(
                    "Full Name",
                    "fullName",
                    "text",
                    "Enter your full name",
                    true
                  )}
                  {renderFormGroup(
                    "Email Address",
                    "email",
                    "email",
                    "Enter your email address",
                    true
                  )}
                  {renderFormGroup(
                    "Mobile Number",
                    "phone",
                    "tel",
                    "Enter your mobile number",
                    true
                  )}
                  {renderFormGroup("Date of Birth", "dob", "date", "", true)}
                  {renderFormGroup(
                    "Gender",
                    "gender",
                    "select",
                    "Select your gender",
                    false,
                    [
                      { value: "male", label: "Male" },
                      { value: "female", label: "Female" },
                      { value: "other", label: "Other" },
                      { value: "prefer_not", label: "Prefer not to say" },
                    ]
                  )}
                  {renderFormGroup(
                    "Permanent Address",
                    "address",
                    "textarea",
                    "Enter your permanent address",
                    true
                  )}
                  {renderFormGroup(
                    "LinkedIn Profile",
                    "linkedIn",
                    "url",
                    "https://linkedin.com/in/yourprofile"
                  )}
                  {renderFormGroup(
                    "GitHub/Portfolio",
                    "github",
                    "url",
                    "https://github.com/yourusername"
                  )}
                  {renderFormGroup(
                    "Languages Known",
                    "languages",
                    "text",
                    "e.g., English, Hindi, Gujarati"
                  )}
                  {renderFormGroup("Profile Photo", "photo", "file")}
                </div>
              )}
              {/* Step 2: Educational Background */}
              {currentStep === 2 && (
                <div>
                  <select
                    name="branch"
                    value={formData.branch}
                    onChange={handleChange}
                  >
                    <option value="">Select Branch</option>
                    <option value="Computer">Computer Engineering</option>
                    <option value="Electrical">Electrical Engineering</option>
                    <option value="EC">Electronics and Communication</option>
                    <option value="Mechanical">Mechanical Engineering</option>
                    <option value="Civil">Civil Engineering</option>
                    <option value="Chemical">Chemical Engineering</option>
                  </select>
                  {renderFormGroup(
                    "Current Degree",
                    "currentDegree",
                    "text",
                    "e.g., B.Tech in Computer Engineering",
                    true
                  )}
                  {renderFormGroup(
                    "College Name",
                    "collegeName",
                    "text",
                    "Enter your college name",
                    true
                  )}
                  {renderFormGroup(
                    "University Name",
                    "universityName",
                    "text",
                    "Enter your university name",
                    true
                  )}
                  {renderFormGroup(
                    "Current Semester",
                    "currentSemester",
                    "number",
                    "Enter current semester",
                    true
                  )}
                  {renderFormGroup(
                    "Expected Graduation Year",
                    "graduationYear",
                    "number",
                    "Enter graduation year",
                    true
                  )}
                  {renderFormGroup(
                    "Latest CGPA/Percentage",
                    "cgpa",
                    "text",
                    "Enter your CGPA or percentage",
                    true
                  )}

                  {/* {renderRadioGroup(
                    "Have you had any backlogs?",
                    ["Yes", "No"],
                    "backlogs"
                  )} */}

                  {renderFormGroup(
                    "12th School Name",
                    "twelfthSchool",
                    "text",
                    "Enter your 12th school name"
                  )}
                  {renderFormGroup(
                    "12th Board",
                    "twelfthBoard",
                    "text",
                    "e.g., CBSE, GSEB"
                  )}
                  {renderFormGroup(
                    "12th Marks",
                    "twelfthMarks",
                    "text",
                    "Enter percentage or grade"
                  )}
                  {renderFormGroup(
                    "10th School Name",
                    "tenthSchool",
                    "text",
                    "Enter your 10th school name"
                  )}
                  {renderFormGroup(
                    "10th Board",
                    "tenthBoard",
                    "text",
                    "e.g., CBSE, GSEB"
                  )}
                  {renderFormGroup(
                    "10th Marks",
                    "tenthMarks",
                    "text",
                    "Enter percentage or grade"
                  )}
                </div>
              )}
              {/* Step 3: Career Goals */}
              {currentStep === 3 && (
                <div>
                  {renderCheckboxGroup(
                    "Career Plans After Graduation",
                    [
                      "Campus Placements",
                      "Off-Campus Jobs",
                      "Higher Studies (India)",
                      "Higher Studies (Abroad)",
                      "Start a Business",
                      "Government Jobs",
                      "Not Sure Yet",
                    ],
                    "careerPlans"
                  )}

                  {formData.branch && (
                    <div className="mb-4">
                      <h3 className="font-semibold mb-2">
                        Preferred Domain / Field of Work
                      </h3>

                      {/* Predefined domain options */}
                      {domainOptions[formData.branch]?.map((domain, i) => (
                        <label key={i} className="block">
                          <input
                            type="checkbox"
                            value={domain}
                            checked={formData.preferredDomains.includes(domain)}
                            onChange={(e) => {
                              const checked = e.target.checked;
                              const value = e.target.value;

                              setFormData((prev) => ({
                                ...prev,
                                preferredDomains: checked
                                  ? [...prev.preferredDomains, value]
                                  : prev.preferredDomains.filter(
                                      (d) => d !== value
                                    ),
                              }));
                            }}
                          />{" "}
                          {domain}
                        </label>
                      ))}

                      {/* Input for custom domain */}
                      <div className="flex items-center mt-2">
                        <input
                          type="text"
                          placeholder="Add custom domain"
                          value={formData.customDomainInput}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              customDomainInput: e.target.value,
                            })
                          }
                          className="form-input border p-2 mr-2 flex-1"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const custom = formData.customDomainInput.trim();
                            if (
                              custom &&
                              !formData.preferredDomains.includes(custom)
                            ) {
                              setFormData((prev) => ({
                                ...prev,
                                preferredDomains: [
                                  ...prev.preferredDomains,
                                  custom,
                                ],
                                customDomainInput: "",
                              }));
                            }
                          }}
                          className="bg-green-600 text-white px-3 py-1 rounded"
                        >
                          Add
                        </button>
                      </div>

                      {/* Display selected domains */}
                      {formData.preferredDomains.length > 0 && (
                        <div className="mt-2">
                          <h4 className="font-medium">Selected Domains:</h4>
                          <ul className="list-disc list-inside text-sm text-gray-700">
                            {formData.preferredDomains.map((domain, index) => (
                              <li key={index}>{domain}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {/* {renderFormGroup(
                    "Other Domain",
                    "otherDomain",
                    "text",
                    "Specify other domain if any"
                  )} */}
                  {renderRadioGroup(
                    "Are you open to relocation?",
                    ["Yes", "No", "Depends"],
                    "relocation"
                  )}
                  {renderRadioGroup(
                    "Are you preparing for competitive exams?",
                    ["Yes", "No"],
                    "preparingExams"
                  )}

                  {formData.preparingExams === "Yes" &&
                    renderFormGroup(
                      "Exam Names",
                      "examNames",
                      "text",
                      "e.g., GATE, GRE, CAT"
                    )}
                </div>
              )}
              {/* Step 4: Technical Skills */}
              {currentStep === 4 && (
                <div>
                  {renderRadioGroup(
                    "Rate your coding proficiency",
                    ["1", "2", "3", "4", "5"],
                    "codingProficiency"
                  )}

                  {renderCheckboxGroup(
                    "Programming Languages Known",
                    [
                      "C",
                      "C++",
                      "Java",
                      "Python",
                      "JavaScript",
                      "Kotlin",
                      "Go",
                      "Rust",
                    ],
                    "programmingLanguages"
                  )}

                  {renderFormGroup(
                    "Other Programming Language",
                    "otherLanguage",
                    "text",
                    "Specify other language if any"
                  )}

                  {formData.branch && (
                    <div className="mb-4">
                      <h3 className="font-semibold mb-2">
                        Technologies / Tools Known
                      </h3>

                      {/* Display checkboxes for the current branch */}
                      {toolOptions[formData.branch]?.map((tool, i) => (
                        <label key={i} className="block">
                          <input
                            type="checkbox"
                            value={tool}
                            checked={formData.toolsTechnologies.includes(tool)}
                            onChange={(e) => {
                              const checked = e.target.checked;
                              const value = e.target.value;

                              setFormData((prev) => ({
                                ...prev,
                                toolsTechnologies: checked
                                  ? [...prev.toolsTechnologies, value]
                                  : prev.toolsTechnologies.filter(
                                      (t) => t !== value
                                    ),
                              }));
                            }}
                          />{" "}
                          {tool}
                        </label>
                      ))}

                      {/* Input to add custom tool */}
                      <div className="flex items-center mt-2">
                        <input
                          type="text"
                          placeholder="Add custom tool or software"
                          value={formData.customToolInput}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              customToolInput: e.target.value,
                            })
                          }
                          className="form-input border p-2 mr-2 flex-1"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const custom = formData.customToolInput.trim();
                            if (
                              custom &&
                              !formData.toolsTechnologies.includes(custom)
                            ) {
                              setFormData((prev) => ({
                                ...prev,
                                toolsTechnologies: [
                                  ...prev.toolsTechnologies,
                                  custom,
                                ],
                                customToolInput: "",
                              }));
                            }
                          }}
                          className="bg-blue-500 text-white px-3 py-1 rounded"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  )}

                  {formData.toolsTechnologies.length > 0 && (
                    <div className="mt-2">
                      <h4 className="font-medium">Selected Tools:</h4>
                      <ul className="list-disc list-inside text-sm text-gray-700">
                        {formData.toolsTechnologies.map((tool, index) => (
                          <li key={index}>{tool}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* {renderFormGroup(
                    "Other Tools/Technologies",
                    "otherTool",
                    "text",
                    "Specify other tools if any"
                  )} */}
                  {renderFormGroup(
                    "Certifications",
                    "certifications",
                    "textarea",
                    "Mention course name, platform, and year"
                  )}
                  {renderRadioGroup(
                    "Have you participated in Hackathons/Contests?",
                    ["Yes", "No"],
                    "hackathonParticipation"
                  )}
                  {renderFormGroup(
                    "MOOC Courses Completed",
                    "moocCourses",
                    "textarea",
                    "e.g., Course name, Platform, Year"
                  )}

                  {formData.hackathonParticipation === "Yes" &&
                    renderFormGroup(
                      "Hackathon Details",
                      "hackathonDetails",
                      "textarea",
                      "Mention details of hackathons or contests"
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
                            setFormData({
                              ...formData,
                              projects: updatedProjects,
                            });
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
                            setFormData({
                              ...formData,
                              projects: updatedProjects,
                            });
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
                            updatedProjects[index].technologies =
                              e.target.value;
                            setFormData({
                              ...formData,
                              projects: updatedProjects,
                            });
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
                            setFormData({
                              ...formData,
                              projects: updatedProjects,
                            });
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
                            setFormData({
                              ...formData,
                              projects: updatedProjects,
                            });
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
              {/* // Replace the Sports Achievements section in Step 7 with this: */}
              {/* Step 7: Achievements */}
              {currentStep === 7 && (
                <div>
                  {renderFormGroup(
                    "Academic Achievements",
                    "academicAchievements",
                    "textarea",
                    "e.g., Scholarships, Ranks, Awards"
                  )}
                  {renderFormGroup(
                    "Co-curricular Activities",
                    "coCurricularActivities",
                    "textarea",
                    "e.g., Clubs, Events, Competitions"
                  )}
                  {renderFormGroup(
                    "Paper Publications",
                    "publications",
                    "textarea",
                    "Mention any research papers or publications"
                  )}
                  {renderFormGroup(
                    "Open Source Contributions",
                    "openSourceContributions",
                    "textarea",
                    "Mention any open source projects you've contributed to"
                  )}

                  <div className="form-group">
                    <label className="form-label">Sports Achievements</label>

                    {formData.sportsAchievements.map((achievement, index) => (
                      <div key={index} className="project-card">
                        <h3 className="card-title">Achievement {index + 1}</h3>
                        <div className="form-group">
                          <input
                            type="text"
                            placeholder="Mention the sport and achievements"
                            value={achievement.sportName}
                            onChange={(e) => {
                              const updated = [...formData.sportsAchievements];
                              updated[index].sportName = e.target.value;
                              setFormData((prev) => ({
                                ...prev,
                                sportsAchievements: updated,
                              }));
                            }}
                            className="form-input"
                          />
                        </div>

                        <div className="form-group">
                          <select
                            value={achievement.level}
                            onChange={(e) => {
                              const updated = [...formData.sportsAchievements];
                              updated[index].level = e.target.value;
                              setFormData((prev) => ({
                                ...prev,
                                sportsAchievements: updated,
                              }));
                            }}
                            className="form-input form-select"
                          >
                            <option value="">Select Level</option>
                            <option value="College">College</option>
                            <option value="District">District</option>
                            <option value="State">State</option>
                            <option value="National">National</option>
                            <option value="International">International</option>
                          </select>
                        </div>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          sportsAchievements: [
                            ...prev.sportsAchievements,
                            { sportName: "", level: "" },
                          ],
                        }))
                      }
                      className="btn btn-secondary"
                    >
                      Add Another Achievement
                    </button>
                  </div>
                </div>
              )}
              {/* Step 8: Final Details */}
              {currentStep === 8 && (
                <div>
                  {renderRadioGroup(
                    "Are you comfortable working in teams?",
                    ["Yes", "No"],
                    "teamworkComfort"
                  )}
                  {renderRadioGroup(
                    "Are you currently looking for internships?",
                    ["Yes", "No"],
                    "lookingForInternships"
                  )}
                  {renderFormGroup(
                    "Your Strengths",
                    "strengths",
                    "textarea",
                    "e.g., teamwork, leadership, problem-solving"
                  )}
                  {renderFormGroup(
                    "Hobbies & Interests",
                    "hobbiesInterests",
                    "textarea",
                    "Share your hobbies and interests"
                  )}
                  {renderFormGroup(
                    "Special Needs/Accommodations",
                    "specialNeeds",
                    "textarea",
                    "Any special needs or accommodations?"
                  )}
                  {renderFormGroup(
                    "Additional Comments",
                    "additionalComments",
                    "textarea",
                    "Any additional comments or unique traits to highlight?"
                  )}
                  {renderRadioGroup(
                    "Planning for higher studies abroad?",
                    ["Yes", "No"],
                    "planningAbroad"
                  )}

                  {renderRadioGroup(
                    "Do you intend to apply for a scholarship?",
                    ["Yes", "No"],
                    "applyingScholarship"
                  )}

                  {formData.applyingScholarship === "Yes" &&
                    renderFormGroup(
                      "Scholarship(s) you're considering",
                      "scholarshipNames",
                      "text",
                      "e.g., Fulbright, Chevening"
                    )}
                </div>
              )}
              <div className="button-group">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="btn btn-secondary"
                  >
                    ← Back
                  </button>
                )}
                <div></div>
                {currentStep < 8 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="btn btn-primary"
                  >
                    Next →
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btn btn-success"
                    disabled={isLoading}
                  >
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
          <>
            <ResumePreview formData={formData} refProp={resumeRef} />

            <button
              onClick={downloadPDF}
              className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
            >
              Download Resume as PDF
            </button>
          </>
        )}
      </div>
    </div>
  );
}
