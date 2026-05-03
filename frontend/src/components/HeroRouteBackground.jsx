import { useEffect, useMemo, useRef } from "react";

function usePrefersReducedMotion() {
  return useMemo(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
      return false;
    }
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);
}

export default function HeroRouteBackground() {
  const reducedMotion = usePrefersReducedMotion();
  const pathRef = useRef(null);
  const revealRef = useRef(null);
  const dotRef = useRef(null);
  const sparkRef = useRef(null);

  // Fixed viewBox: "Scratch → Success" stays consistent across sizes.
  const pathD = useMemo(
    () =>
      [
        "M 90 520",
        "C 210 430 170 360 290 320",
        "C 410 280 430 370 520 330",
        "C 610 290 570 210 690 190",
        "C 830 165 770 315 905 285",
        "C 1015 260 970 170 1085 140",
        "C 1150 122 1165 110 1180 100"
      ].join(" "),
    []
  );

  useEffect(() => {
    if (reducedMotion) return;

    const path = pathRef.current;
    const reveal = revealRef.current;
    const dot = dotRef.current;
    const spark = sparkRef.current;
    if (!path || !reveal || !dot || !spark) return;

    const total = Math.max(1, path.getTotalLength());
    reveal.style.strokeDasharray = `${total}`;
    reveal.style.strokeDashoffset = `${total}`;

    const durationMs = 5200;
    const holdMs = 750;
    const fadeMs = 550;
    const cycleMs = durationMs + holdMs + fadeMs;
    let raf = 0;
    const start = performance.now();

    const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

    const frame = (now) => {
      const elapsed = (now - start) % cycleMs;
      let progress = 0;
      let opacity = 1;

      if (elapsed <= durationMs) {
        progress = easeInOut(elapsed / durationMs);
      } else if (elapsed <= durationMs + holdMs) {
        progress = 1;
      } else {
        progress = 1;
        opacity = 1 - (elapsed - durationMs - holdMs) / fadeMs;
      }

      const clampedOpacity = Math.max(0, Math.min(1, opacity));
      const drawn = total * progress;

      reveal.style.strokeDashoffset = `${total - drawn}`;
      reveal.style.opacity = `${clampedOpacity}`;

      const point = path.getPointAtLength(Math.max(0, Math.min(total, drawn)));
      dot.setAttribute("cx", `${point.x}`);
      dot.setAttribute("cy", `${point.y}`);
      dot.style.opacity = `${clampedOpacity}`;

      const sparkPoint = path.getPointAtLength(Math.max(0, Math.min(total, drawn + 14)));
      spark.setAttribute("cx", `${sparkPoint.x}`);
      spark.setAttribute("cy", `${sparkPoint.y}`);
      spark.style.opacity = `${clampedOpacity}`;

      raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [reducedMotion]);

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 hero-route-mask" />
      <svg className="absolute inset-0 h-full w-full opacity-80" viewBox="0 0 1200 600" preserveAspectRatio="none">
        <defs>
          <filter id="routeGlow" x="-25%" y="-25%" width="150%" height="150%">
            <feGaussianBlur stdDeviation="3.2" result="blur" />
            <feColorMatrix
              in="blur"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.9 0"
              result="glow"
            />
            <feMerge>
              <feMergeNode in="glow" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g opacity="0.55">
          {Array.from({ length: 7 }).map((_, idx) => (
            <line
              key={`h-${idx}`}
              x1="0"
              x2="1200"
              y1={80 + idx * 80}
              y2={80 + idx * 80}
              stroke="var(--hero-route-grid)"
              strokeWidth="1"
              strokeDasharray="6 12"
              opacity="0.35"
            />
          ))}
          {Array.from({ length: 10 }).map((_, idx) => (
            <line
              key={`v-${idx}`}
              y1="0"
              y2="600"
              x1={60 + idx * 120}
              x2={60 + idx * 120}
              stroke="var(--hero-route-grid)"
              strokeWidth="1"
              strokeDasharray="6 12"
              opacity="0.25"
            />
          ))}
        </g>

        <path
          d={pathD}
          ref={pathRef}
          fill="none"
          stroke="var(--hero-route-trail)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.35"
        />
        <path
          d={pathD}
          fill="none"
          stroke="var(--hero-route-dash)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="10 18"
          className={reducedMotion ? undefined : "hero-route-dash"}
          opacity="0.75"
        />

        <path
          d={pathD}
          ref={revealRef}
          fill="none"
          stroke="var(--hero-route-main)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#routeGlow)"
        />

        <g opacity="0.85">
          <circle cx="90" cy="520" r="8" fill="var(--hero-route-pin)" />
          <circle cx="1180" cy="100" r="8" fill="var(--hero-route-pin)" />
          <circle cx="90" cy="520" r="15" fill="var(--hero-route-pin)" opacity="0.22" />
          <circle cx="1180" cy="100" r="15" fill="var(--hero-route-pin)" opacity="0.22" />
        </g>

        <circle
          ref={dotRef}
          cx="90"
          cy="520"
          r="7"
          fill="var(--hero-route-dot)"
          opacity={reducedMotion ? 0 : 1}
        />
        <circle
          ref={sparkRef}
          cx="90"
          cy="520"
          r="4"
          fill="var(--hero-route-spark)"
          filter="url(#routeGlow)"
          opacity={reducedMotion ? 0 : 1}
        />
      </svg>
    </div>
  );
}
