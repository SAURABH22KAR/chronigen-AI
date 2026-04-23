import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ChatBot from './components/ChatBot';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/Home';
import Services from './pages/Services';
import AIAgents from './pages/AIAgents';
import Chatbots from './pages/Chatbots';
import About from './pages/About';
import Contact from './pages/Contact';
import Careers from './pages/Careers';
import Admin from './pages/Admin';
import Pricing from './pages/Pricing';
import ROICalculator from './pages/ROICalculator';
import AIReceptionist from './pages/AIReceptionist';
import Demo from './pages/Demo';
import ChronoPage from './pages/ChronoPage';

function useIsChronoPage() {
  const { pathname } = useLocation();
  return pathname === '/chrono';
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function AppShell() {
  const isChrono = useIsChronoPage();
  return (
    <div className="min-h-screen flex flex-col" style={{ background: '#030712' }}>
      {!isChrono && <Navbar />}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/ai-agents" element={<AIAgents />} />
          <Route path="/services/chatbots" element={<Chatbots />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/roi-calculator" element={<ROICalculator />} />
          <Route path="/services/ai-receptionist" element={<AIReceptionist />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/chrono" element={<ChronoPage />} />
        </Routes>
      </main>
      {!isChrono && <Footer />}
      {!isChrono && <ChatBot />}
      {!isChrono && <WhatsAppButton />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppShell />
    </Router>
  );
}

export default App;
