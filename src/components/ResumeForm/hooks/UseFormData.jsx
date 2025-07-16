import { useState } from "react";

const UseFormData = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    address: "",
    linkedIn: "",
    github: "",
    languages: "",
    photo: null,
  
    branch: "",
    preferredDomains: [],
    customDomains: [],
    toolsTechnologies: [],
    customToolInput: "",
    customTools: [],
    currentDegree: "",
    collegeName: "",
    universityName: "",
    currentSemester: "",
    graduationYear: "",
    cgpa: "",
    backlogs: "",
    twelfthSchool: "",
    twelfthBoard: "",
    twelfthMarks: "",
    tenthSchool: "",
    tenthBoard: "",
    tenthMarks: "",
  
    careerPlans: [],
    otherDomain: "",
    relocation: "",
    preparingExams: "",
    examNames: "",
  
    codingProficiency: "",
    programmingLanguages: [],
    otherLanguage: "",
    otherTool: "",
    customToolInput: "",
    certifications: "",
    hackathonParticipation: "",
    hackathonDetails: "",
  
    projects: [
      {
        title: "",
        description: "",
        technologies: "",
        role: "",
        link: "",
      },
    ],
  
    experiences: [
      {
        title: "",
        company: "",
        duration: "",
        responsibilities: "",
        technologies: "",
        workMode: "",
      },
    ],
  
    academicAchievements: "",
    coCurricularActivities: "",
    publications: "",
    openSourceContributions: "",
  
    teamworkComfort: "",
    lookingForInternships: "",
    strengths: "",
    hobbiesInterests: "",
    specialNeeds: "",
    additionalComments: "",
  
    moocCourses: "",
    sportsAchievements: [{ sportName: "", level: "" }],
  
    planningAbroad: "",
    applyingScholarship: "",
    scholarshipNames: "",
  });
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file input separately
  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleCheckboxChange = (value, field) => {
    const currentValues = formData[field];
    const updatedValues = currentValues.includes(value)
      ? currentValues.filter((item) => item !== value)
      : [...currentValues, value];
    setFormData({ ...formData, [field]: updatedValues });
  };

  const removeDomain = (domainToRemove) => {
    setFormData((prev) => ({
      ...prev,
      preferredDomains: prev.preferredDomains.filter(
        (domain) => domain !== domainToRemove
      ),
    }));
  };

  const removeTool = (toolToRemove) => {
    setFormData((prev) => ({
      ...prev,
      toolsTechnologies: prev.toolsTechnologies.filter(
        (tool) => tool !== toolToRemove
      ),
    }));
  };
  return {
    formData,
    setFormData,
    handleChange,
    handleFileChange,
    handleCheckboxChange,
    removeDomain,
    removeTool,
  };
};

export default UseFormData;
