import os
import re

from dotenv import load_dotenv
from groq import Groq

from portfolio_data import construire_contexte_portfolio

# Charge les variables d'environnement 
load_dotenv()


# Configuration de l'agent conversationnel avec Groq


GROQ_API_KEY = os.environ.get("GROQ_API_KEY")
GROQ_MODEL = os.environ.get("GROQ_MODEL", "openai/gpt-oss-120b")

# Client Groq
client = Groq(api_key=GROQ_API_KEY)

def get_system_prompt() -> str:
    contexte_portfolio = construire_contexte_portfolio()
    return f"""Tu es l'assistant personnel du portfolio de Pascal Kambou.

Ton rôle est d'aider les visiteurs à mieux connaître Pascal : ses projets, compétences, formations, expériences et disponibilité professionnelle.

Voici toutes les données du portfolio :

{contexte_portfolio}


CONSIGNES STRICTES - TRÈS IMPORTANT

1. LANGUE:
   - Si la question est en français → réponds UNIQUEMENT en français.
   - Si la question est en anglais → réponds UNIQUEMENT en anglais.
   - JAMAIS mélanger les langues.

2. TONALITÉ:
   - Clair, concis, professionnel et amical.
   - Réponds brièvement quand la demande est courte ou vague.

3. PÉRIMÈTRE:
   - Tu ne parles que de Pascal Kambou, de son portfolio, de ses projets, compétences, formations, certifications, contacts, expériences et disponibilité.
   - Les sujets hors périmètre incluent tout ce qui n'est pas lié à Pascal ou à son portfolio.
   - Si la demande n'est pas liée à Pascal, réponds exactement :
     "Je ne peux parler que de Pascal Kambou, de son portfolio et de ses informations professionnelles."

4. COMPRÉHENSION ET RECADRAGE:
   - Analyse toujours le sens global de la demande, pas seulement des mots-clés isolés.
   - Si l'utilisateur écrit un message court, vague, évaluatif ou de confirmation (ex: "super", "cool", "ok", "bien", "qui es-tu ?", "salut"), interprète-le comme un message lié au portfolio et réponds dans le cadre de Pascal.
   - Si la demande est ambiguë, reformule de manière utile en relançant avec un angle propre au profil de Pascal.
   - Pose une question de compréhension si nécessaire, mais garde-la courte et directement utile.

5. RÉPONSES À DES QUESTIONS D'IDENTITÉ / CONTEXTE:
   - Si on te demande "qui es-tu ?", "tu es son assistant ?", "présente-toi", "qui est Pascal ?", "tu parles de Pascal ?" réponds comme l'assistant du portfolio de Pascal.
   - Donne une réponse courte, rassurante et centrée sur Pascal.
   - Ne réponds jamais comme un assistant générique sans lien au portfolio.

6. DEMANDES SUR L'IA ET LES COMPÉTENCES:
   - Une demande concernant l'IA est dans le périmètre si elle concerne Pascal Kambou, son expertise, ses projets, ses compétences ou ses certifications en intelligence artificielle.
   - Même si la formulation est imparfaite, interprète l'intention comme une demande sur Pascal si le contexte de la conversation l'indique.

7. CONTACTS:
   - INTERDIT: créer des liens markdown [email](mailto:...) ou des listes de liens.
   - OBLIGATOIRE: afficher les contacts en format simple, par exemple:
     Email: pascalkambou200@gmail.com
     LinkedIn: Pascal Kambou
   - Pas de tirets longs, max 6 caractères.

8. PROJETS:
   - Donne des détails précis sur les projets, les technologies utilisées et la valeur ajoutée.

9. INFORMATIONS ABSENTES:
   - Si l'information n'est pas dans le contexte, dis exactement : "Je ne dispose pas de cette info."
   - N'invente jamais d'informations.

10. COURTOISIE ET SALUTATIONS:
    - Pour les salutations, remerciements ou au revoir, réponds poliment et brièvement sans inventer d'informations.

11. RÉPONSE UNIQUE:
    - Réponds UNIQUEMENT à la question posée et ne sors jamais du cadre du portfolio.
    - Ne pas transformer la conversation en discussion générale.

12. FORMATTAGE:
    - Titres: ## Titre
    - Listes: • Point
    - Gras: **texte**
    - JAMAIS de liens markdown [texte](url) ; donne le texte et l'URL séparément si nécessaire.
"""


# API PUBLIQUE

def creer_session() -> list:
    """Crée une nouvelle session de conversation (historique vide)."""
    return []


def _normaliser_texte(texte: str) -> str:
    """Normalise un texte pour faciliter le contrôle du périmètre."""
    return re.sub(r"[^a-zà-ÿ0-9\s]", " ", texte.lower())


def _est_message_identite_ou_feedback(message: str) -> bool:
    """Détecte les messages courts liés à l'identité, au cadrage ou au feedback."""
    texte = _normaliser_texte(message)
    if not texte.strip():
        return False

    patterns = [
        "qui es tu", "qui est tu", "qui etes vous", "qui es-vous",
        "tu es qui", "tu es son assistant", "tu es l assistant", "tu es assistant",
        "who are you", "who are you?", "what are you", "are you his assistant",
        "présente toi", "presente toi", "présentation", "presentation",
        "a qui je parle", "qui parle", "qui est pascal",
        "super", "cool", "bien", "good", "great", "excellent", "ok",
        "parfait", "nice", "top", "merci", "thanks"
    ]
    return any(pattern in texte for pattern in patterns)


def _est_dans_perimetre(message: str, historique: list[dict] | None = None) -> bool:
    """Vérifie si une demande est bien liée au portfolio de Pascal Kambou."""
    texte = _normaliser_texte(message)
    if not texte.strip():
        return False

    if _est_message_identite_ou_feedback(texte):
        return True

    mots_cles = [
        "pascal", "kambou", "portfolio", "projet", "projets", "competence",
        "compétence", "competences", "compétences", "formation", "formations",
        "experience", "expérience", "certificat", "certification", "certifications",
        "contact", "email", "linkedin", "github", "cv", "skill", "skills",
        "technologie", "technologies", "travail", "réalisation", "realisation",
        "presentation", "présentation", "bio", "parle", "parler", "montre",
        "explique", "qui", "quoi", "comment", "ou", "quand",
        "modification", "modifications", "mise", "mise à jour", "maj",
        "récent", "récente", "dernier", "dernière", "nouveau", "nouvelle",
        "expertise", "expert", "ia", "ai", "intelligence artificielle",
        "machine learning", "deep learning", "nlp", "gpt", "llm", "assistant"
    ]

    if any(mot in texte for mot in mots_cles):
        return True

    if historique:
        historique_text = " ".join(item.get("content", "") for item in historique)
        historique_text = _normaliser_texte(historique_text)
        if re.search(r"\b(il|elle|lui|son|sa|ses|leur)\b", texte) and any(keyword in historique_text for keyword in ["pascal", "kambou", "portfolio", "projet", "projets", "compétences", "certifications", "formations"]):
            return True
        if any(term in texte for term in ["ia", "ai", "intelligence artificielle", "machine learning", "deep learning", "nlp", "gpt", "llm", "expertise", "assistant"]) and any(keyword in historique_text for keyword in ["pascal", "kambou", "portfolio", "assistant"]):
            return True

    return False


def _est_salutation_ou_courtoisie(message: str) -> bool:
    """Détecte les messages de salutation, remerciement ou au revoir."""
    texte = _normaliser_texte(message)
    if not texte.strip():
        return False

    salutations = ["bonjour", "salut", "coucou", "hello", "hi", "hey", "tu es là", "tes la", "es tu la"]
    remerciements = ["merci", "thanks", "thank you", "thank u"]
    aurevoir = ["au revoir", "bye", "a plus", "à plus", "ciao", "adieu", "bonne journée", "bonne nuit"]

    return any(phrase in texte for phrase in salutations + remerciements + aurevoir)


def _repondre_courtoisie(message: str) -> str:
    texte = _normaliser_texte(message)
    salutations = ["bonjour", "salut", "coucou", "hello", "hi", "hey", "tu es là", "es tu la"]
    remerciements = ["merci", "thanks", "thank you", "thank u"]
    aurevoir = ["au revoir", "bye", "a plus", "à plus", "ciao", "adieu", "bonne journée", "bonne nuit"]

    if any(phrase in texte for phrase in salutations):
        return "Bonjour ! Je suis l'assistant IA de Pascal Kambou. Je peux répondre à vos questions sur son portfolio, ses compétences, ses projets, ses formations et ses certifications."
    if any(phrase in texte for phrase in remerciements):
        return "Avec plaisir ! Si vous avez d'autres questions sur Pascal Kambou ou son portfolio, je suis là pour vous aider."
    if any(phrase in texte for phrase in aurevoir):
        return "Au revoir ! N'hésitez pas à revenir si vous voulez en savoir plus sur Pascal Kambou."
    return "Je suis l'assistant IA de Pascal Kambou. Je suis à votre disposition pour répondre à vos questions sur son portfolio."


def envoyer_message(historique: list, message_utilisateur: str) -> tuple[str, list]:
    """
    Envoie un message à Groq et retourne (réponse, historique_mis_à_jour).
    
    Args:
        historique: liste de dicts {"role": "user"|"assistant", "content": str}
        message_utilisateur: message de l'utilisateur
    
    Returns:
        (texte_reponse, nouvel_historique)
    """
    
    historique_clean = [
        {"role": m.get("role", "user"), "content": m.get("content", "")}
        for m in historique
    ]

    if _est_salutation_ou_courtoisie(message_utilisateur):
        reponse = _repondre_courtoisie(message_utilisateur)
        nouvel_historique = historique_clean + [
            {"role": "user", "content": message_utilisateur},
            {"role": "assistant", "content": reponse},
        ]
        return reponse, nouvel_historique

    if not _est_dans_perimetre(message_utilisateur, historique_clean):
        reponse = "Je ne peux parler que de Pascal Kambou, de son portfolio et de ses informations professionnelles."
        nouvel_historique = historique_clean + [
            {"role": "user", "content": message_utilisateur},
            {"role": "assistant", "content": reponse},
        ]
        return reponse, nouvel_historique
    
    # Préparer les messages pour l'API Groq avec le contexte le plus récent
    system_prompt = get_system_prompt()
    messages = [
        {"role": "system", "content": system_prompt}
    ] + historique_clean + [
        {"role": "user", "content": message_utilisateur}
    ]
    
    try:
        # Appel à Groq API
        completion = client.chat.completions.create(
            model=GROQ_MODEL,
            messages=messages,
            temperature=0.4,
            max_completion_tokens=1024,
            reasoning_effort="low",
            top_p=1,
            
        )

        texte_reponse = completion.choices[0].message.content

    except Exception as e:
        # Ne pas intercepter les interruptions système
        if isinstance(e, (KeyboardInterrupt, SystemExit)):
            raise
        # Utilise la conversion explicite dans la f-string
        return f" Erreur d'appel API Groq: {e!s}", historique_clean
    
    # Mise à jour de l'historique
    nouvel_historique = historique_clean + [
        {"role": "user", "content": message_utilisateur},
        {"role": "assistant", "content": texte_reponse},
    ]
    
    return texte_reponse, nouvel_historique
