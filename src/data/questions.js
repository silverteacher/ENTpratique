export const QUESTIONS = [
  {
    id: 'need',
    text: 'Quel est votre besoin principal ?',
    options: [
      { label: 'Communiquer avec la classe', value: 'communication' },
      { label: 'Créer du contenu', value: 'creation' },
      { label: 'Faire collaborer les élèves', value: 'collaboration' },
      { label: 'Évaluer les apprentissages', value: 'evaluation' },
      { label: 'Ouvrir une discussion', value: 'discussion' },
    ],
  },
  {
    id: 'scale',
    text: "Combien d'élèves sont impliqués ?",
    options: [
      { label: 'Travail individuel', value: 'individual' },
      { label: 'Petit groupe (2 à 5)', value: 'small' },
      { label: 'Classe entière', value: 'large' },
    ],
  },
  {
    id: 'time',
    text: 'De combien de temps disposez-vous ?',
    options: [
      { label: 'Un temps court (15 min)', value: 'quick' },
      { label: 'Une séance (30-45 min)', value: 'medium' },
      { label: 'Un projet sur plusieurs séances', value: 'long' },
    ],
  },
  {
    id: 'difficulty',
    text: "Quel niveau de prise en main souhaitez-vous ?",
    options: [
      { label: 'Simple, pas de courbe d\'apprentissage', value: 1 },
      { label: "Intermédiaire, ça peut se préparer un peu", value: 2 },
      { label: "Peu importe, je veux le meilleur outil", value: 3 },
    ],
  },
];
