import React from "react";
import ResumeForm from "./components/ResumeForm/ResumeForm";
import HomePage from "./components/HomePage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * A functional component that serves as the root of the application.
 * It renders the main container with the ResumeForm component.
 */

/*******  96ad12b4-d1e9-4005-b5bd-35c6a205e905  *******/
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/resume-form" element={<ResumeForm />} />
      </Routes>
    </Router>
  );
}

export default App;
