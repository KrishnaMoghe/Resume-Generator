const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/generate-resume', async (req, res) => {
  const formData = req.body;

  // Construct prompt using exact field names from frontend
  const prompt = `
  You are a professional resume writer. Using the details provided below, Generate a professional resume in clean HTML format (no emojis), using clear headings, bullet points, and proper alignment. Only return HTML content. No explanation.

  
  ---
  
  ## PERSONAL DETAILS
  - Full Name: ${formData.fullName}
  - Email: ${formData.email}
  - Phone: ${formData.phone}
  - Date of Birth: ${formData.dob}
  - Gender: ${formData.gender}
  - Address: ${formData.address}
  - LinkedIn: ${formData.linkedIn}
  - GitHub/Portfolio: ${formData.github}
  - Languages Known: ${formData.languages}
  
  ---
  
  ## EDUCATION
  - Degree: ${formData.currentDegree}
  - College: ${formData.collegeName}
  - University: ${formData.universityName}
  - Semester: ${formData.currentSemester}
  - Expected Graduation Year: ${formData.graduationYear}
  - CGPA/Percentage: ${formData.cgpa}
  - Backlogs: ${formData.backlogs}
  
  ### Higher Secondary (12th)
  - School: ${formData.twelfthSchool}
  - Board: ${formData.twelfthBoard}
  - Marks: ${formData.twelfthMarks}
  
  ### Secondary (10th)
  - School: ${formData.tenthSchool}
  - Board: ${formData.tenthBoard}
  - Marks: ${formData.tenthMarks}
  
  ---
  
  ## CAREER OBJECTIVES
  - Career Plans: ${formData.careerPlans.join(', ')}
  - Preferred Domains: ${formData.preferredDomains.join(', ')}${formData.otherDomain ? `, Other: ${formData.otherDomain}` : ""}
  - Open to Relocation: ${formData.relocation}
  - Preparing for Competitive Exams: ${formData.preparingExams}
  - Exams: ${formData.examNames || 'N/A'}
  
  ---
  
  ## TECHNICAL SKILLS
  - Coding Proficiency (1 - Beginner to 5 - Expert): ${formData.codingProficiency}
  - Programming Languages: ${formData.programmingLanguages.join(', ')}${formData.otherLanguage ? `, Other: ${formData.otherLanguage}` : ""}
  - Tools/Technologies: ${formData.toolsTechnologies.join(', ')}${formData.otherTool ? `, Other: ${formData.otherTool}` : ""}
  - Certifications: ${formData.certifications || 'N/A'}
  - Hackathon Participation: ${formData.hackathonParticipation}
  ${formData.hackathonParticipation.toLowerCase() === 'yes' ? `- Details: ${formData.hackathonDetails}` : ''}
  
  ---
  
  ## PROJECTS
  ${formData.projects.map((p, i) => `
  ### Project ${i + 1}
  - Title: ${p.title}
  - Description: ${p.description}
  - Technologies Used: ${p.technologies}
  - Role: ${p.role}
  - Link: ${p.link || 'N/A'}
  `).join('\n')}
  
  ---
  
  ## EXPERIENCE
  ${formData.experiences.map((exp, i) => `
  ### Experience ${i + 1}
  - Title: ${exp.title}
  - Company: ${exp.company}
  - Duration: ${exp.duration}
  - Responsibilities: ${exp.responsibilities}
  - Technologies Used: ${exp.technologies}
  - Work Mode: ${exp.workMode}
  `).join('\n')}
  
  ---
  
  ## ACHIEVEMENTS & CO-CURRICULAR
  - Academic Achievements: ${formData.academicAchievements}
  - Co-curricular Activities: ${formData.coCurricularActivities}
  - Publications: ${formData.publications || 'N/A'}
  - Open Source Contributions: ${formData.openSourceContributions || 'N/A'}
  
  ---
  
  ## PERSONALITY & PREFERENCES
  - Comfortable in Teams: ${formData.teamworkComfort}
  - Currently Seeking Internships: ${formData.lookingForInternships}
  - Strengths: ${formData.strengths}
  - Hobbies/Interests: ${formData.hobbiesInterests}
  - Special Needs / Accommodations: ${formData.specialNeeds || 'None'}
  - Additional Comments: ${formData.additionalComments || 'N/A'}
  
  ---
  
  **Instructions**:
  - Format using clean spacing, bullet points, and consistent indentation.
  - Use a formal tone.
  - Make it suitable for campus placements or job applications.
  - Do NOT include any headings like "Generated Resume by AI" — make it look like a human-written resume.
  `;
  

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'openrouter/auto',
        messages: [
          { role: 'system', content: 'You are a professional resume writer. Generate detailed resumes from structured input.' },
          { role: 'user', content: prompt }
        ],
        models: [
          'anthropic/claude-3.5-haiku',
          'meta-llama/llama-3-8b-instruct'
        ]
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const generatedResume = response.data.choices[0].message.content;
    res.json({ resume: generatedResume });

  } catch (error) {
    console.error('OpenRouter Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to generate resume.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
