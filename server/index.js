require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { json } = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(json({ limit: '5mb' }));

// List of free OpenRouter models for fallback
const freeModels = [
  'deepseek/deepseek-r1:free',
  'mistralai/mistral-7b-instruct:free',
  'moonshotai/kimi-k2:free',
  'qwen/qwen3-coder:free',
  'mistralai/mixtral-8x7b-instruct:free',
];

// Helper function to extract JSON string from AI response by removing code fences
function extractJson(text) {
  // Try extracting JSON inside ``````
  let match = text.match(/``````/i);
  if (match && match[1]) return match[1].trim();

  // Try extracting JSON inside ``````
  match = text.match(/``````/);
  if (match && match[1]) return match[1].trim();

  // Try plain JSON extraction with curly braces {}
  match = text.match(/{[\s\S]*}/);
  if (match) return match[0].trim();

  // fallback: return original text
  return text.trim();
}

// Core function to call OpenRouter with fallback across free models
async function generateWithFreeOpenRouterModels(prompt) {
  const apiUrl = 'https://openrouter.ai/api/v1/chat/completions';

  for (const model of freeModels) {
    try {
      const response = await axios.post(
        apiUrl,
        {
          model,
          messages: [
            {
              role: 'system',
              content: `
You are a professional resume writer with 15+ years of experience.
Your task is to rewrite and enhance ONLY the following text fields, making them concise, professional, ATS-friendly, and achievement-driven. Do NOT change any other fields or their structure.

IMPORTANT: Return ONLY a JSON object in your response.
Do NOT include any markdown code fences, explanations, or additional text.
The JSON must start with { and end with } exactly,
matching the structure described by the user.
              `.trim(),
            },
            {
              role: 'user',
              content: prompt,
            },
          ],
          max_tokens: 1024,
          temperature: 0.7,
          top_p: 0.7,
          top_k: 50,
          repetition_penalty: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://craftifyai.onrender.com',
            'X-Title': 'CraftixAI Content Enhancer',
          },
        }
      );
      return response.data.choices[0].message.content.trim();
    } catch (error) {
      console.warn(`Model ${model} failed:`, error.response?.data || error.message);
      // try next model
    }
  }

  throw new Error('All free OpenRouter models failed or are rate limited.');
}


// Endpoint 1: Enhance Project Descriptions only
app.post('/api/enhance-projects', async (req, res) => {
  try {
    const { projects = [] } = req.body;
    const projectsDescriptions = projects.map(p => p.description || '');

    if (projectsDescriptions.length === 0)
      return res.status(400).json({ error: 'No projects descriptions provided.' });

    const prompt = `
You are a professional resume writer with 15+ years of experience.
Rewrite and enhance ONLY the PROJECT DESCRIPTIONS below, focusing on professionalism, conciseness, ATS-friendliness, and achievements.
Return ONLY a JSON array of rewritten descriptions.


${JSON.stringify(projectsDescriptions, null, 2)}
    `;

    const aiResponse = await generateWithFreeOpenRouterModels(prompt);

    const jsonText = extractJson(aiResponse);
    const enhancedDescriptions = JSON.parse(jsonText);

    res.json({ enhanced: { projectsDescriptions: enhancedDescriptions } });
  } catch (error) {
    console.error('Enhance Projects Error:', error);
    res.status(500).json({ error: 'Failed to enhance project descriptions.' });
  }
});

// Endpoint 2: Enhance Experience Responsibilities only
app.post('/api/enhance-experiences', async (req, res) => {
  try {
    const { experiences = [] } = req.body;
    const experiencesResponsibilities = experiences.map(e => e.responsibilities || '');

    if (experiencesResponsibilities.length === 0)
      return res.status(400).json({ error: 'No experience responsibilities provided.' });

    const prompt = `
You are a professional resume writer with 15+ years of experience.
Rewrite and enhance ONLY the EXPERIENCE RESPONSIBILITIES below with professionalism, conciseness, ATS-friendliness, and achievements.
IMPORTANT: Return ONLY a JSON array. Do NOT include markdown, explanations, or any extra text.

${JSON.stringify(experiencesResponsibilities, null, 2)}
    `;

    const aiResponse = await generateWithFreeOpenRouterModels(prompt);

    const jsonText = extractJson(aiResponse);
    const enhancedResponsibilities = JSON.parse(jsonText);

    res.json({ enhanced: { experiencesResponsibilities: enhancedResponsibilities } });
  } catch (error) {
    console.error('Enhance Experiences Error:', error);
    res.status(500).json({ error: 'Failed to enhance experience responsibilities.' });
  }
});

// Endpoint 3: Enhance Achievements Section (achievements, coCurricularActivities, publications, openSourceContributions)
app.post('/api/enhance-achievements', async (req, res) => {
  try {
    const {
      achievements = [],
      coCurricularActivities = [],
      publications = [],
      openSourceContributions = [],
    } = req.body;

    // Check if at least one field has content
    if (
      achievements.length === 0 &&
      coCurricularActivities.length === 0 &&
      publications.length === 0 &&
      openSourceContributions.length === 0
    ) {
      return res.status(400).json({ error: 'No achievements section data provided.' });
    }

    const prompt = `
You are a professional resume writer with 15+ years of experience.
Rewrite and enhance ONLY the following sections: ACHIEVEMENTS, CO-CURRICULAR ACTIVITIES, PUBLICATIONS, OPEN SOURCE CONTRIBUTIONS.
Return ONLY a JSON object with keys:
"achievements", "coCurricularActivities", "publications", "openSourceContributions"
each containing arrays of enhanced text for the respective field.

Achievements:
${JSON.stringify(achievements, null, 2)}

Co-Curricular Activities:
${JSON.stringify(coCurricularActivities, null, 2)}

Publications:
${JSON.stringify(publications, null, 2)}

Open Source Contributions:
${JSON.stringify(openSourceContributions, null, 2)}
    `;

    const aiResponse = await generateWithFreeOpenRouterModels(prompt);

    const jsonText = extractJson(aiResponse);
    const enhancedSections = JSON.parse(jsonText);

    res.json({ enhanced: enhancedSections });
  } catch (error) {
    console.error('Enhance Achievements Error:', error);
    res.status(500).json({ error: 'Failed to enhance achievements section.' });
  }
});


// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    service: 'CraftixAI OpenRouter Free Models Enhancer',
    modelsTried: freeModels,
  });
});

// Error handler middleware
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({ error: 'Internal server error occurred.' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 CraftixAI backend running at http://localhost:${PORT}`);
});
