// État de l'application
const state = {
  currentTab: 'quest',
  userLevel: 1,
  userXP: 0,
  streak: 3,
  discoveredTools: new Set(['messagerie']),
  toolsWithBadges: {},
  questAnswers: {},
  completedChallenges: new Set(),
  dailySurprise: null
};

// Utilitaires
function getLevel(xp) {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].xpRequired) {
      return LEVELS[i];
    }
  }
  return LEVELS[0];
}

function getXPToNextLevel(xp) {
  const currentLevel = getLevel(xp);
  const nextLevel = LEVELS[currentLevel.level] || LEVELS[LEVELS.length - 1];
  return nextLevel.xpRequired - xp;
}

function getRandomSurprise() {
  return SURPRISES[Math.floor(Math.random() * SURPRISES.length)];
}

function getSuggestedTools(answers) {
  const suggestions = [];
  const needType = answers.need || 'communication';

  Object.values(TOOLS).forEach(tool => {
    if (tool.category === needType) {
      suggestions.push(tool);
    }
  });

  return suggestions.sort((a, b) => a.difficulty - b.difficulty);
}

function addXP(amount) {
  state.userXP += amount;
  const newLevel = getLevel(state.userXP);
  if (newLevel.level > state.userLevel) {
    state.userLevel = newLevel.level;
    return true; // Level up!
  }
  return false;
}

// Rendu des composants
function renderHeader() {
  const currentLevel = getLevel(state.userXP);
  const nextLevel = LEVELS[Math.min(currentLevel.level, LEVELS.length - 1)];
  const xpToNext = getXPToNextLevel(state.userXP);
  const xpInLevel = state.userXP - (LEVELS[currentLevel.level - 1]?.xpRequired || 0);
  const xpForLevel = (nextLevel.xpRequired || state.userXP + 1000) - (LEVELS[currentLevel.level - 1]?.xpRequired || 0);
  const xpPercentage = (xpInLevel / xpForLevel) * 100;

  return `
    <div class="header">
      <div class="logo">🎓 Aventure <span>ENT</span></div>
      <div class="user-stats">
        <div class="stat">
          <div class="icon">${currentLevel.icon}</div>
          <div>
            <div>${currentLevel.title}</div>
            <div style="font-size: 12px; opacity: 0.7;">Niveau ${currentLevel.level}</div>
          </div>
        </div>
        <div class="stat">
          <div class="icon">⭐</div>
          <div>${state.userXP} XP</div>
        </div>
        <div class="stat">
          <div class="icon">🔥</div>
          <div>${state.streak} jours</div>
        </div>
        <div style="display: flex; flex-direction: column; gap: 5px; width: 150px;">
          <div style="font-size: 12px; font-weight: 600;">Vers Niveau ${currentLevel.level + 1}</div>
          <div class="xp-bar">
            <div class="xp-fill" style="width: ${xpPercentage}%"></div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderNavTabs() {
  const tabs = [
    { id: 'quest', label: '🗺️ Quête du jour', icon: '🗺️' },
    { id: 'combos', label: '✨ Combos', icon: '✨' },
    { id: 'challenges', label: '🚀 Challenges', icon: '🚀' },
    { id: 'surprise', label: '🎁 Surprise', icon: '🎁' }
  ];

  return `
    <div class="nav-tabs">
      ${tabs.map(tab => `
        <button class="nav-tab ${state.currentTab === tab.id ? 'active' : ''}"
                onclick="switchTab('${tab.id}')">
          ${tab.label}
        </button>
      `).join('')}
    </div>
  `;
}

function renderQuestTab() {
  if (Object.keys(state.questAnswers).length === 0) {
    return renderQuestionnaire();
  } else {
    return renderQuestResults();
  }
}

function renderQuestionnaire() {
  return `
    <div class="quest-section slide-in">
      <div class="quest-header">
        <div class="quest-icon">🗺️</div>
        <div>
          <div class="quest-title">Quelle est ton aventure aujourd'hui ?</div>
          <div class="quest-description">Réponds à quelques questions pour trouver l'outil parfait</div>
        </div>
      </div>

      ${QUESTIONS.map((q, idx) => `
        <div class="question-card">
          <div class="question-text">${idx + 1}. ${q.text}</div>
          <div class="options">
            ${q.options.map(opt => `
              <button class="option-btn ${state.questAnswers[q.id] === opt.value ? 'selected' : ''}"
                      onclick="answerQuestion(${q.id}, '${opt.value}')">
                ${opt.text}
              </button>
            `).join('')}
          </div>
        </div>
      `).join('')}

      <button class="btn btn-primary" onclick="completeQuest()"
              ${Object.keys(state.questAnswers).length < QUESTIONS.length ? 'disabled' : ''}>
        🎯 Voir mes recommandations
      </button>
    </div>
  `;
}

function renderQuestResults() {
  const suggestedTools = getSuggestedTools(state.questAnswers);

  return `
    <div class="quest-section slide-in">
      <div class="recommendation">
        <div class="recommendation-title">🎯 Tes outils recommandés</div>
        <div class="recommendation-description">
          Basé sur tes réponses, voici les meilleures options pour ${
            state.questAnswers.need === 'communication' ? 'communiquer' :
            state.questAnswers.need === 'creation' ? 'créer du contenu' :
            state.questAnswers.need === 'collaboration' ? 'faire collaborer' :
            'évaluer'
          }
        </div>
      </div>

      ${suggestedTools.slice(0, 3).map(tool => `
        <div class="tool-card">
          <div class="tool-header">
            <div class="tool-icon">${tool.icon}</div>
            <div>
              <div class="tool-name">${tool.name}</div>
              <div style="color: #666; font-size: 13px;">
                Difficulté: ${'⭐'.repeat(tool.difficulty)}
              </div>
            </div>
          </div>
          <div class="tool-description">${tool.description}</div>
          <div class="tool-tips">
            <div class="tips-title">Astuces d'utilisation:</div>
            <ul class="tips-list">
              ${tool.tips.map(tip => `<li>${tip}</li>`).join('')}
            </ul>
          </div>
          <div class="tool-tips" style="background: #E8F5E9; margin-top: 15px;">
            <div class="tips-title">Cas d'usage parfait:</div>
            <ul class="tips-list">
              ${tool.useCases.map(use => `<li style="color: #2E7D32;">${use}</li>`).join('')}
            </ul>
          </div>
          <button class="btn btn-secondary" onclick="discoverTool('${tool.id}')">
            ${state.discoveredTools.has(tool.id) ? '✅ Déjà découvert' : '🔍 Découvrir ce tool'}
          </button>
        </div>
      `).join('')}

      <button class="btn btn-primary" onclick="resetQuest()">
        🔄 Refaire le questionnaire
      </button>
    </div>
  `;
}

function renderCombosTab() {
  return `
    <div class="quest-section slide-in">
      <div class="quest-header">
        <div class="quest-icon">✨</div>
        <div>
          <div class="quest-title">Combos Magiques</div>
          <div class="quest-description">Découvre comment combiner 2-3 outils pour des superpouvoir pédagogiques</div>
        </div>
      </div>

      <div class="combo-grid">
        ${TOOL_COMBOS.map(combo => `
          <div class="combo-card" onclick="unlockCombo('${combo.name}')">
            <div class="combo-name">${combo.name}</div>
            <div class="combo-tools">
              ${combo.tools.map(toolId => `
                <div class="combo-tool-badge">${TOOLS[toolId].icon} ${TOOLS[toolId].name}</div>
              `).join('')}
            </div>
            <div class="combo-description">${combo.description}</div>
            <div style="margin-top: 10px; padding-top: 10px; border-top: 1px solid rgba(255,255,255,0.2); position: relative; z-index: 1;">
              <span style="background: rgba(255,255,255,0.3); padding: 4px 8px; border-radius: 5px; font-size: 12px;">
                +${combo.xpReward} XP
              </span>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderChallengesTab() {
  return `
    <div class="quest-section slide-in">
      <div class="quest-header">
        <div class="quest-icon">🚀</div>
        <div>
          <div class="quest-title">Challenges Pédagogiques</div>
          <div class="quest-description">Des défis pour tester ta créativité et ton innovation</div>
        </div>
      </div>

      ${CHALLENGES.map(challenge => `
        <div class="challenge-card">
          <div class="challenge-title">${challenge.title}</div>
          <div class="challenge-description">${challenge.description}</div>
          <div class="challenge-meta">
            <div class="difficulty-badge">
              ${challenge.difficulty === 'Facile' ? '🟢' : challenge.difficulty === 'Moyen' ? '🟡' : '🔴'}
              ${challenge.difficulty}
            </div>
            <div class="xp-reward">⭐ ${challenge.xpReward} XP</div>
          </div>
          <div class="tool-tips">
            <div class="tips-title">Conseils:</div>
            <ul class="tips-list">
              ${challenge.tips.map(tip => `<li>${tip}</li>`).join('')}
            </ul>
          </div>
          <button class="btn btn-secondary" onclick="completeChallenge(${challenge.id})">
            ${state.completedChallenges.has(challenge.id) ? '✅ Complété' : '🎯 Relever le défi'}
          </button>
        </div>
      `).join('')}
    </div>
  `;
}

function renderSurpriseTab() {
  const surprise = state.dailySurprise || getRandomSurprise();

  return `
    <div class="quest-section slide-in">
      <div class="surprise-section">
        <div class="surprise-icon">🎁</div>
        <div class="surprise-title">Surprise du jour</div>
        <div class="surprise-text">${surprise}</div>
        <button class="btn" style="background: rgba(255,255,255,0.3); color: white; margin-top: 20px;"
                onclick="renderSurpriseTab(); render()">
          🎲 Nouvelle surprise
        </button>
      </div>

      <div style="margin-top: 30px;">
        <h3 style="color: white; margin-bottom: 15px;">✨ Outils à découvrir</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px;">
          ${Array.from(state.discoveredTools).map(toolId => {
            const tool = TOOLS[toolId];
            return `
              <div style="background: white; padding: 15px; border-radius: 10px; text-align: center; box-shadow: 0 4px 15px rgba(0,0,0,0.1);">
                <div style="font-size: 30px; margin-bottom: 10px;">${tool.icon}</div>
                <div style="font-weight: 600; color: #333; font-size: 14px;">${tool.name}</div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    </div>
  `;
}

// Fonctions d'interaction
function switchTab(tabId) {
  state.currentTab = tabId;
  render();
}

function answerQuestion(questionId, value) {
  state.questAnswers[questionId] = value;
  render();
}

function completeQuest() {
  addXP(50);
  render();
}

function resetQuest() {
  state.questAnswers = {};
  render();
}

function discoverTool(toolId) {
  if (!state.discoveredTools.has(toolId)) {
    state.discoveredTools.add(toolId);
    addXP(25);
    showNotification(`🎉 Outil découvert: ${TOOLS[toolId].name}!`);
  }
  render();
}

function unlockCombo(comboName) {
  const combo = TOOL_COMBOS.find(c => c.name === comboName);
  if (combo) {
    addXP(combo.xpReward);
    showNotification(`✨ Combo débloquée: ${comboName}!`);
  }
  render();
}

function completeChallenge(challengeId) {
  if (!state.completedChallenges.has(challengeId)) {
    const challenge = CHALLENGES.find(c => c.id === challengeId);
    const leveledUp = addXP(challenge.xpReward);
    state.completedChallenges.add(challengeId);

    if (leveledUp) {
      const newLevel = getLevel(state.userXP);
      showNotification(`🎉 LEVEL UP! Tu es maintenant ${newLevel.title} (Niveau ${newLevel.level})`);
    } else {
      showNotification(`✅ Challenge complété! +${challenge.xpReward} XP`);
    }
  }
  render();
}

function showNotification(message) {
  const notif = document.createElement('div');
  notif.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 8px 30px rgba(0,0,0,0.2);
    font-weight: 600;
    z-index: 1000;
    animation: slideIn 0.3s ease-out;
  `;
  notif.textContent = message;
  document.body.appendChild(notif);

  setTimeout(() => {
    notif.style.animation = 'fadeOut 0.3s ease-out';
    setTimeout(() => notif.remove(), 300);
  }, 3000);
}

// Rendu principal
function render() {
  const app = document.getElementById('app');

  let content = renderHeader() + renderNavTabs();

  const container = `<div class="container">`;

  switch (state.currentTab) {
    case 'quest':
      content += container + renderQuestTab() + `</div>`;
      break;
    case 'combos':
      content += container + renderCombosTab() + `</div>`;
      break;
    case 'challenges':
      content += container + renderChallengesTab() + `</div>`;
      break;
    case 'surprise':
      content += container + renderSurpriseTab() + `</div>`;
      break;
  }

  app.innerHTML = content;
}

// Initialisation
window.addEventListener('load', () => {
  state.dailySurprise = getRandomSurprise();
  render();
});
