import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Formations from './components/sections/Formations';
import Certifications from './components/sections/Certifications';
import Projects from './components/sections/Projects';
import Skills from './components/sections/Skills';
import Contact from './components/sections/Contact';
import AllProjects from './pages/AllProjects';
import AllCertifications from './pages/AllCertifications';
import ChatBot from './components/ChatBot'; 
import './index.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    const path = window.location.pathname;
    if (path.includes('all-projects')) {
      setCurrentPage('all-projects');
    } else if (path.includes('all-certifications')) {
      setCurrentPage('all-certifications');
    } else {
      setCurrentPage('home');
    }

    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path.includes('all-projects')) {
        setCurrentPage('all-projects');
      } else if (path.includes('all-certifications')) {
        setCurrentPage('all-certifications');
      } else {
        setCurrentPage('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loader"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-background"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <motion.div
                  className="font-display text-6xl md:text-8xl font-bold mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                >
                  <span className="bg-gradient-to-r from-[#6DD5C4] via-[#DFF6F0] to-[#6DD5C4] bg-clip-text text-transparent">
                    PK
                  </span>
                </motion.div>

                <div className="flex gap-2 justify-center">
                  {[0, 1, 2].map((index) => (
                    <motion.div
                      key={index}
                      className="w-3 h-3 rounded-full bg-primary"
                      animate={{
                        y: [0, -10, 0],
                        opacity: [1, 0.5, 1],
                      }}
                      transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: index * 0.2,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="min-h-screen relative"
            >
              {/* Background decorations */}
              <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-0 w-96 h-96 bg-[#6DD5C4]/10 rounded-full blur-3xl opacity-90"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#DFF6F0]/80 rounded-full blur-3xl opacity-80"></div>
              </div>

              <Navbar />
              <main>
                {currentPage === 'all-projects' ? (
                  <AllProjects />
                ) : currentPage === 'all-certifications' ? (
                  <AllCertifications />
                ) : (
                  <>
                    <Hero />
                    <About />
                    <Formations />
                    <Certifications />
                    <Projects />
                    <Skills />
                    <Contact />
                  </>
                )}
              </main>
              <ChatBot />
            </motion.div>
          )}
        </AnimatePresence>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
