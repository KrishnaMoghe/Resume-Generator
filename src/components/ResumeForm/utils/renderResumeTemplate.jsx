export default function renderResumeTemplate(formData) {
  const {
    fullName, email, phone, dob, gender, address, github, linkedIn, languages, photo,
    careerPlans, relocation, preparingExams, examNames,
    currentDegree, collegeName, universityName, currentSemester, graduationYear, cgpa, backlogs,
    twelfthSchool, twelfthBoard, twelfthMarks,
    tenthSchool, tenthBoard, tenthMarks,
    preferredDomains = [], toolsTechnologies = [], programmingLanguages = [],
    certifications, hackathonParticipation, hackathonDetails,
    projects = [], experiences = [],
    academicAchievements, coCurricularActivities, publications, openSourceContributions,
    teamworkComfort, lookingForInternships, strengths, hobbiesInterests, specialNeeds, additionalComments,
    moocCourses, planningAbroad, applyingScholarship, scholarshipNames, codingProficiency,
  } = formData;

  /* ---------- helpers ---------- */

  // 1.  Multi-line (string)  ➜ bullet list   •  Array ➜ bullet list
  const renderBullets = (value) => {
    if (!value) return "";
    const arr = Array.isArray(value)
      ? value.filter(Boolean)
      : value
          .split("\n")
          .map((l) => l.trim())
          .filter((l) => l);

    if (!arr.length) return "";
    if (arr.length === 1) return `<p>${arr[0]}</p>`;
    return `<ul class="list-disc ml-6">${arr.map((l) => `<li>${l}</li>`).join("")}</ul>`;
  };

  // 2.  Join array (of raw strings or {label}) with commas
  const joinComma = (arr) =>
    Array.isArray(arr) ? arr.map((x) => x.label || x).join(", ") : arr;

  // 3.  Convert array to <li> list
  const listItems = (arr) =>
    Array.isArray(arr) ? arr.map((x) => `<li>${x.label || x}</li>`).join("") : "";

  // 4.  Personal-trait paragraph
  const getPersonalTraits = () => {
    const parts = [];
    if (strengths) parts.push(`My strengths include ${strengths}.`);
    if (hobbiesInterests) parts.push(`I enjoy ${hobbiesInterests}.`);
    if (teamworkComfort)
      parts.push(
        `I ${
          teamworkComfort.toLowerCase() === "yes"
            ? "feel comfortable"
            : "don't feel comfortable"
        } working in a team environment.`
      );
    if (lookingForInternships)
      parts.push(
        `I am ${
          lookingForInternships.toLowerCase() === "yes"
            ? "actively seeking internships."
            : "currently not looking for internship opportunities."
        }`
      );
    return parts.join(" ");
  };

  // 5.  MOOC courses in sentence form
  const getMooC = () => {
    if (!moocCourses) return "";
    const courses = Array.isArray(moocCourses)
      ? joinComma(moocCourses)
      : moocCourses
          .split("\n")
          .map((l) => l.trim())
          .filter((l) => l)
          .join(", ");
    return courses ? `I have completed online courses in ${courses}.` : "";
  };

  // 6.  Future plans paragraph
  const getFuturePlans = () => {
    const out = [];
    if (planningAbroad?.toLowerCase() === "yes")
      out.push("I am planning to pursue opportunities abroad");
    if (applyingScholarship?.toLowerCase() === "yes") {
      out.push(
        scholarshipNames
          ? `I am applying for scholarships including ${scholarshipNames}`
          : "I am applying for scholarships"
      );
    }
    return out.length ? out.join(". ") + "." : "";
  };

  /* ---------- template ---------- */

  return `
  <div class="max-w-4xl mx-auto bg-white p-10 rounded-lg shadow-lg text-gray-900 font-sans leading-relaxed">

    <!-- Header -->
    <div class="flex justify-between items-start mb-6">
      <div>
        <h1 class="text-4xl font-bold text-gray-800 mb-1">${fullName}</h1>
        <p class="text-sm text-gray-600">${email} | ${phone}</p>
        <p class="text-sm text-gray-600">${dob} | ${gender}</p>
        <p class="text-sm text-gray-600">${address}</p>
        <p class="text-sm text-blue-600 mt-1">
          ${github ? `<a href="${github}" class="hover:underline">${github}</a>` : ""}
          ${linkedIn ? ` | <a href="${linkedIn}" class="hover:underline">${linkedIn}</a>` : ""}
        </p>
        ${languages ? `<p class="text-sm text-gray-600 mt-1">Languages: ${languages}</p>` : ""}
      </div>
      ${photo ? `<img src="${photo}" alt="profile" class="w-24 h-24 rounded-full object-cover shadow-md border border-gray-300" />` : ""}
    </div>

    ${
      careerPlans?.length
        ? `
    <section class="mt-6">
      <h2 class="text-xl font-semibold text-blue-700 border-b border-blue-300 pb-1 mb-2">Career Plans</h2>
      <p>${joinComma(careerPlans)}</p>
      <p><strong>Relocation:</strong> ${relocation}</p>
      <p><strong>Preparing Exams:</strong> ${preparingExams}${examNames ? ` (${examNames})` : ""}</p>
    </section>`
        : ""
    }

    <!-- Education -->
    <section class="mt-6">
      <h2 class="text-xl font-semibold text-blue-700 border-b border-blue-300 pb-1 mb-2">Education</h2>
      <p><strong>${currentDegree}</strong>, ${collegeName}, ${universityName}</p>
      <p>Semester ${currentSemester} | Graduation: ${graduationYear} | CGPA: ${cgpa} | Backlogs: ${backlogs}</p>
      <p><strong>12th:</strong> ${twelfthSchool}, ${twelfthBoard}, ${twelfthMarks}</p>
      <p><strong>10th:</strong> ${tenthSchool}, ${tenthBoard}, ${tenthMarks}</p>
    </section>

    ${
      preferredDomains.length
        ? `<section class="mt-6"><h2 class="text-xl font-semibold text-blue-700 border-b border-blue-300 pb-1 mb-2">Preferred Domains</h2><ul class="list-disc ml-6">${listItems(preferredDomains)}</ul></section>`
        : ""
    }

    ${
      toolsTechnologies.length
        ? `<section class="mt-6"><h2 class="text-xl font-semibold text-blue-700 border-b border-blue-300 pb-1 mb-2">Tools & Technologies</h2><ul class="list-disc ml-6">${listItems(toolsTechnologies)}</ul></section>`
        : ""
    }

    ${
      programmingLanguages.length
        ? `<section class="mt-6"><h2 class="text-xl font-semibold text-blue-700 border-b border-blue-300 pb-1 mb-2">Programming Languages</h2><ul class="list-disc ml-6">${listItems(programmingLanguages)}</ul><p class="mt-1"><strong>Proficiency (1–5):</strong> ${codingProficiency}</p></section>`
        : ""
    }

    ${certifications ? `<section class="mt-6"><h2 class="text-xl font-semibold text-blue-700 border-b border-blue-300 pb-1 mb-2">Certifications</h2><p>${certifications}</p></section>` : ""}

    ${
      hackathonParticipation === "Yes" && hackathonDetails
        ? `<section class="mt-6"><h2 class="text-xl font-semibold text-blue-700 border-b border-blue-300 pb-1 mb-2">Hackathons</h2><p>${hackathonDetails}</p></section>`
        : ""
    }

    ${
      projects.length
        ? `<section class="mt-6"><h2 class="text-xl font-semibold text-blue-700 border-b border-blue-300 pb-1 mb-2">Projects</h2>
          ${projects
            .map(
              (p) => `<div class="mb-3">
                <h3 class="font-semibold text-gray-800">${p.title}</h3>
                ${renderBullets(p.description)}
                <p><strong>Role:</strong> ${p.role} | <strong>Tech:</strong> ${joinComma(p.technologies)}</p>
                ${p.link ? `<a href="${p.link}" class="text-blue-500 underline">${p.link}</a>` : ""}
              </div>`
            )
            .join("")}</section>`
        : ""
    }

    ${
      experiences.length
        ? `<section class="mt-6"><h2 class="text-xl font-semibold text-blue-700 border-b border-blue-300 pb-1 mb-2">Experience</h2>
          ${experiences
            .map(
              (e) => `<div class="mb-3">
                <h3 class="font-semibold text-gray-800">${e.title} at ${e.company}</h3>
                <p>${e.duration} | ${e.workMode}</p>
                ${renderBullets(e.responsibilities)}
                <p><strong>Tech Used:</strong> ${joinComma(e.technologies)}</p>
              </div>`
            )
            .join("")}</section>`
        : ""
    }

    ${academicAchievements ? `<section class="mt-6"><h2 class="text-xl font-semibold text-blue-700 border-b border-blue-300 pb-1 mb-2">Academic Achievements</h2>${renderBullets(academicAchievements)}</section>` : ""}

    ${coCurricularActivities ? `<section class="mt-6"><h2 class="text-xl font-semibold text-blue-700 border-b border-blue-300 pb-1 mb-2">Co-Curricular Activities</h2>${renderBullets(coCurricularActivities)}</section>` : ""}

    ${publications ? `<section class="mt-6"><h2 class="text-xl font-semibold text-blue-700 border-b border-blue-300 pb-1 mb-2">Publications</h2>${renderBullets(publications)}</section>` : ""}

    ${openSourceContributions ? `<section class="mt-6"><h2 class="text-xl font-semibold text-blue-700 border-b border-blue-300 pb-1 mb-2">Open Source Contributions</h2>${renderBullets(openSourceContributions)}</section>` : ""}

    <!-- More About Me -->
    <section class="mt-6">
      <h2 class="text-xl font-semibold text-blue-700 border-b border-blue-300 pb-1 mb-2">More About Me</h2>
      <p>${getPersonalTraits()}${specialNeeds ? ` I have special needs: ${specialNeeds}.` : ""}${additionalComments ? ` ${additionalComments}.` : ""}</p>
    </section>

    <!-- MOOC / Online Learning -->
    ${getMooC() ? `<section class="mt-6"><h2 class="text-xl font-semibold text-blue-700 border-b border-blue-300 pb-1 mb-2">Online Learning</h2><p>${getMooC()}</p></section>` : ""}

    <!-- Future Plans -->
    ${getFuturePlans() ? `<section class="mt-6"><h2 class="text-xl font-semibold text-blue-700 border-b border-blue-300 pb-1 mb-2">Future Plans</h2><p>${getFuturePlans()}</p></section>` : ""}

  </div>`;
}
