const stepTitles = {
  1: "Personal Information",
  2: "Educational Background",
  3: "Career Goals & Preferences",
  4: "Technical Skills",
  5: "Projects Portfolio",
  6: "Experience & Internships",
  7: "Achievements & Activities",
  8: "Personality & Final Details",
};

// Branch wise domain and tool options
const domainOptions = {
  Computer: [
    "Software Development",
    "Web Development",
    "Data Science / AI / ML",
    "Cybersecurity",
    "UI/UX Design",
    "Cloud / DevOps",
    "Embedded Systems",
    "Blockchain",
  ],
  Mechanical: [
    "Design Engineering",
    "Manufacturing",
    "Automobile",
    "CAD/CAE",
    "Robotics",
  ],
  Civil: [
    "Structural Engineering",
    "Construction Management",
    "Surveying",
    "Transportation",
  ],
  Electrical: [
    "Power Systems",
    "Control Systems",
    "Automation",
    "VLSI",
    "Energy Systems",
  ],
  EC: ["Embedded Systems", "Signal Processing", "IoT", "Communication Systems"],
  Chemical: [
    "Process Engineering",
    "Environmental Engineering",
    "Petrochemicals",
  ],
};

const toolOptions = {
  Computer: ["Python", "Java", "React", "Node.js", "MongoDB"],
  Mechanical: ["AutoCAD", "SolidWorks", "ANSYS"],
  Civil: ["STAAD Pro", "AutoCAD Civil 3D"],
  Electrical: ["MATLAB", "Simulink", "PSpice"],
  EC: ["Arduino", "Verilog", "MATLAB"],
  Chemical: ["ASPEN", "CHEMCAD"],
};

export default {stepTitles, domainOptions, toolOptions};

