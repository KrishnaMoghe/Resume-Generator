import React from "react";

const ProjectsPortfolio = ({
  formData,
  setFormData,
  currentStep,
}) => {
  return (
    <div>
      {currentStep === 5 && (
        <div>
          {formData.projects.map((project, index) => (
            <div key={index} className="project-card">
              <h3 className="card-title">
                Project {index + 1} {index === 1 && "(Optional)"}
              </h3>

              <div className="form-group">
                <input
                  type="text"
                  placeholder="Project Title"
                  value={project.title}
                  onChange={(e) => {
                    const updatedProjects = [...formData.projects];
                    updatedProjects[index].title = e.target.value;
                    setFormData({
                      ...formData,
                      projects: updatedProjects,
                    });
                  }}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <textarea
                  placeholder="Project Description"
                  value={project.description}
                  onChange={(e) => {
                    const updatedProjects = [...formData.projects];
                    updatedProjects[index].description = e.target.value;
                    setFormData({
                      ...formData,
                      projects: updatedProjects,
                    });
                  }}
                  className="form-input form-textarea"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Technologies Used"
                  value={project.technologies}
                  onChange={(e) => {
                    const updatedProjects = [...formData.projects];
                    updatedProjects[index].technologies = e.target.value;
                    setFormData({
                      ...formData,
                      projects: updatedProjects,
                    });
                  }}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Your Role"
                  value={project.role}
                  onChange={(e) => {
                    const updatedProjects = [...formData.projects];
                    updatedProjects[index].role = e.target.value;
                    setFormData({
                      ...formData,
                      projects: updatedProjects,
                    });
                  }}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <input
                  type="url"
                  placeholder="GitHub/Demo Link (Optional)"
                  value={project.link}
                  onChange={(e) => {
                    const updatedProjects = [...formData.projects];
                    updatedProjects[index].link = e.target.value;
                    setFormData({
                      ...formData,
                      projects: updatedProjects,
                    });
                  }}
                  className="form-input"
                />
              </div>
              {formData.projects.length > 1 && (
                <button
                  type="button"
                  onClick={() => {
                    const updatedProjects = formData.projects.filter(
                      (_, i) => i !== index
                    );
                    setFormData({
                      ...formData,
                      projects: updatedProjects,
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
                projects: [
                  ...prev.projects,
                  {
                    title: "",
                    description: "",
                    technologies: "",
                    role: "",
                    link: "",
                  },
                ],
              }));
            }}
            className="btn btn-secondary"
          >
            Add Another Project
          </button>
        </div>
      )}
    </div>
  );
};

export default ProjectsPortfolio;
