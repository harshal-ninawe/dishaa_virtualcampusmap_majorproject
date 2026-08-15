import { IconArrowRight, IconChat, IconLocation, IconSparkle } from './icons';

const HERO_IMAGE = '/CLG.jpeg';

interface HeroProps {
  onLaunchMap: () => void;
  onAskAssistant: () => void;
  onFacultyPortal: () => void;
}

export function Hero({ onLaunchMap, onAskAssistant, onFacultyPortal }: HeroProps) {
  return (
    <section className="lp-hero" id="top">
      <div className="lp-container lp-hero-inner">
        <div className="lp-hero-copy">
          <span className="lp-badge">
            <IconSparkle size={14} />
            Smarter way to navigate
            <IconSparkle size={14} />
          </span>

          <h1 className="lp-hero-title">DISHAA</h1>
          <p className="lp-hero-sub">
            Your Smart Virtual <span className="lp-hero-accent">Campus Navigator</span>
          </p>
          <p className="lp-hero-desc">
            Explore the Raisoni Education campus with interactive maps, real-time
            navigation, and AI-powered assistance.
          </p>

          <div className="lp-hero-actions">
            <button type="button" className="lp-btn lp-btn-primary" onClick={onLaunchMap}>
              Explore Campus Map
              <IconArrowRight size={19} />
            </button>
            <button type="button" className="lp-btn lp-btn-ghost" onClick={onAskAssistant}>
              <IconChat size={19} />
              Ask Assistant
            </button>
          </div>

          <button type="button" className="lp-hero-faculty" onClick={onFacultyPortal}>
            Are you faculty? <b>Open the Faculty Portal &rarr;</b>
          </button>
        </div>

        <div className="lp-hero-visual" aria-hidden="true">
          <img
            className="lp-hero-photo"
            src={HERO_IMAGE || '/placeholder.svg'}
            alt="G H Raisoni College of Engineering and Management campus"
          />
          <span className="lp-hero-fade" />

          <svg className="lp-hero-route" viewBox="0 0 520 420" preserveAspectRatio="none">
            <defs>
              <linearGradient id="lpRouteGrad" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#e9d5ff" />
              </linearGradient>
            </defs>
            <path className="lp-route-glow" d="M60 400 C 190 360, 150 250, 300 240 S 430 210, 470 150" />
            <path className="lp-route-line" d="M60 400 C 190 360, 150 250, 300 240 S 430 210, 470 150" />
          </svg>

          <span className="lp-hero-marker">
            <IconLocation size={22} />
          </span>
        </div>
      </div>
    </section>
  );
}
