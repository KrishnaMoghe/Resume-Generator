import React, { useState } from "react";

const Achievements = ({
  formData,
  setFormData,
  currentStep,
  handleChange,
  handleFileChange,
  renderFormGroup,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // State to hold AI-enhanced text for each enhanced field
  const [enhancedContent, setEnhancedContent] = useState({
    achievements: "",
    coCurricularActivities: "",
    publications: "",
    openSourceContributions: "",
  });

  // Extract fields to send and enhance
  const enhanceTextFields = async () => {
    setLoading(true);
    setError("");
    setEnhancedContent({
      achievements: "",
      coCurricularActivities: "",
      publications: "",
      openSourceContributions: "",
    });

    try {
      // Prepare payload with arrays, make sure each field is an array of strings if needed
      const payload = {
        projects: [], // no projects enhancement here
        experiences: [], // no experiences enhancement here
        achievements: Array.isArray(formData.achievements)
          ? formData.achievements
          : formData.achievements
          ? [formData.achievements]
          : [],
        coCurricularActivities: Array.isArray(formData.coCurricularActivities)
          ? formData.coCurricularActivities
          : formData.coCurricularActivities
          ? [formData.coCurricularActivities]
          : [],
        publications: Array.isArray(formData.publications)
          ? formData.publications
          : formData.publications
          ? [formData.publications]
          : [],
        openSourceContributions: Array.isArray(formData.openSourceContributions)
          ? formData.openSourceContributions
          : formData.openSourceContributions
          ? [formData.openSourceContributions]
          : [],
      };

      const response = await fetch(
        "https://craftifyai.onrender.com/api/enhance-achievements",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to enhance achievements section");
      }

      const data = await response.json();

      if (data.enhanced) {
        setEnhancedContent({
          achievements: Array.isArray(data.enhanced.achievements)
            ? data.enhanced.achievements.join("\n\n")
            : data.enhanced.achievements || "",
          coCurricularActivities: Array.isArray(
            data.enhanced.coCurricularActivities
          )
            ? data.enhanced.coCurricularActivities.join("\n\n")
            : data.enhanced.coCurricularActivities || "",
          publications: Array.isArray(data.enhanced.publications)
            ? data.enhanced.publications.join("\n\n")
            : data.enhanced.publications || "",
          openSourceContributions: Array.isArray(
            data.enhanced.openSourceContributions
          )
            ? data.enhanced.openSourceContributions.join("\n\n")
            : data.enhanced.openSourceContributions || "",
        });
      } else {
        throw new Error("No valid enhancement received");
      }
    } catch (err) {
      console.error(err);
      setError("Error enhancing achievements content. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Apply enhanced content back into formData for each field
  const applyEnhancedContent = () => {
    setFormData((prev) => ({
      ...prev,
      achievements: enhancedContent.achievements || prev.achievements,
      coCurricularActivities:
        enhancedContent.coCurricularActivities || prev.coCurricularActivities,
      publications: enhancedContent.publications || prev.publications,
      openSourceContributions:
        enhancedContent.openSourceContributions || prev.openSourceContributions,
    }));
    setEnhancedContent({
      achievements: "",
      coCurricularActivities: "",
      publications: "",
      openSourceContributions: "",
    });
  };

  return (
    <div>
      {currentStep === 7 && (
        <div>
          {renderFormGroup(
            "Academic Achievements",
            "achievements",
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

          {/* Enhance Button */}
          <div style={{ marginTop: "20px" }}>
            <button
              type="button"
              onClick={enhanceTextFields}
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Enhancing..." : "Enhance Achievements Section"}
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </div>

          {/* Enhanced Output Display */}
          {(enhancedContent.achievements ||
            enhancedContent.coCurricularActivities ||
            enhancedContent.publications ||
            enhancedContent.openSourceContributions) && (
            <div
              style={{
                marginTop: "30px",
                padding: "20px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                backgroundColor: "#f9f9f9",
              }}
            >
              <h3 style={{ color: "#333", marginBottom: "15px" }}>
                ✨ Enhanced Achievements Content
              </h3>

              {enhancedContent.achievements && (
                <div>
                  <h4>Academic Achievements:</h4>
                  <pre style={{ whiteSpace: "pre-wrap", lineHeight: "1.6" }}>
                    {enhancedContent.achievements}
                  </pre>
                </div>
              )}

              {enhancedContent.coCurricularActivities && (
                <div style={{ marginTop: "15px" }}>
                  <h4>Co-curricular Activities:</h4>
                  <pre style={{ whiteSpace: "pre-wrap", lineHeight: "1.6" }}>
                    {enhancedContent.coCurricularActivities}
                  </pre>
                </div>
              )}

              {enhancedContent.publications && (
                <div style={{ marginTop: "15px" }}>
                  <h4>Publications:</h4>
                  <pre style={{ whiteSpace: "pre-wrap", lineHeight: "1.6" }}>
                    {enhancedContent.publications}
                  </pre>
                </div>
              )}

              {enhancedContent.openSourceContributions && (
                <div style={{ marginTop: "15px" }}>
                  <h4>Open Source Contributions:</h4>
                  <pre style={{ whiteSpace: "pre-wrap", lineHeight: "1.6" }}>
                    {enhancedContent.openSourceContributions}
                  </pre>
                </div>
              )}

              <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
                <button
                  type="button"
                  onClick={applyEnhancedContent}
                  className="btn btn-success btn-sm"
                >
                  Apply to Form
                </button>
                <button
                  type="button"
                  onClick={() =>
                    navigator.clipboard.writeText(
                      [
                        enhancedContent.achievements,
                        enhancedContent.coCurricularActivities,
                        enhancedContent.publications,
                        enhancedContent.openSourceContributions,
                      ]
                        .filter(Boolean)
                        .join("\n\n")
                    )
                  }
                  className="btn btn-secondary btn-sm"
                >
                  Copy to Clipboard
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setEnhancedContent({
                      achievements: "",
                      coCurricularActivities: "",
                      publications: "",
                      openSourceContributions: "",
                    })
                  }
                  className="btn btn-outline btn-sm"
                  style={{ color: "#666", border: "1px solid #ccc" }}
                >
                  Clear
                </button>
              </div>
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

export default Achievements;
