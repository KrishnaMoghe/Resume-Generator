import React, { useState } from "react";

const Experience = ({ formData, setFormData, currentStep }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [enhancedOutput, setEnhancedOutput] = useState(""); // For enhanced experiences text

  const enhanceResponsibilities = async () => {
    setLoading(true);
    setError("");
    setEnhancedOutput([]);
    try {
      const response = await fetch(
        "https://craftifyai.onrender.com/api/enhance-experiences",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) throw new Error("Failed to enhance experiences");

      const data = await response.json();

      if (
        data.enhanced &&
        Array.isArray(data.enhanced.experiencesResponsibilities) &&
        data.enhanced.experiencesResponsibilities.length > 0
      ) {
        setEnhancedOutput(data.enhanced.experiencesResponsibilities);
      } else {
        throw new Error("No valid enhancement received");
      }
    } catch (err) {
      console.error(err);
      setError("Error enhancing experiences. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Applies new responsibilities from enhancedOutput to corresponding experiences
  const applyEnhancedResponsibilities = () => {
    if (enhancedOutput.length) {
      const updated = formData.experiences.map((exp, i) => ({
        ...exp,
        responsibilities: enhancedOutput[i] || exp.responsibilities,
      }));
      setFormData({ ...formData, experiences: updated });
      setEnhancedOutput([]);
    }
  };

  return (
    <div>
      {/* Step 6: Experience/Internship Section */}
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
              {formData.experiences.length > 1 && (
                <button
                  type="button"
                  onClick={() => {
                    const updatedExperiences = formData.experiences.filter(
                      (_, i) => i !== index
                    );
                    setFormData({
                      ...formData,
                      experiences: updatedExperiences,
                    });
                  }}
                  className="btn btn-danger btn-sm"
                  style={{ float: "right" }}
                >
                  Remove
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={() => {
              setFormData((prev) => ({
                ...prev,
                experiences: [
                  ...prev.experiences,
                  {
                    title: "",
                    company: "",
                    duration: "",
                    responsibilities: "",
                    technologies: "",
                    workMode: "",
                  },
                ],
              }));
            }}
            className="btn btn-secondary"
          >
            Add Another Experience
          </button>

          {/* Enhance Button */}
          <div style={{ marginTop: "20px" }}>
            <button
              type="button"
              onClick={enhanceResponsibilities}
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Enhancing..." : "Enhance Responsibilities"}
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>

          {/* Enhanced Output Display */}
          {enhancedOutput.length > 0 && (
            <div
              style={{
                marginTop: "30px",
                padding: "20px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <h3>✨ Enhanced Experience Responsibilities</h3>
              <ol>
                {enhancedOutput.map((resp, idx) => (
                  <li
                    key={idx}
                    style={{ marginBottom: 12, whiteSpace: "pre-line" }}
                  >
                    {resp}
                  </li>
                ))}
              </ol>
              <button
                onClick={applyEnhancedResponsibilities}
                className="btn btn-success btn-sm"
              >
                Apply All to Form
              </button>
              <button
                type="button"
                onClick={() => setEnhancedOutput([])}
                className="btn btn-outline btn-sm"
                style={{ marginLeft: 12 }}
              >
                Clear
              </button>
            </div>
          )}

          {error && (
            <div
              style={{
                marginTop: "10px",
                fontSize: "12px",
                color: "#b00020", // a red tone to indicate error
                lineHeight: 1.4,
                backgroundColor: "#fddede",
                border: "1px solid #b00020",
                borderRadius: "4px",
                padding: "8px 12px",
              }}
            >
              <strong>Note:</strong>
              <br />
              If the <strong>Enhance</strong> button fails or shows an error,
              please try again after a moment.
              <br />
              This may happen if the AI service is busy, your internet is down,
              or your daily request limit is reached.
              <br />
              If the problem persists:
              <br />
              <ul
                style={{ marginTop: 4, marginBottom: 0, paddingLeft: "20px" }}
              >
                <li>Double-check your internet connection.</li>
                <li>Make sure all required fields are filled in.</li>
                <li>Wait a minute and try again.</li>
              </ul>
              Occasionally, the AI may not return results due to service
              interruptions or high demand. Trying again usually solves the
              issue.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Experience;
