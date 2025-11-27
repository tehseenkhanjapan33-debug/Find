
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import CreateCampaignPage from './pages/CreateCampaignPage';
import ProtectedRoute from './components/ProtectedRoute';
import Notification from './components/Notification';

function App() {
  return (
    <AppProvider>
      <HashRouter>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
              <Route path="/create-campaign" element={<ProtectedRoute><CreateCampaignPage /></ProtectedRoute>} />
            </Routes>
          </main>
          <Notification />
        </div>
      </HashRouter>
    </AppProvider>
  );
}

export default App;
