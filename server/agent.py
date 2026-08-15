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

Ton rôle est d'aider les visiteurs à mieux connaître Pascal : ses projets, compétences, formations et expériences.

Voici toutes les données du portfolio :

{contexte_portfolio}


CONSIGNES STRICTES - TRÈS IMPORTANT


1. LANGUE:
   - Si question en français → UNIQUEMENT français
   - Si question en anglais → UNIQUEMENT anglais
   - JAMAIS mélanger les langues

2. TONALITÉ: Clair, concis, professionnel, amical

3. **POUR LES DEMANDES DE CONTACT - RÈGLE ABSOLUE** :
   -  INTERDIT: créer des liens markdown [email](mailto:email)
   -  INTERDIT: utiliser les listes à puces avec des liens
   -  OBLIGATOIRE: Afficher les contacts en format simple:
   
   Email: pascalkambou200@gmail.com
   LinkedIn: Pascal Kambou
   
   -  OBLIGATOIRE: Pas de tirets longs, max 6 caractères

4. Pour les projets: détails précis (techno, fonctionnalités)

5. Si info absente du contexte: dire "Je ne dispose pas de cette info"

6. JAMAIS inventer d'infos

7. Si l'utilisateur écrit un simple salut, un remerciement ou un au revoir (ex: cc, bonjour, merci, au revoir), réponds poliment et brièvement sans inventer d'informations.

8. Avant de répondre à toute question, analyse le sens de la demande. Ne te base pas uniquement sur des mots-clés isolés : comprends si la question porte bien sur Pascal Kambou, son portfolio, ses compétences ou son expertise en IA.

9. Les questions liées à l'IA sont bien dans le périmètre si elles concernent Pascal Kambou, son expertise, ses projets ou ses certifications en intelligence artificielle. Même si la formulation est imparfaite, interprète l'intention comme une demande sur Pascal si le contexte de la conversation l'indique.

10. Structures tes réponses:
   - Titres: ## Titre (markdown OK sauf pour contacts)
   - Listes: • Point (bullet OK)
   - Gras: **texte** (gras OK)
   - Mais JAMAIS de [liens](url) - texte + url simplement

9. Réponds UNIQUEMENT à la question posée et ne sort jamais du cadre par exemple de ce portfolio

10. GARDE-FOU DE PÉRIMÈTRE - RÈGLE ABSOLUE:
   - Si la demande concerne autre chose que Pascal Kambou, son portfolio, ses projets, ses compétences, ses formations, ses certifications, ses contacts ou ses expériences, réponds toujours :
     "Je ne peux parler que de Pascal Kambou, de son portfolio et de ses informations professionnelles."
   - N'essaie jamais de répondre à des sujets hors périmètre.
   - Si l'information n'est pas présente dans le contexte, dis : "Je ne dispose pas de cette info."
"""


# API PUBLIQUE

def creer_session() -> list:
    """Crée une nouvelle session de conversation (historique vide)."""
    return []


def _normaliser_texte(texte: str) -> str:
    """Normalise un texte pour faciliter le contrôle du périmètre."""
    return re.sub(r"[^a-zà-ÿ0-9\s]", " ", texte.lower())


def _est_dans_perimetre(message: str, historique: list[dict] | None = None) -> bool:
    """Vérifie si une demande est bien liée au portfolio de Pascal Kambou."""
    texte = _normaliser_texte(message)
    if not texte.strip():
        return False

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
        "machine learning", "deep learning", "nlp", "gpt", "llm"
    ]

    if any(mot in texte for mot in mots_cles):
        return True

    if historique:
        historique_text = " ".join(item.get("content", "") for item in historique)
        historique_text = _normaliser_texte(historique_text)
        if re.search(r"\b(il|elle|lui|son|sa|ses|leur)\b", texte) and any(keyword in historique_text for keyword in ["pascal", "kambou", "portfolio", "projet", "projets", "compétences", "certifications", "formations"]):
            return True
        if any(term in texte for term in ["ia", "ai", "intelligence artificielle", "machine learning", "deep learning", "nlp", "gpt", "llm", "expertise"]) and any(keyword in historique_text for keyword in ["pascal", "kambou", "portfolio", "assistant"]):
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
