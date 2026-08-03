import { motion } from 'framer-motion';
import { useLanguage } from '../../hooks/useLanguage';
import { portfolioData } from '../../data/portfolio';
import { Github, Linkedin, Mail, Send, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';

export default function Contact() {
  const { t } = useLanguage();
  const { contact, personal } = portfolioData;

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const contactMethods = [
    {
      icon: Mail,
      label: { en: 'Email', fr: 'Email' },
      value: personal.email,
      href: `mailto:${personal.email}`,
      color: 'text-[#0E2625] dark:text-[#EAFBF7]',
      bg: 'bg-[#DFF6F0]/80 dark:bg-[#0F2B2A]/30',
    },
    {
      icon: Github,
      label: { en: 'GitHub', fr: 'GitHub' },
      value: 'P-CIV',
      href: personal.social.github || '#',
      color: 'text-[#0E2625] dark:text-[#EAFBF7]',
      bg: 'bg-[#DFF6F0]/80 dark:bg-[#0F2B2A]/30',
    },
    {
      icon: Linkedin,
      label: { en: 'LinkedIn', fr: 'LinkedIn' },
      value: 'Pascal Kambou',
      href: personal.social.linkedin || '#',
      color: 'text-[#0E2625] dark:text-[#EAFBF7]',
      bg: 'bg-[#DFF6F0]/80 dark:bg-[#0F2B2A]/30',
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: personal.social.github,
      color: 'hover:text-[#0E2625] dark:hover:text-[#EAFBF7]',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: personal.social.linkedin,
      color: 'hover:text-[#0E2625] dark:hover:text-[#EAFBF7]',
    },
  ].filter(link => link.href);

  return (
    <section id="contact" className="py-16 md:py-24 relative overflow-hidden bg-muted/30">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#6DD5C4]/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#DFF6F0]/80 rounded-full blur-3xl" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants} className="text-center mb-16">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              {t({ en: "Let's Connect", fr: 'Restons Connectés' })}
            </span>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              {t(contact.title)}
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              {t(contact.description)}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {contactMethods.map((method, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group"
              >
                <a
                  href={method.href}
                  target={method.href.startsWith('http') ? '_blank' : undefined}
                  rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="block p-8 rounded-2xl border-2 border-border hover:border-primary/50 bg-background transition-all duration-300 hover:shadow-xl h-full min-w-0"
                >
                  <div className="flex flex-col h-full min-w-0">
                    <div className={`w-14 h-14 rounded-xl ${method.bg} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform mb-4`}>
                      <method.icon className={`w-7 h-7 ${method.color}`} />
                    </div>
                    <h3 className="font-display text-xl font-bold mb-2">
                      {t(method.label)}
                    </h3>
                    <p className="text-muted-foreground group-hover:text-foreground transition-colors mb-4 flex-grow min-w-0 break-words whitespace-normal">
                      {method.value}
                    </p>
                    <div className="flex items-center text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-sm font-medium">
                        {t({ en: 'Get in touch', fr: 'Me Contacter' })}
                      </span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={itemVariants}
            className="relative overflow-hidden rounded-3xl border-2 border-primary/20 bg-gradient-to-br from-[#DFF6F0]/80 via-background to-[#6DD5C4]/10 p-8 md:p-12 text-center mb-12"
          >
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
                <Send className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">
                {t({
                  en: 'Prefer Direct Contact?',
                  fr: 'Préférez le Contact Direct?'
                })}
              </h3>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed text-base">
                {t({
                  en: "Feel free to reach out to me via email or any of my social media channels. I'll get back to you as soon as possible.",
                  fr: "N'hésitez pas à me contacter par email ou sur les réseaux sociaux. Je vous répondrai dès que possible."
                })}
              </p>
              <Button size="lg" asChild className="group">
                <a href={`mailto:${personal.email}`} className='flex items-center'>
                  {t({ en: 'Send me an email', fr: 'Envoyez-moi un email' })}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </div>

            <div className="absolute top-0 right-0 w-64 h-64 bg-[#6DD5C4]/20 rounded-full blur-3xl -z-0"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#DFF6F0]/60 rounded-full blur-3xl -z-0"></div>
          </motion.div>

          {socialLinks.length > 0 && (
            <motion.div variants={itemVariants} className="text-center">
              <p className="text-sm text-muted-foreground mb-4">
                {t({ en: 'Or connect with me on', fr: 'Ou connectez-vous avec moi sur' })}
              </p>
              <div className="flex justify-center gap-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1, y: -2 }}
                    className={`w-12 h-12 rounded-full border-2 border-border flex items-center justify-center transition-all ${social.color} hover:border-current`}
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
