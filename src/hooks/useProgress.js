import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'ent-pratique.progress.v1';

function loadInitialState() {
  if (typeof window === 'undefined') return defaultState();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState();
    const parsed = JSON.parse(raw);
    return {
      discoveredTools: new Set(parsed.discoveredTools || []),
      completedChallenges: new Set(parsed.completedChallenges || []),
      exploredCombos: new Set(parsed.exploredCombos || []),
    };
  } catch {
    return defaultState();
  }
}

function defaultState() {
  return {
    discoveredTools: new Set(),
    completedChallenges: new Set(),
    exploredCombos: new Set(),
  };
}

function persist(state) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      discoveredTools: Array.from(state.discoveredTools),
      completedChallenges: Array.from(state.completedChallenges),
      exploredCombos: Array.from(state.exploredCombos),
    })
  );
}

export function useProgress() {
  const [progress, setProgress] = useState(loadInitialState);

  useEffect(() => {
    persist(progress);
  }, [progress]);

  const discoverTool = useCallback((toolId) => {
    setProgress((prev) => {
      if (prev.discoveredTools.has(toolId)) return prev;
      const next = new Set(prev.discoveredTools);
      next.add(toolId);
      return { ...prev, discoveredTools: next };
    });
  }, []);

  const completeChallenge = useCallback((challengeId) => {
    setProgress((prev) => {
      const next = new Set(prev.completedChallenges);
      if (next.has(challengeId)) {
        next.delete(challengeId);
      } else {
        next.add(challengeId);
      }
      return { ...prev, completedChallenges: next };
    });
  }, []);

  const exploreCombo = useCallback((comboId) => {
    setProgress((prev) => {
      if (prev.exploredCombos.has(comboId)) return prev;
      const next = new Set(prev.exploredCombos);
      next.add(comboId);
      return { ...prev, exploredCombos: next };
    });
  }, []);

  return { progress, discoverTool, completeChallenge, exploreCombo };
}
