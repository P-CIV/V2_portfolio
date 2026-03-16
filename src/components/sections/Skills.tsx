import { motion } from 'framer-motion';
import { useLanguage } from '../../hooks/useLanguage';
import { portfolioData } from '../../data/portfolio';
import { useState } from 'react';
import { Code2, Database, Wrench, Briefcase } from 'lucide-react';

export default function Skills() {
  const { t } = useLanguage();
  const { skills } = portfolioData;
  const [hoveredCategory, setHoveredCategory] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const categoryIcons = [Code2, Database, Wrench, Briefcase];

  const categoryColors = [
    { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-600', hover: 'hover:border-purple-500' },
    { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-600', hover: 'hover:border-blue-500' },
    { bg: 'bg-pink-500/10', border: 'border-pink-500/30', text: 'text-pink-600', hover: 'hover:border-pink-500' },
    { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-600', hover: 'hover:border-cyan-500' },
  ];

  const getTechColor = (tech: string): string => {
    const techColors: Record<string, string> = {
      'React': 'bg-blue-100 text-blue-700 border-blue-200',
      'React Native': 'bg-blue-100 text-blue-700 border-blue-200',
      'Vue.js': 'bg-emerald-100 text-emerald-700 border-emerald-200',
      'TypeScript': 'bg-yellow-100 text-yellow-700 border-yellow-200',
      'JavaScript': 'bg-yellow-100 text-yellow-700 border-yellow-200',
      'Tailwind CSS': 'bg-cyan-100 text-cyan-700 border-cyan-200',
      'HTML/CSS': 'bg-orange-100 text-orange-700 border-orange-200',
      'HTML5': 'bg-orange-100 text-orange-700 border-orange-200',
      'CSS3': 'bg-blue-100 text-blue-700 border-blue-200',
      'Responsive Design': 'bg-purple-100 text-purple-700 border-purple-200',
      'UX/UI Design': 'bg-pink-100 text-pink-700 border-pink-200',
      'UX/UI': 'bg-pink-100 text-pink-700 border-pink-200',
      'Figma': 'bg-purple-100 text-purple-700 border-purple-200',
      'Node.js': 'bg-green-100 text-green-700 border-green-200',
      'Express.js': 'bg-gray-100 text-gray-700 border-gray-200',
      'Python': 'bg-blue-100 text-blue-700 border-blue-200',
      'PostgreSQL': 'bg-blue-100 text-blue-700 border-blue-200',
      'MongoDB': 'bg-green-100 text-green-700 border-green-200',
      'MySQL': 'bg-blue-100 text-blue-700 border-blue-200',
      'SQL': 'bg-blue-100 text-blue-700 border-blue-200',
      'REST APIs': 'bg-indigo-100 text-indigo-700 border-indigo-200',
      'GraphQL': 'bg-pink-100 text-pink-700 border-pink-200',
      'Firebase': 'bg-orange-100 text-orange-700 border-orange-200',
      'Git': 'bg-red-100 text-red-700 border-red-200',
      'GitHub': 'bg-gray-100 text-gray-700 border-gray-200',
      'Docker': 'bg-blue-100 text-blue-700 border-blue-200',
      'Linux': 'bg-orange-100 text-orange-700 border-orange-200',
      'AWS': 'bg-orange-100 text-orange-700 border-orange-200',
      'npm': 'bg-red-100 text-red-700 border-red-200',
      'Vite': 'bg-purple-100 text-purple-700 border-purple-200',
      'Webpack': 'bg-blue-100 text-blue-700 border-blue-200',
      'Jest': 'bg-red-100 text-red-700 border-red-200',
      'CI/CD': 'bg-red-100 text-red-700 border-red-200',
      'Kotlin': 'bg-purple-100 text-purple-700 border-purple-200',
      'Problem Solving': 'bg-indigo-100 text-indigo-700 border-indigo-200',
      'Team Collaboration': 'bg-teal-100 text-teal-700 border-teal-200',
      'Agile/Scrum': 'bg-blue-100 text-blue-700 border-blue-200',
      'HTML': 'bg-orange-100 text-orange-700 border-orange-200',
      'CSS': 'bg-blue-100 text-blue-700 border-blue-200',
      'Express': 'bg-gray-100 text-gray-700 border-gray-200',
      'REST API': 'bg-indigo-100 text-indigo-700 border-indigo-200',
      'SendGrid': 'bg-blue-100 text-blue-700 border-blue-200',
      'Swift': 'bg-orange-100 text-orange-700 border-orange-200',
      'Code Review': 'bg-purple-100 text-purple-700 border-purple-200',
      'Testing': 'bg-green-100 text-green-700 border-green-200',
      'Documentation': 'bg-yellow-100 text-yellow-700 border-yellow-200',
      'Material Design': 'bg-blue-100 text-blue-700 border-blue-200',
      'react-qr-code': 'bg-indigo-100 text-indigo-700 border-indigo-200',
      'Green-tech': 'bg-green-100 text-green-700 border-green-200',
      'Streamlit': 'bg-red-100 text-red-700 border-red-200 dark:bg-red-600/10 dark:text-red-400 dark:border-red-600/30',
      'PyTorch': 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-600/10 dark:text-orange-400 dark:border-orange-600/30',
      'CamemBERT': 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-600/10 dark:text-purple-400 dark:border-purple-600/30',
      'Hugging Face': 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-600/10 dark:text-yellow-400 dark:border-yellow-600/30',
      'Scikit-learn': 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-600/10 dark:text-orange-400 dark:border-orange-600/30',
      'Mistral-7B': 'bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-600/10 dark:text-indigo-400 dark:border-indigo-600/30',
      'OpenAI SDK': 'bg-green-100 text-green-700 border-green-200 dark:bg-green-600/10 dark:text-green-400 dark:border-green-600/30',
    };
    return techColors[tech] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  return (
    <section id="skills" className="py-20 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          {/* Titre Section */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              {t({ en: 'Skills & Expertise', fr: 'Compétences & Expertise' })}
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              {t({ en: 'My', fr: 'Mes' })}{' '}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {t({ en: 'Toolbox', fr: 'Compétences' })}
              </span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              {t({
                en: 'A comprehensive set of technologies and tools I use to bring ideas to life',
                fr: "Un ensemble complet de technologies et d'outils que j'utilise pour donner vie aux idées"
              })}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {skills.categories.map((category, categoryIndex) => {
              const Icon = categoryIcons[categoryIndex % categoryIcons.length];
              const colors = categoryColors[categoryIndex % categoryColors.length];
              const isHovered = hoveredCategory === categoryIndex;

              return (
                <motion.div
                  key={categoryIndex}
                  variants={itemVariants}
                  onHoverStart={() => setHoveredCategory(categoryIndex)}
                  onHoverEnd={() => setHoveredCategory(null)}
                  className={`group relative overflow-hidden rounded-3xl border-2 ${colors.border} ${colors.hover} transition-all duration-300 ${
                    isHovered ? 'shadow-2xl scale-[1.02]' : ''
                  }`}
                >
                  <div className={`absolute inset-0 ${colors.bg} opacity-50 group-hover:opacity-70 transition-opacity`}></div>

                  <div className="relative p-8 md:p-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center`}>
                        <Icon className={`w-6 h-6 ${colors.text}`} />
                      </div>
                      <h3 className="font-display text-2xl font-bold">
                        {t(category.name)}
                      </h3>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {category.skills.map((skill, skillIndex) => (
                        <motion.div
                          key={skillIndex}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: skillIndex * 0.05, type: 'spring', stiffness: 200 }}
                          whileHover={{ scale: 1.05, y: -2 }}
                          className={`px-4 py-2 rounded-full border-2 font-medium text-sm transition-all duration-300 cursor-default ${getTechColor(skill)}`}
                        >
                          {skill}
                        </motion.div>
                      ))}
                    </div>

                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-blue-600"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                      style={{ originX: 0 }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
