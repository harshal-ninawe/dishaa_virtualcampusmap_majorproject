import type { ReactNode } from 'react';
import { IconBuilding, IconCalendar, IconPins, IconUsers } from './icons';
import { useReveal } from './useReveal';

interface Stat {
  icon: ReactNode;
  value: string;
  label: string;
}

/**
 * Placeholder figures — structured so they can later be wired to real
 * campus/API data. They are illustrative, not fetched values.
 */
const STATS: Stat[] = [
  { icon: <IconBuilding size={22} />, value: '200+', label: 'Buildings & Facilities' },
  { icon: <IconUsers size={22} />, value: '15K+', label: 'Students & Staff' },
  { icon: <IconPins size={22} />, value: '50+', label: 'Navigation Points' },
  { icon: <IconCalendar size={22} />, value: '100+', label: 'Events Every Year' },
];

export function StatsSection() {
  const { ref, isVisible } = useReveal();

  return (
    <div className="lp-container">
      <div ref={ref} className={`lp-stats lp-reveal ${isVisible ? 'is-visible' : ''}`}>
        {STATS.map((stat) => (
          <div key={stat.label} className="lp-stat">
            <span className="lp-stat-icon">{stat.icon}</span>
            <div>
              <div className="lp-stat-num">{stat.value}</div>
              <div className="lp-stat-label">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
