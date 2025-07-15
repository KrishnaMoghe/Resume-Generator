import jsPDF from "jspdf";
const downloadPDF = (formData) => {
  const pdf = new jsPDF();

  // Set default font
  pdf.setFont("helvetica");

  let yPosition = 20;
  const lineHeight = 6;
  const pageHeight = pdf.internal.pageSize.height;
  const pageWidth = pdf.internal.pageSize.width;
  const leftMargin = 15;
  const rightMargin = 15;
  const contentWidth = pageWidth - leftMargin - rightMargin;

  // Helper function to check if we need a new page
  const checkNewPage = (requiredHeight = 15) => {
    if (yPosition + requiredHeight > pageHeight - 20) {
      pdf.addPage();
      yPosition = 20;
    }
  };

  // Helper function to add text with line breaks and formatting
  const addText = (text, fontSize = 10, isBold = false, isCenter = false) => {
    if (!text || text.trim() === "") return;

    checkNewPage();

    pdf.setFontSize(fontSize);
    pdf.setFont("helvetica", isBold ? "bold" : "normal");

    const lines = pdf.splitTextToSize(text.toString(), contentWidth);
    lines.forEach((line) => {
      const xPosition = isCenter
        ? (pageWidth - pdf.getTextWidth(line)) / 2
        : leftMargin;

      pdf.text(line, xPosition, yPosition);
      yPosition += lineHeight;
    });
    yPosition += 2; // Extra spacing after text block
  };

  // Helper function to add section divider
  const addSectionDivider = () => {
    checkNewPage();
    pdf.setDrawColor(0, 0, 0);
    pdf.setLineWidth(0.5);
    pdf.line(leftMargin, yPosition, pageWidth - rightMargin, yPosition);
    yPosition += 8;
  };

  // Helper function to add bullet points
  const addBulletPoint = (text, fontSize = 10) => {
    if (!text || text.trim() === "") return;

    checkNewPage();

    pdf.setFontSize(fontSize);
    pdf.setFont("helvetica", "normal");

    const lines = pdf.splitTextToSize(text.toString(), contentWidth - 10);

    // Add bullet point
    pdf.text("•", leftMargin + 5, yPosition);

    lines.forEach((line, index) => {
      const xPosition = index === 0 ? leftMargin + 15 : leftMargin + 15;
      pdf.text(line, xPosition, yPosition);
      yPosition += lineHeight;
    });
    yPosition += 1;
  };

  // HEADER SECTION
  addText(formData.fullName, 18, true, true);
  yPosition += 2;

  // Contact Information
  const contactInfo = [];
  if (formData.email) contactInfo.push(formData.email);
  if (formData.phone) contactInfo.push(formData.phone);
  if (contactInfo.length > 0) {
    addText(contactInfo.join(" | "), 11, false, true);
  }

  if (formData.address) {
    addText(formData.address, 10, false, true);
  }

  // Social Links
  const socialLinks = [];
  if (formData.linkedIn) socialLinks.push(`LinkedIn: ${formData.linkedIn}`);
  if (formData.github) socialLinks.push(`GitHub: ${formData.github}`);
  if (socialLinks.length > 0) {
    addText(socialLinks.join(" | "), 9, false, true);
  }

  yPosition += 5;
  addSectionDivider();

  // EDUCATION SECTION
  addText("EDUCATION", 14, true);
  yPosition += 2;

  addText(`${formData.currentDegree}`, 12, true);
  addText(`${formData.collegeName}, ${formData.universityName}`, 11);

  const educationDetails = [];
  if (formData.currentSemester)
    educationDetails.push(`Current Semester: ${formData.currentSemester}`);
  if (formData.cgpa) educationDetails.push(`CGPA: ${formData.cgpa}`);
  if (formData.graduationYear)
    educationDetails.push(`Expected Graduation: ${formData.graduationYear}`);
  if (educationDetails.length > 0) {
    addText(educationDetails.join(" | "), 10);
  }

  if (formData.backlogs && formData.backlogs !== "No") {
    addText(`Backlogs: ${formData.backlogs}`, 10);
  }

  // 12th and 10th details
  if (formData.twelfthSchool) {
    yPosition += 3;
    addText(
      `12th Grade: ${formData.twelfthSchool} (${formData.twelfthBoard}) - ${formData.twelfthMarks}`,
      10
    );
  }
  if (formData.tenthSchool) {
    addText(
      `10th Grade: ${formData.tenthSchool} (${formData.tenthBoard}) - ${formData.tenthMarks}`,
      10
    );
  }

  yPosition += 5;
  addSectionDivider();

  // TECHNICAL SKILLS SECTION
  addText("TECHNICAL SKILLS", 14, true);
  yPosition += 2;

  if (
    formData.programmingLanguages &&
    formData.programmingLanguages.length > 0
  ) {
    let languages = formData.programmingLanguages.join(", ");
    if (formData.otherLanguage) languages += `, ${formData.otherLanguage}`;
    addText(`Programming Languages: ${languages}`, 10, true);
  }

  if (formData.toolsTechnologies && formData.toolsTechnologies.length > 0) {
    let tools = formData.toolsTechnologies.join(", ");
    if (formData.otherTool) tools += `, ${formData.otherTool}`;
    addText(`Tools & Technologies: ${tools}`, 10, true);
  }

  if (formData.codingProficiency) {
    addText(`Coding Proficiency: ${formData.codingProficiency}/5`, 10, true);
  }

  yPosition += 5;
  addSectionDivider();

  // PROJECTS SECTION
  const hasProjects =
    formData.projects && formData.projects.some((p) => p.title);
  if (hasProjects) {
    addText("PROJECTS", 14, true);
    yPosition += 2;

    formData.projects.forEach((project, index) => {
      if (project.title && project.title.trim() !== "") {
        checkNewPage(25); // Ensure enough space for project

        addText(`${project.title}`, 12, true);
        if (project.role) addText(`Role: ${project.role}`, 10);
        if (project.technologies)
          addText(`Technologies: ${project.technologies}`, 10);
        if (project.description) addText(project.description, 10);
        if (project.link) addText(`Link: ${project.link}`, 9);
        yPosition += 3;
      }
    });

    yPosition += 2;
    addSectionDivider();
  }

  // EXPERIENCE SECTION
  const hasExperience =
    formData.experiences && formData.experiences.some((exp) => exp.title);
  if (hasExperience) {
    addText("EXPERIENCE", 14, true);
    yPosition += 2;

    formData.experiences.forEach((exp) => {
      if (exp.title && exp.title.trim() !== "") {
        checkNewPage(25); // Ensure enough space for experience

        addText(`${exp.title} - ${exp.company}`, 12, true);
        if (exp.duration) addText(`Duration: ${exp.duration}`, 10);
        if (exp.workMode) addText(`Work Mode: ${exp.workMode}`, 10);
        if (exp.technologies) addText(`Technologies: ${exp.technologies}`, 10);
        if (exp.responsibilities)
          addText(`Responsibilities: ${exp.responsibilities}`, 10);
        yPosition += 3;
      }
    });

    yPosition += 2;
    addSectionDivider();
  }

  // CERTIFICATIONS SECTION
  if (formData.certifications) {
    addText("CERTIFICATIONS", 14, true);
    yPosition += 2;
    addText(formData.certifications, 10);
    yPosition += 5;
    addSectionDivider();
  }

  // ACHIEVEMENTS SECTION
  const hasAchievements =
    formData.academicAchievements ||
    formData.coCurricularActivities ||
    formData.publications ||
    formData.openSourceContributions ||
    (formData.sportsAchievements &&
      formData.sportsAchievements.some((s) => s.sportName));

  if (hasAchievements) {
    addText("ACHIEVEMENTS & ACTIVITIES", 14, true);
    yPosition += 2;

    if (formData.academicAchievements) {
      addText("Academic Achievements:", 11, true);
      addBulletPoint(formData.academicAchievements);
    }

    if (formData.coCurricularActivities) {
      addText("Co-curricular Activities:", 11, true);
      addBulletPoint(formData.coCurricularActivities);
    }

    if (formData.publications) {
      addText("Publications:", 11, true);
      addBulletPoint(formData.publications);
    }

    if (formData.openSourceContributions) {
      addText("Open Source Contributions:", 11, true);
      addBulletPoint(formData.openSourceContributions);
    }

    if (
      formData.sportsAchievements &&
      formData.sportsAchievements.some((s) => s.sportName)
    ) {
      addText("Sports Achievements:", 11, true);
      formData.sportsAchievements.forEach((achievement) => {
        if (achievement.sportName) {
          addBulletPoint(
            `${achievement.sportName} - ${achievement.level || "College"} Level`
          );
        }
      });
    }

    if (
      formData.hackathonParticipation === "Yes" &&
      formData.hackathonDetails
    ) {
      addText("Hackathons & Contests:", 11, true);
      addBulletPoint(formData.hackathonDetails);
    }

    yPosition += 2;
    addSectionDivider();
  }

  // ADDITIONAL INFORMATION SECTION
  const hasAdditionalInfo =
    formData.languages ||
    formData.strengths ||
    formData.hobbiesInterests ||
    formData.moocCourses;

  if (hasAdditionalInfo) {
    addText("ADDITIONAL INFORMATION", 14, true);
    yPosition += 2;

    if (formData.languages) {
      addText(`Languages: ${formData.languages}`, 10);
    }

    if (formData.strengths) {
      addText(`Strengths: ${formData.strengths}`, 10);
    }

    if (formData.hobbiesInterests) {
      addText(`Hobbies & Interests: ${formData.hobbiesInterests}`, 10);
    }

    if (formData.moocCourses) {
      addText(`MOOC Courses: ${formData.moocCourses}`, 10);
    }

    // Career preferences
    if (formData.careerPlans && formData.careerPlans.length > 0) {
      addText(`Career Plans: ${formData.careerPlans.join(", ")}`, 10);
    }

    if (formData.preferredDomains && formData.preferredDomains.length > 0) {
      addText(`Preferred Domains: ${formData.preferredDomains.join(", ")}`, 10);
    }

    if (formData.relocation) {
      addText(`Open to Relocation: ${formData.relocation}`, 10);
    }

    if (formData.lookingForInternships) {
      addText(`Looking for Internships: ${formData.lookingForInternships}`, 10);
    }
  }

  // ADDITIONAL COMMENTS
  if (formData.additionalComments) {
    yPosition += 5;
    addText("ADDITIONAL COMMENTS", 14, true);
    yPosition += 2;
    addText(formData.additionalComments, 10);
  }

  // Footer
  yPosition = pageHeight - 15;
  pdf.setFontSize(8);
  pdf.setFont("helvetica", "normal");
  pdf.text("Generated using Resume Generator", leftMargin, yPosition);

  // Save the PDF
  pdf.save(`${formData.fullName.replace(/\s/g, "_")}_Resume.pdf`);
};

export default downloadPDF;
