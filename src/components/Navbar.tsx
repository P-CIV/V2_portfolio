import { useState, useEffect, useRef, useCallback } from 'react';
import { Menu, X, Moon, Sun, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';
import { useLanguage } from '../hooks/useLanguage';

const navItems = [
  { id: 'hero', label: { en: 'Home', fr: 'Accueil' } },
  { id: 'about', label: { en: 'About', fr: 'À propos' } },
  { id: 'formations', label: { en: 'Education', fr: 'Formation' } },
  { id: 'certifications', label: { en: 'Certifications', fr: 'Certifications' } },
  { id: 'projects', label: { en: 'Projects', fr: 'Projets' } },
  { id: 'skills', label: { en: 'Skills', fr: 'Compétences' } },
  { id: 'contact', label: { en: 'Contact', fr: 'Contact' } },
];

const allNavItems = [...navItems];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [lensState, setLensState] = useState({ left: 0, width: 0 });
  const navContainerRef = useRef<HTMLDivElement | null>(null);
  const navButtonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const { theme, cycleTheme, isAutoTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const sections = allNavItems
      .map(item => document.getElementById(item.id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        root: null,
        rootMargin: '-30% 0px -45% 0px',
        threshold: [0.2, 0.4, 0.6],
      }
    );

    sections.forEach(section => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    setHoveredItem(null);
    setActiveSection(id);

    requestAnimationFrame(() => {
      const element = document.getElementById(id);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({
          top: elementPosition,
          behavior: 'smooth'
        });
      }
    });
  };

  const getActiveItem = useCallback(() => navItems.find(item => item.id === activeSection)?.id ?? null, [activeSection]);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'fr' : 'en');
  };

  const getThemeLabel = () => {
    if (isAutoTheme) return 'Auto';
    return theme === 'light' ? 'Light' : 'Dark';
  };

  const updateLensPosition = (itemId: string | null) => {
    if (!itemId) return;

    const button = navButtonRefs.current[itemId];
    const container = navContainerRef.current;

    if (!button || !container) return;

    const containerRect = container.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();

    setLensState({
      left: buttonRect.left - containerRect.left,
      width: buttonRect.width,
    });
  };

  const handleHoverNavItem = (itemId: string) => {
    setHoveredItem(itemId);
    if (itemId !== activeSection) {
      updateLensPosition(itemId);
      return;
    }

    updateLensPosition(itemId);
  };

  const clearHoverNavGroup = () => {
    setHoveredItem(null);
    const activeItem = getActiveItem();
    if (activeItem) {
      updateLensPosition(activeItem);
    }
  };

  const syncActiveLens = useCallback(() => {
    const activeItem = hoveredItem && hoveredItem !== activeSection ? hoveredItem : getActiveItem();
    if (activeItem) {
      updateLensPosition(activeItem);
    }
  }, [activeSection, hoveredItem, getActiveItem]);

  useEffect(() => {
    syncActiveLens();
  }, [syncActiveLens]);

  useEffect(() => {
    const handleResize = () => {
      syncActiveLens();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [syncActiveLens]);

  return (
    <nav
      className="absolute inset-x-0 top-0 z-50 transition-all duration-300 bg-transparent"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 md:pt-5">
        <div className="flex items-center justify-center md:justify-center relative h-16 md:h-20 gap-4">
          {/* Navigation Pills - Group 1 & 2 - Centered */}
          <div className="hidden lg:flex items-center gap-2">
            <motion.div 
              ref={navContainerRef}
              className="relative flex items-center bg-white/10 dark:bg-white/5 backdrop-blur-lg rounded-full px-2 py-2.5 border border-white/20 dark:border-white/10 shadow-lg gap-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              onMouseLeave={clearHoverNavGroup}
            >
              <motion.div
                className="absolute inset-y-1 rounded-full border border-[#6DD5C4]/60 bg-gradient-to-r from-[#DFF6F0]/95 via-[#8FE8D9]/90 to-[#6DD5C4]/90 backdrop-blur-3xl shadow-[0_12px_36px_-10px_rgba(109,213,196,0.45),inset_0_1px_0_rgba(255,255,255,0.75)]"
                animate={{
                  left: lensState.left,
                  width: lensState.width,
                  opacity: 1,
                }}
                transition={{ type: 'spring', stiffness: 420, damping: 36 }}
              />
              {navItems.map((item) => {
                const isSelected = item.id === activeSection && (!hoveredItem || hoveredItem === activeSection);
                const isTemporaryHover = hoveredItem === item.id && hoveredItem !== activeSection;

                return (
                  <motion.button
                    key={item.id}
                    ref={(el) => {
                      navButtonRefs.current[item.id] = el;
                    }}
                    onClick={() => scrollToSection(item.id)}
                    onMouseEnter={() => handleHoverNavItem(item.id)}
                    whileHover={{ scale: 1.04, y: -1 }}
                    whileTap={{ scale: 0.94, y: 0 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 24 }}
                    className={`relative z-10 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 overflow-hidden ${
                      isSelected || isTemporaryHover
                        ? 'text-[#0E2625] drop-shadow-[0_0_12px_rgba(255,255,255,0.2)]'
                        : 'text-foreground hover:text-[#DFF6F0]'
                    }`}
                  >
                    {t(item.label)}
                  </motion.button>
                );
              })}
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
                whileHover={{ scale: 1.08 }}
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
                whileHover={{ scale: 1.08 }}
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
              className="lg:hidden p-2 rounded-full bg-[#DFF6F0]/80 dark:bg-[#0F2B2A]/80 border border-[#6DD5C4]/40 dark:border-[#6DD5C4]/30 hover:bg-[#DFF6F0] dark:hover:bg-[#12312f] transition-all text-[#0E2625] dark:text-[#EAFBF7] shadow-[0_8px_20px_rgba(109,213,196,0.18)]"
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
            className="fixed inset-0 z-40 lg:hidden backdrop-blur-sm bg-black/20 dark:bg-black/30"
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
            className="lg:hidden fixed inset-x-0 top-0 z-50 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(223,246,240,0.88))] dark:bg-[linear-gradient(180deg,rgba(7,17,17,0.96),rgba(15,43,42,0.94))] backdrop-blur-xl border-b border-[#6DD5C4]/25 dark:border-[#6DD5C4]/20"
          >
            <div className="px-4 pt-20 pb-4 space-y-3">
              <div className="space-y-1">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.04 }}
                    whileHover={{ x: 4, scale: 1.01 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => scrollToSection(item.id)}
                    className={`relative block w-full text-left px-4 py-3 rounded-xl text-base font-semibold transition-all overflow-hidden ${
                      activeSection === item.id
                        ? 'bg-[linear-gradient(135deg,#DFF6F0,#A8F0E3_35%,#6DD5C4)] text-[#0E2625] shadow-[0_10px_24px_rgba(109,213,196,0.25)]'
                        : 'text-slate-700 dark:text-[#EAFBF7] hover:text-[#0E2625] dark:hover:text-[#DFF6F0] hover:bg-[#DFF6F0]/25 dark:hover:bg-[#6DD5C4]/10'
                    }`}
                  >
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
                  className="flex-1 px-4 py-3 rounded-xl bg-[#DFF6F0]/70 dark:bg-[#0F2B2A]/60 border border-[#6DD5C4]/35 dark:border-[#6DD5C4]/20 hover:bg-[#DFF6F0] dark:hover:bg-[#12312f] transition-all flex items-center gap-2 justify-center font-semibold text-sm text-[#0E2625] dark:text-[#EAFBF7]"
                >
                  <Globe className="h-4 w-4" />
                  {language.toUpperCase()}
                </motion.button>

                {/* Theme Toggle Mobile */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={cycleTheme}
                  className="flex-1 px-4 py-3 rounded-xl bg-[#DFF6F0]/70 dark:bg-[#0F2B2A]/60 border border-[#6DD5C4]/35 dark:border-[#6DD5C4]/20 hover:bg-[#DFF6F0] dark:hover:bg-[#12312f] transition-all flex items-center gap-2 justify-center font-semibold text-sm text-[#0E2625] dark:text-[#EAFBF7]"
                >
                  <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </nav>
  );
}
