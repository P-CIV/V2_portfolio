import json
import logging
from pathlib import Path

logging.basicConfig(level=logging.WARNING)
BASE_DIR = Path(__file__).resolve().parent.parent
PORTFOLIO_JSON_CANDIDATES = [
    BASE_DIR / "public" / "cv-content.json",
    BASE_DIR / "server" / "portfolio_data.json",
    BASE_DIR / "server" / "portfolio.json",
]

PORTFOLIO_INFO = {
    "identite": {
        "nom": "Pascal Kambou",
        "titre": "Développeur Web & Ingénieur IA",
        "localisation": "Abidjan, Côte d'Ivoire",
        "email": "pascalkambou200@gmail.com",
        "github": "https://github.com/P-CIV",
        "linkedin": "https://www.linkedin.com/in/pascal-kambou-37ab182b6",
        "portfolio_web": "https://pascalkambou.tech",
        "portfolio_web_alt": "https://pascalkambou.vercel.app",
        "disponibilite": "Freelance & CDI",
        "bio": (
            "Développeur web full-stack et ingénieur IA basé à Abidjan. "
            "Spécialisé dans la création d'applications web modernes, "
            "et l'intégration de modèles de machine learning et LLM. "
            "Expert en Prompt Engineering, RAG, et fine-tuning de modèles NLP. "
            "Étudiant en Développement d'Applications et E-Services à l'UVCI."
        ),
    },
    "competences": {
        "frontend": [
            "React",
            "TypeScript",
            "JavaScript",
            "Tailwind CSS",
            "HTML5",
            "CSS3",
        ],
        "backend": [
            "Node.js",
            "Express",
            "Python",
            "FastAPI",
            "SQL",
            "REST API",
        ],
        "mobile": ["React Native", "Kotlin", "Firebase"],
        "ia_ml": [
            "Python",
            "PyTorch",
            "TensorFlow",
            "RAG",
            "Prompt Engineering",
            "Deep Learning",
            "CamemBERT",
            "LLaMA",
            "LLMs",
            "NLP",
            "Machine Learning",
            "Reinforcement Learning",
            "Azure OpenAI",
            "LangChain",
            "Qdrant",
            "Mistral-7B",
            "Streamlit",
        ],
        "outils": ["Git", "CI/CD", "Figma", "AWS", "Azure"],
        "bases_de_donnees": ["SQL", "Firebase"],
    },
    "projets": [
        {
            "nom": "Kova",
            "description": "Assistant IA basé sur le RAG qui recommande des services à partir de catalogues PDF avec recherche sémantique et Azure OpenAI.",
            "technologies": ["Python", "FastAPI", "Azure OpenAI", "LangChain", "Qdrant"],
            "fonctionnalites": [
                "Recherche sémantique sur les catalogues",
                "Réponses précises et adaptées au contexte",
                "Intégration de services via Azure OpenAI",
            ],
            "role": "Développement backend et intégration IA",
            "statut": "Production",
            "github": "https://github.com/P-CIV/rag_assistant",
            "url": "https://kovaassistant.netlify.app/",
        },
        {
            "nom": "Sentiment Analysis — AlloFilm",
            "description": "Modèle d'analyse de sentiments pour critiques de films en français avec CamemBERT.",
            "technologies": ["Python", "PyTorch", "CamemBERT", "Hugging Face", "Streamlit"],
            "fonctionnalites": [
                "Classification des avis positifs ou négatifs",
                "Interface Streamlit simple et efficace",
                "Déploiement web accessible",
            ],
            "role": "Développement du modèle et intégration de l'interface",
            "statut": "Production",
            "github": "https://github.com/P-CIV/sentiment_analysis",
            "url": "https://analyse-sentiment-projet.streamlit.app/",
        },
        {
            "nom": "TATI Makeup Chatbot",
            "description": "Assistant IA pour un salon de beauté avec interface de chat élégante et réponses en temps réel.",
            "technologies": ["Python", "Streamlit", "Mistral-7B", "Hugging Face", "OpenAI SDK"],
            "fonctionnalites": [
                "Interface de chat moderne",
                "Suggestions rapides",
                "Réponses IA en temps réel",
                "Base de connaissances du salon",
            ],
            "role": "Développement du chatbot et intégration UI",
            "statut": "Production",
            "github": "https://github.com/P-CIV/Chatbot_tatiana",
            "url": "https://tatianabot.streamlit.app",
        },
        {
            "nom": "Portfolio Website",
            "description": "Portfolio interactif bilingue avec thème sombre/clair et animations fluides.",
            "technologies": ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
            "fonctionnalites": [
                "Interface bilingue",
                "Animations fluides",
                "Thème sombre/clair",
            ],
            "role": "Développement frontend et design",
            "statut": "Production",
            "github": "https://github.com/P-CIV",
            "url": "https://pascalkambou.tech",
        },
        {
            "nom": "Ecocycle - Prototype",
            "description": "Application mobile éducative autour du recyclage et de la gestion des déchets.",
            "technologies": ["Figma", "UX/UI", "Material Design"],
            "fonctionnalites": [
                "Prototype de design centré utilisateur",
                "Sensibilisation au recyclage",
                "Expérience engageante",
            ],
            "role": "Conception UX/UI",
            "statut": "Prototype",
            "github": "https://github.com/P-CIV/Mon_Portfolio",
            "url": "https://www.figma.com/design/TmulhhBeNy7ZKCIzFPhDOc/Untitled?node-id=490-3335&t=MKLeFqMnK1HegeQ1-1",
        },
        {
            "nom": "Ecocycle",
            "description": "Application web pour la gestion des opérations de recyclage et l'analyse des données environnementales.",
            "technologies": ["React", "TypeScript", "Tailwind CSS", "react-qr-code"],
            "fonctionnalites": [
                "Suivi des performances",
                "Analyse des données",
                "Gestion des opérations de recyclage",
            ],
            "role": "Développement frontend et expérience utilisateur",
            "statut": "Production",
            "github": "https://github.com/P-CIV/ecocycle",
            "url": "https://ecocycle-ci.vercel.app/",
        },
        {
            "nom": "À Chez-Nous Pays",
            "description": "Site vitrine mettant en valeur la richesse et la diversité de la gastronomie africaine.",
            "technologies": ["HTML", "CSS", "JavaScript"],
            "fonctionnalites": [
                "Site vitrine moderne",
                "Valorisation du patrimoine culinaire",
            ],
            "role": "Développement frontend",
            "statut": "Terminé",
            "github": "https://github.com/P-CIV/a-chez-nous-pays",
            "url": "https://acheznouspays.netlify.app/",
        },
        {
            "nom": "Gestionnaire de Tâches",
            "description": "Application web de gestion de tâches avec rappels et notifications par e-mail.",
            "technologies": ["JavaScript", "Node.js", "Express.js", "SendGrid", "HTML5", "CSS3"],
            "fonctionnalites": [
                "Organisation des tâches",
                "Notifications automatisées",
                "Productivité améliorée",
            ],
            "role": "Développement full-stack",
            "statut": "Terminé",
            "github": "https://github.com/P-CIV/Gestionnaire-de-Taches",
            "url": "https://gestionnaire-d-taches.netlify.app/",
        },
        {
            "nom": "Kova",
            "description": "Assistant IA basé sur le RAG qui recommande des services à partir de catalogues PDF avec recherche sémantique et Azure OpenAI.",
            "technologies": ["Python", "FastAPI", "Azure OpenAI", "LangChain", "Qdrant"],
            "fonctionnalites": [
                "Recherche sémantique sur les catalogues",
                "Réponses précises et adaptées au contexte",
                "Intégration de services via Azure OpenAI",
            ],
            "role": "Développement backend et intégration IA",
            "statut": "Production",
            "github": "https://github.com/P-CIV/rag_assistant",
            "url": "https://kovaassistant.netlify.app/",
        },
        {
            "nom": "Sentiment Analysis — AlloFilm",
            "description": "Modèle d'analyse de sentiments pour critiques de films en français avec CamemBERT.",
            "technologies": ["Python", "PyTorch", "CamemBERT", "Hugging Face", "Streamlit"],
            "fonctionnalites": [
                "Classification des avis positifs ou négatifs",
                "Interface Streamlit simple et efficace",
                "Déploiement web accessible",
            ],
            "role": "Développement du modèle et intégration de l'interface",
            "statut": "Production",
            "github": "https://github.com/P-CIV/sentiment_analysis",
            "url": "https://analyse-sentiment-projet.streamlit.app/",
        },
        {
            "nom": "TATI Makeup Chatbot",
            "description": "Assistant IA pour un salon de beauté avec interface de chat élégante et réponses en temps réel.",
            "technologies": ["Python", "Streamlit", "Mistral-7B", "Hugging Face", "OpenAI SDK"],
            "fonctionnalites": [
                "Interface de chat moderne",
                "Suggestions rapides",
                "Réponses IA en temps réel",
                "Base de connaissances du salon",
            ],
            "role": "Développement du chatbot et intégration UI",
            "statut": "Production",
            "github": "https://github.com/P-CIV/Chatbot_tatiana",
            "url": "https://tatianabot.streamlit.app",
        },
        {
            "nom": "Portfolio Website",
            "description": "Portfolio interactif bilingue avec thème sombre/clair et animations fluides.",
            "technologies": ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
            "fonctionnalites": [
                "Interface bilingue",
                "Animations fluides",
                "Thème sombre/clair",
            ],
            "role": "Développement frontend et design",
            "statut": "Production",
            "github": "https://github.com/P-CIV",
            "url": "https://pascalkambou.tech",
        },
    ],
    "formations": [
        {
            "titre": "Licence 3 DAS - Développement d'Applications et E-Services",
            "institution": "Université Virtuelle de Côte d'Ivoire (UVCI)",
            "domaine": "Développement web, mobile et services numériques",
            "periode": "2023 - Présent",
            "details": "Formation orientée vers le développement web, mobile, l'intégration de services, le cloud computing et la gestion de projet numérique.",
            "modules_cles": ["Développement Web", "Développement Mobile", "Cloud", "Gestion de Projet"],
        },
        {
            "titre": "Formation en Intelligence Artificielle",
            "institution": "CEDITECH-CI – Centre d'Excellence Digital et Technologies",
            "domaine": "Intelligence Artificielle et NLP",
            "periode": "Terminée",
            "details": "Formation pratique en apprentissage automatique, traitement du langage naturel et développement de modèles avec TensorFlow et PyTorch.",
            "modules_cles": ["Machine Learning", "NLP", "TensorFlow", "PyTorch"],
        },
        {
            "titre": "UX/UI – Mobile Android/iOS – Entrepreneuriat Durable",
            "institution": "DIGIFemmes – Centre de formation du programme GENIE",
            "domaine": "Design et développement numérique",
            "periode": "Terminée",
            "details": "Formation en design UX/UI, technologies mobiles Android/iOS et innovation durable.",
            "modules_cles": ["UX/UI", "Android/iOS", "Innovation", "Durabilité"],
        },
    ],
    "certifications": [
        {
            "titre": "Python Essentials 2",
            "organisme": "Cisco Networking Academy",
            "date": "2026",
            "domaine": "Python",
            "competences": [
                "Programmation orientée objet",
                "Modules et packages Python",
                "Gestion des fichiers",
                "Gestion des exceptions",
                "Structures de données avancées",
            ],
        },
        {
            "titre": "AWS Cloud Explained for Beginners",
            "organisme": "Udemy",
            "date": "2026",
            "domaine": "Cloud AWS",
            "competences": [
                "Amazon Web Services",
                "Amazon EC2",
                "Amazon S3",
                "AWS IAM",
                "Virtual Private Cloud",
                "Déploiement d'instances",
            ],
        },
        {
            "titre": "Capacity Building Certificate – IT Foundation",
            "organisme": "Center for Excellence in Digital and Technology (CEDITECH)",
            "date": "2026",
            "domaine": "Informatique fondamentale",
            "competences": [
                "Informatique fondamentale",
                "Cloud",
                "Apprentissage autonome",
                "Résolution de problèmes",
                "Rigueur professionnelle",
            ],
        },
        {
            "titre": "GENIE Program Completion Certificate",
            "organisme": "DigiFemmes Côte d'Ivoire, KOICA & GGI, Ministry of Digital Transition",
            "date": "2025",
            "domaine": "Digital Innovation",
            "competences": ["Kotlin", "Swift", "UX/UI", "Green-tech"],
        },
        {
            "titre": "Speaking and Presenting: Conversation Starters",
            "organisme": "University of Michigan via Coursera",
            "date": "2025",
            "domaine": "Communication",
            "competences": ["Communication", "Présentation", "Conversation"],
        },
        {
            "titre": "Creativity, Innovation and Transformation",
            "organisme": "The Pennsylvania State University via Coursera",
            "date": "2025",
            "domaine": "Innovation",
            "competences": ["Créativité", "Innovation", "Transformation"],
        },
        {
            "titre": "Essential React.js Training",
            "organisme": "LinkedIn Learning",
            "date": "2024",
            "domaine": "Frontend",
            "competences": ["React", "JavaScript", "JSX", "Hooks"],
        },
        {
            "titre": "Developer Career Preparation Course",
            "organisme": "LinkedIn Learning & Microsoft",
            "date": "2024",
            "domaine": "Développement professionnel",
            "competences": ["Programmation", "Développement logiciel", "Planification de carrière"],
        },
        {
            "titre": "Programming Fundamentals Training",
            "organisme": "LinkedIn Learning",
            "date": "2024",
            "domaine": "Programmation",
            "competences": ["Bases de la programmation", "Algorithmes", "Structures de données"],
        },
        {
            "titre": "Generative AI Workshop",
            "organisme": "Simplon.co & Meta",
            "date": "2024",
            "domaine": "Intelligence artificielle",
            "competences": ["Generative AI", "Prompt Engineering", "LLMs", "Ethique IA"],
        },
    ],
    "reseaux_sociaux": [
        {"plateforme": "GitHub", "url": "https://github.com/P-CIV"},
        {"plateforme": "LinkedIn", "url": "https://www.linkedin.com/in/pascal-kambou-37ab182b6?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"},
        {"plateforme": "Twitter", "url": "https://twitter.com/PascalKambou"},
    ],
}


def _charger_source_portfolio_json() -> dict | None:
    """Lit la source JSON du portfolio sur le disque, en priorité la version publique."""
    for chemin in PORTFOLIO_JSON_CANDIDATES:
        if not chemin.exists():
            continue
        try:
            with open(chemin, "r", encoding="utf-8") as fichier:
                donnees = json.load(fichier)
        except (json.JSONDecodeError, OSError) as error:
            logging.warning("Échec de lecture de %s: %s", chemin, error)
            continue
        if isinstance(donnees, dict):
            return donnees
    return None


def _construire_contexte_depuis_json(donnees: dict) -> str:
    """Crée un contexte de chatbot à partir du JSON public du portfolio."""
    sections = donnees.get("sections", {})
    contact = sections.get("contact", "")
    about = sections.get("about", "")
    experience = sections.get("experience", "")
    skills = sections.get("skills", "")
    education = sections.get("education", "")
    formations = sections.get("formations", "")
    certifications = sections.get("certifications", "")
    projects = sections.get("projects", "")

    contexte = "PORTFOLIO DE PASCAL KAMBOU\n\n"
    if contact:
        contexte += "INFORMATIONS DE CONTACT\n"
        contexte += f"{contact}\n\n"
    if about:
        contexte += "À PROPOS\n"
        contexte += f"{about}\n\n"
    if experience:
        contexte += "EXPERIENCE\n"
        contexte += f"{experience}\n\n"
    if skills:
        contexte += "COMPÉTENCES\n"
        contexte += f"{skills}\n\n"
    if education:
        contexte += "FORMATIONS\n"
        contexte += f"{education}\n\n"
    if formations:
        contexte += "DETAILS FORMATIONS\n"
        contexte += f"{formations}\n\n"
    if certifications:
        contexte += "CERTIFICATIONS\n"
        contexte += f"{certifications}\n\n"
    if projects:
        contexte += "PROJETS\n"
        contexte += f"{projects}\n\n"
    return contexte.strip()


def construire_contexte_portfolio() -> str:
    """Retourne un contexte frais, relu depuis la source la plus récente du portfolio."""
    source_json = _charger_source_portfolio_json()
    if source_json is not None:
        contexte = _construire_contexte_depuis_json(source_json)
        if contexte:
            return contexte

    i = PORTFOLIO_INFO
    ident = i["identite"]

    contexte = f"""
PORTFOLIO DE {ident['nom'].upper()}

INFORMATIONS DE CONTACT

Nom: {ident['nom']}
Titre: {ident['titre']}
Localisation: {ident['localisation']}
Disponibilité: {ident['disponibilite']}

COORDONNÉES :
Email: {ident['email']}
GitHub: {ident['github']}
LinkedIn: {ident['linkedin']}
Twitter: {ident.get('twitter', '')}
Portfolio Web: {ident['portfolio_web']}
Portfolio Web alternatif: {ident.get('portfolio_web_alt', '')}

Biographie: {ident['bio']}

COMPÉTENCES TECHNIQUES

Frontend: {', '.join(i['competences']['frontend'])}
Backend: {', '.join(i['competences']['backend'])}
Mobile: {', '.join(i['competences']['mobile'])}
IA/ML: {', '.join(i['competences']['ia_ml'])}
Outils: {', '.join(i['competences']['outils'])}
Bases de données: {', '.join(i['competences']['bases_de_donnees'])}

PROJETS
"""

    for idx, projet in enumerate(i["projets"], 1):
        contexte += f"""{idx}. {projet['nom']} ({projet['statut']})
   Description: {projet['description']}
   Technologies: {', '.join(projet['technologies'])}
   Fonctionnalités:
"""
        for feat in projet["fonctionnalites"]:
            contexte += f"   - {feat}\n"
        if projet.get("github"):
            contexte += f"   GitHub: {projet['github']}\n"
        if projet.get("url"):
            contexte += f"   URL: {projet['url']}\n"
        contexte += "\n"

    contexte += "FORMATIONS\n"

    for idx, formation in enumerate(i["formations"], 1):
        contexte += f"""{idx}. {formation['titre']}
   Institution: {formation['institution']}
   Domaine: {formation['domaine']}
   Période: {formation['periode']}
   Détails: {formation['details']}

"""

    contexte += "CERTIFICATIONS\n"

    for idx, cert in enumerate(i["certifications"], 1):
        contexte += f"{idx}. {cert['titre']} - {cert['organisme']} ({cert['date']})\n"
        if cert.get("competences"):
            for comp in cert["competences"]:
                contexte += f"   - {comp}\n"
        contexte += "\n"

    contexte += "RESEAUX SOCIAUX\n"
    for reseau in i.get("reseaux_sociaux", []):
        contexte += f"{reseau['plateforme']}: {reseau['url']}\n"

    return contexte
