import React from "react";
import { cn } from "@/lib/utils";

interface LogoZenCRMProps {
  className?: string;
}

export function LogoZenCRM({ className }: LogoZenCRMProps) {
  return (
    <svg
      viewBox="0 0 240 64"
      role="img"
      aria-label="Zen CRM logo"
      className={cn("w-auto", className)}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter id="zencrm-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="hsl(var(--primary))" floodOpacity="0.6" />
        </filter>
      </defs>

      {/* Symbol */}
      <g filter="url(#zencrm-glow)">
        <circle cx="32" cy="32" r="24" fill="none" stroke="hsl(var(--primary))" strokeWidth="2.5" />
        <path
          d="M20 22 H44 L20 42 H44"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* Wordmark */}
      <text
        x="76"
        y="42"
        fontFamily="Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial"
        fontWeight="700"
        fontSize="26"
        letterSpacing="1"
        fill="hsl(var(--primary))"
      >
        ZEN CRM
      </text>
    </svg>
  );
}

export default LogoZenCRM;
