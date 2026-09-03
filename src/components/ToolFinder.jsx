import { useMemo, useState } from 'react';
import { QUESTIONS } from '../data/questions';
import { TOOLS } from '../data/tools';
import PageHeader from './PageHeader';
import ToolCard from './ToolCard';
import './ToolFinder.css';

function scoreTool(tool, answers) {
  let score = 0;
  if (answers.need && tool.category === answers.need) score += 4;
  if (answers.difficulty) {
    score += 2 - Math.abs(tool.difficulty - answers.difficulty);
  }
  return score;
}

export default function ToolFinder({ progress, onOpenTool }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = QUESTIONS[step];
  const isLastStep = step === QUESTIONS.length - 1;
  const answeredCurrent = answers[currentQuestion?.id] !== undefined;

  const results = useMemo(() => {
    if (!showResults) return [];
    return [...TOOLS]
      .map((tool) => ({ tool, score: scoreTool(tool, answers) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 4)
      .map((r) => r.tool);
  }, [showResults, answers]);

  function selectOption(value) {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
  }

  function goNext() {
    if (isLastStep) {
      setShowResults(true);
    } else {
      setStep((s) => s + 1);
    }
  }

  function goBack() {
    if (step === 0) return;
    setStep((s) => s - 1);
  }

  function restart() {
    setAnswers({});
    setStep(0);
    setShowResults(false);
  }

  if (showResults) {
    return (
      <div>
        <PageHeader
          title="Recommandations"
          subtitle="Ces outils correspondent le mieux aux réponses fournies."
          action={
            <button className="btn btn-secondary" onClick={restart}>
              Recommencer
            </button>
          }
        />
        <div className="finder-results">
          {results.map((tool) => (
            <ToolCard
              key={tool.id}
              tool={tool}
              discovered={progress.discoveredTools.has(tool.id)}
              onOpen={onOpenTool}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title="Trouver un outil"
        subtitle="Répondez à quelques questions pour affiner la recommandation."
      />

      <div className="finder-stepper">
        {QUESTIONS.map((q, idx) => (
          <div key={q.id} className={`finder-step-dot${idx <= step ? ' active' : ''}`} />
        ))}
      </div>

      <div className="card finder-card">
        <div className="finder-step-label">
          Étape {step + 1} / {QUESTIONS.length}
        </div>
        <h2 className="finder-question">{currentQuestion.text}</h2>

        <div className="finder-options">
          {currentQuestion.options.map((opt) => (
            <button
              key={opt.value}
              className={`finder-option${answers[currentQuestion.id] === opt.value ? ' selected' : ''}`}
              onClick={() => selectOption(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className="finder-nav">
          <button className="btn btn-secondary" onClick={goBack} disabled={step === 0}>
            Précédent
          </button>
          <button className="btn btn-primary" onClick={goNext} disabled={!answeredCurrent}>
            {isLastStep ? 'Voir les recommandations' : 'Suivant'}
          </button>
        </div>
      </div>
    </div>
  );
}
