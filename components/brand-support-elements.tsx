import { useId } from "react";

import { cn } from "@/lib/utils";

type SectionPatternVariant = "pill" | "grid" | "curves" | "rings";

type SectionPatternProps = {
  variant: SectionPatternVariant;
  className?: string;
  opacity?: number;
  color?: string;
};

function PatternPill({ color, id }: { color: string; id: string }) {
  return (
    <pattern id={id} width="320" height="360" patternUnits="userSpaceOnUse">
      <rect x="24" y="-82" width="72" height="222" rx="36" fill={color} />
      <rect x="24" y="190" width="72" height="222" rx="36" fill={color} />
      <rect x="132" y="20" width="72" height="304" rx="36" fill={color} />
      <rect x="240" y="-82" width="72" height="222" rx="36" fill={color} />
      <rect x="240" y="190" width="72" height="222" rx="36" fill={color} />
    </pattern>
  );
}

function PatternGrid({ color, id }: { color: string; id: string }) {
  return (
    <pattern id={id} width="360" height="300" patternUnits="userSpaceOnUse">
      <g fill="none" stroke={color} strokeWidth="2">
        <rect x="0" y="0" width="360" height="300" />
        <path d="M72 0V300" />
        <path d="M180 0V300" />
        <path d="M288 0V300" />
        <path d="M0 96H360" />
        <path d="M0 220H360" />
        <rect x="12" y="18" width="40" height="206" rx="20" />
        <rect x="196" y="116" width="40" height="168" rx="20" />
        <rect x="300" y="32" width="36" height="192" rx="18" />
      </g>
    </pattern>
  );
}

function PatternCurves({ color, id }: { color: string; id: string }) {
  return (
    <pattern id={id} width="420" height="320" patternUnits="userSpaceOnUse">
      <g fill="none" stroke={color} strokeWidth="5" strokeLinecap="round">
        <path d="M52 16V188c0 58 42 102 102 102h46" />
        <path d="M78 16V182c0 44 32 76 78 76h42" />
        <path d="M104 16V176c0 34 24 58 58 58h36" />
        <path d="M264 304V152c0-56 42-98 96-98h58" />
        <path d="M290 304V160c0-44 34-74 74-74h54" />
        <path d="M316 304V168c0-34 26-56 56-56h46" />
      </g>
    </pattern>
  );
}

function PatternRings({ color, id }: { color: string; id: string }) {
  return (
    <pattern id={id} width="420" height="340" patternUnits="userSpaceOnUse">
      <g fill="none" stroke={color} strokeLinecap="round">
        <path d="M-48 246h226v92" strokeWidth="8" />
        <path d="M-22 246h196v68" strokeWidth="6" />
        <path d="M4 246h170v48" strokeWidth="4.5" />
        <path d="M238 326V116c0-68 52-122 122-122h60" strokeWidth="8" />
        <path d="M266 326V128c0-52 40-94 94-94h60" strokeWidth="6" />
        <path d="M292 326V140c0-40 30-70 72-70h56" strokeWidth="4.5" />
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
  const patternUid = useId().replace(/:/g, "");
  const patternId = `${variant}-${patternUid}`;

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 z-0 overflow-hidden", className)}
      style={{ opacity }}
    >
      <svg width="100%" height="100%" className="block h-full w-full">
        <defs>
          {variant === "pill" ? <PatternPill color={color} id={patternId} /> : null}
          {variant === "grid" ? <PatternGrid color={color} id={patternId} /> : null}
          {variant === "curves" ? <PatternCurves color={color} id={patternId} /> : null}
          {variant === "rings" ? <PatternRings color={color} id={patternId} /> : null}
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
    </div>
  );
}
