import React from "react";
// import constants from "D:/Krishna/Projects/resume-generator/src/components/ResumeForm/constants.jsx";
const TechnicalSkills = ({
  formData,
  renderFormGroup,
  currentStep,
  renderRadioGroup,
  renderCheckboxGroup,
  toolOptions,
  setFormData,
  removeTool,
}) => {
  // Debug: Add console logs to check data
  console.log("formData:", formData);
  console.log("toolOptions:", toolOptions);
  console.log("formData.branch:", formData?.branch);
  console.log("toolOptions for branch:", toolOptions?.[formData?.branch]);

  // Merge predefined tools and custom-added tools (deduplicated)
  const allPredefined = Array.isArray(toolOptions?.[formData?.branch])
    ? toolOptions[formData.branch]
    : [];

  // Ensure toolsTechnologies is always an array
  const currentTools = Array.isArray(formData?.toolsTechnologies)
    ? formData.toolsTechnologies
    : [];

  const allTools = Array.from(
    new Set([...allPredefined, ...currentTools])
  ).sort(); // optional: sorted alphabetically

  console.log("allPredefined:", allPredefined);
  console.log("currentTools:", currentTools);
  console.log("allTools:", allTools);

  return (
    <div>
      {currentStep === 4 && (
        <div>
          {renderRadioGroup(
            "Rate your coding proficiency (Optional)",
            ["1", "2", "3", "4", "5"],
            "codingProficiency"
          )}

          {renderCheckboxGroup(
            "Programming Languages Known (Optional)",
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

          {/* Always show the tools section, but with different content based on branch */}
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Technologies / Tools Known</h3>
  
            {/* Display selected tools with delete buttons */}
            {allTools.length > 0 && (
              <div className="tools-checkbox-container">
                {allTools.map((tool, i) => (
                  <label
                    key={i}
                    className={`tools-checkbox-item ${
                      currentTools.includes(tool) ? "checked" : ""
                    }`}
                  >
                    <input
                      type="checkbox"
                      value={tool}
                      checked={currentTools.includes(tool)}
                      onChange={(e) => {
                        const checked = e.target.checked;
                        const value = e.target.value;

                        setFormData((prev) => ({
                          ...prev,
                          toolsTechnologies: checked
                            ? [...(prev.toolsTechnologies || []), value]
                            : (prev.toolsTechnologies || []).filter(
                                (t) => t !== value
                              ),
                        }));
                      }}
                    />
                    <span>{tool}</span>
                  </label>
                ))}
              </div>
            )}
          
            <div className="custom-tool-input">
              <input
                type="text"
                placeholder="Add custom tool or software"
                value={formData?.customToolInput || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    customToolInput: e.target.value,
                  })
                }
              />
              <button
                type="button"
                onClick={() => {
                  const custom = formData?.customToolInput?.trim();
                  if (custom && !currentTools.includes(custom)) {
                    setFormData((prev) => ({
                      ...prev,
                      toolsTechnologies: [
                        ...(prev.toolsTechnologies || []),
                        custom,
                      ],
                      customToolInput: "",
                    }));
                  }
                }}
              >
                Add
              </button>
            </div>
            {currentTools.length > 0 && (
              <div className="selected-tools">
                <h4>Selected Tools:</h4>
                <div className="selected-tools-grid">
                  {currentTools.map((tool, index) => (
                    <div key={index} className="selected-tool-tag">
                      <span>{tool}</span>
                      <button
                        type="button"
                        onClick={() => removeTool(tool)}
                        title="Remove tool"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

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

          {formData?.hackathonParticipation === "Yes" &&
            renderFormGroup(
              "Hackathon Details",
              "hackathonDetails",
              "textarea",
              "Mention details of hackathons or contests"
            )}
        </div>
      )}
    </div>
  );
};

export default TechnicalSkills;
