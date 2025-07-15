import React from "react";

const EducationalBackground = ({
  formData,
  handleChange,
  handleFileChange,
  renderFormGroup,
  currentStep,
}) => {
  return (
    <div>
    {currentStep === 2 && (
      
      <div>
        {renderFormGroup(
            "Branch",
            "branch",
            "select",
            "Select your branch",
            false,
            [
              { value: "Computer", label: "Computer Engineering" },
              { value: "Electrical", label: "Electrical Engineering" },
              { value: "Mechanical", label: "Mechanical Engineering" },
              { value: "Chemical", label: "Chemical Engineering" },
              { value: "Civil", label: "Civil Engineering" },
              { value: "EC", label: "Electronics and Communication Engineering" },
            ]
          )}
        {renderFormGroup(
          "Current Degree",
          "currentDegree",
          "text",
          "e.g., B.Tech in Computer Engineering",
          true
        )}
        {renderFormGroup(
          "College Name",
          "collegeName",
          "text",
          "Enter your college name",
          true
        )}
        {renderFormGroup(
          "University Name",
          "universityName",
          "text",
          "Enter your university name",
          true
        )}
        {renderFormGroup(
          "Current Semester",
          "currentSemester",
          "number",
          "Enter current semester",
          true
        )}
        {renderFormGroup(
          "Expected Graduation Year",
          "graduationYear",
          "number",
          "Enter graduation year",
          true
        )}
        {renderFormGroup(
          "Latest CGPA/Percentage",
          "cgpa",
          "text",
          "Enter your CGPA or percentage",
          true
        )}

        {/* {renderRadioGroup(
                    "Have you had any backlogs?",
                    ["Yes", "No"],
                    "backlogs"
                  )} */}

        {renderFormGroup(
          "12th School Name",
          "twelfthSchool",
          "text",
          "Enter your 12th school name"
        )}
        {renderFormGroup(
          "12th Board",
          "twelfthBoard",
          "text",
          "e.g., CBSE, GSEB"
        )}
        {renderFormGroup(
          "12th Marks",
          "twelfthMarks",
          "text",
          "Enter percentage or grade"
        )}
        {renderFormGroup(
          "10th School Name",
          "tenthSchool",
          "text",
          "Enter your 10th school name"
        )}
        {renderFormGroup(
          "10th Board",
          "tenthBoard",
          "text",
          "e.g., CBSE, GSEB"
        )}
        {renderFormGroup(
          "10th Marks",
          "tenthMarks",
          "text",
          "Enter percentage or grade"
        )}
      </div>
    )}
  </div>
  )
  
};

export default EducationalBackground;
