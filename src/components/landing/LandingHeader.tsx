import { useEffect, useState } from 'react';
import { IconArrowRight, IconClose, IconMenu } from './icons';

export interface NavAction {
  label: string;
  target: string;
}

const NAV_ITEMS: NavAction[] = [
  { label: 'Home', target: 'top' },
  { label: 'Explore Campus', target: 'campus' },
  { label: 'Features', target: 'features' },
  { label: 'Assistant', target: 'assistant' },
  { label: 'About Us', target: 'about' },
  { label: 'Contact', target: 'contact' },
];

interface LandingHeaderProps {
  onLaunchMap: () => void;
  onNavigate: (target: string) => void;
  onFacultyPortal: () => void;
}

export function LandingHeader({ onLaunchMap, onNavigate, onFacultyPortal }: LandingHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return undefined;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isMenuOpen]);

  const go = (target: string) => {
    setIsMenuOpen(false);
    onNavigate(target);
  };

  return (
    <header className={`lp-header ${isScrolled ? 'is-scrolled' : ''}`}>
      <div className="lp-container lp-header-inner">
        <button type="button" className="lp-brand flex items-center" onClick={() => go('top')} aria-label="Raisoni Education home">
          <img src="/rgi-logo.png" alt="Raisoni Education Logo" className="h-10 sm:h-11 w-auto object-contain shrink-0" />
        </button>

        <nav className="lp-nav" aria-label="Primary">
          {NAV_ITEMS.map((item, index) => (
            <button
              key={item.target}
              type="button"
              className={`lp-nav-link ${index === 0 ? 'is-active' : ''}`}
              onClick={() => go(item.target)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="lp-header-cta">
          <button type="button" className="lp-nav-link" onClick={onFacultyPortal}>
            Faculty Portal
          </button>
          <button type="button" className="lp-btn lp-btn-primary lp-btn-sm" onClick={onLaunchMap}>
            <IconArrowRight size={18} />
            Launch Map
          </button>
        </div>

        <button
          type="button"
          className="lp-menu-btn"
          aria-label="Open menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(true)}
        >
          <IconMenu size={22} />
        </button>
      </div>

      {isMenuOpen && (
        <div className="lp-mobile-menu" role="dialog" aria-modal="true" onClick={() => setIsMenuOpen(false)}>
          <div className="lp-mobile-panel" onClick={(event) => event.stopPropagation()}>
            <div className="lp-mobile-head">
              <span className="lp-brand flex items-center">
                <img src="/rgi-logo.png" alt="Raisoni Education Logo" className="h-9 w-auto object-contain shrink-0" />
              </span>
              <button type="button" className="lp-menu-btn" aria-label="Close menu" onClick={() => setIsMenuOpen(false)}>
                <IconClose size={22} />
              </button>
            </div>

            <div className="lp-mobile-links">
              {NAV_ITEMS.map((item) => (
                <button key={item.target} type="button" className="lp-mobile-link" onClick={() => go(item.target)}>
                  {item.label}
                  <IconArrowRight size={18} />
                </button>
              ))}
              <button
                type="button"
                className="lp-mobile-link"
                onClick={() => {
                  setIsMenuOpen(false);
                  onFacultyPortal();
                }}
              >
                Faculty Portal
                <IconArrowRight size={18} />
              </button>
            </div>

            <div className="lp-mobile-actions">
              <button
                type="button"
                className="lp-btn lp-btn-primary"
                onClick={() => {
                  setIsMenuOpen(false);
                  onLaunchMap();
                }}
              >
                <IconArrowRight size={18} />
                Launch Map
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
