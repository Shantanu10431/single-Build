import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';

// Module Imports - Lazy loading could be added here for performance
// For now, we'll try to identify the main entry points for each module.
// Based on file structure, we'll route to specific pages.

// Resume Module
import ResumeHome from './modules/resume/pages/Home';
import ResumeBuilder from './modules/resume/pages/Builder';
import ResumePreview from './modules/resume/pages/Preview';

// Placement Module
import PlacementDashboard from './modules/placement/pages/Dashboard';
import JobAnalysisInput from './modules/placement/pages/JobAnalysisInput';
import JobAnalysisResult from './modules/placement/pages/JobAnalysisResult';

// Job Tracker Module
import JobTrackerDashboard from './modules/job-tracker/pages/Dashboard';
import JobTrackerLanding from './modules/job-tracker/pages/Landing';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/resume" replace />} />

          {/* Resume Routes */}
          <Route path="resume" element={<ResumeHome />} />
          <Route path="resume/builder" element={<ResumeBuilder />} />
          <Route path="resume/preview" element={<ResumePreview />} />

          {/* Placement Routes */}
          <Route path="placement" element={<PlacementDashboard />} />
          <Route path="placement/analyze" element={<JobAnalysisInput />} />
          <Route path="placement/result" element={<JobAnalysisResult />} />

          {/* Job Tracker Routes */}
          <Route path="jobs" element={<JobTrackerDashboard />} />
          <Route path="jobs/welcome" element={<JobTrackerLanding />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
