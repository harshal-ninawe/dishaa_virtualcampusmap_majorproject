import { IconArrowRight, IconLocation, IconMap } from './icons';
import { useReveal } from './useReveal';

interface Place {
  image: string;
  name: string;
  tag: string;
  className?: string;
}

const PLACES: Place[] = [
  { image: '/CLG.jpeg', name: 'Main Building', tag: 'Academic Block', className: 'is-wide' },
  { image: '/lawn.jpeg', name: 'Central Lawn', tag: 'Open Space' },
  { image: '/canteen 1 NEW.jpg', name: 'Food Court', tag: 'Dining' },
  { image: '/boys hostel.jpeg', name: 'Hostels', tag: 'Residence' },
  { image: '/temple.jpeg', name: 'Campus Temple', tag: 'Landmark' },
  { image: '/ground view.jpeg', name: 'Sports Ground', tag: 'Sports', className: 'is-wide' },
];

interface CampusExperienceProps {
  onLaunchMap: () => void;
}

export function CampusExperience({ onLaunchMap }: CampusExperienceProps) {
  const { ref, isVisible } = useReveal();

  return (
    <section className="lp-section lp-campus" id="campus">
      <div className="lp-container">
        <div className="lp-section-head">
          <span className="lp-eyebrow">
            <IconMap size={14} />
            Explore the campus
          </span>
          <h2 className="lp-section-title">Discover every corner before you arrive</h2>
          <p className="lp-section-desc">
            Browse buildings, facilities and landmarks, then launch the interactive map to search
            places, view details and start turn-by-turn navigation.
          </p>
        </div>

        <div ref={ref} className={`lp-campus-grid lp-reveal ${isVisible ? 'is-visible' : ''}`}>
          {PLACES.map((place) => (
            <button
              type="button"
              key={place.name}
              className={`lp-place ${place.className || ''}`}
              onClick={onLaunchMap}
              aria-label={`Open ${place.name} on the campus map`}
            >
              <img src={encodeURI(place.image) || '/placeholder.svg'} alt={place.name} loading="lazy" />
              <span className="lp-place-label">
                <b>{place.name}</b>
                <span><IconLocation size={13} /> {place.tag}</span>
              </span>
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>
          <button type="button" className="lp-btn lp-btn-primary" onClick={onLaunchMap}>
            Open Interactive Map
            <IconArrowRight size={19} />
          </button>
        </div>
      </div>
    </section>
  );
}
