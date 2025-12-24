import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { SantaProvider } from './context/SantaContext';
import SnowLayout from './components/SnowLayout';
import HomePage from './pages/HomePage';
import JoinPage from './pages/JoinPage';
import RevealPage from './pages/RevealPage';
import AdminDashboard from './components/AdminDashboard';

function App() {
  return (
    <SantaProvider>
      <Router>
        <SnowLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/join/:groupId" element={<JoinPage />} />
            <Route path="/reveal/:groupId" element={<RevealPage />} />
            <Route path="/admin/:groupId" element={<AdminDashboard />} />
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </SnowLayout>
      </Router>
    </SantaProvider>
  );
}

export default App;
