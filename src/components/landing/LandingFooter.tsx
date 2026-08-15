interface LandingFooterProps {
  onNavigate: (target: string) => void;
  onLaunchMap: () => void;
  onAskAssistant: () => void;
  onFacultyPortal: () => void;
}

export function LandingFooter({ onNavigate, onLaunchMap, onAskAssistant, onFacultyPortal }: LandingFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="lp-footer" id="contact">
      <div className="lp-container">
        <div className="lp-footer-top">
          <div className="lp-footer-brand">
            <span className="lp-brand">
              <span className="lp-brand-mark" aria-hidden="true">D</span>
              <span className="lp-brand-text">
                <span className="lp-brand-name">raisoni</span>
                <span className="lp-brand-sub">Education</span>
              </span>
            </span>
            <p className="lp-footer-tag">
              DISHAA is the smart virtual campus navigator for G H Raisoni College of Engineering
              and Management &mdash; interactive maps, live navigation and an AI campus assistant.
            </p>
          </div>

          <div className="lp-footer-cols">
            <div className="lp-footer-col">
              <h4>Explore</h4>
              <ul>
                <li><button type="button" onClick={onLaunchMap}>Campus Map</button></li>
                <li><button type="button" onClick={() => onNavigate('campus')}>Places</button></li>
                <li><button type="button" onClick={() => onNavigate('features')}>Features</button></li>
              </ul>
            </div>
            <div className="lp-footer-col">
              <h4>Product</h4>
              <ul>
                <li><button type="button" onClick={onAskAssistant}>Assistant</button></li>
                <li><button type="button" onClick={() => onNavigate('features')}>Navigation</button></li>
                <li><button type="button" onClick={() => onNavigate('campus')}>Discovery</button></li>
              </ul>
            </div>
            <div className="lp-footer-col">
              <h4>Institute</h4>
              <ul>
                <li><button type="button" onClick={() => onNavigate('about')}>About Us</button></li>
                <li><button type="button" onClick={() => onNavigate('contact')}>Contact</button></li>
                <li><button type="button" onClick={onFacultyPortal}>Faculty Portal</button></li>
              </ul>
            </div>
            <div className="lp-footer-col">
              <h4>Access</h4>
              <ul>
                <li><button type="button" onClick={onLaunchMap}>Launch Map</button></li>
                <li><button type="button" onClick={onFacultyPortal}>Faculty Sign In</button></li>
                <li><button type="button" onClick={() => onNavigate('top')}>Back to top</button></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="lp-footer-bottom">
          <span>&copy; {year} DISHAA &middot; Raisoni Education. All rights reserved.</span>
          <span>G H Raisoni College of Engineering and Management, Nagpur</span>
        </div>
      </div>
    </footer>
  );
}
