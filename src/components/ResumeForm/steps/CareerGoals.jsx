import React from "react";

const CareerGoals = ({
  formData,
  setFormData,
  currentStep,
  renderFormGroup,
  renderCheckboxGroup,
  renderRadioGroup,
  removeDomain,
  domainOptions,
}) => {
  return (
    <div>
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

              <div className="domain-checkbox-container">
                {domainOptions[formData.branch]?.map((domain, i) => (
                  <label
                    key={i}
                    className={`domain-checkbox-item ${
                      formData.preferredDomains.includes(domain)
                        ? "checked"
                        : ""
                    }`}
                  >
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
                            : prev.preferredDomains.filter((d) => d !== value),
                        }));
                      }}
                    />
                    <span>{domain}</span>
                  </label>
                ))}
              </div>

              <div className="custom-domain-input">
                <input
                  type="text"
                  placeholder="Add custom domain"
                  value={formData.customDomainInput || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      customDomainInput: e.target.value,
                    })
                  }
                />
                <button
                  type="button"
                  onClick={() => {
                    const custom = formData.customDomainInput?.trim();
                    if (custom && !formData.preferredDomains.includes(custom)) {
                      setFormData((prev) => ({
                        ...prev,
                        preferredDomains: [...prev.preferredDomains, custom],
                        customDomainInput: "",
                      }));
                    }
                  }}
                >
                  Add
                </button>
              </div>

              {formData.preferredDomains.length > 0 && (
                <div className="selected-tools">
                  <h4>Selected Domains:</h4>
                  <div className="selected-tools-grid">
                    {formData.preferredDomains.map((domain, index) => (
                      <div key={index} className="selected-tool-tag">
                        <span>{domain}</span>
                        <button
                          type="button"
                          onClick={() => removeDomain(domain)}
                          title="Remove domain"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

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
    </div>
  );
};
export default CareerGoals;
