
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/Landing';
import AppLayout from './components/Layout';
import Dashboard from './pages/Dashboard';
import JobAnalysisInput from './pages/JobAnalysisInput';
import JobAnalysisResult from './pages/JobAnalysisResult';
import JobAnalysisHistory from './pages/JobAnalysisHistory';
import TestChecklist from './pages/TestChecklist';
import Ship from './pages/Ship';
import Proof from './pages/Proof';
import ResumeLayout from './resume-builder/layouts/ResumeLayout';
import BuildStep from './resume-builder/components/BuildStep';
import ResumeProof from './resume-builder/pages/ResumeProof';
import { Practice, Assessments, Resources, Profile } from './pages/Placeholders';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        {/* App Shell Routes */}
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analysis/new" element={<JobAnalysisInput />} />
          <Route path="/analysis/results" element={<JobAnalysisResult />} />
          <Route path="/analysis/history" element={<JobAnalysisHistory />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/assessments" element={<Assessments />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/prp/07-test" element={<TestChecklist />} />
          <Route path="/prp/08-ship" element={<Ship />} />
          <Route path="/prp/proof" element={<Proof />} />

          <Route path="/rb" element={<ResumeLayout />}>
            <Route path="01-problem" element={<BuildStep stepId="01-problem" />} />
            <Route path="02-market" element={<BuildStep stepId="02-market" />} />
            <Route path="03-architecture" element={<BuildStep stepId="03-architecture" />} />
            <Route path="04-hld" element={<BuildStep stepId="04-hld" />} />
            <Route path="05-lld" element={<BuildStep stepId="05-lld" />} />
            <Route path="06-build" element={<BuildStep stepId="06-build" />} />
            <Route path="07-test" element={<BuildStep stepId="07-test" />} />
            <Route path="08-ship" element={<BuildStep stepId="08-ship" />} />
            <Route path="proof" element={<ResumeProof />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
