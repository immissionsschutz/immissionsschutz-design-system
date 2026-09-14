import type { HTMLAttributes } from "react";

export type BadgeStatus = "ok" | "warn" | "crit" | "neutral";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  status?: BadgeStatus;
}

/** Status-Pill fuer ok/warn/crit-artige Zustaende (rhapp-frontend#41), z. B.
 * "eingefroren"/"veraltet"/"aktuell"-Badges. Status wird ausschliesslich
 * ueber Farbe kodiert, kein Icon/Zusatztext erzwungen - Aufrufer liefert den
 * sichtbaren Text als children. */
export function Badge({
  status = "neutral",
  className,
  ...rest
}: BadgeProps) {
  const klassen = ["ids-badge", `ids-badge--${status}`, className]
    .filter(Boolean)
    .join(" ");
  return <span className={klassen} {...rest} />;
}
