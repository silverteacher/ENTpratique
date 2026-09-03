export const CATEGORIES = {
  communication: { label: 'Communication', color: '#2563EB' },
  collaboration: { label: 'Collaboration', color: '#059669' },
  creation: { label: 'Création', color: '#D97706' },
  evaluation: { label: 'Évaluation', color: '#7C3AED' },
  discussion: { label: 'Discussion', color: '#DB2777' },
};

export const TOOLS = [
  {
    id: 'messagerie',
    name: 'Messagerie',
    category: 'communication',
    difficulty: 1,
    summary: 'Communiquer avec la classe en temps réel.',
    description:
      "La messagerie interne permet d'échanger individuellement ou en groupe avec les élèves et les familles, avec un historique conservé et une traçabilité complète.",
    tips: [
      "Crée un groupe par classe pour centraliser les annonces",
      'Utilise les pièces jointes pour partager des consignes',
      'Active les accusés de lecture pour les messages importants',
    ],
    useCases: ['Annoncer un devoir', 'Envoyer un retour individuel', 'Communiquer avec les familles'],
  },
  {
    id: 'murCollaboratif',
    name: 'Mur collaboratif',
    category: 'collaboration',
    difficulty: 2,
    summary: 'Brainstormer en temps réel avec toute la classe.',
    description:
      "Un espace visuel partagé où chaque élève peut poster des idées, des images ou des liens. Idéal pour visualiser une réflexion collective en direct.",
    tips: [
      'Pose une question ouverte comme point de départ',
      'Organise les contributions par colonnes thématiques',
      'Utilise le vote pour faire émerger les idées prioritaires',
    ],
    useCases: ['Remue-méninges collectif', 'Carte des connaissances', 'Retours de fin de séquence'],
  },
  {
    id: 'minetest',
    name: 'Minetest',
    category: 'creation',
    difficulty: 3,
    summary: 'Construire des mondes 3D pédagogiques.',
    description:
      "Environnement de construction 3D façon bac à sable, exploitable pour des projets transdisciplinaires : géométrie, urbanisme, histoire, physique.",
    tips: [
      'Commence par un monde restreint pour cadrer le projet',
      'Fixe des contraintes de construction claires',
      'Prévoit une phase de visite/présentation collective',
    ],
    useCases: ['Modélisation géométrique', 'Reconstitution historique', 'Projet interdisciplinaire'],
  },
  {
    id: 'geogebra',
    name: 'GeoGebra',
    category: 'creation',
    difficulty: 2,
    summary: 'Créer des figures mathématiques interactives.',
    description:
      "Logiciel de géométrie dynamique permettant de construire, manipuler et partager des figures interactives en mathématiques et en physique.",
    tips: [
      'Partage tes constructions comme point de départ',
      'Laisse les élèves manipuler avant de conclure',
      'Combine avec un exercice pour vérifier la compréhension',
    ],
    useCases: ['Démonstration géométrique', 'Exploration de fonctions', 'Modélisation physique'],
  },
  {
    id: 'exercices',
    name: 'Exercices',
    category: 'evaluation',
    difficulty: 2,
    summary: 'Créer des quiz auto-corrigés.',
    description:
      "Générateur d'exercices interactifs avec correction automatique et retours immédiats, exploitable en évaluation formative ou sommative.",
    tips: [
      'Varie les types de questions (QCM, texte à trous, appariement)',
      'Rédige des retours explicatifs, pas seulement juste/faux',
      "Réutilise les résultats pour ajuster ta séquence",
    ],
    useCases: ['Contrôle de connaissances', 'Entraînement autonome', 'Diagnostic de début de séquence'],
  },
  {
    id: 'forum',
    name: 'Forum',
    category: 'discussion',
    difficulty: 2,
    summary: 'Ouvrir une discussion asynchrone structurée.',
    description:
      "Espace de discussion en fils, adapté aux échanges qui demandent du recul et une participation étalée dans le temps.",
    tips: [
      'Pose une question qui ouvre le débat plutôt qu\'une question fermée',
      'Fixe des règles de modération claires dès le départ',
      'Relance les fils qui stagnent avec une question de suivi',
    ],
    useCases: ['Débat argumenté', 'Questions/réponses permanentes', 'Retour réflexif sur un projet'],
  },
  {
    id: 'cahierTextes',
    name: 'Cahier de textes',
    category: 'communication',
    difficulty: 1,
    summary: 'Consigner devoirs et progression du cours.',
    description:
      "Journal de bord officiel de la classe : contenu des séances, devoirs, ressources associées. Consultable par les élèves et les familles.",
    tips: [
      'Renseigne le cahier immédiatement après chaque séance',
      'Ajoute les ressources utilisées en pièce jointe',
      'Utilise-le comme trace pour préparer les évaluations',
    ],
    useCases: ['Suivi du programme', 'Communication des devoirs', 'Trace pour les absents'],
  },
  {
    id: 'pad',
    name: 'Pad',
    category: 'collaboration',
    difficulty: 2,
    summary: "Rédiger à plusieurs mains en simultané.",
    description:
      "Éditeur de texte collaboratif en temps réel : plusieurs élèves peuvent écrire, corriger et commenter le même document simultanément.",
    tips: [
      'Répartis les sections avant de démarrer la rédaction',
      "Utilise les couleurs d'auteur pour suivre les contributions",
      'Prévois un temps de relecture collective en fin de séance',
    ],
    useCases: ['Écriture collaborative', 'Compte-rendu de groupe', 'Rédaction collective de synthèse'],
  },
  {
    id: 'sondage',
    name: 'Sondage',
    category: 'evaluation',
    difficulty: 1,
    summary: 'Recueillir un avis ou un état des lieux en quelques clics.',
    description:
      "Outil de vote rapide pour recueillir les avis, faire un diagnostic instantané ou prendre une décision collective.",
    tips: [
      'Limite-toi à des questions courtes et sans ambiguïté',
      'Affiche les résultats en direct pour dynamiser la séance',
      "Utilise-le en ouverture pour évaluer les représentations initiales",
    ],
    useCases: ['Évaluation rapide', "Prise de décision collective", 'Diagnostic en début de séquence'],
  },
  {
    id: 'blog',
    name: 'Blog',
    category: 'creation',
    difficulty: 2,
    summary: 'Publier les productions de la classe.',
    description:
      "Espace de publication en ligne pour valoriser les travaux d'élèves auprès d'un public élargi (classe, établissement, familles).",
    tips: [
      'Définis une ligne éditoriale claire avec la classe',
      'Mets en place un circuit de relecture avant publication',
      'Varie les formats : texte, image, audio, vidéo',
    ],
    useCases: ['Valorisation de productions', 'Journal de classe', 'Portfolio de projet'],
  },
  {
    id: 'visio',
    name: 'Visioconférence',
    category: 'communication',
    difficulty: 2,
    summary: 'Organiser une classe ou une réunion à distance.',
    description:
      "Outil de visioconférence intégré pour les cours à distance, le soutien individualisé ou les réunions avec les familles.",
    tips: [
      'Teste la connexion et le partage d\'écran avant la séance',
      'Prévois une modalité de participation pour les élèves silencieux (chat)',
      'Enregistre la séance si elle doit être revue',
    ],
    useCases: ['Classe à distance', 'Réunion avec les familles', 'Soutien individualisé'],
  },
  {
    id: 'statistiques',
    name: 'Statistiques',
    category: 'evaluation',
    difficulty: 2,
    summary: "Analyser l'activité et les résultats de la classe.",
    description:
      "Tableaux de bord synthétisant l'usage des outils et les résultats aux évaluations, pour ajuster sa pratique en continu.",
    tips: [
      'Croise les données de connexion avec les résultats',
      'Utilise les tendances pour identifier les élèves en difficulté',
      "Partage une synthèse en conseil de classe",
    ],
    useCases: ['Suivi de la progression', 'Analyse de résultats', 'Pilotage pédagogique'],
  },
];

export function getToolById(id) {
  return TOOLS.find((tool) => tool.id === id);
}
