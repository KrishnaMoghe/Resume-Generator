import React from "react";

const FinalDetails = ({
  formData,
  setFormData,
  currentStep,
  renderFormGroup,
  renderRadioGroup,
}) => {
  return (
<div>
    {/* Step 3: Career Goals */}
    {currentStep === 8 && (
      <div>
        {renderRadioGroup(
          "Are you comfortable working in teams?",
          ["Yes", "No"],
          "teamworkComfort"
        )}
        {renderRadioGroup(
          "Are you currently looking for internships?",
          ["Yes", "No"],
          "lookingForInternships"
        )}
        {renderFormGroup(
          "Your Strengths",
          "strengths",
          "textarea",
          "e.g., teamwork, leadership, problem-solving"
        )}
        {renderFormGroup(
          "Hobbies & Interests",
          "hobbiesInterests",
          "textarea",
          "Share your hobbies and interests"
        )}
        {renderFormGroup(
          "Special Needs/Accommodations",
          "specialNeeds",
          "textarea",
          "Any special needs or accommodations?"
        )}
        {renderFormGroup(
          "Additional Comments",
          "additionalComments",
          "textarea",
          "Any additional comments or unique traits to highlight?"
        )}
        {renderRadioGroup(
          "Planning for higher studies abroad?",
          ["Yes", "No"],
          "planningAbroad"
        )}

        {renderRadioGroup(
          "Do you intend to apply for a scholarship?",
          ["Yes", "No"],
          "applyingScholarship"
        )}

        {formData.applyingScholarship === "Yes" &&
          renderFormGroup(
            "Scholarship(s) you're considering",
            "scholarshipNames",
            "text",
            "e.g., Fulbright, Chevening"
          )}
      </div>
    )}
  </div>
  )
  
};

export default FinalDetails;
