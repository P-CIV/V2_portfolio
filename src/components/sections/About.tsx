import { motion } from 'framer-motion';
import { useLanguage } from '../../hooks/useLanguage';
import { portfolioData } from '../../data/portfolio';
import { Zap, Brain, Globe } from 'lucide-react';

export default function About() {
  const { t } = useLanguage();
  const { about } = portfolioData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="about" className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              {t({ en: 'About Me', fr: 'À Propos' })}
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              {t({ en: 'Creative Developer &', fr: 'Développeur Créatif &' })}{' '}
              <span className="bg-gradient-to-r from-[#DFF6F0] via-[#6DD5C4] to-[#6DD5C4] bg-clip-text text-transparent">
                {t({ en: 'Problem Solver', fr: 'Résolveur de Problèmes' })}
              </span>
            </h2>
          </motion.div>

          {/* Grille Contenu */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Contenu Texte */}
            <motion.div variants={itemVariants}>
              <div className="space-y-6 text-muted-foreground text-lg leading-relaxed">
                <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-primary first-letter:mr-2 first-letter:float-left">
                  {t(about)}
                </p>

                {/* Points Clés */}
                <div className="mt-8 space-y-4">
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
                    <Zap className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-base">
                      {t({
                        en: 'Building innovative digital solutions that drive business growth and empower communities',
                        fr: 'Construire des solutions numériques innovantes qui stimulent la croissance et autonomisent les communautés'
                      })}
                    </p>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
                    <Brain className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-base">
                      {t({
                        en: 'Passionate about Artificial Intelligence and how it can solve real-world problems',
                        fr: 'Passionné par l\'Intelligence Artificielle et comment elle peut résoudre des problèmes concrets'
                      })}
                    </p>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors">
                    <Globe className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-base">
                      {t({
                        en: 'Committed to bridging the digital divide through accessible technology',
                        fr: "Engagé à combler le fossé numérique grâce à une technologie accessible"
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Élément Visuel */}
            <motion.div variants={itemVariants} className="relative">
              <div className="relative aspect-square max-w-md mx-auto">
                {/* Rotating circles */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0"
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#6DD5C4] rounded-full"></div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#DFF6F0] rounded-full"></div>
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-[#8FE8D9] rounded-full"></div>
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-[#BDEFE6] rounded-full"></div>
                </motion.div>

                {/* Center content */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-[#DFF6F0]/80 to-[#6DD5C4]/30 flex items-center justify-center mb-4"
                    >
                      <Brain className="w-16 h-16 text-primary" />
                    </motion.div>
                    <p className="font-display text-2xl font-bold">
                      {t({ en: 'AI specialist & Full-Stack', fr: 'IA & Développeur Web-Mobile' })}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
