import { cn } from "@/lib/utils";

type SectionPatternVariant = "pill" | "grid" | "curves" | "rings";

type SectionPatternProps = {
  variant: SectionPatternVariant;
  className?: string;
  opacity?: number;
  color?: string;
};

function PatternPill({ color }: { color: string }) {
  return (
    <pattern id="pill-pattern" width="220" height="280" patternUnits="userSpaceOnUse">
      <rect x="20" y="-64" width="62" height="190" rx="31" fill={color} />
      <rect x="20" y="146" width="62" height="190" rx="31" fill={color} />
      <rect x="102" y="18" width="62" height="244" rx="31" fill={color} />
      <rect x="184" y="-64" width="62" height="190" rx="31" fill={color} />
      <rect x="184" y="146" width="62" height="190" rx="31" fill={color} />
    </pattern>
  );
}

function PatternGrid({ color }: { color: string }) {
  return (
    <pattern id="grid-pattern" width="260" height="260" patternUnits="userSpaceOnUse">
      <g fill="none" stroke={color} strokeWidth="3">
        <rect x="0" y="0" width="260" height="260" />
        <path d="M52 0V260" />
        <path d="M132 0V260" />
        <path d="M212 0V260" />
        <path d="M0 84H260" />
        <path d="M0 192H260" />
        <rect x="10" y="16" width="34" height="176" rx="17" />
        <rect x="146" y="100" width="34" height="146" rx="17" />
        <rect x="218" y="26" width="32" height="170" rx="16" />
      </g>
    </pattern>
  );
}

function PatternCurves({ color }: { color: string }) {
  return (
    <pattern id="curves-pattern" width="300" height="250" patternUnits="userSpaceOnUse">
      <g fill="none" stroke={color} strokeWidth="8" strokeLinecap="round">
        <path d="M42 12V140c0 46 34 80 80 80h34" />
        <path d="M64 12V136c0 36 26 62 62 62h30" />
        <path d="M86 12V132c0 28 20 48 48 48h26" />
        <path d="M188 238V114c0-44 34-78 78-78h34" />
        <path d="M210 238V120c0-34 26-58 58-58h32" />
        <path d="M232 238V126c0-26 20-44 44-44h24" />
      </g>
    </pattern>
  );
}

function PatternRings({ color }: { color: string }) {
  return (
    <pattern id="rings-pattern" width="320" height="260" patternUnits="userSpaceOnUse">
      <g fill="none" stroke={color} strokeLinecap="round">
        <path d="M-36 188h180v72" strokeWidth="12" />
        <path d="M-16 188h160v54" strokeWidth="9" />
        <path d="M6 188h138v38" strokeWidth="7" />
        <path d="M178 248V88c0-52 42-94 94-94h48" strokeWidth="12" />
        <path d="M200 248V96c0-40 32-72 72-72h48" strokeWidth="9" />
        <path d="M222 248V104c0-30 24-54 54-54h44" strokeWidth="7" />
      </g>
    </pattern>
  );
}

export function SectionPattern({
  variant,
  className,
  opacity = 0.14,
  color = "#5f2b1d",
}: SectionPatternProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 z-0", className)}
      style={{ opacity }}
    >
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
        <defs>
          {variant === "pill" ? <PatternPill color={color} /> : null}
          {variant === "grid" ? <PatternGrid color={color} /> : null}
          {variant === "curves" ? <PatternCurves color={color} /> : null}
          {variant === "rings" ? <PatternRings color={color} /> : null}
        </defs>
        <rect
          width="100%"
          height="100%"
          fill={
            variant === "pill"
              ? "url(#pill-pattern)"
              : variant === "grid"
                ? "url(#grid-pattern)"
                : variant === "curves"
                  ? "url(#curves-pattern)"
                  : "url(#rings-pattern)"
          }
        />
      </svg>
    </div>
  );
}
