import { motion } from 'framer-motion';
import { useLanguage } from '../../hooks/useLanguage';
import { portfolioData } from '../../data/portfolio';
import { Badge } from '../ui/badge';
import { Github, ArrowUpRight, ArrowRight } from 'lucide-react';
import type { Variants } from 'framer-motion';

interface ProjectCardProps {
  project: typeof portfolioData.projects[number];
  index: number;
  variants: Variants;
}

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
    'CSS3': 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-600/10 dark:text-blue-400 dark:border-blue-600/30',
    'Responsive Design': 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-600/10 dark:text-purple-400 dark:border-purple-600/30',
    'UX/UI Design': 'bg-pink-100 text-pink-700 border-pink-200 dark:bg-pink-600/10 dark:text-pink-400 dark:border-pink-600/30',
    'UX/UI': 'bg-pink-100 text-pink-700 border-pink-200 dark:bg-pink-600/10 dark:text-pink-400 dark:border-pink-600/30',
    'Figma': 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-600/10 dark:text-purple-400 dark:border-purple-600/30',
    'Node.js': 'bg-green-100 text-green-700 border-green-200 dark:bg-green-600/10 dark:text-green-400 dark:border-green-600/30',
    'Express.js': 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-600/10 dark:text-gray-400 dark:border-gray-600/30',
    'Python': 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-600/10 dark:text-blue-400 dark:border-blue-600/30',
    'PostgreSQL': 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-600/10 dark:text-blue-400 dark:border-blue-600/30',
    'MongoDB': 'bg-green-100 text-green-700 border-green-200 dark:bg-green-600/10 dark:text-green-400 dark:border-green-600/30',
    'MySQL': 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-600/10 dark:text-blue-400 dark:border-blue-600/30',
    'SQL': 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-600/10 dark:text-blue-400 dark:border-blue-600/30',
    'REST APIs': 'bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-600/10 dark:text-indigo-400 dark:border-indigo-600/30',
    'GraphQL': 'bg-pink-100 text-pink-700 border-pink-200 dark:bg-pink-600/10 dark:text-pink-400 dark:border-pink-600/30',
    'Firebase': 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-600/10 dark:text-orange-400 dark:border-orange-600/30',
    'Git': 'bg-red-100 text-red-700 border-red-200 dark:bg-red-600/10 dark:text-red-400 dark:border-red-600/30',
    'GitHub': 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-600/10 dark:text-gray-400 dark:border-gray-600/30',
    'Docker': 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-600/10 dark:text-blue-400 dark:border-blue-600/30',
    'Linux': 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-600/10 dark:text-orange-400 dark:border-orange-600/30',
    'AWS': 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-600/10 dark:text-orange-400 dark:border-orange-600/30',
    'npm': 'bg-red-100 text-red-700 border-red-200 dark:bg-red-600/10 dark:text-red-400 dark:border-red-600/30',
    'Vite': 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-600/10 dark:text-purple-400 dark:border-purple-600/30',
    'Webpack': 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-600/10 dark:text-blue-400 dark:border-blue-600/30',
    'Jest': 'bg-red-100 text-red-700 border-red-200 dark:bg-red-600/10 dark:text-red-400 dark:border-red-600/30',
    'HTML': 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-600/10 dark:text-orange-400 dark:border-orange-600/30',
    'CSS': 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-600/10 dark:text-blue-400 dark:border-blue-600/30',
    'Express': 'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-600/10 dark:text-gray-400 dark:border-gray-600/30',
    'REST API': 'bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-600/10 dark:text-indigo-400 dark:border-indigo-600/30',
    'SendGrid': 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-600/10 dark:text-blue-400 dark:border-blue-600/30',
    'Swift': 'bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-600/10 dark:text-orange-400 dark:border-orange-600/30',
    'CI/CD': 'bg-red-100 text-red-700 border-red-200 dark:bg-red-600/10 dark:text-red-400 dark:border-red-600/30',
    'Kotlin': 'bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-600/10 dark:text-purple-400 dark:border-purple-600/30',
    'Framer Motion': 'bg-pink-100 text-pink-700 border-pink-200 dark:bg-pink-600/10 dark:text-pink-400 dark:border-pink-600/30',
    'Material Design': 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-600/10 dark:text-blue-400 dark:border-blue-600/30',
    'react-qr-code': 'bg-indigo-100 text-indigo-700 border-indigo-200 dark:bg-indigo-600/10 dark:text-indigo-400 dark:border-indigo-600/30',
    'Green-tech': 'bg-green-100 text-green-700 border-green-200 dark:bg-green-600/10 dark:text-green-400 dark:border-green-600/30',
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

function ProjectCard({ project, index, variants }: ProjectCardProps) {
  const { t } = useLanguage();

  return (
    <motion.article
      variants={variants}
      whileHover={{ y: -5 }}
      className="group relative w-full"
    >
      <div className="flex flex-col md:flex-row h-full rounded-2xl overflow-hidden bg-card shadow-lg dark:shadow-xl dark:shadow-primary/5 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 border border-border/50 hover:border-primary/50">
        <div className="relative w-full md:w-1/3 aspect-video overflow-hidden">
          {project.image ? (
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-muted">
              <span className="font-display text-4xl font-bold text-gray-400 dark:text-gray-600">
                {project.name.substring(0, 1)}
              </span>
            </div>
          )}

          <div className="absolute top-4 left-4 z-10">
            <span className="font-display text-4xl font-bold text-background/80 dark:text-foreground/20">
              {String(index + 1).padStart(2, '0')}
            </span>
          </div>
        </div>

        <div className="p-6 md:p-8 w-full md:w-2/3 flex flex-col justify-between flex-grow">
          {/* Le header */}
          <div>
            {project.featured && (
              <div className="inline-flex items-center gap-2 w-fit px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-3">
                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></span>
                {t({ en: 'Featured Project', fr: 'Projet Vedette' })}
              </div>
            )}

            <h3 className="font-display text-3xl font-bold mb-3 group-hover:text-primary transition-colors">
              {project.name}
            </h3>

            <p className="text-muted-foreground text-base leading-relaxed mb-4">
              {t(project.description)}
            </p>
          </div>

          <div className="mt-4">
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.map((tech: string) => (
                <Badge
                  key={tech}
                  className={`text-xs font-medium ${getTechBadgeColor(tech)} border`}
                >
                  {tech}
                </Badge>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              {isValidUrl(project.link) && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:opacity-80 transition-opacity"
                >
                  <span>{t({ en: 'View Project', fr: 'Voir le Projet' })}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              )}

              {isValidUrl(project.github) && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>{t({ en: 'Code', fr: 'Code' })}</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  const { t } = useLanguage();
  const { projects } = portfolioData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <section id="projects" className="py-20 md:py-32 relative overflow-hidden">
      {/* La décoration pour l'Arrière-plan */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          {/* Titre Section */}
          <motion.div variants={itemVariants} className="mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              {t({ en: 'My Work', fr: 'Mes Réalisations' })}
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              {t({ en: 'Featured', fr: 'Projets' })}{' '}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                {t({ en: 'Projects', fr: 'Vedettes' })}
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl">
              {t({
                en: 'A selection of my recent projects showcasing my skills',
                fr: 'Une sélection de mes projets récents mettant en avant mes compétences'
              })}
            </p>
          </motion.div>

          {/* Grille pour les Projets */}
          <div className="space-y-8">
            {projects.slice(0, 3).map((project, index) => (
              <ProjectCard
                key={project.name}
                project={project}
                index={index}
                variants={itemVariants}
              />
            ))}
          </div>

          {/* Bouton Voir Tous */}
          <motion.div variants={itemVariants} className="text-center mt-16">
            <a
              href="/all-projects"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105 group"
            >
              {t({ en: 'View All Projects', fr: 'Voir Tous mes Projets' })}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
