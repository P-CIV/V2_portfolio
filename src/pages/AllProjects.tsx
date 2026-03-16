import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { portfolioData } from '../data/portfolio';
import { ArrowLeft, Github, ExternalLink, X } from 'lucide-react';
import { useState } from 'react';

function isValidUrl(urlString: string | undefined): urlString is string {
  if (!urlString) return false;
  try {
    const url = new URL(urlString);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

function getTechBadgeColor(tech: string): string {
  const techColors: Record<string, string> = {
    'React': 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-600/10 dark:text-blue-400 dark:border-blue-600/30',
    'React Native': 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-600/10 dark:text-blue-400 dark:border-blue-600/30',
    'Vue.js': 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-600/10 dark:text-emerald-400 dark:border-emerald-600/30',
    'TypeScript': 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-600/10 dark:text-yellow-400 dark:border-yellow-600/30',
    'JavaScript': 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-600/10 dark:text-yellow-400 dark:border-yellow-600/30',
    'Tailwind CSS': 'bg-cyan-100 text-cyan-700 border-cyan-200 dark:bg-cyan-600/10 dark:text-cyan-400 dark:border-cyan-600/30',
    'HTML/CSS': 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-600/10 dark:text-orange-400 dark:border-orange-600/30',
    'HTML5': 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-600/10 dark:text-orange-400 dark:border-orange-600/30',
    'HTML': 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-600/10 dark:text-orange-400 dark:border-orange-600/30',
    'CSS3': 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-600/10 dark:text-blue-400 dark:border-blue-600/30',
    'CSS': 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-600/10 dark:text-blue-400 dark:border-blue-600/30',
    'Responsive Design': 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-600/10 dark:text-purple-400 dark:border-purple-600/30',
    'UX/UI Design': 'bg-pink-100 text-pink-700 border-pink-200 dark:bg-pink-600/10 dark:text-pink-400 dark:border-pink-600/30',
    'UX/UI': 'bg-pink-100 text-pink-700 border-pink-200 dark:bg-pink-600/10 dark:text-pink-400 dark:border-pink-600/30',
    'Figma': 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-600/10 dark:text-purple-400 dark:border-purple-600/30',
    'Node.js': 'bg-green-100 text-green-700 border-green-200 dark:bg-green-600/10 dark:text-green-400 dark:border-green-600/30',
    'Express.js': 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-600/10 dark:text-gray-400 dark:border-gray-600/30',
    'Express': 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-600/10 dark:text-gray-400 dark:border-gray-600/30',
    'Python': 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-600/10 dark:text-blue-400 dark:border-blue-600/30',
    'PostgreSQL': 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-600/10 dark:text-blue-400 dark:border-blue-600/30',
    'MongoDB': 'bg-green-100 text-green-700 border-green-200 dark:bg-green-600/10 dark:text-green-400 dark:border-green-600/30',
    'MySQL': 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-600/10 dark:text-blue-400 dark:border-blue-600/30',
    'SQL': 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-600/10 dark:text-blue-400 dark:border-blue-600/30',
    'REST APIs': 'bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-600/10 dark:text-indigo-400 dark:border-indigo-600/30',
    'REST API': 'bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-600/10 dark:text-indigo-400 dark:border-indigo-600/30',
    'GraphQL': 'bg-pink-100 text-pink-700 border-pink-200 dark:bg-pink-600/10 dark:text-pink-400 dark:border-pink-600/30',
    'Firebase': 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-600/10 dark:text-orange-400 dark:border-orange-600/30',
    'Git': 'bg-red-100 text-red-700 border-red-200 dark:bg-red-600/10 dark:text-red-400 dark:border-red-600/30',
    'GitHub': 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-600/10 dark:text-gray-400 dark:border-gray-600/30',
    'Docker': 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-600/10 dark:text-blue-400 dark:border-blue-600/30',
    'Linux': 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-600/10 dark:text-orange-400 dark:border-orange-600/30',
    'AWS': 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-600/10 dark:text-orange-400 dark:border-orange-600/30',
    'npm': 'bg-red-100 text-red-700 border-red-200 dark:bg-red-600/10 dark:text-red-400 dark:border-red-600/30',
    'Vite': 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-600/10 dark:text-purple-400 dark:border-purple-600/30',
    'Pandas': 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-600/10 dark:text-blue-400 dark:border-blue-600/30',
    'Matplotlib': 'bg-red-100 text-red-700 border-red-200 dark:bg-red-600/10 dark:text-red-400 dark:border-red-600/30',
    'CI/CD': 'bg-red-100 text-red-700 border-red-200 dark:bg-red-600/10 dark:text-red-400 dark:border-red-600/30',
    'Kotlin': 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-600/10 dark:text-purple-400 dark:border-purple-600/30',
    'Framer Motion': 'bg-pink-100 text-pink-700 border-pink-200 dark:bg-pink-600/10 dark:text-pink-400 dark:border-pink-600/30',
    'Material Design': 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-600/10 dark:text-blue-400 dark:border-blue-600/30',
    'react-qr-code': 'bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-600/10 dark:text-indigo-400 dark:border-indigo-600/30',
    'Green-tech': 'bg-green-100 text-green-700 border-green-200 dark:bg-green-600/10 dark:text-green-400 dark:border-green-600/30',
    'SendGrid': 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-600/10 dark:text-blue-400 dark:border-blue-600/30',
    'Swift': 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-600/10 dark:text-orange-400 dark:border-orange-600/30',
    'AZURE': 'bg-red-100 text-red-700 border-red-200 dark:bg-red-600/10 dark:text-red-400 dark:border-red-600/30',
    'Numpy': 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-600/10 dark:text-blue-400 dark:border-blue-600/30',
    'LLMs': 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-600/10 dark:text-orange-400 dark:border-orange-600/30',
    'NLP': 'bg-red-100 text-red-700 border-red-200 dark:bg-red-600/10 dark:text-red-400 dark:border-red-600/30',
    'Deep Learning': 'bg-pink-100 text-pink-700 border-pink-200 dark:bg-pink-600/10 dark:text-pink-400 dark:border-pink-600/30',
    'ML': 'bg-red-100 text-red-700 border-red-200 dark:bg-red-600/10 dark:text-red-400 dark:border-red-600/30',
    'SKLEARN': 'bg-green-100 text-green-700 border-green-200 dark:bg-green-600/10 dark:text-green-400 dark:border-green-600/30',
    'Streamlit': 'bg-red-100 text-red-700 border-red-200 dark:bg-red-600/10 dark:text-red-400 dark:border-red-600/30',
    'PyTorch': 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-600/10 dark:text-orange-400 dark:border-orange-600/30',
    'CamemBERT': 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-600/10 dark:text-purple-400 dark:border-purple-600/30',
    'Hugging Face': 'bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-600/10 dark:text-yellow-400 dark:border-yellow-600/30',
    'Scikit-learn': 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-600/10 dark:text-orange-400 dark:border-orange-600/30',
    'Mistral-7B': 'bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-600/10 dark:text-indigo-400 dark:border-indigo-600/30',
    'OpenAI SDK': 'bg-green-100 text-green-700 border-green-200 dark:bg-green-600/10 dark:text-green-400 dark:border-green-600/30',
  };
  return techColors[tech] || 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-600/10 dark:text-gray-400 dark:border-gray-600/30';
}

export default function AllProjects() {
  const { t } = useLanguage();
  const { projects } = portfolioData;
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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

  const handleBack = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-background py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-primary hover:opacity-80 transition-opacity mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            {t({ en: 'Back', fr: 'Retour' })}
          </button>

          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
            {t({ en: 'All Projects', fr: 'Tous les Projets' })}
          </h1>

          <p className="text-muted-foreground text-lg max-w-2xl">
            {t({
              en: 'A complete collection of all my projects, showcasing my expertise across different technologies.',
              fr: 'Une collection complète de tous mes projets, mettant en avant mon expertise dans différentes technologies.'
            })}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative overflow-hidden rounded-2xl border border-border bg-card hover:border-primary/50 transition-all duration-300 hover:shadow-xl"
            >
              {project.image && (
                <div 
                  className="relative aspect-video overflow-hidden bg-muted cursor-pointer"
                  onClick={() => setSelectedImage(project.image ?? null)}
                >
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                    <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-sm font-medium bg-black/50 px-4 py-2 rounded-lg">
                      {t({ en: 'Click to enlarge', fr: 'Cliquez pour agrandir' })}
                    </div>
                  </div>
                </div>
              )}

              {/* Contenu */}
              <div className="p-6">
                <h3 className="text-2xl font-display font-bold mb-3 group-hover:text-primary transition-colors">
                  {project.name}
                </h3>

                <p className="text-muted-foreground mb-4">
                  {t(project.description)}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.slice(0, 3).map((tech, i) => (
                    <span
                      key={i}
                      className={`px-3 py-1 text-xs rounded-full font-medium border ${getTechBadgeColor(tech)}`}
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 3 && (
                    <span className={`px-3 py-1 text-xs rounded-full font-medium border ${getTechBadgeColor('REST APIs')}`}>
                      +{project.technologies.length - 3}
                    </span>
                  )}
                </div>

                {/* Liens */}
                <div className="flex gap-3">
                  {isValidUrl(project.github) && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary hover:opacity-80 transition-opacity"
                    >
                      <Github className="w-5 h-5" />
                      {t({ en: 'Code', fr: 'Code' })}
                    </a>
                  )}
                  {isValidUrl(project.link) && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary hover:opacity-80 transition-opacity"
                    >
                      <ExternalLink className="w-5 h-5" />
                      {t({ en: 'Live', fr: 'Voir' })}
                    </a>
                  )}
                </div>
              </div>

              {project.featured && (
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></span>
                    {t({ en: 'Featured', fr: 'Vedette' })}
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="relative max-w-4xl max-h-[90vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt="Enlarged project"
              className="w-full h-full object-contain rounded-lg"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-background/90 hover:bg-background p-2 rounded-full transition-colors z-60"
            >
              <X className="w-6 h-6" />
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
