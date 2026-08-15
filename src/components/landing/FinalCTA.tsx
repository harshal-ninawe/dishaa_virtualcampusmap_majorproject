import { IconArrowRight, IconChat } from './icons';
import { useReveal } from './useReveal';

interface FinalCTAProps {
  onLaunchMap: () => void;
  onAskAssistant: () => void;
}

export function FinalCTA({ onLaunchMap, onAskAssistant }: FinalCTAProps) {
  const { ref, isVisible } = useReveal();

  return (
    <section className="lp-final" id="about">
      <div className="lp-container">
        <div ref={ref} className={`lp-final-card lp-reveal ${isVisible ? 'is-visible' : ''}`}>
          <h2>Explore your campus smarter</h2>
          <p>
            Discover places, find your way and get intelligent assistance with DISHAA &mdash; the
            smart virtual navigator for the Raisoni Education campus.
          </p>
          <div className="lp-final-actions">
            <button type="button" className="lp-btn lp-btn-light" onClick={onLaunchMap}>
              Explore Campus Map
              <IconArrowRight size={19} />
            </button>
            <button type="button" className="lp-btn lp-btn-outline-light" onClick={onAskAssistant}>
              <IconChat size={19} />
              Ask DISHAA
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
