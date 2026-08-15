import { IconArrowRight, IconUsers } from './icons';
import './landing.css';

interface FacultyPortalProps {
  onBack: () => void;
}

/**
 * Lightweight, on-brand entry point for the faculty experience. This is a
 * placeholder scaffold only — faculty authentication is intentionally not
 * implemented in this iteration and will be wired up in a later phase.
 */
export function FacultyPortal({ onBack }: FacultyPortalProps) {
  return (
    <div className="dishaa-landing">
      <div className="lp-faculty">
        <div className="lp-faculty-card">
          <span className="lp-faculty-badge" aria-hidden="true">
            <IconUsers size={26} />
          </span>
          <h1>Faculty Portal</h1>
          <p>
            Sign in to access faculty tools for the DISHAA campus platform. Campus exploration and
            navigation stay open to everyone &mdash; no account needed.
          </p>

          <form className="lp-faculty-form" onSubmit={(event) => event.preventDefault()}>
            <div className="lp-field">
              <label htmlFor="faculty-email">Institute email</label>
              <input id="faculty-email" type="email" placeholder="name@ghrce.raisoni.net" autoComplete="email" />
            </div>
            <div className="lp-field">
              <label htmlFor="faculty-password">Password</label>
              <input id="faculty-password" type="password" placeholder="Enter your password" autoComplete="current-password" />
            </div>
            <button type="submit" className="lp-btn lp-btn-primary" style={{ width: '100%' }}>
              Sign In
              <IconArrowRight size={18} />
            </button>
          </form>

          <p className="lp-faculty-note">
            Faculty sign in is coming soon. This screen is a preview entry point for the upcoming
            faculty experience.
          </p>

          <button type="button" className="lp-faculty-back" onClick={onBack}>
            &larr; Back to DISHAA home
          </button>
        </div>
      </div>
    </div>
  );
}
