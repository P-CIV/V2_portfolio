export interface PortfolioData {
  personal: {
    name: string;
    photo?: string;
    title: {
      en: string;
      fr: string;
    };
    tagline: {
      en: string;
      fr: string;
    };
    email: string;
    phone?: string;
    location: {
      en: string;
      fr: string;
    };
    social: {
      github?: string;
      linkedin?: string;
      twitter?: string;
      website?: string;
    };
  };
  about: {
    en: string;
    fr: string;
  };
  experiences: Array<{
    company: string;
    position: {
      en: string;
      fr: string;
    };
    period: {
      en: string;
      fr: string;
    };
    description: {
      en: string;
      fr: string;
    };
    technologies: string[];
  }>;
  projects: Array<{
    name: string;
    description: {
      en: string;
      fr: string;
    };
    technologies: string[];
    link?: string;
    github?: string;
    image?: string;
    featured?: boolean;
  }>;
  skills: {
    categories: Array<{
      name: {
        en: string;
        fr: string;
      };
      skills: string[];
    }>;
  };
  contact: {
    title: {
      en: string;
      fr: string;
    };
    description: {
      en: string;
      fr: string;
    };
  };
  formations: Array<{
    title: {
      en: string;
      fr: string;
    };
    school: string;
    period: {
      en: string;
      fr: string;
    };
    description: {
      en: string;
      fr: string;
    };
  }>;
  certifications: Array<{
    id: number;
    title: string;
    issuer: string;
    date: string;
    description: {
      en: string;
      fr: string;
    };
    skills: string[];
    image: string;
  }>;
}

export const portfolioData: PortfolioData = {
  personal: {
    name: "Pascal Kambou",
    photo: "/pascal-kambou.png",
    title: {
      en: "Full-Stack Developer",
      fr: "Développeur Full-Stack"
    },
    tagline: {
      en: "Building innovative digital solutions with modern technologies",
      fr: "Créer des solutions numériques innovantes avec les technologies modernes"
    },
    email: "pascalkambou200@gmail.com",
    location: {
      en: "Abidjan, Côte d'Ivoire",
      fr: "Abidjan, Côte d'Ivoire"
    },
    social: {
      github: "https://github.com/P-CIV",
      linkedin: "https://www.linkedin.com/in/pascal-kambou-37ab182b6?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      twitter: "https://twitter.com/PascalKambou"
    }
  },
  
  about: {
    en: "I'm a Full-Stack developer and passionate learner based in Abidjan, Côte d'Ivoire. Currently a student in Application Development and E-Services at UVCI, I'm dedicated to building innovative web and mobile solutions. I'm driven by a genuine interest in Artificial Intelligence and how it can solve real-world problems and create meaningful impact for businesses and communities.",
    fr: "Je suis un développeur Full-Stack et apprenant passionné basé à Abidjan, Côte d'Ivoire. Actuellement étudiant en Développement d'Applications et E-Services à l'UVCI, je suis dédié à la création de solutions web et mobile innovantes. Je suis motivé par un intérêt sincère pour l'Intelligence Artificielle et comment elle peut résoudre des problèmes concrets et créer un impact significatif pour les entreprises et les communautés."
  },

  experiences: [
    
    
  ],

  projects: [
    {
      name: "Portfolio Website",
      description: {
        en: "A fully interactive portfolio with a bilingual interface, smooth animations and dark/light theme toggle.",
        fr: "Un portfolio entièrement interactif, qui dispose d'une interface bilingue, d'animations fluides et d'un basculement de thème sombre/clair."
      },
      technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
      link: "https://pascalkambou.vercel.app",
      featured: true,
      github: "https://github.com/P-CIV",
      image: "/projects/portfolio.png"
    },
    {
      name: "Ecocycle - Prototype",
      description: {
        en: "An innovative mobile application that educates users about recycling while simplifying waste management. It aims to promote a sustainable lifestyle through an engaging and educational user experience.",
        fr: "EcoCycle est une application mobile innovante qui sensibilise les utilisateurs au recyclage tout en simplifiant la gestion de leurs déchets. Son objectif est de promouvoir un mode de vie durable grâce à une expérience utilisateur engageante et éducative."
      },
      technologies: ["Figma", "UX/UI", "Material Design"],
      link: "https://www.figma.com/design/TmulhhBeNy7ZKCIzFPhDOc/Untitled?node-id=490-3335&t=MKLeFqMnK1HegeQ1-1",
      featured: true,
      github: "https://github.com/P-CIV/Mon_Portfolio",
      image: "/projects/ecocycle-ci.png"
    },
   {
      name: "Ecocycle",
      description: {
        en: "A comprehensive web application designed for agents and administrators. It enables management of recycling operations, tracking user performance, and real-time analysis of environmental data.",
        fr: "Ecocycle est conçue pour les agents et les administrateurs. Elle permet de gérer les opérations liées au recyclage, de suivre les performances des utilisateurs et d'analyser les données environnementales en temps réel."
      },
      technologies: ["React", "TypeScript", "Tailwind CSS", "react-qr-code"],
      link: "https://ecocycle-ci.vercel.app/",
      featured: true,
      github: "https://github.com/P-CIV/ecocycle",
      image: "/projects/Web.png"
    },
    {
      name: "À Chez-Nous Pays",
      description: {
        en: "A showcase website highlighting the richness and diversity of African gastronomy. Celebrating culinary heritage and cultural traditions through engaging web design.",
        fr: "Un site vitrine mettant en valeur la richesse et la diversité de la gastronomie africaine."
      },
      technologies: ["HTML", "CSS", "JavaScript"],
      link: "https://acheznouspays.netlify.app/",
      featured: false,
      github: "https://github.com/P-CIV/a-chez-nous-pays",
      image: "/projects/acheznouspays.png"
    },
    {
      name: "Gestionnaire de Tâches",
      description: {
        en: "A web-based task management application with email reminder notifications. Streamlines productivity by organizing tasks and automating notifications for timely reminders.",
        fr: "Gestionnaire de tâches web avec rappels par e-mail."
      },
      technologies: ["JavaScript", "Node.js", "Express.js", "SendGrid", "HTML5", "CSS3"],
      link: "https://gestionnaire-d-taches.netlify.app/",
      featured: false,
      github: "https://github.com/P-CIV/Gestionnaire-de-Taches",
      image: "/projects/gestionnaire_tache.png"
    },
  ],

  skills: {
    categories: [
      {
        name: {
          en: "Frontend Development",
          fr: "Développement Frontend"
        },
        skills: ["React", "TypeScript", "JavaScript", "Tailwind CSS", "HTML5", "CSS3"]
      },
      {
        name: {
          en: "Backend Development",
          fr: "Développement Backend"
        },
        skills: ["Node.js", "Express", "Python", "SQL", "REST API"]
      },
      {
        name: {
          en: "Mobile Development",
          fr: "Développement Mobile"
        },
        skills: [ "React Native", "Kotlin", "Firebase"]
      },
      {
        name: {
          en: "Tools & DevOps",
          fr: "Outils & DevOps"
        },
        skills: ["Git", "CI/CD", "Figma", "AWS", "AZURE"]
      }
    ]
  },

  contact: {
    title: {
      en: "Let's Work Together",
      fr: "Travaillons Ensemble"
    },
    description: {
      en: "I'm always interested in hearing about new projects and opportunities. Feel free to reach out if you want to collaborate or discuss how I can help bring your ideas to life.",
      fr: "Je suis toujours intéressé par de nouveaux projets et opportunités. N'hésitez pas à me contacter si vous souhaitez collaborer ou discuter de comment je peux aider à concrétiser vos idées."
    }
  },

  formations: [
    {
      title: {
        en: "Bachelor's Degree - DAS (Application and E-Service Development)",
        fr: "Licence 3 DAS (Développement d'Applications et E-Services)"
      },
      school: "Université Virtuelle de Côte d'Ivoire (UVCI)",
      period: {
        en: "2023 - Present",
        fr: "2023 - Présent"
      },
      description: {
        en: "Currently pursuing final year of DAS training with in-depth focus on web and mobile development, service integration, cloud computing and digital project management.",
        fr: "Actuellement en cours de formation DAS, avec un approfondissement en développement web, mobile, intégration de services, cloud computing et gestion de projet numérique."
      }
    },
    {
      title: {
        en: "Artificial Intelligence Training",
        fr: "Formation en Intelligence Artificielle"
      },
      school: "CEDITECH-CI – Centre d'Excellence Digital et Technologies",
      period: {
        en: "In Progress",
        fr: "En cours"
      },
      description: {
        en: "Hands-on AI training focused on machine learning, natural language processing (NLP), and model development with TensorFlow and PyTorch. Immersive project-based approach with focus on innovation and professional development.",
        fr: "Formation pratique en Intelligence Artificielle, axée sur l'apprentissage automatique, le traitement du langage naturel NLP et le développement de modèles avec TensorFlow et PyTorch. Approche immersive orientée projets, innovation et mise en situation professionnelle."
      }
    },
    {
      title: {
        en: "UX/UI – Mobile Android/iOS – Sustainable Entrepreneurship",
        fr: "UX/UI – Mobile Android/IOS – Entrepreneuriat Durable"
      },
      school: "DIGIFemmes – Centre de formation du programme GENIE",
      period: {
        en: "Completed",
        fr: "Terminée"
      },
      description: {
        en: "Training in design and development of digital solutions, focused on UX/UI design, Android/iOS mobile technologies, with an approach oriented towards innovation, sustainability and social impact.",
        fr: "Formation en conception et développement de solutions numériques, axée sur l'UX/UI design, les technologies mobiles Android/IOS, avec une approche orientée vers l'innovation, la durabilité et l'impact social."
      }
    }
  ],

  certifications: [
    {
  id: 11,
  title: "Python Essentials 2",
  issuer: "Cisco Networking Academy",
  date: "2026",
  description: {
    en: "Intermediate Python programming covering advanced concepts such as object-oriented programming, modules and packages, file handling, exception handling, and working with more complex data structures.",
    fr: "Programmation Python intermédiaire couvrant des concepts avancés tels que la programmation orientée objet, les modules et packages, la gestion des fichiers, la gestion des exceptions et l'utilisation de structures de données plus complexes."
  },
  skills: [
    "Programmation orientée objet (OOP)",
    "Modules et packages Python",
    "Gestion des fichiers",
    "Gestion des exceptions",
    "Structures de données avancées",
    "Résolution de problèmes"
  ],
  image: "/certifications/cert_pythonEssentials2.jpg"
  },


    {
      id: 1,
      title: "AWS Cloud Explained for Beginners",
      issuer: "ûdemy",
      date: "2026",
      description: {
        en: "Introduction to Cloud Computing and Amazon Web Services (AWS), covering core cloud concepts, basic architecture, security principles, and hands-on practice with key AWS services.",
        fr: "Introduction au Cloud Computing et à Amazon Web Services (AWS), couvrant les concepts fondamentaux du cloud, l’architecture de base, les principes de sécurité et la pratique des services clés d’AWS."
      },
      skills: ["Amazon Web Services","Amazon EC2", "Amazon S3","AWS IAM", "Virtual Private Cloud (VPC)","Déploiement d’instances"],
      image: "/certifications/cert_aws_deb.jpg"
     },

    {
      id: 2,
      title: "Capacity Building Certificate – IT Foundation",
      issuer: "Center for Excellence in Digital and Technology (CEDITECH)",
      date: "2026",
      description: {
        en: "IT fundamentals boot camp, offered by CEDITECH by TransNumerik, focusing on the basics of IT, cloud environments, and the practical application of knowledge.",
        fr: "Bootcamp en fondation informatique, proposé par CEDITECH by TransNumerik, axé sur les bases de l'informatique, les environnements cloud et l’application pratique des connaissances."
      },
      skills: ["Informatique fondamentale","Cloud", "Apprentissage autonome","Résolution de problèmes", "Rigueur professionnelle"],
      image: "/certifications/cert_bootcamp.jpg"
     },
    {
      id: 3,
      title: "GENIE Program Completion Certificate",
      issuer: "DigiFemmes Côte d'Ivoire, KOICA & GGI, Ministry of Digital Transition (Côte d'Ivoire)",
      date: "2025",
      description: {
        en: "Successfully completed the GENIE program from August 5 to November 15, 2025 in Abidjan, focusing on digital innovation and sustainable entrepreneurship.",
        fr: "Participation et réussite du programme GENIE, suivi du 5 août au 15 novembre 2025 à Abidjan."
      },
      skills: ["Kotlin","Swift", "UX/UI", "Green-tech"],
      image: "/certifications/cert-GENIE.PNG"
    },
    
    {
      id: 5,
      title: "Speaking and Presenting: Conversation Starters",
      issuer: "University of Michigan via Coursera",
      date: "2025",
      description: {
        en: "Successfully completed online course authorized by University of Michigan (November 24, 2025), focusing on effective conversation strategies, communication skills and presentation techniques for professional environments.",
        fr: "Cours en ligne sans crédit, autorisé par University of Michigan et proposé par l'intermédiaire de Coursera (24 novembre 2025). Formation axée sur les stratégies de conversation, les compétences en communication et les techniques de présentation."
      },
      skills: ["Communication", "Public Speaking", "Presentation Skills", "Conversation"],
      image: "/certifications/cert-speaking-presenting.jpg"
    },
    {
      id: 6,
      title: "Creativity, Innovation and Transformation",
      issuer: "The Pennsylvania State University via Coursera",
      date: "2025",
      description: {
        en: "Successfully completed online course authorized by The Pennsylvania State University (November 29, 2025), exploring creativity, innovation frameworks and transformation strategies to drive organizational and personal growth.",
        fr: "Cours en ligne sans crédit, autorisé par The Pennsylvania State University et proposé par l'intermédiaire de Coursera (29 novembre 2025). Formation explorant les concepts de créativité, innovation et transformation pour impulser la croissance organisationnelle et personnelle."
      },
      skills: ["Creativity", "Innovation", "Transformation", "Strategic Thinking", "Problem Solving"],
      image: "/certifications/cert-creativity-innovation.jpg"
    },
   
    {
      id: 7,
      title: "Essential React.js Training",
      issuer: "LinkedIn Learning",
      date: "2024",
      description: {
        en: "Comprehensive introductory course covering React.js fundamentals, mastering this modern framework for creating dynamic and high-performance web interfaces. Includes component architecture, state management, hooks and lifecycle methods.",
        fr: "Cursus d'initiation complet aux bases de React.js, le framework moderne de création d'interfaces web dynamiques et performantes. Couvre l'architecture des composants, la gestion d'état, les hooks et les méthodes de cycle de vie."
      },
      skills: ["React", "JavaScript", "JSX", "Component Architecture", "State Management", "Hooks"],
      image: "/certifications/Cert-react.jpg"
    },
    {
      id: 8,
      title: "Developer Career Preparation Course",
      issuer: "LinkedIn Learning & Microsoft",
      date: "2024",
      description: {
        en: "Comprehensive learning program covering programming and software development essentials, preparing for professional roles in the development industry.",
        fr: "Cursus d'apprentissage complet couvrant les fondamentaux de la programmation et du développement logiciel, préparant aux rôles professionnels dans l'industrie du développement."
      },
      skills: ["Programming", "Software Development", "Career Planning", "Professional Development"],
      image: "/certifications/cert-linkedin-microsoft.jpg"
    },
    {
      id: 9,
      title: "Programming Fundamentals Training",
      issuer: "LinkedIn Learning",
      date: "2024",
      description: {
        en: "In-depth training covering the foundational concepts of programming, building strong technical skills essential for software development.",
        fr: "Formation approfondie couvrant les concepts fondamentaux de la programmation, construisant les compétences techniques essentielles au développement logiciel."
      },
      skills: ["Programming Basics", "Algorithms", "Data Structures", "Problem Solving"],
      image: "/certifications/cert-linkedin-prog.jpg"
    },
    {
      id: 10,
      title: "Generative AI Workshop",
      issuer: "Simplon.co & Meta",
      date: "2024",
      description: {
        en: "Comprehensive workshop on generative artificial intelligence, covering prompt engineering techniques, understanding AI capabilities and limitations in practical applications. Explores best practices for interacting with modern AI systems and ethical considerations.",
        fr: "Formation complète sur l'IA générative, couvrant les techniques d'ingénierie de prompts, la compréhension des capacités et limites de l'IA dans les applications pratiques. Explore les meilleures pratiques pour interagir avec les systèmes d'IA modernes et les considérations éthiques."
      },
      skills: ["Generative AI", "Prompt Engineering", "AI Limitations", "LLMs", "ChatGPT", "AI Ethics"],
      image: "/certifications/cert-simplon.jpg"
    }
  ]
};

export type Language = 'en' | 'fr';
