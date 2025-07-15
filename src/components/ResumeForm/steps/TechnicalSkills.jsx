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

            {/* Render tools checkboxes */}
            {allTools.length > 0 && (
              <div className="space-y-2 mb-3">
                {allTools.map((tool, i) => (
                  <label key={i} className="flex items-center space-x-2">
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
                      className="form-checkbox"
                    />
                    <span>{tool}</span>
                  </label>
                ))}
              </div>
            )}

            {/* Input to add custom tool */}
            <div className="flex items-center mt-3">
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
                className="form-input border p-2 mr-2 flex-1"
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
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
              >
                Add
              </button>
            </div>

            {/* Display selected tools with delete buttons */}
            {currentTools.length > 0 && (
              <div className="mt-3">
                <h4 className="font-medium mb-2">Selected Tools:</h4>
                <div className="flex flex-wrap gap-2">
                  {currentTools.map((tool, index) => (
                    <div
                      key={index}
                      className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center"
                    >
                      <span>{tool}</span>
                      <button
                        type="button"
                        onClick={() => removeTool(tool)}
                        className="ml-2 text-red-600 hover:text-red-800 font-bold"
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
