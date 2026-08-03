import { motion } from 'framer-motion';
import { ArrowRight, Github, Linkedin, Mail, MapPin, Code } from 'lucide-react';
import { useLanguage } from '../../hooks/useLanguage';
import { portfolioData } from '../../data/portfolio';
import { Button } from '../ui/button';
import { useEffect, useState, useRef } from 'react';

const roles = [
  'Full Stack Developer',
  'AI Innovator',
  'Problem Solver',
  'Code Enthusiast'
];

export default function Hero() {
  const { t } = useLanguage();
  const { personal } = portfolioData;

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [displayedRole, setDisplayedRole] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const typingRef = useRef<number | null>(null);

  useEffect(() => {
    const role = roles[roleIndex];
    
    if (!isDeleting && charIndex < role.length) {
      typingRef.current = window.setTimeout(() => {
        setDisplayedRole(role.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      }, 100);
    } else if (isDeleting && charIndex > 0) {
      typingRef.current = window.setTimeout(() => {
        setDisplayedRole(role.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      }, 80);
    } else if (!isDeleting && charIndex === role.length) {
      typingRef.current = window.setTimeout(() => {
        setIsDeleting(true);
      }, 1500);
    } else if (isDeleting && charIndex === 0) {
      setRoleIndex((prev) => (prev + 1) % roles.length);
      setIsDeleting(false);
    }

    return () => {
      if (typingRef.current !== null) {
        window.clearTimeout(typingRef.current);
      }
    };
  }, [charIndex, isDeleting, roleIndex]);

  useEffect(() => {
    const handleMove = (e: MouseEvent) =>
      setMousePos({ x: e.clientX, y: e.clientY });

    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-24 sm:pt-20"
    >
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-40 transition-all duration-300"
        style={{
          background: `radial-gradient(600px at ${mousePos.x}px ${mousePos.y}px, rgba(99,102,241,0.12), transparent 80%)`
        }}
      />

      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: '1s' }}
        ></div>

        <div className="absolute top-1/3 left-1/4 w-3 h-3 bg-primary/20 rounded-full animate-pulse"></div>
        <div className="absolute top-2/3 right-1/3 w-2 h-2 bg-accent/20 rounded-full animate-bounce"></div>
        <div className="absolute bottom-1/4 left-1/3 w-2.5 h-2.5 bg-pink-500/20 rounded-full animate-pulse"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left order-2 lg:order-1"
          >
            <motion.div variants={itemVariants} className="mb-4">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                {t({
                  en: 'Available for opportunities',
                  fr: 'Disponible pour des opportunités'
                })}
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              {t({ en: 'Hi,', fr: 'Bonjour' })}{' '}
              <motion.span
                animate={{ rotate: [0, 14, -8, 14, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 3 }}
                className="inline-block origin-bottom-right"
              >
                👋
              </motion.span>{' '}
              {t({ en: 'I\'m', fr: 'je suis' })}{' '}
              <span className="bg-gradient-to-r from-[#DFF6F0] via-[#6DD5C4] to-[#6DD5C4] bg-clip-text text-transparent">
                {personal.name}
              </span>
            </motion.h1>

            <motion.div variants={itemVariants} className="mb-8">
              <div className="flex items-center gap-2 text-lg sm:text-xl text-muted-foreground mb-4">
                <span className="inline-block">{displayedRole}</span>
                <span className="inline-block w-1 h-6 bg-primary animate-pulse"></span>
              </div>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                {t(personal.tagline)}
              </p>
            </motion.div>

            {/* Code Mockup */}
            <motion.div 
              variants={itemVariants} 
              className="mb-8 p-4 rounded-lg bg-slate-900 dark:bg-slate-950 text-slate-100 font-mono text-sm max-w-lg mx-auto lg:mx-0 shadow-lg border border-slate-700 overflow-x-auto"
            >
              <div className="flex items-center gap-2 mb-3 text-slate-400 text-xs pb-3 border-b border-slate-700">
                <Code size={14} />
                <span>portfolio.ts</span>
              </div>
              <div className="space-y-1 text-xs sm:text-sm">
                <p><span className="text-pink-400">const</span> <span className="text-cyan-300">developer</span> = {'{'}</p>
                <p className="ml-4"><span className="text-yellow-300">name</span>: <span className="text-green-400">"{personal.name}"</span>,</p>
                <p className="ml-4"><span className="text-yellow-300">role</span>: <span className="text-green-400">"{displayedRole}"</span>,</p>
                <p className="ml-4"><span className="text-yellow-300">skills</span>: <span className="text-blue-400">['AI specialist', 'Full-Stack Development', 'Cloud']</span></p>
                <p>{'}'}</p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <a href="#projects">
                <Button size="lg" className="gap-2">
                  {t({ en: 'View My Work', fr: 'Voir mon travail' })}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </a>
              <a href={`mailto:${personal.email}`}>
                <Button size="lg" variant="outline" className="gap-2">
                  {t({ en: 'Get in Touch', fr: 'Me contacter' })}
                  <Mail className="w-4 h-4" />
                </Button>
              </a>
            </motion.div>

            <motion.div variants={itemVariants} className="flex items-center gap-3 justify-center lg:justify-start text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{t(personal.location)}</span>
            </motion.div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="order-1 lg:order-2"
          >
            <motion.div
              variants={itemVariants}
              className="relative w-80 h-96 mx-auto rounded-2xl overflow-hidden shadow-2xl"
            >
              <img
                src={personal.photo || "/placeholder.svg"}
                alt={personal.name}
                className="w-full h-full object-cover object-top"
              />
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex gap-4 justify-center lg:justify-start mt-12"
        >
          {personal.social.github && (
            <motion.a
              href={personal.social.github}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="icon" variant="outline">
                <Github className="w-5 h-5" />
              </Button>
            </motion.a>
          )}
          {personal.social.linkedin && (
            <motion.a
              href={personal.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="icon" variant="outline">
                <Linkedin className="w-5 h-5" />
              </Button>
            </motion.a>
          )}
          {personal.email && (
            <motion.a
              href={`mailto:${personal.email}`}
              variants={itemVariants}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button size="icon" variant="outline">
                <Mail className="w-5 h-5" />
              </Button>
            </motion.a>
          )}
        </motion.div>
      </div>
    </section>
  );
}
