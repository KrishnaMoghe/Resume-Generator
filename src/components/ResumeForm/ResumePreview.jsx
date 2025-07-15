import React from "react";

export default function ResumePreview({ formData, refProp }) {
  return (
    <div
      ref={refProp}
      className="bg-white p-8 rounded text-black font-sans leading-relaxed w-full max-w-3xl mx-auto"
    >
      <h1 className="text-3xl font-bold mb-2">{formData.fullName}</h1>
      <p className="text-sm mb-4">
        {formData.email} | {formData.phone} | {formData.linkedIn} |{" "}
        {formData.github}
      </p>

      <section className="mb-4">
        <h2 className="font-bold text-xl mb-1">Career Objective</h2>
        <p>
          I am a {formData.currentDegree} student aiming for{" "}
          {formData.careerPlans?.join(", ") || "N/A"} in domains like{" "}
          {formData.preferredDomains?.join(", ") || "N/A"}.
        </p>
      </section>

      <section className="mb-4">
        <h2 className="font-bold text-xl mb-1">Education</h2>
        <ul className="list-disc pl-5">
          <li>
            {formData.currentDegree} – {formData.collegeName},{" "}
            {formData.universityName} ({formData.currentSemester} Semester,
            Graduating {formData.graduationYear}) – {formData.cgpa} CGPA
          </li>
          <li>
            12th: {formData.twelfthSchool}, {formData.twelfthBoard} –{" "}
            {formData.twelfthMarks}
          </li>
          <li>
            10th: {formData.tenthSchool}, {formData.tenthBoard} –{" "}
            {formData.tenthMarks}
          </li>
        </ul>
      </section>

      <section className="mb-4">
        <h2 className="font-bold text-xl mb-1">Skills</h2>
        <p>
          <strong>Languages:</strong>{" "}
          {formData.programmingLanguages?.join(", ")}
        </p>
        <p>
          <strong>Tools & Tech:</strong>{" "}
          {formData.toolsTechnologies?.join(", ")}
        </p>
        <p>
          <strong>Certifications:</strong> {formData.certifications || "None"}
        </p>
      </section>

      <section className="mb-4">
        <h2 className="font-bold text-xl mb-1">Projects</h2>
        {formData.projects?.map((p, idx) => (
          <div key={idx} className="mb-2">
            <h3 className="font-semibold">{p.title}</h3>
            <p className="text-sm italic">{p.technologies}</p>
            <p>{p.description}</p>
            <p>
              <strong>Role:</strong> {p.role}
            </p>
            {p.link && (
              <a href={p.link} className="text-blue-600 underline">
                {p.link}
              </a>
            )}
          </div>
        ))}
      </section>

      <section className="mb-4">
        <h2 className="font-bold text-xl mb-1">Experience</h2>
        {formData.experiences?.map((e, idx) => (
          <div key={idx} className="mb-2">
            <h3 className="font-semibold">
              {e.title} @ {e.company}
            </h3>
            <p className="text-sm">
              {e.duration} | {e.workMode}
            </p>
            <p>{e.responsibilities}</p>
          </div>
        ))}
      </section>

      <section className="mb-4">
        <h2 className="font-bold text-xl mb-1">Achievements</h2>
        <ul className="list-disc pl-5">
          {formData.academicAchievements && (
            <li>{formData.academicAchievements}</li>
          )}
          {formData.coCurricularActivities && (
            <li>{formData.coCurricularActivities}</li>
          )}
          {formData.publications && (
            <li>Publication: {formData.publications}</li>
          )}
          {formData.openSourceContributions && (
            <li>Open Source: {formData.openSourceContributions}</li>
          )}
          {formData.sportsAchievements.map((achievement, index) => (
            <div key={index}>
              <span>{achievement.sportName}</span> -{" "}
              <span>{achievement.level}</span>
            </div>
          ))}
          {formData.moocCourses && <li>MOOCs: {formData.moocCourses}</li>}
        </ul>
      </section>

      <section className="mb-4">
        <h2 className="font-bold text-xl mb-1">Personal Traits</h2>
        <p>
          <strong>Strengths:</strong> {formData.strengths}
        </p>
        <p>
          <strong>Hobbies:</strong> {formData.hobbiesInterests}
        </p>
        <p>
          <strong>Teamwork Comfort:</strong> {formData.teamworkComfort}
        </p>
        <p>
          <strong>Looking for Internships:</strong>{" "}
          {formData.lookingForInternships}
        </p>
        <p>
          <strong>Scholarship Plans:</strong>{" "}
          {formData.scholarshipInterest
            ? `Yes (${formData.scholarshipDetails})`
            : "No"}
        </p>
      </section>
    </div>
  );
}
