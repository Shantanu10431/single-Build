import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import Layout from './components/Layout';

// --- Resume Module Imports ---
import { ResumeProvider } from './modules/resume/context/ResumeContext';
import ResumeHome from './modules/resume/pages/Home';
import ResumeBuilder from './modules/resume/pages/Builder';
import ResumePreview from './modules/resume/pages/Preview';
import ResumeProof from './modules/resume/pages/Proof';

// --- Placement Module Imports ---
import PlacementLayout from './modules/placement/components/Layout'; // Renamed to avoid key collision
import PlacementDashboard from './modules/placement/pages/Dashboard';
import JobAnalysisInput from './modules/placement/pages/JobAnalysisInput';
import JobAnalysisResult from './modules/placement/pages/JobAnalysisResult';
import JobAnalysisHistory from './modules/placement/pages/JobAnalysisHistory';
import PlacementTestChecklist from './modules/placement/pages/TestChecklist';
import PlacementShip from './modules/placement/pages/Ship';
import PlacementProof from './modules/placement/pages/Proof';
import PlacementResumeLayout from './modules/placement/resume-builder/layouts/ResumeLayout';
import PlacementBuildStep from './modules/placement/resume-builder/components/BuildStep';
import PlacementResumeProof from './modules/placement/resume-builder/pages/ResumeProof';
import { Practice, Assessments, Resources, Profile } from './modules/placement/pages/Placeholders';

// --- Job Tracker Module Imports ---
import JobTrackerLayout from './modules/job-tracker/components/Layout'; // Renamed
import JobTrackerLanding from './modules/job-tracker/pages/Landing';
import JobTrackerDashboard from './modules/job-tracker/pages/Dashboard';
import JobTrackerSettings from './modules/job-tracker/pages/Settings';
import JobTrackerSaved from './modules/job-tracker/pages/Saved';
import JobTrackerDigest from './modules/job-tracker/pages/Digest';
import JobTrackerProof from './modules/job-tracker/pages/Proof';
import JobTrackerTestChecklist from './modules/job-tracker/pages/TestChecklist';
import JobTrackerShip from './modules/job-tracker/pages/Ship';

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ResumeProvider>
          <Routes>
            {/* 
              Main App Wrapper: Sidebar + Content Area 
            */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Navigate to="/resume" replace />} />

              {/* =========================================================
                  RESUME BUILDER MODULE
                  Original Routes: /, /builder, /preview, /proof
                 ========================================================= */}
              <Route path="resume" element={<ResumeHome />} />
              <Route path="resume/builder" element={<ResumeBuilder />} />
              <Route path="resume/preview" element={<ResumePreview />} />
              <Route path="resume/proof" element={<ResumeProof />} />


              {/* =========================================================
                  PLACEMENT MODULE
                  Original Routes: /dashboard, /analysis/*, /prp/*, /rb/*
                  Wrapped in its own AppLayout from the original repo
                 ========================================================= */}
              <Route path="placement" element={<PlacementLayout />}>
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<PlacementDashboard />} />

                {/* Analysis Flow */}
                <Route path="analysis/new" element={<JobAnalysisInput />} />
                <Route path="analysis/results" element={<JobAnalysisResult />} />
                <Route path="analysis/history" element={<JobAnalysisHistory />} />

                {/* Resources & Placeholders */}
                <Route path="practice" element={<Practice />} />
                <Route path="assessments" element={<Assessments />} />
                <Route path="resources" element={<Resources />} />
                <Route path="profile" element={<Profile />} />

                {/* PRP Specifics */}
                <Route path="prp/07-test" element={<PlacementTestChecklist />} />
                <Route path="prp/08-ship" element={<PlacementShip />} />
                <Route path="prp/proof" element={<PlacementProof />} />

                {/* Internal Resume Builder within Placement Plugin */}
                <Route path="rb" element={<PlacementResumeLayout />}>
                  <Route path="01-problem" element={<PlacementBuildStep stepId="01-problem" />} />
                  <Route path="02-market" element={<PlacementBuildStep stepId="02-market" />} />
                  <Route path="03-architecture" element={<PlacementBuildStep stepId="03-architecture" />} />
                  <Route path="04-hld" element={<PlacementBuildStep stepId="04-hld" />} />
                  <Route path="05-lld" element={<PlacementBuildStep stepId="05-lld" />} />
                  <Route path="06-build" element={<PlacementBuildStep stepId="06-build" />} />
                  <Route path="07-test" element={<PlacementBuildStep stepId="07-test" />} />
                  <Route path="08-ship" element={<PlacementBuildStep stepId="08-ship" />} />
                  <Route path="proof" element={<PlacementResumeProof />} />
                </Route>
              </Route>

              {/* =========================================================
                  JOB TRACKER MODULE
                  Original Routes: /, /dashboard, /settings, /saved, /digest...
                  Wrapped in its own Layout
                 ========================================================= */}
              <Route path="jobs" element={<JobTrackerLayout><Outlet /></JobTrackerLayout>}>
                <Route index element={<JobTrackerLanding />} />
                <Route path="dashboard" element={<JobTrackerDashboard />} />
                <Route path="settings" element={<JobTrackerSettings />} />
                <Route path="saved" element={<JobTrackerSaved />} />
                <Route path="digest" element={<JobTrackerDigest />} />
                <Route path="proof" element={<JobTrackerProof />} />

                {/* JT Specifics */}
                <Route path="jt/07-test" element={<JobTrackerTestChecklist />} />
                <Route path="jt/08-ship" element={<JobTrackerShip />} />
                <Route path="jt/proof" element={<JobTrackerProof />} />
              </Route>

            </Route>
          </Routes>
        </ResumeProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
