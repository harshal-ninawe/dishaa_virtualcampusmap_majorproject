import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function base({ size = 24, ...props }: IconProps) {
  return {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.7,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    ...props,
  };
}

export function IconMap(props: IconProps) {
  return (
    <svg {...base(props)} aria-hidden="true">
      <path d="M9 4 3 6.5v13L9 17l6 2.5 6-2.5v-13L15 6.5 9 4Z" />
      <path d="M9 4v13M15 6.5v13" />
    </svg>
  );
}

export function IconNavigation(props: IconProps) {
  return (
    <svg {...base(props)} aria-hidden="true">
      <path d="m3.5 11 17-7-7 17-2.4-7.2L3.5 11Z" />
    </svg>
  );
}

export function IconChat(props: IconProps) {
  return (
    <svg {...base(props)} aria-hidden="true">
      <path d="M4 5h16v11H8l-4 3.5V5Z" />
      <path d="M8.5 10.2h.01M12 10.2h.01M15.5 10.2h.01" />
    </svg>
  );
}

export function IconBell(props: IconProps) {
  return (
    <svg {...base(props)} aria-hidden="true">
      <path d="M6 9a6 6 0 0 1 12 0c0 5 2 6 2 6H4s2-1 2-6Z" />
      <path d="M10 20a2 2 0 0 0 4 0" />
    </svg>
  );
}

export function IconBuilding(props: IconProps) {
  return (
    <svg {...base(props)} aria-hidden="true">
      <path d="M5 21V4.5A1.5 1.5 0 0 1 6.5 3h7A1.5 1.5 0 0 1 15 4.5V21" />
      <path d="M15 9h3.5A1.5 1.5 0 0 1 20 10.5V21" />
      <path d="M8.5 7h3M8.5 11h3M8.5 15h3M3 21h18" />
    </svg>
  );
}

export function IconUsers(props: IconProps) {
  return (
    <svg {...base(props)} aria-hidden="true">
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3.5 20a5.5 5.5 0 0 1 11 0" />
      <path d="M16 5.2a3.2 3.2 0 0 1 0 6M17.5 20a5.5 5.5 0 0 0-2.7-4.7" />
    </svg>
  );
}

export function IconPins(props: IconProps) {
  return (
    <svg {...base(props)} aria-hidden="true">
      <path d="M11 21s6-5.2 6-9.5A6 6 0 0 0 5 11.5C5 15.8 11 21 11 21Z" />
      <circle cx="11" cy="11" r="2.1" />
    </svg>
  );
}

export function IconCalendar(props: IconProps) {
  return (
    <svg {...base(props)} aria-hidden="true">
      <rect x="3.5" y="5" width="17" height="15" rx="2.2" />
      <path d="M3.5 9.5h17M8 3.5v3M16 3.5v3M7.5 13h2M11 13h2M14.5 13h2M7.5 16.5h2M11 16.5h2" />
    </svg>
  );
}

export function IconArrowRight(props: IconProps) {
  return (
    <svg {...base(props)} aria-hidden="true">
      <path d="M4 12h15M13 6l6 6-6 6" />
    </svg>
  );
}

export function IconSparkle(props: IconProps) {
  return (
    <svg {...base(props)} aria-hidden="true">
      <path d="M12 3.5c.6 3.8 1.7 4.9 5.5 5.5-3.8.6-4.9 1.7-5.5 5.5-.6-3.8-1.7-4.9-5.5-5.5 3.8-.6 4.9-1.7 5.5-5.5Z" />
      <path d="M18.5 15c.3 1.6.8 2.1 2.4 2.4-1.6.3-2.1.8-2.4 2.4-.3-1.6-.8-2.1-2.4-2.4 1.6-.3 2.1-.8 2.4-2.4Z" />
    </svg>
  );
}

export function IconMenu(props: IconProps) {
  return (
    <svg {...base(props)} aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function IconClose(props: IconProps) {
  return (
    <svg {...base(props)} aria-hidden="true">
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

export function IconLocation(props: IconProps) {
  return (
    <svg {...base(props)} aria-hidden="true">
      <path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

export function IconSearch(props: IconProps) {
  return (
    <svg {...base(props)} aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" />
      <path d="m20 20-4.2-4.2" />
    </svg>
  );
}

export function IconSend(props: IconProps) {
  return (
    <svg {...base(props)} aria-hidden="true">
      <path d="M4.5 12 20 5l-4.2 15-3.9-6.2L4.5 12Z" />
      <path d="m11.9 13.8 3.9-8.8" />
    </svg>
  );
}

export function IconRoute(props: IconProps) {
  return (
    <svg {...base(props)} aria-hidden="true">
      <circle cx="6" cy="18.5" r="2.3" />
      <circle cx="18" cy="5.5" r="2.3" />
      <path d="M8.3 18.5H14a3 3 0 0 0 0-6h-4a3 3 0 0 1 0-6h5.7" />
    </svg>
  );
}
