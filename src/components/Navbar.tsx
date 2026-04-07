import { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../hooks/useLanguage';

const navGroup1 = [
  { id: 'hero', label: { en: 'Home', fr: 'Accueil' } },
  { id: 'about', label: { en: 'About', fr: 'À propos' } },
];

const navGroup2 = [
  { id: 'formations', label: { en: 'Education', fr: 'Formation' } },
  { id: 'certifications', label: { en: 'Certifications', fr: 'Certifications' } },
  { id: 'projects', label: { en: 'Projects', fr: 'Projets' } },
  { id: 'skills', label: { en: 'Skills', fr: 'Compétences' } },
  { id: 'contact', label: { en: 'Contact', fr: 'Contact' } },
];

const allNavItems = [...navGroup1, ...navGroup2];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { theme, cycleTheme, isAutoTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      const sections = allNavItems.map(item => document.getElementById(item.id));
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(allNavItems[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);

    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'fr' : 'en');
  };

  const getThemeLabel = () => {
    if (isAutoTheme) return 'Auto';
    return theme === 'light' ? 'Light' : 'Dark';
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center md:justify-center relative h-16 md:h-20 gap-4">
          {/* Navigation Pills - Group 1 & 2 - Centered */}
          <div className="hidden md:flex items-center gap-2">
            {/* Group 1: Home, About */}
            <motion.div 
              className="flex items-center bg-white/10 dark:bg-white/5 backdrop-blur-lg rounded-full px-2 py-2.5 border border-white/20 dark:border-white/10 shadow-lg gap-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {navGroup1.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 overflow-hidden ${
                    activeSection === item.id
                      ? 'bg-gradient-to-r from-primary/80 to-accent/80 text-slate-900 dark:text-white shadow-md'
                      : 'text-foreground hover:text-foreground'
                  }`}
                >
                  {/* Wave Ripple Animation */}
                  {activeSection === item.id && (
                    <>
                      <motion.div
                        className="absolute inset-0 rounded-full -z-10 border-4 border-primary"
                        initial={{ scale: 0, opacity: 1 }}
                        animate={{ scale: 2.8, opacity: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                      />
                      <motion.div
                        className="absolute inset-0 rounded-full -z-10 border-4 border-accent"
                        initial={{ scale: 0, opacity: 1 }}
                        animate={{ scale: 2.8, opacity: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                      />
                      <motion.div
                        className="absolute inset-0 rounded-full -z-10 border-3 border-primary/70"
                        initial={{ scale: 0, opacity: 1 }}
                        animate={{ scale: 2.8, opacity: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
                      />
                    </>
                  )}
                  {t(item.label)}
                </motion.button>
              ))}
            </motion.div>

            {/* Divider */}
            <div className="h-6 w-px bg-white/20 dark:bg-white/10"></div>

            {/* Group 2: Formation, Certifications, Projects, Skills, Contact */}
            <motion.div 
              className="flex items-center bg-white/10 dark:bg-white/5 backdrop-blur-lg rounded-full px-2 py-2.5 border border-white/20 dark:border-white/10 shadow-lg gap-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
            >
              {navGroup2.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 overflow-hidden ${
                    activeSection === item.id
                      ? 'bg-gradient-to-r from-primary/80 to-accent/80 text-slate-900 dark:text-white shadow-md'
                      : 'text-foreground hover:text-foreground'
                  }`}
                >
                  {/* Wave Ripple Animation */}
                  {activeSection === item.id && (
                    <>
                      <motion.div
                        className="absolute inset-0 rounded-full -z-10 border-4 border-primary"
                        initial={{ scale: 0, opacity: 1 }}
                        animate={{ scale: 2.8, opacity: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                      />
                      <motion.div
                        className="absolute inset-0 rounded-full -z-10 border-4 border-accent"
                        initial={{ scale: 0, opacity: 1 }}
                        animate={{ scale: 2.8, opacity: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                      />
                      <motion.div
                        className="absolute inset-0 rounded-full -z-10 border-3 border-primary/70"
                        initial={{ scale: 0, opacity: 1 }}
                        animate={{ scale: 2.8, opacity: 0 }}
                        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
                      />
                    </>
                  )}
                  {t(item.label)}
                </motion.button>
              ))}
            </motion.div>
          </div>

          {/* Controls Panel - iOS Style - Top Right */}
          <div className="absolute right-4 flex items-center gap-2">
            {/* Theme & Language Controls */}
            <motion.div 
              className="flex items-center gap-2 bg-white/15 dark:bg-white/5 backdrop-blur-lg rounded-full px-2 py-2.5 border border-slate-300/30 dark:border-white/10 shadow-lg"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              {/* Language Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleLanguage}
                className="p-2 rounded-full hover:bg-white/30 dark:hover:bg-white/10 transition-all text-foreground"
                aria-label="Toggle language"
                title={language === 'en' ? 'Français' : 'English'}
              >
                <Globe className="h-4 w-4 md:h-5 md:w-5" />
              </motion.button>

              {/* Divider */}
              <div className="w-px h-6 bg-slate-400/30 dark:bg-white/10"></div>

              {/* Theme Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={cycleTheme}
                className="p-2 rounded-full hover:bg-white/30 dark:hover:bg-white/10 transition-all relative text-foreground"
                aria-label="Cycle theme"
                title={getThemeLabel()}
              >
                <Sun className="h-4 w-4 md:h-5 md:w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 md:h-5 md:w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </motion.button>
            </motion.div>

            {/* Mobile Menu Button - Positioned Right */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="md:hidden p-2 rounded-full bg-white/15 dark:bg-white/5 border border-slate-300/30 dark:border-white/10 hover:bg-white/30 dark:hover:bg-white/10 transition-all text-foreground"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Backdrop Blur Overlay - Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40 md:hidden backdrop-blur-sm bg-black/20 dark:bg-black/30"
          />
        )}
      </AnimatePresence>

      {/* Mobile Menu - iOS Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/80 dark:bg-slate-950/90 backdrop-blur-lg relative z-50"
          >
            <div className="px-4 py-4 space-y-3">
              {/* Group 1 Navigation Items */}
              <div className="space-y-1">
                {navGroup1.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => scrollToSection(item.id)}
                    className={`relative block w-full text-left px-4 py-3 rounded-xl text-base font-semibold transition-all overflow-hidden ${
                      activeSection === item.id
                        ? 'bg-gradient-to-r from-primary/80 to-accent/80 text-white shadow-md'
                        : 'text-muted-foreground hover:text-foreground hover:bg-white/10 dark:hover:bg-white/5'
                    }`}
                  >
                    {/* Wave Ripple Animation  */}
                    {activeSection === item.id && (
                      <>
                        <motion.div
                          className="absolute inset-0 rounded-xl -z-10 border-4 border-primary"
                          initial={{ scale: 0, opacity: 1 }}
                          animate={{ scale: 2.8, opacity: 0 }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                        />
                        <motion.div
                          className="absolute inset-0 rounded-xl -z-10 border-4 border-accent"
                          initial={{ scale: 0, opacity: 1 }}
                          animate={{ scale: 2.8, opacity: 0 }}
                          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                        />
                        <motion.div
                          className="absolute inset-0 rounded-xl -z-10 border-3 border-primary/70"
                          initial={{ scale: 0, opacity: 1 }}
                          animate={{ scale: 2.8, opacity: 0 }}
                          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
                        />
                      </>
                    )}
                    {t(item.label)}
                  </motion.button>
                ))}
              </div>

              {/* Divider */}
              <div className="my-2 border-t border-white/10 dark:border-white/5"></div>

              {/* Group 2 Navigation Items */}
              <div className="space-y-1">
                {navGroup2.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (index + 2) * 0.05 }}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => scrollToSection(item.id)}
                    className={`relative block w-full text-left px-4 py-3 rounded-xl text-base font-semibold transition-all overflow-hidden ${
                      activeSection === item.id
                        ? 'bg-gradient-to-r from-primary/80 to-accent/80 text-white shadow-md'
                        : 'text-muted-foreground hover:text-foreground hover:bg-white/10 dark:hover:bg-white/5'
                    }`}
                  >
                    {/* Wave Ripple Animation */}
                    {activeSection === item.id && (
                      <>
                        <motion.div
                          className="absolute inset-0 rounded-xl -z-10 border-4 border-primary"
                          initial={{ scale: 0, opacity: 1 }}
                          animate={{ scale: 2.8, opacity: 0 }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                        />
                        <motion.div
                          className="absolute inset-0 rounded-xl -z-10 border-4 border-accent"
                          initial={{ scale: 0, opacity: 1 }}
                          animate={{ scale: 2.8, opacity: 0 }}
                          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                        />
                        <motion.div
                          className="absolute inset-0 rounded-xl -z-10 border-3 border-primary/70"
                          initial={{ scale: 0, opacity: 1 }}
                          animate={{ scale: 2.8, opacity: 0 }}
                          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
                        />
                      </>
                    )}
                    {t(item.label)}
                  </motion.button>
                ))}
              </div>

              {/* Divider */}
              <div className="my-2 border-t border-white/10 dark:border-white/5"></div>

              {/* Mobile Controls */}
              <div className="flex gap-2">
                {/* Language Button Mobile */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleLanguage}
                  className="flex-1 px-4 py-3 rounded-xl bg-white/15 dark:bg-white/5 border border-slate-300/30 dark:border-white/10 hover:bg-white/30 dark:hover:bg-white/10 transition-all flex items-center gap-2 justify-center font-semibold text-sm text-foreground"
                >
                  <Globe className="h-4 w-4" />
                  {language.toUpperCase()}
                </motion.button>

                {/* Theme Toggle Mobile */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={cycleTheme}
                  className="flex-1 px-4 py-3 rounded-xl bg-white/15 dark:bg-white/5 border border-slate-300/30 dark:border-white/10 hover:bg-white/30 dark:hover:bg-white/10 transition-all flex items-center gap-2 justify-center font-semibold text-sm text-foreground"
                >
                  <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </motion.nav>
  );
}
