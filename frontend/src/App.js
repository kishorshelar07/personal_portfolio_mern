import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/globals.css';

import useLocalStorage from './hooks/useLocalStorage';
import { ToastProvider } from './components/Toast/ToastProvider';

import Loader from './components/Loader/Loader';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Experience from './components/Experience/Experience';
import Projects from './components/Projects/Projects';
import Services from './components/Services/Services';
import GitHubActivity from './components/GitHub/GitHubActivity';
import Testimonials from './components/Testimonials/Testimonials';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import CustomCursor from './components/Cursor/CustomCursor';
import ScrollProgress from './components/Cursor/ScrollProgress';
import Blog from './components/Blog/Blog';
import NotFound from './pages/NotFound';
import AdminPage from './components/Admin/AdminPage'; // ← NEW

function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Services />
      <GitHubActivity />
      <Testimonials />
      <Blog />
      <Contact />
    </main>
  );
}

function App() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useLocalStorage('portfolio_theme', 'dark');

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme === 'light' ? 'light' : '');
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'light' : 'dark');

  return (
    <Router>
      <ToastProvider>
        <Routes>
          {/* Admin route — स्वतंत्र layout (Navbar/Footer नाही) */}
          <Route path="/admin" element={<AdminPage />} />

          {/* Main portfolio routes */}
          <Route path="*" element={
            <div className="App" data-theme={theme}>
              <AnimatePresence mode="wait">
                {loading && <Loader key="loader" />}
              </AnimatePresence>

              {!loading && (
                <>
                  <CustomCursor />
                  <ScrollProgress />
                  <Navbar theme={theme} toggleTheme={toggleTheme} />
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                  <Footer />
                </>
              )}
            </div>
          } />
        </Routes>
      </ToastProvider>
    </Router>
  );
}

export default App;
