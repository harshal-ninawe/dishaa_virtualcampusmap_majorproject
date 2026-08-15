import type { ReactNode } from 'react';
import { IconBell, IconChat, IconMap, IconNavigation } from './icons';
import { useReveal } from './useReveal';

interface Feature {
  icon: ReactNode;
  title: string;
  desc: string;
}

const FEATURES: Feature[] = [
  {
    icon: <IconMap size={22} />,
    title: 'Interactive Maps',
    desc: 'Navigate buildings, labs, departments and facilities with ease.',
  },
  {
    icon: <IconNavigation size={22} />,
    title: 'Real-time Navigation',
    desc: 'Get step-by-step pedestrian directions across the campus.',
  },
  {
    icon: <IconChat size={22} />,
    title: 'AI Assistant',
    desc: 'Ask questions about the campus and get intelligent answers.',
  },
  {
    icon: <IconBell size={22} />,
    title: 'Campus Updates',
    desc: 'Stay informed about campus events, notices and announcements.',
  },
];

export function FeatureStrip() {
  const { ref, isVisible } = useReveal();

  return (
    <div className="lp-container" id="features">
      <div ref={ref} className={`lp-feature-strip lp-reveal ${isVisible ? 'is-visible' : ''}`}>
        <div className="lp-feature-grid">
          {FEATURES.map((feature) => (
            <article key={feature.title} className="lp-feature">
              <span className="lp-feature-icon">{feature.icon}</span>
              <div>
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
