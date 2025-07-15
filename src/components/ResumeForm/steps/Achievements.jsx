import React from "react";

const Achievements = ({
  formData,
  setFormData,
  currentStep,
  handleChange,
  handleFileChange,
  renderFormGroup,
}) => {
  return (
    <div>
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
    </div>
  );
};


export default Achievements;