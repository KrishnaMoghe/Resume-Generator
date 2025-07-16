import React from "react";

const PersonalInfo = ({
  formData,
  handleChange,
  handleFileChange,
  renderFormGroup,
  photoUploaded,
  currentStep,
}) => {
  return (
    <div>
      {renderFormGroup(
        "Full Name",
        "fullName",
        "text",
        "Enter your full name",
        true
      )}
      {renderFormGroup(
        "Email Address",
        "email",
        "email",
        "Enter your email address",
        true
      )}
      {renderFormGroup(
        "Mobile Number",
        "phone",
        "tel",
        "Enter your mobile number",
        true
      )}
      {renderFormGroup("Date of Birth", "dob", "date", "", true)}
      {renderFormGroup(
        "Gender",
        "gender",
        "select",
        "Select your gender",
        false,
        [
          { value: "male", label: "Male" },
          { value: "female", label: "Female" },
          { value: "other", label: "Other" },
          { value: "prefer_not", label: "Prefer not to say" },
        ]
      )}
      {renderFormGroup(
        "Permanent Address",
        "address",
        "textarea",
        "Enter your permanent address",
        true
      )}
      {renderFormGroup(
        "LinkedIn Profile",
        "linkedIn",
        "url",
        "https://linkedin.com/in/yourprofile"
      )}
      {renderFormGroup(
        "GitHub/Portfolio",
        "github",
        "url",
        "https://github.com/yourusername"
      )}
      {renderFormGroup(
        "Languages Known",
        "languages",
        "text",
        "e.g., English, Hindi, Gujarati"
      )}
      {renderFormGroup("Profile Photo", "photo", "file")}
      {photoUploaded && (
        <div style={{ color: "green", marginTop: "5px", fontSize: "14px" }}>
          ✅ Photo uploaded successfully!
        </div>
      )}
    </div>
  );
};

export default PersonalInfo;
