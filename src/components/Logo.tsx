export function Logo({ className = "gsh-logo" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 60"
      role="img"
      aria-label="Zero Studio Z logo"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="cb-l"
        d="M8 7H56V20L27 42H56V55H8V42L37 20H8V7Z"
      />
      <path
        className="cb-t"
        d="M8 7H56V20H37L8 42V7Z"
        opacity=".95"
      />
      <path
        className="cb-r"
        d="M37 20H56V42H27L37 34V20Z"
      />
      <path
        className="cb-st"
        d="M49 2L51.2 7.8L57 10L51.2 12.2L49 18L46.8 12.2L41 10L46.8 7.8L49 2Z"
      />
    </svg>
  );
}
