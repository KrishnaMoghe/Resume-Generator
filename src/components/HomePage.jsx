import React from 'react';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();
  const handleGenerateResume = () => {
    // Navigate to resume generator
    navigate('/resume-form');
  };

  return (
    <div className="homepage">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">
            <h2>CraftixAI</h2>
          </div>
          <ul className="nav-menu">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
      </nav>

      {/* Home Section */}
      <section id="home" className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <h1 className="hero-title">
              Create Your Perfect Resume
            </h1>
            <p className="hero-subtitle">
            Create polished, ATS-optimized resumes in minutes with AI.
            Crafted for students, designed for success — no design skills needed.
            </p>
            <button 
              className="cta-button"
              onClick={handleGenerateResume}
            >
              Generate Resume
            </button>
          </div>
          <div className="hero-image">
            <div className="resume-preview">
              <div className="resume-header"></div>
              <div className="resume-lines">
                <div className="line long"></div>
                <div className="line medium"></div>
                <div className="line short"></div>
                <div className="line long"></div>
                <div className="line medium"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="section-container">
          <h2 className="section-title">About CraftixAI</h2>
          <div className="about-content">
            <div className="about-text">
              <p>
              CraftixAI is an AI-powered resume builder designed to help students and early professionals create compelling, industry-ready resumes effortlessly. Our platform guides users step-by-step through essential career questions and transforms their responses into a clean, professional resume optimized for Applicant Tracking Systems (ATS).
              </p>
              <p>
              Whether you're applying for internships, scholarships, or your first job, CraftMyResumeAI ensures your resume stands out with strong formatting, relevant keywords, and achievement-focused language — all generated with the intelligence of advanced AI models.
              </p>
            </div>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">⚡</div>
                <h3>Fast & Easy</h3>
                <p>Create professional resumes in minutes with our streamlined process.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🎨</div>
                <h3>Professionally Structured Output</h3>
                <p>Get a clean, ATS-optimized resume with polished formatting and impactful content — all automatically crafted by AI.</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">📱</div>
                <h3>Mobile Friendly</h3>
                <p>Build and edit your resume on any device, anywhere, anytime.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="section-container">
          <h2 className="section-title">Contact Us</h2>
          <div className="contact-content">
            <div className="contact-info">
              <h3>Meet Our Team</h3>
              <p>
                Have questions or need help with your resume? Our experienced team is here to assist you! 
                Connect with our team members directly:
              </p>
              <div className="team-members">
              <div className="team-member">
                  <div className="member-avatar">👩‍💻</div>
                  <div className="member-info">
                    <h4>Krishna Moghe</h4>
                    <a href="https://www.linkedin.com/in/dte-gecbh-com-krishna-moghe" target="_blank" rel="noopener noreferrer" className="linkedin-link">
                      LinkedIn Profile
                    </a>
                  </div>
                </div>
                <div className="team-member">
                  <div className="member-avatar">👨‍💼</div>
                  <div className="member-info">
                    <h4>Jainil Patel</h4>
                    <a href="https://www.linkedin.com/in/dte-gecbh-com-jainil-patel" target="_blank" rel="noopener noreferrer" className="linkedin-link">
                      LinkedIn Profile
                    </a>
                  </div>
                </div>
                <div className="team-member">
                  <div className="member-avatar">👨‍🎓</div>
                  <div className="member-info">
                    <h4>Md Zaid Shaikh</h4>
                    <a href="https://www.linkedin.com/in/dte-gecbh-com-mohammed-zaid-shaikh" target="_blank" rel="noopener noreferrer" className="linkedin-link">
                      LinkedIn Profile
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>CraftixAI</h3>
              <p>Creating perfect resumes, one career at a time.</p>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 CraftixAI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;