export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <path
        d="M16 2c-1.4 2.6-3.8 3.9-6.6 4.1 1 1.6 1.1 3.4.3 5-1.6-.5-3.4-.2-4.7 1 1.7.6 2.8 1.9 3.2 3.6-1.7.2-3.1 1.2-3.9 2.7 1.8 0 3.3.8 4.3 2.2-1.3 1-2 2.5-1.9 4.2 1.6-.7 3.3-.6 4.7.3-.5 1.6-.1 3.2 1 4.4 1-1.1 1.6-2.5 1.6-4v-9.3c0-3.1 0-6.6 2-14.2Z"
        fill="currentColor"
      />
      <path
        d="M16 2c1.4 2.6 3.8 3.9 6.6 4.1-1 1.6-1.1 3.4-.3 5 1.6-.5 3.4-.2 4.7 1-1.7.6-2.8 1.9-3.2 3.6 1.7.2 3.1 1.2 3.9 2.7-1.8 0-3.3.8-4.3 2.2 1.3 1 2 2.5 1.9 4.2-1.6-.7-3.3-.6-4.7.3.5 1.6.1 3.2-1 4.4-1-1.1-1.6-2.5-1.6-4v-9.3c0-3.1 0-6.6-2-14.2Z"
        fill="currentColor"
        opacity="0.55"
      />
    </svg>
  );
}

export function SearchIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="2" fill="none" />
      <line x1="20" y1="20" x2="15.5" y2="15.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M15 5l-7 7 7 7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M9 5l7 7-7 7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function OrderIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect x="3.5" y="5" width="17" height="14" rx="2.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <line x1="3.5" y1="9.2" x2="20.5" y2="9.2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="14.2" cy="14.3" r="3.1" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M14.2 12.9v1.5l1 .7" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    </svg>
  );
}

export function HomeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M4 11.5 12 4l8 7.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M6 10.5V20h12v-9.5" fill="currentColor" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <rect x="10" y="14" width="4" height="6" fill="white" />
    </svg>
  );
}

export function ListIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect x="4" y="3.5" width="16" height="17" rx="2.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <line x1="7.5" y1="8.2" x2="16.5" y2="8.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="7.5" y1="12" x2="16.5" y2="12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="7.5" y1="15.8" x2="13.5" y2="15.8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function ClockIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" fill="currentColor" />
      <path d="M12 7v5.2l3.6 2.1" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function UserIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="8" r="4" fill="currentColor" />
      <path d="M4.5 20c1.1-4 4-6 7.5-6s6.4 2 7.5 6" fill="currentColor" />
    </svg>
  );
}

export function DownloadIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M12 4v10.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M8 11.5 12 15.5 16 11.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 18h12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function ProcessingIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        d="M5 12a7 7 0 0 1 12-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M17 3.5V8h-4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M19 12a7 7 0 0 1-12 5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M7 20.5V16h4.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CalendarClockIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect x="4" y="4.5" width="13" height="13" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <line x1="4" y1="8.5" x2="17" y2="8.5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="16.5" cy="16" r="5" fill="currentColor" stroke="white" strokeWidth="1" />
      <path d="M16.5 13.6v2.4l1.6.9" fill="none" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CheckBoxIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="3" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 12.5l2.5 2.5L16.5 9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function CopyIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect x="8.5" y="8.5" width="11" height="11" rx="2" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <path d="M15.5 8.5V6.5a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" fill="none" stroke="currentColor" strokeWidth="1.7" />
    </svg>
  );
}

export function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
