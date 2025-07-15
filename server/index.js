const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Helper function to create professional resume prompt
function createProfessionalPrompt(formData) {
  // Skills categorization helper
  const categorizeSkills = (languages, tools) => {
    const programmingLangs = languages.filter(lang => 
      ['JavaScript', 'Python', 'Java', 'C++', 'C#', 'Go', 'Rust', 'TypeScript', 'PHP', 'Ruby', 'Swift', 'Kotlin'].includes(lang)
    );
    const webTech = [...languages, ...tools].filter(tech => 
      ['React', 'Angular', 'Vue', 'Node.js', 'Express', 'Django', 'Flask', 'Spring', 'HTML', 'CSS', 'SASS'].includes(tech)
    );
    const databases = tools.filter(tool => 
      ['MongoDB', 'MySQL', 'PostgreSQL', 'Redis', 'SQLite', 'Oracle', 'Firebase'].includes(tool)
    );
    const cloudTools = tools.filter(tool => 
      ['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Jenkins', 'Git', 'GitHub', 'GitLab'].includes(tool)
    );
    
    return { programmingLangs, webTech, databases, cloudTools };
  };

  const skillCategories = categorizeSkills(
    formData.programmingLanguages || [], 
    formData.toolsTechnologies || []
  );

  return `
You are an expert resume writer with 15+ years of experience in technical recruitment and career counseling. Create a professional, ATS-optimized resume that will impress hiring managers and pass through applicant tracking systems.

**CRITICAL INSTRUCTIONS:**
- Generate ONLY clean HTML with inline CSS styling
- Use professional fonts and clean layout
- Optimize for ATS (Applicant Tracking Systems)
- Include relevant keywords for the target industry
- Write compelling bullet points using action verbs
- Quantify achievements where possible
- Ensure proper formatting and professional appearance
- NO emojis, unprofessional language, or casual tone
- Focus on impact and results, not just responsibilities

**CANDIDATE PROFILE:**
---
## PERSONAL INFORMATION
- Name: ${formData.fullName}
- Email: ${formData.email}
- Phone: ${formData.phone}
- Location: ${formData.address}
- LinkedIn: ${formData.linkedIn || 'N/A'}
- GitHub/Portfolio: ${formData.github || 'N/A'}
- Languages: ${formData.languages || 'N/A'}

## EDUCATION BACKGROUND
**Current Education:**
- Degree: ${formData.currentDegree}
- Institution: ${formData.collegeName}, ${formData.universityName}
- Current Semester: ${formData.currentSemester}
- Expected Graduation: ${formData.graduationYear}
- CGPA/Percentage: ${formData.cgpa}
- Academic Standing: ${formData.backlogs === '0' || !formData.backlogs ? 'Clear academic record' : formData.backlogs + ' pending subjects'}

**Previous Education:**
- 12th Grade: ${formData.twelfthSchool}, ${formData.twelfthBoard} (${formData.twelfthMarks})
- 10th Grade: ${formData.tenthSchool}, ${formData.tenthBoard} (${formData.tenthMarks})

## CAREER OBJECTIVES & GOALS
- Career Aspirations: ${formData.careerPlans?.join(', ') || 'N/A'}
- Target Domains: ${formData.preferredDomains?.join(', ') || 'N/A'}${formData.otherDomain ? `, ${formData.otherDomain}` : ''}
- Relocation Flexibility: ${formData.relocation}
- Competitive Exam Preparation: ${formData.preparingExams === 'Yes' ? formData.examNames || 'Various competitive exams' : 'Not currently preparing'}
- Internship Seeking: ${formData.lookingForInternships}

## TECHNICAL EXPERTISE
**Programming Proficiency Level:** ${formData.codingProficiency}/5
**Technical Skills Breakdown:**
- Programming Languages: ${skillCategories.programmingLangs.join(', ')}${formData.otherLanguage ? `, ${formData.otherLanguage}` : ''}
- Web Technologies: ${skillCategories.webTech.join(', ')}
- Databases: ${skillCategories.databases.join(', ')}
- Cloud & DevOps: ${skillCategories.cloudTools.join(', ')}
- Other Tools: ${formData.toolsTechnologies?.filter(tool => !skillCategories.webTech.includes(tool) && !skillCategories.databases.includes(tool) && !skillCategories.cloudTools.includes(tool)).join(', ')}${formData.otherTool ? `, ${formData.otherTool}` : ''}

**Certifications:** ${formData.certifications || 'None currently'}

## PROJECT PORTFOLIO
${formData.projects?.map((project, index) => `
**Project ${index + 1}: ${project.title}**
- Description: ${project.description}
- Technologies: ${project.technologies}
- Role: ${project.role}
- ${project.link ? `Live Demo/Repository: ${project.link}` : ''}
`).join('\n') || 'No projects listed'}

## PROFESSIONAL EXPERIENCE
${formData.experiences?.map((exp, index) => `
**${exp.title}** | ${exp.company}
Duration: ${exp.duration} | Mode: ${exp.workMode}
Key Responsibilities: ${exp.responsibilities}
Technologies Used: ${exp.technologies}
`).join('\n') || 'No professional experience listed'}

## ACHIEVEMENTS & RECOGNITION
- Academic Achievements: ${formData.academicAchievements || 'None listed'}
- Publications: ${formData.publications || 'None'}
- Open Source Contributions: ${formData.openSourceContributions || 'None'}
- Hackathon Participation: ${formData.hackathonParticipation === 'Yes' ? formData.hackathonDetails || 'Participated in various hackathons' : 'None'}

## EXTRACURRICULAR ACTIVITIES
- Co-curricular Activities: ${formData.coCurricularActivities || 'None listed'}
- Team Collaboration: ${formData.teamworkComfort || 'N/A'}
- Hobbies & Interests: ${formData.hobbiesInterests || 'N/A'}

## PERSONAL ATTRIBUTES
- Core Strengths: ${formData.strengths || 'N/A'}
- Additional Information: ${formData.additionalComments || 'N/A'}
- Special Accommodations: ${formData.specialNeeds || 'None required'}

---

**RESUME GENERATION REQUIREMENTS:**

1. **Structure & Layout:**
   - Use clean, professional HTML with inline CSS
   - Implement ATS-friendly formatting
   - Use consistent fonts (Arial, Calibri, or similar)
   - Proper spacing and margins
   - Clean section dividers

2. **Content Enhancement:**
   - Write compelling professional summary (2-3 lines)
   - Transform basic project descriptions into achievement-focused bullet points
   - Use action verbs (Developed, Implemented, Optimized, Led, etc.)
   - Include relevant industry keywords
   - Quantify achievements where possible

3. **Professional Optimization:**
   - Prioritize most relevant information
   - Use reverse chronological order
   - Ensure consistent formatting
   - Include only professional, relevant information
   - Optimize for target role/industry

4. **ATS Optimization:**
   - Use standard section headings
   - Include relevant keywords naturally
   - Avoid complex formatting or graphics
   - Use standard fonts and bullet points
   - Ensure proper heading hierarchy

Generate a polished, professional resume that will stand out to recruiters and pass ATS screening. Focus on impact, achievements, and professional presentation.`;
}

// Enhanced resume generation endpoint
app.post('/api/generate-resume', async (req, res) => {
  const formData = req.body;

  // Validate required fields
  const requiredFields = ['fullName', 'email', 'phone'];
  const missingFields = requiredFields.filter(field => !formData[field]);
  
  if (missingFields.length > 0) {
    return res.status(400).json({ 
      error: `Missing required fields: ${missingFields.join(', ')}` 
    });
  }

  try {
    const enhancedPrompt = createProfessionalPrompt(formData);
    
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'openrouter/auto', // Using more capable model
        messages: [
          { 
            role: 'system', 
            content: 'You are a professional resume writer and career counselor with expertise in ATS optimization and technical recruitment. Create polished, professional resumes that get results.' 
          },
          { role: 'user', content: enhancedPrompt }
        ],
        models: [
          'anthropic/claude-3.5-haiku',
          'meta-llama/llama-3-8b-instruct'
        ],
        temperature: 0.7, // Balanced creativity and consistency
        max_tokens: 4000, // Increased for detailed resumes
        top_p: 0.9
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:5000', // Required by OpenRouter
          'X-Title': 'Resume Generator API'
        }
      }
    );

    const generatedResume = response.data.choices[0].message.content;
    
    // Basic validation of generated content
    if (!generatedResume || generatedResume.trim().length < 500) {
      throw new Error('Generated resume is too short or empty');
    }

    res.json({ 
      resume: generatedResume,
      generatedAt: new Date().toISOString(),
      model: 'claude-3.5-sonnet'
    });

  } catch (error) {
    console.error('Resume Generation Error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    
    res.status(500).json({ 
      error: 'Failed to generate resume. Please try again.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    service: 'Resume Generator API'
  });
});

// Resume templates endpoint (optional enhancement)
app.get('/api/templates', (req, res) => {
  res.json({
    templates: [
      {
        id: 'professional',
        name: 'Professional',
        description: 'Clean, corporate-style resume template'
      },
      {
        id: 'technical',
        name: 'Technical',
        description: 'Optimized for software development roles'
      },
      {
        id: 'creative',
        name: 'Creative',
        description: 'Modern design for creative professionals'
      }
    ]
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Resume Generator API running at http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});