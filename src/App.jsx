import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import MobileNav from './components/MobileNav';
import Overview from './components/Overview';
import ToolFinder from './components/ToolFinder';
import ToolLibrary from './components/ToolLibrary';
import Combos from './components/Combos';
import Challenges from './components/Challenges';
import ToolDetailPanel from './components/ToolDetailPanel';
import { TOOLS } from './data/tools';
import { useProgress } from './hooks/useProgress';
import './App.css';

export default function App() {
  const { progress, discoverTool, completeChallenge, exploreCombo } = useProgress();
  const [activeTool, setActiveTool] = useState(null);

  return (
    <div className="app-shell">
      <Sidebar toolsExploredCount={progress.discoveredTools.size} totalTools={TOOLS.length} />

      <main className="app-content">
        <MobileNav />
        <div className="app-content-inner">
          <Routes>
            <Route path="/" element={<Overview progress={progress} />} />
            <Route
              path="/trouver"
              element={<ToolFinder progress={progress} onOpenTool={setActiveTool} />}
            />
            <Route
              path="/bibliotheque"
              element={<ToolLibrary progress={progress} onOpenTool={setActiveTool} />}
            />
            <Route path="/combos" element={<Combos progress={progress} onExplore={exploreCombo} />} />
            <Route
              path="/defis"
              element={<Challenges progress={progress} onComplete={completeChallenge} />}
            />
          </Routes>
        </div>
      </main>

      <ToolDetailPanel
        tool={activeTool}
        discovered={activeTool ? progress.discoveredTools.has(activeTool.id) : false}
        onClose={() => setActiveTool(null)}
        onMarkExplored={discoverTool}
      />
    </div>
  );
}
