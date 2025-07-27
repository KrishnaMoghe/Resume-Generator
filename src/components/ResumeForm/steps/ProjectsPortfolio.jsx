import React, { useState } from "react";

const ProjectsPortfolio = ({
  formData,
  setFormData,
  currentStep,
  experienceMode = false, // pass true if this component is being used for experiences/internships
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [enhancedOutput, setEnhancedOutput] = useState("");

  const enhanceDescriptions = async () => {
    setLoading(true);
    setError("");
    setEnhancedOutput([]);
    try {
      // Send the full formData for consistency
      const response = await fetch(
        "https://craftifyai.onrender.com/api/enhance-projects",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) throw new Error("Failed to enhance projects");

      const data = await response.json();

      if (
        data.enhanced &&
        Array.isArray(data.enhanced.projectsDescriptions) &&
        data.enhanced.projectsDescriptions.length > 0
      ) {
        setEnhancedOutput(data.enhanced.projectsDescriptions);
      } else {
        throw new Error("No valid enhancement received");
      }
    } catch (err) {
      console.error(err);
      setError("Error enhancing descriptions. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Applies new descriptions from enhancedOutput to corresponding projects
  const applyEnhancedDescriptions = () => {
    if (enhancedOutput.length) {
      const updated = formData.projects.map((p, i) => ({
        ...p,
        description: enhancedOutput[i] || p.description,
      }));
      setFormData({ ...formData, projects: updated });
      setEnhancedOutput([]);
    }
  };

  return (
    <div>
      {currentStep === 5 && (
        <div>
          {/* Render Project or Experience form fields based on use case */}
          {(!experienceMode ? formData.projects : formData.experiences).map(
            (item, idx) => (
              <div key={idx} className="project-card">
                <h3 className="card-title">
                  {experienceMode ? "Experience/Internship" : "Project"}{" "}
                  {idx + 1} {idx === 1 && "(Optional)"}
                </h3>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder={
                      experienceMode ? "Role/Title" : "Project Title"
                    }
                    value={item.title}
                    onChange={(e) => {
                      const updated = [
                        ...(experienceMode
                          ? formData.experiences
                          : formData.projects),
                      ];
                      updated[idx].title = e.target.value;
                      setFormData({
                        ...formData,
                        ...(experienceMode
                          ? { experiences: updated }
                          : { projects: updated }),
                      });
                    }}
                    className="form-input"
                  />
                </div>
                <div className="form-group">
                  <textarea
                    placeholder={
                      experienceMode
                        ? "Experience Description"
                        : "Project Description"
                    }
                    value={item.description}
                    onChange={(e) => {
                      const updated = [
                        ...(experienceMode
                          ? formData.experiences
                          : formData.projects),
                      ];
                      updated[idx].description = e.target.value;
                      setFormData({
                        ...formData,
                        ...(experienceMode
                          ? { experiences: updated }
                          : { projects: updated }),
                      });
                    }}
                    className="form-input form-textarea"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    placeholder="Technologies Used"
                    value={item.technologies}
                    onChange={(e) => {
                      const updated = [
                        ...(experienceMode
                          ? formData.experiences
                          : formData.projects),
                      ];
                      updated[idx].technologies = e.target.value;
                      setFormData({
                        ...formData,
                        ...(experienceMode
                          ? { experiences: updated }
                          : { projects: updated }),
                      });
                    }}
                    className="form-input"
                  />
                </div>
                {!experienceMode && (
                  <div className="form-group">
                    <input
                      type="text"
                      placeholder="Your Role"
                      value={item.role}
                      onChange={(e) => {
                        const updated = [...formData.projects];
                        updated[idx].role = e.target.value;
                        setFormData({ ...formData, projects: updated });
                      }}
                      className="form-input"
                    />
                  </div>
                )}
                <div className="form-group">
                  <input
                    type="url"
                    placeholder="GitHub/Demo Link (Optional)"
                    value={item.link}
                    onChange={(e) => {
                      const updated = [
                        ...(experienceMode
                          ? formData.experiences
                          : formData.projects),
                      ];
                      updated[idx].link = e.target.value;
                      setFormData({
                        ...formData,
                        ...(experienceMode
                          ? { experiences: updated }
                          : { projects: updated }),
                      });
                    }}
                    className="form-input"
                  />
                </div>
                {(experienceMode ? formData.experiences : formData.projects)
                  .length > 1 && (
                  <button
                    type="button"
                    onClick={() => {
                      const updated = (
                        experienceMode
                          ? formData.experiences
                          : formData.projects
                      ).filter((_, i) => i !== idx);
                      setFormData({
                        ...formData,
                        ...(experienceMode
                          ? { experiences: updated }
                          : { projects: updated }),
                      });
                    }}
                    className="btn btn-danger btn-sm"
                    style={{ float: "right" }}
                  >
                    Remove
                  </button>
                )}
              </div>
            )
          )}
          <button
            type="button"
            onClick={() => {
              setFormData((prev) => ({
                ...prev,
                ...(experienceMode
                  ? {
                      experiences: [
                        ...prev.experiences,
                        {
                          title: "",
                          description: "",
                          technologies: "",
                          link: "",
                        },
                      ],
                    }
                  : {
                      projects: [
                        ...prev.projects,
                        {
                          title: "",
                          description: "",
                          technologies: "",
                          role: "",
                          link: "",
                        },
                      ],
                    }),
              }));
            }}
            className="btn btn-secondary"
          >
            Add Another {experienceMode ? "Experience" : "Project"}
          </button>
          {/* Enhance Button */}
          <div style={{ marginTop: "20px" }}>
            <button
              type="button"
              onClick={enhanceDescriptions}
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Enhancing..." : "Enhance Project Descriptions"}
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>

          {/* AI Output Display */}
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
              <h3>✨ Enhanced Project Descriptions</h3>
              <ol>
                {enhancedOutput.map((desc, idx) => (
                  <li
                    key={idx}
                    style={{ marginBottom: 12, whiteSpace: "pre-line" }}
                  >
                    {desc}
                  </li>
                ))}
              </ol>
              <button
                onClick={applyEnhancedDescriptions}
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

export default ProjectsPortfolio;
