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

    if (currentStep !== 8) {
      return;
    }
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
                  handleChange={handleChange}
                  handleFileChange={handleFileChange}
                  renderFormGroup={renderFormGroup}
                  renderRadioGroup={renderRadioGroup}
                  renderCheckboxGroup={renderCheckboxGroup}
                  currentStep={currentStep}
                  setFormData={setFormData}
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
                      <button onClick={downloadPDF} className="btn btn-success">
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

            <button
              onClick={downloadPDF(formData)}
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
