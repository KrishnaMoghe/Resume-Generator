import React from "react";

const Experience = ({
  formData,
  setFormData,
  currentStep,
}) => {
  return (
    <div>
      {/* Step 3: Career Goals */}
      {currentStep === 6 && (
        <div>
          {formData.experiences.map((exp, index) => (
            <div key={index} className="experience-card">
              <h3 className="card-title">Experience {index + 1}</h3>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Internship/Job Title"
                  value={exp.title}
                  onChange={(e) => {
                    const updated = [...formData.experiences];
                    updated[index].title = e.target.value;
                    setFormData({ ...formData, experiences: updated });
                  }}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Company Name"
                  value={exp.company}
                  onChange={(e) => {
                    const updated = [...formData.experiences];
                    updated[index].company = e.target.value;
                    setFormData({ ...formData, experiences: updated });
                  }}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Duration (From - To)"
                  value={exp.duration}
                  onChange={(e) => {
                    const updated = [...formData.experiences];
                    updated[index].duration = e.target.value;
                    setFormData({ ...formData, experiences: updated });
                  }}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <textarea
                  placeholder="Your Responsibilities"
                  value={exp.responsibilities}
                  onChange={(e) => {
                    const updated = [...formData.experiences];
                    updated[index].responsibilities = e.target.value;
                    setFormData({ ...formData, experiences: updated });
                  }}
                  className="form-input form-textarea"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Tools/Technologies Used"
                  value={exp.technologies}
                  onChange={(e) => {
                    const updated = [...formData.experiences];
                    updated[index].technologies = e.target.value;
                    setFormData({ ...formData, experiences: updated });
                  }}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <select
                  value={exp.workMode}
                  onChange={(e) => {
                    const updated = [...formData.experiences];
                    updated[index].workMode = e.target.value;
                    setFormData({ ...formData, experiences: updated });
                  }}
                  className="form-input form-select"
                >
                  <option value="">Select Work Mode</option>
                  <option value="Remote">Remote</option>
                  <option value="Onsite">Onsite</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>
              {formData.experiences.length > 1 && (
                <button
                  type="button"
                  onClick={() => {
                    const updatedExperiences = formData.experiences.filter(
                      (_, i) => i !== index
                    );
                    setFormData({
                      ...formData,
                      experiences: updatedExperiences,
                    });
                  }}
                  className="btn btn-danger btn-sm"
                  style={{ float: "right" }}
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={() => {
              setFormData((prev) => ({
                ...prev,
                experiences: [
                  ...prev.experiences,
                  {
                    title: "",
                    company: "",
                    duration: "",
                    responsibilities: "",
                    technologies: "",
                    workMode: "",
                  },
                ],
              }));
            }}
            className="btn btn-secondary"
          >
            Add Another Experience
          </button>
        </div>
      )}
    </div>
  );
};

export default Experience;
