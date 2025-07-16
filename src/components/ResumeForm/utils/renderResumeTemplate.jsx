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

  const safeJoin = (arr) => Array.isArray(arr) ? arr.map(i => i.label || i).join(', ') : arr;

  const safeList = (arr) =>
    Array.isArray(arr)
      ? arr.map(item => `<li>${item.label || item}</li>`).join('')
      : '';

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

    ${careerPlans?.length ? `
    <section class="mt-6">
      <h2 class="text-xl font-semibold text-blue-700 border-b border-blue-300 pb-1 mb-2">Career Plans</h2>
      <p>${safeJoin(careerPlans)}</p>
      <p><strong>Relocation:</strong> ${relocation}</p>
      <p><strong>Preparing Exams:</strong> ${preparingExams}${examNames ? ` (${examNames})` : ""}</p>
    </section>` : ""}

    <section class="mt-6">
      <h2 class="text-xl font-semibold text-blue-700 border-b border-blue-300 pb-1 mb-2">Education</h2>
      <p><strong>${currentDegree}</strong>, ${collegeName}, ${universityName}</p>
      <p>Semester ${currentSemester} | Graduation: ${graduationYear} | CGPA: ${cgpa} | Backlogs: ${backlogs}</p>
      <p><strong>12th:</strong> ${twelfthSchool}, ${twelfthBoard}, ${twelfthMarks}</p>
      <p><strong>10th:</strong> ${tenthSchool}, ${tenthBoard}, ${tenthMarks}</p>
    </section>

    ${preferredDomains.length ? `
    <section class="mt-6">
      <h2 class="text-xl font-semibold text-blue-700 border-b border-blue-300 pb-1 mb-2">Preferred Domains</h2>
      <ul class="list-disc ml-6">${safeList(preferredDomains)}</ul>
    </section>` : ""}

    ${toolsTechnologies.length ? `
    <section class="mt-6">
      <h2 class="text-xl font-semibold text-blue-700 border-b border-blue-300 pb-1 mb-2">Tools & Technologies</h2>
      <ul class="list-disc ml-6">${safeList(toolsTechnologies)}</ul>
    </section>` : ""}

    ${programmingLanguages.length ? `
    <section class="mt-6">
      <h2 class="text-xl font-semibold text-blue-700 border-b border-blue-300 pb-1 mb-2">Programming Languages</h2>
      <ul class="list-disc ml-6">${safeList(programmingLanguages)}</ul>
      <p class="mt-1"><strong>Proficiency (1–5):</strong> ${codingProficiency}</p>
    </section>` : ""}

    ${certifications ? `
    <section class="mt-6">
      <h2 class="text-xl font-semibold text-blue-700 border-b border-blue-300 pb-1 mb-2">Certifications</h2>
      <p>${certifications}</p>
    </section>` : ""}

    ${hackathonParticipation === "Yes" && hackathonDetails ? `
    <section class="mt-6">
      <h2 class="text-xl font-semibold text-blue-700 border-b border-blue-300 pb-1 mb-2">Hackathons</h2>
      <p>${hackathonDetails}</p>
    </section>` : ""}

    ${projects.length ? `
    <section class="mt-6">
      <h2 class="text-xl font-semibold text-blue-700 border-b border-blue-300 pb-1 mb-2">Projects</h2>
      ${projects.map(p => `
        <div class="mb-3">
          <h3 class="font-semibold text-gray-800">${p.title}</h3>
          <p>${p.description}</p>
          <p><strong>Role:</strong> ${p.role} | <strong>Tech:</strong> ${safeJoin(p.technologies)}</p>
          ${p.link ? `<a href="${p.link}" class="text-blue-500 underline">${p.link}</a>` : ""}
        </div>`).join("")}
    </section>` : ""}

    ${experiences.length ? `
    <section class="mt-6">
      <h2 class="text-xl font-semibold text-blue-700 border-b border-blue-300 pb-1 mb-2">Experience</h2>
      ${experiences.map(exp => `
        <div class="mb-3">
          <h3 class="font-semibold text-gray-800">${exp.title} at ${exp.company}</h3>
          <p>${exp.duration} | ${exp.workMode}</p>
          <p>${exp.responsibilities}</p>
          <p><strong>Tech Used:</strong> ${safeJoin(exp.technologies)}</p>
        </div>`).join("")}
    </section>` : ""}

    ${academicAchievements ? `
    <section class="mt-6">
      <h2 class="text-xl font-semibold text-blue-700 border-b border-blue-300 pb-1 mb-2">Academic Achievements</h2>
      <p>${academicAchievements}</p>
    </section>` : ""}

    ${coCurricularActivities ? `
    <section class="mt-6">
      <h2 class="text-xl font-semibold text-blue-700 border-b border-blue-300 pb-1 mb-2">Co-Curricular Activities</h2>
      <p>${coCurricularActivities}</p>
    </section>` : ""}

    ${publications ? `
    <section class="mt-6">
      <h2 class="text-xl font-semibold text-blue-700 border-b border-blue-300 pb-1 mb-2">Publications</h2>
      <p>${publications}</p>
    </section>` : ""}

    ${openSourceContributions ? `
    <section class="mt-6">
      <h2 class="text-xl font-semibold text-blue-700 border-b border-blue-300 pb-1 mb-2">Open Source Contributions</h2>
      <p>${openSourceContributions}</p>
    </section>` : ""}

    <section class="mt-6">
      <h2 class="text-xl font-semibold text-blue-700 border-b border-blue-300 pb-1 mb-2">More About Me</h2>
      <p><strong>Teamwork Comfort:</strong> ${teamworkComfort}</p>
      <p><strong>Looking for Internships:</strong> ${lookingForInternships}</p>
      <p><strong>Strengths:</strong> ${strengths}</p>
      <p><strong>Hobbies & Interests:</strong> ${hobbiesInterests}</p>
      <p><strong>Special Needs:</strong> ${specialNeeds}</p>
      <p><strong>Additional Comments:</strong> ${additionalComments}</p>
    </section>

    ${moocCourses ? `
    <section class="mt-6">
      <h2 class="text-xl font-semibold text-blue-700 border-b border-blue-300 pb-1 mb-2">MOOC Courses</h2>
      <p>${moocCourses}</p>
    </section>` : ""}

    ${(planningAbroad || applyingScholarship) ? `
    <section class="mt-6">
      <h2 class="text-xl font-semibold text-blue-700 border-b border-blue-300 pb-1 mb-2">Future Plans</h2>
      <p><strong>Planning Abroad:</strong> ${planningAbroad}</p>
      <p><strong>Applying for Scholarships:</strong> ${applyingScholarship}</p>
      <p><strong>Scholarship Names:</strong> ${scholarshipNames}</p>
    </section>` : ""}

  </div>
  `;
}
