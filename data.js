// Données des outils ENT
const TOOLS = {
  messagerie: {
    id: 'messagerie',
    name: 'Messagerie',
    icon: '💬',
    category: 'communication',
    difficulty: 1,
    description: 'Communiquer avec ta classe en temps réel',
    tips: ['Crée un groupe de classe pour tous les messages', 'Utilise les pièces jointes pour partager des ressources'],
    useCases: ['Annoncer un devoir', 'Envoyer des feedbacks individuels']
  },

  mutCollab: {
    id: 'mutCollab',
    name: 'Mur Collaboratif',
    icon: '🧱',
    category: 'collaboration',
    difficulty: 2,
    description: 'Brainstorme avec tes élèves en temps réel',
    tips: ['Pose une question et laisse les élèves répondre sur le mur', 'Votez ensemble pour les meilleures idées'],
    useCases: ['Remue-méninges collectif', 'Créer une fresque interactive']
  },

  minetest: {
    id: 'minetest',
    name: 'Minetest',
    icon: '⛏️',
    category: 'creation',
    difficulty: 3,
    description: 'Crée des mondes 3D immersifs avec tes élèves',
    tips: ['Commencez par explorer un monde simple', 'Créez des défis de construction'],
    useCases: ['Projet de mathématiques en 3D', 'Histoire/géographie immersive']
  },

  geogebra: {
    id: 'geogebra',
    name: 'GeoGebra',
    icon: '📐',
    category: 'creation',
    difficulty: 2,
    description: 'Crée des figures géométriques interactives',
    tips: ['Partage tes créations avec les élèves', 'Laisse-les modifier et explorer'],
    useCases: ['Mathématiques géométriques', 'Démonstrations dynamiques']
  },

  exercices: {
    id: 'exercices',
    name: 'Exercices',
    icon: '✏️',
    category: 'evaluation',
    difficulty: 2,
    description: 'Crée des quiz et exercices auto-corrigés',
    tips: ['Mélange les types de questions', 'Utilise les retours pour guider les élèves'],
    useCases: ['Quiz de contrôle', 'Entraînement en auto-correction']
  },

  forum: {
    id: 'forum',
    name: 'Forum',
    icon: '💭',
    category: 'discussion',
    difficulty: 2,
    description: 'Créez un espace de discussion asynchrone',
    tips: ['Posez une question engageante', 'Modérez les discussions respectueuses'],
    useCases: ['Débats pédagogiques', 'Questions/réponses permanentes']
  },

  cahierTextes: {
    id: 'cahierTextes',
    name: 'Cahier de textes',
    icon: '📝',
    category: 'communication',
    difficulty: 1,
    description: 'Enregistre tes devoirs et leçons',
    tips: ['Mets à jour chaque jour', 'Ajoute des ressources complémentaires'],
    useCases: ['Documenter le programme', 'Suivre la progression']
  },

  pad: {
    id: 'pad',
    name: 'Pad',
    icon: '📄',
    category: 'collaboration',
    difficulty: 2,
    description: 'Écrivez ensemble en temps réel',
    tips: ['Parfait pour les projets textuels', 'Tous les élèves voient les modifications'],
    useCases: ['Écriture collaborative', 'Création collective de contenu']
  },

  sondage: {
    id: 'sondage',
    name: 'Sondage',
    icon: '📊',
    category: 'evaluation',
    difficulty: 1,
    description: 'Recueille rapidement les avis',
    tips: ['Pose des questions claires', 'Utilisez pour faire du diagnostic'],
    useCases: ['Évaluation rapide', 'Recueillir des avis']
  },

  blog: {
    id: 'blog',
    name: 'Blog',
    icon: '📰',
    category: 'creation',
    difficulty: 2,
    description: 'Crée un espace de publication pour ta classe',
    tips: ['Publie les meilleures productions élèves', 'Crée une communauté de lecteurs'],
    useCases: ['Partager des créations', 'Journal de classe en ligne']
  },

  visio: {
    id: 'visio',
    name: 'Visio-conférence',
    icon: '📹',
    category: 'communication',
    difficulty: 2,
    description: 'Organise des classes virtuelles',
    tips: ['Testez la connexion avant', 'Utilisez pour les explications en direct'],
    useCases: ['Classes virtuelles', 'Réunions parents']
  },

  statistiques: {
    id: 'statistiques',
    name: 'Statistiques',
    icon: '📈',
    category: 'evaluation',
    difficulty: 2,
    description: 'Analyse les données de ta classe',
    tips: ['Voyez les tendances d\'apprentissage', 'Adaptez selon les résultats'],
    useCases: ['Suivre les progrès', 'Analyser les résultats']
  }
};

// Questions du questionnaire
const QUESTIONS = [
  {
    id: 1,
    text: 'Quel est ton besoin principal ?',
    options: [
      { text: 'Communiquer avec ma classe', value: 'communication' },
      { text: 'Créer du contenu innovant', value: 'creation' },
      { text: 'Faire collaborer les élèves', value: 'collaboration' },
      { text: 'Évaluer les apprentissages', value: 'evaluation' }
    ]
  },
  {
    id: 2,
    text: 'Combien d\'élèves impliqués ?',
    options: [
      { text: 'Travail individuel', value: 'individual' },
      { text: 'Petit groupe (2-5)', value: 'small' },
      { text: 'Toute la classe (15+)', value: 'large' }
    ]
  },
  {
    id: 3,
    text: 'Veux-tu du contenu interactif ?',
    options: [
      { text: 'Oui, très ludique !', value: 'interactive' },
      { text: 'Un peu, simplement', value: 'simple' },
      { text: 'Non, je préfère les textes', value: 'text' }
    ]
  },
  {
    id: 4,
    text: 'Combien de temps disponible ?',
    options: [
      { text: 'Rapide (15 min)', value: 'quick' },
      { text: 'Moyen (30-45 min)', value: 'medium' },
      { text: 'Long projet (plusieurs heures)', value: 'long' }
    ]
  }
];

// Combos d'outils
const TOOL_COMBOS = [
  {
    name: 'Débat numérique',
    tools: ['mutCollab', 'forum', 'sondage'],
    description: 'Brainstorm → Débat → Vote des meilleurs idées',
    difficulty: 'Moyen',
    xpReward: 100
  },
  {
    name: 'Création collaborative',
    tools: ['pad', 'blog', 'messagerie'],
    description: 'Écrivez ensemble → Publiez → Partagez avec la classe',
    difficulty: 'Moyen',
    xpReward: 100
  },
  {
    name: 'Projet immersif',
    tools: ['minetest', 'geogebra', 'cahierTextes'],
    description: 'Construisez → Découvrez → Documentez',
    difficulty: 'Difficile',
    xpReward: 150
  },
  {
    name: 'Classe virtuelle',
    tools: ['visio', 'messagerie', 'cahierTextes'],
    description: 'Connectez-vous → Enseignez → Laissez une trace',
    difficulty: 'Facile',
    xpReward: 50
  },
  {
    name: 'Évaluation complète',
    tools: ['exercices', 'statistiques', 'sondage'],
    description: 'Testez → Analysez → Adaptez',
    difficulty: 'Moyen',
    xpReward: 120
  }
];

// Challenges pédagogiques
const CHALLENGES = [
  {
    id: 1,
    title: '🚀 Défi du jour: Brainstorm créatif',
    description: 'Lance un brainstorm avec Mur Collaboratif + Sondage',
    difficulty: 'Facile',
    xpReward: 50,
    tips: ['Crée une question ouverture', 'Utilisez le vote pour les meilleures idées']
  },
  {
    id: 2,
    title: '🎨 Projet créatif: Monde immersif',
    description: 'Crée un monde avec Minetest ou GeoGebra',
    difficulty: 'Difficile',
    xpReward: 150,
    tips: ['Commencez simple', 'Laissez les élèves explorer']
  },
  {
    id: 3,
    title: '📚 Écriture collaborative',
    description: 'Crée un document collectif avec Pad puis publie sur Blog',
    difficulty: 'Moyen',
    xpReward: 100,
    tips: ['Divisez par chapitre', 'Relisez ensemble avant publication']
  },
  {
    id: 4,
    title: '🏆 Débat numérique',
    description: 'Organise un débat structuré avec Forum + Sondage',
    difficulty: 'Moyen',
    xpReward: 100,
    tips: ['Posez une question controverse', 'Modérez respectueusement']
  }
];

// Surprises pédagogiques
const SURPRISES = [
  'Et si tu mélangeais Minetest + Histoire pour un projet immersif ?',
  'Essaie le Pad pour les contrôles en classe - c\'est collaboratif !',
  'GeoGebra + Exercices = une belle démonstration interactive',
  'Mur Collaboratif est parfait pour les remue-méninges en 5 min',
  'Crée un blog pour valoriser les meilleures créations élèves',
  'Forum + Statistiques : voyez les tendances des discussions',
  'Minetest : tes élèves construisent avec des maths (volumes, distances)',
  'Sondage + Messagerie : votez ensemble sur la direction du cours',
  'Pad pour l\'écriture collaborative - tous écrivent simultanément !',
  'GeoGebra comme démonstration avant l\'exercice auto-corrigé'
];

// Niveaux et progression
const LEVELS = [
  { level: 1, xpRequired: 0, title: 'Novice', icon: '🌱' },
  { level: 2, xpRequired: 100, title: 'Apprenti', icon: '📚' },
  { level: 3, xpRequired: 250, title: 'Explorateur', icon: '🔭' },
  { level: 4, xpRequired: 450, title: 'Expert', icon: '⭐' },
  { level: 5, xpRequired: 700, title: 'Maître', icon: '👑' }
];

// Badges spécialisés
const BADGES = {
  communication: { name: 'Maitre Communicateur', icon: '💬👑', tools: ['messagerie', 'visio', 'cahierTextes'] },
  collaboration: { name: 'Alchimiste Collectif', icon: '🤝✨', tools: ['mutCollab', 'pad', 'forum'] },
  creation: { name: 'Créateur Numérique', icon: '🎨✨', tools: ['minetest', 'geogebra', 'blog'] },
  evaluation: { name: 'Analyseur de Talents', icon: '🔍⭐', tools: ['exercices', 'statistiques', 'sondage'] },
  discovery: { name: 'Explorateur Curieux', icon: '🔭🌟', tools: ['forum', 'blog', 'visio'] }
};
