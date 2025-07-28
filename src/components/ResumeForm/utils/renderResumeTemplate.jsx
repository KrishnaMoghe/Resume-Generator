export default function renderResumeTemplate(formData) {
  const {
    fullName, email, phone, dob, gender, address, github, linkedIn, languages, photo,

    careerPlans, relocation, preparingExams, examNames,

    currentDegree, collegeName, universityName, currentSemester, graduationYear, cgpa, backlogs,
    twelfthSchool, twelfthBoard, twelfthMarks,
    tenthSchool, tenthBoard, tenthMarks,

    preferredDomains = [], toolsTechnologies = [], programmingLanguages = [], codingProficiency,

    certifications, hackathonParticipation, hackathonDetails,

    projects = [], experiences = [],

    academicAchievements, coCurricularActivities, publications, openSourceContributions,

    teamworkComfort, lookingForInternships, strengths, hobbiesInterests,
    specialNeeds, additionalComments,

    moocCourses, planningAbroad, applyingScholarship, scholarshipNames,
  } = formData;

  /* ---------- helpers ---------- */

  // turn array OR newline-string into <ul><li>…</li></ul>  (single line → <p>)
  const bullets = (val = "") => {
    if (!val) return "";
    const arr = Array.isArray(val)
      ? val.filter(Boolean)
      : val
          .split("\n")
          .map((l) => l.trim())
          .filter((l) => l);
    if (!arr.length) return "";
    if (arr.length === 1) return `<p>${arr[0]}</p>`;
    return `<ul class="list-disc ml-6">${arr.map((l) => `<li>${l}</li>`).join("")}</ul>`;
  };

  const list = (arr) =>
    Array.isArray(arr) ? arr.map((x) => `<li>${x.label || x}</li>`).join("") : "";

  const join = (arr) => (Array.isArray(arr) ? arr.map((x) => x.label || x).join(", ") : arr);

  const personalTraits = () => {
    const parts = [];
    if (strengths) parts.push(`My strengths include ${strengths}.`);
    if (hobbiesInterests) parts.push(`I enjoy ${hobbiesInterests}.`);
    if (teamworkComfort)
      parts.push(
        `I ${/yes/i.test(teamworkComfort) ? "feel comfortable" : "don't feel comfortable"} working in a team environment.`
      );
    if (lookingForInternships)
      parts.push(
        `I am ${
          /yes/i.test(lookingForInternships)
            ? "actively seeking internship opportunities."
            : "currently not looking for internships."
        }`
      );
    return parts.join(" ");
  };

  /* ---------- template ---------- */

  return `
<div class="max-w-4xl mx-auto bg-white p-10 rounded-lg shadow-lg text-gray-900 font-sans leading-relaxed">

  <!-- header -------------------------------------------------------->
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
    ${photo ? `<img src="${photo}" alt="profile" class="w-24 h-24 rounded-full object-cover shadow-md border" />` : ""}
  </div>

  <!-- career plans -------------------------------------------------->
  ${
    careerPlans?.length
      ? `
  <section class="mt-6">
    <h2 class="text-xl font-semibold text-blue-700 border-b pb-1 mb-2">Career Plans</h2>
    <p>${join(careerPlans)}</p>
    <p><strong>Relocation:</strong> ${relocation}</p>
    <p><strong>Preparing Exams:</strong> ${preparingExams}${examNames ? ` (${examNames})` : ""}</p>
  </section>`
      : ""
  }

  <!-- education ----------------------------------------------------->
  <section class="mt-6">
    <h2 class="text-xl font-semibold text-blue-700 border-b pb-1 mb-2">Education</h2>
    <p><strong>${currentDegree}</strong>, ${collegeName}, ${universityName}</p>
    <p>Semester ${currentSemester} | Graduation ${graduationYear} | CGPA ${cgpa} | Backlogs ${backlogs}</p>
    <p><strong>12th:</strong> ${twelfthSchool}, ${twelfthBoard}, ${twelfthMarks}</p>
    <p><strong>10th:</strong> ${tenthSchool}, ${tenthBoard}, ${tenthMarks}</p>
  </section>

  ${preferredDomains.length ? `
  <section class="mt-6">
    <h2 class="text-xl font-semibold text-blue-700 border-b pb-1 mb-2">Preferred Domains</h2>
    <ul class="list-disc ml-6">${list(preferredDomains)}</ul>
  </section>` : ""}

  ${toolsTechnologies.length ? `
  <section class="mt-6">
    <h2 class="text-xl font-semibold text-blue-700 border-b pb-1 mb-2">Tools & Technologies</h2>
    <ul class="list-disc ml-6">${list(toolsTechnologies)}</ul>
  </section>` : ""}

  ${programmingLanguages.length ? `
  <section class="mt-6">
    <h2 class="text-xl font-semibold text-blue-700 border-b pb-1 mb-2">Programming Languages</h2>
    <ul class="list-disc ml-6">${list(programmingLanguages)}</ul>
    <p class="mt-1"><strong>Proficiency (1–5):</strong> ${codingProficiency}</p>
  </section>` : ""}

  ${certifications ? `
  <section class="mt-6">
    <h2 class="text-xl font-semibold text-blue-700 border-b pb-1 mb-2">Certifications</h2>
    ${bullets(certifications)}
  </section>` : ""}

  ${
    hackathonParticipation === "Yes" && hackathonDetails
      ? `
  <section class="mt-6">
    <h2 class="text-xl font-semibold text-blue-700 border-b pb-1 mb-2">Hackathons</h2>
    ${bullets(hackathonDetails)}
  </section>`
      : ""
  }

  <!-- projects ------------------------------------------------------>
  ${
    projects.length
      ? `
  <section class="mt-6">
    <h2 class="text-xl font-semibold text-blue-700 border-b pb-1 mb-2">Projects</h2>
    ${projects
      .map(
        (p) => `
      <div class="mb-3">
        <h3 class="font-semibold text-gray-800">${p.title}</h3>
        ${bullets(p.description)}
        <p><strong>Role:</strong> ${p.role} | <strong>Tech:</strong> ${join(p.technologies)}</p>
        ${p.link ? `<a href="${p.link}" class="text-blue-500 underline">${p.link}</a>` : ""}
      </div>`
      )
      .join("")}
  </section>`
      : ""
  }

  <!-- experience ---------------------------------------------------->
  ${
    experiences.length
      ? `
  <section class="mt-6">
    <h2 class="text-xl font-semibold text-blue-700 border-b pb-1 mb-2">Experience</h2>
    ${experiences
      .map(
        (e) => `
      <div class="mb-3">
        <h3 class="font-semibold text-gray-800">${e.title} at ${e.company}</h3>
        <p>${e.duration} | ${e.workMode}</p>
        ${bullets(e.responsibilities)}
        ${e.technologies?.length ? `<p><strong>Tech Used:</strong> ${join(e.technologies)}</p>` : ""}
      </div>`
      )
      .join("")}
  </section>`
      : ""
  }

  ${academicAchievements ? `
  <section class="mt-6">
    <h2 class="text-xl font-semibold text-blue-700 border-b pb-1 mb-2">Academic Achievements</h2>
    ${bullets(academicAchievements)}
  </section>` : ""}

  ${coCurricularActivities ? `
  <section class="mt-6">
    <h2 class="text-xl font-semibold text-blue-700 border-b pb-1 mb-2">Co-Curricular Activities</h2>
    ${bullets(coCurricularActivities)}
  </section>` : ""}

  ${publications ? `
  <section class="mt-6">
    <h2 class="text-xl font-semibold text-blue-700 border-b pb-1 mb-2">Publications</h2>
    ${bullets(publications)}
  </section>` : ""}

  ${openSourceContributions ? `
  <section class="mt-6">
    <h2 class="text-xl font-semibold text-blue-700 border-b pb-1 mb-2">Open Source Contributions</h2>
    ${bullets(openSourceContributions)}
  </section>` : ""}

  <!-- personal traits --------------------------------------------->
  <section class="mt-6">
    <h2 class="text-xl font-semibold text-blue-700 border-b pb-1 mb-2">Personal Traits</h2>
    <p>${personalTraits()}</p>
    ${specialNeeds ? `<p><strong>Special Needs:</strong> ${specialNeeds}</p>` : ""}
    ${additionalComments ? `<p><strong>Additional Comments:</strong> ${additionalComments}</p>` : ""}
  </section>

  ${moocCourses ? `
  <section class="mt-6">
    <h2 class="text-xl font-semibold text-blue-700 border-b pb-1 mb-2">MOOC Courses</h2>
    ${bullets(moocCourses)}
  </section>` : ""}

  ${
    planningAbroad || applyingScholarship
      ? `
  <section class="mt-6">
    <h2 class="text-xl font-semibold text-blue-700 border-b pb-1 mb-2">Future Plans</h2>
    <p><strong>Planning Abroad:</strong> ${planningAbroad}</p>
    <p><strong>Applying for Scholarships:</strong> ${applyingScholarship}</p>
    ${scholarshipNames ? `<p><strong>Scholarship Names:</strong> ${scholarshipNames}</p>` : ""}
  </section>`
      : ""
  }

</div>`;
}
