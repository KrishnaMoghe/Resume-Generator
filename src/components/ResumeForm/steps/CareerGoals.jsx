import React from "react";

const CareerGoals = ({
  formData,
  setFormData,
  currentStep,
  handleChange,
  handleFileChange,
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
                          : prev.preferredDomains.filter((d) => d !== value),
                      }));
                    }}
                  />{" "}
                  {domain}
                </label>
              ))}

              <div className="flex items-center mt-2">
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
                  className="form-input border p-2 mr-2 flex-1"
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
                  className="bg-green-600 text-white px-3 py-1 rounded"
                >
                  Add
                </button>
              </div>

              {formData.preferredDomains.length > 0 && (
                <div className="mt-3">
                  <h4 className="font-medium mb-2">Selected Domains:</h4>
                  <div className="flex flex-wrap gap-2">
                    {formData.preferredDomains.map((domain, index) => (
                      <div
                        key={index}
                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center"
                      >
                        <span>{domain}</span>
                        <button
                          type="button"
                          onClick={() => removeDomain(domain)}
                          className="ml-2 text-red-600 hover:text-red-800 font-bold"
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
