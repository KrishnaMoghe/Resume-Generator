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
        <select name="branch" value={formData.branch} onChange={handleChange}>
          <option value="">Select Branch</option>
          <option value="Computer">Computer Engineering</option>
          <option value="Electrical">Electrical Engineering</option>
          <option value="EC">Electronics and Communication</option>
          <option value="Mechanical">Mechanical Engineering</option>
          <option value="Civil">Civil Engineering</option>
          <option value="Chemical">Chemical Engineering</option>
        </select>
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
