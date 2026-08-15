import { useCallback } from 'react';
import { LandingHeader } from './LandingHeader';
import { Hero } from './Hero';
import { FeatureStrip } from './FeatureStrip';
import { StatsSection } from './StatsSection';
import { AssistantSection } from './AssistantSection';
import { CampusExperience } from './CampusExperience';
import { FinalCTA } from './FinalCTA';
import { LandingFooter } from './LandingFooter';
import './landing.css';

interface LandingPageProps {
  onLaunchMap: () => void;
  onFacultyPortal: () => void;
}

export function LandingPage({ onLaunchMap, onFacultyPortal }: LandingPageProps) {
  const scrollTo = useCallback((target: string) => {
    if (target === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const node = document.getElementById(target);
    if (node) {
      node.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const askAssistant = useCallback(() => scrollTo('assistant'), [scrollTo]);

  return (
    <div className="dishaa-landing">
      <LandingHeader onLaunchMap={onLaunchMap} onNavigate={scrollTo} onFacultyPortal={onFacultyPortal} />

      <main className="lp-shell">
        <Hero onLaunchMap={onLaunchMap} onAskAssistant={askAssistant} onFacultyPortal={onFacultyPortal} />

        <div className="lp-panels">
          <FeatureStrip />
          <StatsSection />
        </div>

        <AssistantSection onLaunchMap={onLaunchMap} />
        <CampusExperience onLaunchMap={onLaunchMap} />
        <FinalCTA onLaunchMap={onLaunchMap} onAskAssistant={askAssistant} />
      </main>

      <LandingFooter
        onNavigate={scrollTo}
        onLaunchMap={onLaunchMap}
        onAskAssistant={askAssistant}
        onFacultyPortal={onFacultyPortal}
      />
    </div>
  );
}
