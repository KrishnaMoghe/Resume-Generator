import React, { useState, useRef } from "react";
import downloadPDF from "./helpers";
import useFormData from "./hooks/UseFormData";
import useFormNavigation from "./hooks/useFormNavigation";
import "./ResumeForm.css";
import ResumePreview from "./ResumePreview";
import PersonalInfo from "./steps/PersonalInfo";
import EducationalBackground from "./steps/EducationalBackground";
import CareerGoals from "./steps/CareerGoals";
import TechnicalSkills from "./steps/TechnicalSkills";
import ProjectsPortfolio from "./steps/ProjectsPortfolio";
import Experience from "./steps/Experience";
import Achievements from "./steps/Achievements";
import FinalDetails from "./steps/FinalDetails";

// import html2pdf from "html2pdf.js";
import constants from "./constants";
const { stepTitles } = constants;
const { domainOptions } = constants;
const { toolOptions } = constants;
export default function ResumeForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [generatedResume, setGeneratedResume] = useState("");
  const previewRef = useRef(null);

  const {
    formData,
    setFormData,
    handleChange,
    handleFileChange,
    handleCheckboxChange,
    removeDomain,
    removeTool,
  } = useFormData();

  const {
    currentStep,
    setCurrentStep,
    completedSteps,
    setCompletedSteps,
    handleNext,
    handleBack,
    handleTabClick,
    markStepCompleted,
  } = useFormNavigation(1, 8);
  // Handle all changes except file

  const handleNextClick = () => {
    setError("");
    handleNext(); // from the hook
  };

  const handleBackClick = () => {
    setError("");
    handleBack(); // from the hook
  };

  const handleTabClickWrapper = (stepNumber) => {
    setError("");
    handleTabClick(stepNumber); // from the hook
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
      setSuccess("Resume generated successfully! 🎉");
  
      // ✅ Clean the generated content
      let rawResume = data.resume;
  
      // Remove markdown and extra explanation text
      rawResume = rawResume
        .replace(/^[\s\S]*?```html/i, "")      // Remove everything before ```html
        .replace(/```[\s\S]*$/, "")           // Remove everything after final ```
        .trim();                              // Trim leftover whitespace
        
        const imageHTML = formData.photo
        ? `<img src="${formData.photo}" alt="User Photo" style="width:120px;height:120px;border-radius:8px;margin-bottom:20px;" />`
        : "";
      // ✅ Open clean HTML in new tab
      const newTab = window.open();
      if (newTab) {
        newTab.document.open();
        newTab.document.write(`
          <html>
            <head>
              <title>Generated Resume</title>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  line-height: 1.5;
                  margin: 40px;
                  background: #fff;
                }
                h1, h2, h3 {
                  color: #333;
                }
                .download-btn {
                  display: inline-block;
                  margin-top: 20px;
                  padding: 10px 20px;
                  background-color: #007bff;
                  color: white;
                  border: none;
                  border-radius: 4px;
                  font-size: 14px;
                  cursor: pointer;
                }
                .download-btn:hover {
                  background-color: #0056b3;
                }
              </style>
            </head>
            <body>
              ${imageHTML}
              ${rawResume}
              <button class="download-btn" onclick="window.print()">Download PDF</button>
            </body>
          </html>
        `);
        newTab.document.close();
      } else {
        alert("Popup blocked. Please allow popups for this site.");
      }
  
    } catch (error) {
      console.error("Error submitting form", error);
      setError("Something went wrong while generating resume. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  const resumeRef = useRef(null);

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

        <div className="tab-navigation">
          <div className="tab-container">
            {Object.entries(stepTitles).map(([stepNum, title]) => (
              <button
                key={stepNum}
                type="button"
                className={`tab-button ${
                  currentStep === parseInt(stepNum) ? "active" : ""
                } ${completedSteps.has(parseInt(stepNum)) ? "completed" : ""}`}
                onClick={() => handleTabClick(parseInt(stepNum))}
              >
                <span className="tab-number">
                  {completedSteps.has(parseInt(stepNum)) ? "✓" : stepNum}
                </span>
                <span className="tab-title">{title}</span>
              </button>
            ))}
          </div>
        </div>

        <form>
          <div className="form-content">
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <div className="step-section">
              <h2 className="section-title">{stepTitles[currentStep]}</h2>

              {currentStep === 1 && (
                <PersonalInfo
                  formData={formData}
                  handleChange={handleChange}
                  handleFileChange={handleFileChange}
                  renderFormGroup={renderFormGroup}
                />
              )}

              {currentStep === 2 && (
                <EducationalBackground
                  formData={formData}
                  handleChange={handleChange}
                  handleFileChange={handleFileChange}
                  renderFormGroup={renderFormGroup}
                  currentStep={currentStep}
                />
              )}

              {currentStep === 3 && (
                <CareerGoals
                  formData={formData}
                  handleChange={handleChange}
                  handleFileChange={handleFileChange}
                  renderFormGroup={renderFormGroup}
                  currentStep={currentStep}
                  renderCheckboxGroup={renderCheckboxGroup}
                  renderRadioGroup={renderRadioGroup}
                  setFormData={setFormData}
                  removeDomain={removeDomain}
                  domainOptions={domainOptions}
                />
              )}

              {currentStep === 4 && (
                <TechnicalSkills
                  formData={formData}
                  renderFormGroup={renderFormGroup}
                  currentStep={currentStep}
                  renderRadioGroup={renderRadioGroup}
                  renderCheckboxGroup={renderCheckboxGroup}
                  toolOptions={toolOptions}
                  setFormData={setFormData}
                  removeTool={removeTool}
                />
              )}

              {currentStep === 5 && (
                <ProjectsPortfolio
                  formData={formData}
                  handleChange={handleChange}
                  handleFileChange={handleFileChange}
                  renderFormGroup={renderFormGroup}
                  currentStep={currentStep}
                  setFormData={setFormData}
                />
              )}

              {currentStep === 6 && (
                <Experience
                  formData={formData}
                  setFormData={setFormData}
                  currentStep={currentStep}
                />
              )}

              {currentStep === 7 && (
                <Achievements
                  formData={formData}
                  handleChange={handleChange}
                  handleFileChange={handleFileChange}
                  renderFormGroup={renderFormGroup}
                  currentStep={currentStep}
                  setFormData={setFormData}
                />
              )}

              {currentStep === 8 && (
                <FinalDetails
                  formData={formData}
                  renderFormGroup={renderFormGroup}
                  renderRadioGroup={renderRadioGroup}
                  currentStep={currentStep}
                  setFormData={setFormData}
                />
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
                  <div style={{ display: "flex", gap: "10px" }}>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="btn btn-primary"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <span className="spinner-border spinner-border-sm mr-2"></span>
                          Generating Resume...
                        </>
                      ) : (
                        "Preview Resume"
                      )}
                    </button>
                    {generatedResume && (
                      <button
                        type="button"
                        onClick={() => downloadPDF(formData)}
                        className="btn btn-success"
                      >
                        Download Resume as PDF
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </form>

        {generatedResume && (
          <>
            <ResumePreview formData={formData} refProp={resumeRef} />
          </>
        )}
      </div>
    </div>
  );
}
