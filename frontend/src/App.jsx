import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { SurveyProvider } from './Context/SurveyContext';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';

import Home from './pages/Home';
import Research from './pages/Research';
import Consent from './pages/Consent';
import Survey from './pages/Survey';
import Collecting from './pages/Collecting';
import ThankYou from './pages/ThankYou';
import Privacy from './pages/Privacy';
import DeleteData from './pages/DeleteData';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <SurveyProvider>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-[#090D12] text-[#F5F7FA] selection:bg-[#1DB954] selection:text-[#090D12]">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/research" element={<Research />} />
            <Route path="/consent" element={<Consent />} />
            <Route path="/survey" element={<Survey />} />
            <Route path="/collecting" element={<Collecting />} />
            <Route path="/complete" element={<ThankYou />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/delete-data" element={<DeleteData />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </SurveyProvider>
  );
}

export default App;