import type { ProjectVisual } from "@/data/projects";
import { cn } from "@/lib/utils";

/**
 * Generated card artwork. Each project gets a schematic that gestures at what
 * the thing actually does, rather than a screenshot that would go stale.
 */
export function ProjectPreview({
  visual,
  slug,
  className,
}: {
  visual: ProjectVisual;
  slug: string;
  className?: string;
}) {
  const gradientId = `grad-${slug}`;
  const [from, to] = visual.accent;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg border border-border bg-bg-elevated",
        className,
      )}
    >
      {/* Ambient wash in the project's accent. */}
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.14]"
        style={{ background: `radial-gradient(120% 80% at 20% 0%, ${from}, transparent 60%)` }}
      />
      <div className="bg-dots absolute inset-0 opacity-40" aria-hidden />

      {/* Window chrome */}
      <div className="relative flex items-center gap-2 border-b border-border px-3 py-2">
        <span className="flex gap-1.5" aria-hidden>
          <span className="h-2 w-2 rounded-full bg-fg-subtle/40" />
          <span className="h-2 w-2 rounded-full bg-fg-subtle/40" />
          <span className="h-2 w-2 rounded-full bg-fg-subtle/40" />
        </span>
        <span className="font-mono text-[10px] text-fg-subtle">{visual.caption}</span>
      </div>

      <div className="relative p-4">
        <svg
          viewBox="0 0 320 150"
          className="h-full w-full"
          role="img"
          aria-label={`Schematic illustration for ${slug}`}
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor={from} />
              <stop offset="100%" stopColor={to} />
            </linearGradient>
          </defs>

          {visual.kind === "scorecard" ? <Scorecard fill={gradientId} /> : null}
          {visual.kind === "dashboard" ? <Dashboard fill={gradientId} /> : null}
          {visual.kind === "floors" ? <Floors fill={gradientId} accent={from} /> : null}
          {visual.kind === "roles" ? <Roles fill={gradientId} accent={to} /> : null}
        </svg>
      </div>
    </div>
  );
}

const track = "currentColor";

/** Seven weighted signals feeding a single score. */
function Scorecard({ fill }: { fill: string }) {
  const weights = [0.86, 0.62, 0.74, 0.35, 0.55, 0.28, 0.68];
  return (
    <g>
      {weights.map((w, i) => (
        <g key={i} transform={`translate(0, ${i * 18 + 6})`}>
          <rect
            width="150"
            height="8"
            rx="4"
            fill={track}
            className="text-fg-subtle/15"
          />
          <rect width={150 * w} height="8" rx="4" fill={`url(#${fill})`} />
        </g>
      ))}

      <g transform="translate(196, 18)">
        <rect
          width="112"
          height="114"
          rx="10"
          fill={track}
          className="text-fg-subtle/[0.07]"
        />
        <text
          x="56"
          y="46"
          textAnchor="middle"
          fontSize="30"
          fontFamily="ui-monospace, monospace"
          fontWeight="600"
          fill={`url(#${fill})`}
        >
          0.81
        </text>
        <text
          x="56"
          y="64"
          textAnchor="middle"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          fill={track}
          className="text-fg-subtle"
        >
          SHADOW SCORE
        </text>
        <rect
          x="18"
          y="78"
          width="76"
          height="5"
          rx="2.5"
          fill={track}
          className="text-fg-subtle/20"
        />
        <rect x="18" y="78" width="46" height="5" rx="2.5" fill={`url(#${fill})`} />
        <text
          x="56"
          y="98"
          textAnchor="middle"
          fontSize="7.5"
          fontFamily="ui-monospace, monospace"
          fill={track}
          className="text-fg-subtle"
        >
          confidence 0.61
        </text>
      </g>
    </g>
  );
}

/** Per-question accuracy bars over a class roster. */
function Dashboard({ fill }: { fill: string }) {
  const bars = [0.92, 0.71, 0.45, 0.83, 0.61, 0.97, 0.38, 0.76, 0.55, 0.88];
  return (
    <g>
      <g transform="translate(0, 4)">
        {bars.map((h, i) => (
          <g key={i} transform={`translate(${i * 19}, 0)`}>
            <rect
              y={0}
              width="13"
              height="88"
              rx="3"
              fill={track}
              className="text-fg-subtle/12"
            />
            <rect
              y={88 - 88 * h}
              width="13"
              height={88 * h}
              rx="3"
              fill={`url(#${fill})`}
            />
          </g>
        ))}
      </g>

      <g transform="translate(206, 4)">
        {[0, 1, 2, 3].map((i) => (
          <g key={i} transform={`translate(0, ${i * 23})`}>
            <circle cx="7" cy="7" r="7" fill={track} className="text-fg-subtle/15" />
            <rect
              x="20"
              y="3"
              width={62 - i * 9}
              height="7"
              rx="3.5"
              fill={track}
              className="text-fg-subtle/20"
            />
            <rect x="92" y="1" width="22" height="12" rx="6" fill={`url(#${fill})`} />
          </g>
        ))}
      </g>

      <g transform="translate(0, 104)">
        <rect
          width="320"
          height="1"
          fill={track}
          className="text-fg-subtle/20"
        />
        <text
          x="0"
          y="20"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          fill={track}
          className="text-fg-subtle"
        >
          accuracy per question
        </text>
        <text
          x="320"
          y="20"
          textAnchor="end"
          fontSize="8"
          fontFamily="ui-monospace, monospace"
          fill={track}
          className="text-fg-subtle"
        >
          graded server-side
        </text>
      </g>
    </g>
  );
}

/** Three floors of slots, sharing one state. */
function Floors({ fill, accent }: { fill: string; accent: string }) {
  const booked = new Set([1, 4, 5, 9, 12, 14, 19, 22, 25, 28, 30]);
  return (
    <g>
      {[0, 1, 2].map((floor) => (
        <g key={floor} transform={`translate(0, ${floor * 46})`}>
          <text
            x="0"
            y="10"
            fontSize="8"
            fontFamily="ui-monospace, monospace"
            fill={track}
            className="text-fg-subtle"
          >
            F{floor + 1}
          </text>
          {Array.from({ length: 12 }).map((_, i) => {
            const index = floor * 12 + i;
            const isBooked = booked.has(index);
            return (
              <rect
                key={i}
                x={24 + i * 24}
                y={0}
                width="18"
                height="18"
                rx="4"
                fill={isBooked ? `url(#${fill})` : track}
                className={isBooked ? undefined : "text-fg-subtle/15"}
              />
            );
          })}
          <rect
            x="24"
            y="26"
            width="272"
            height="1"
            fill={track}
            className="text-fg-subtle/15"
          />
        </g>
      ))}
      <circle cx="308" cy="9" r="4" fill={accent}>
        <animate
          attributeName="opacity"
          values="1;0.25;1"
          dur="2.4s"
          repeatCount="indefinite"
        />
      </circle>
    </g>
  );
}

/** A base user specialising into four roles. */
function Roles({ fill, accent }: { fill: string; accent: string }) {
  const roles = ["teacher", "student", "parent", "admin"];
  return (
    <g>
      <rect x="112" y="4" width="96" height="26" rx="6" fill={`url(#${fill})`} />
      <text
        x="160"
        y="21"
        textAnchor="middle"
        fontSize="10"
        fontFamily="ui-monospace, monospace"
        fill="#0b1220"
        fontWeight="600"
      >
        User
      </text>

      {roles.map((role, i) => {
        const x = 8 + i * 78;
        return (
          <g key={role}>
            <path
              d={`M160 30 L160 58 L${x + 33} 58 L${x + 33} 84`}
              stroke={accent}
              strokeWidth="1.25"
              fill="none"
              opacity="0.5"
            />
            <rect
              x={x}
              y="84"
              width="66"
              height="26"
              rx="6"
              fill={track}
              className="text-fg-subtle/12"
              stroke={accent}
              strokeWidth="1"
              strokeOpacity="0.35"
            />
            <text
              x={x + 33}
              y="101"
              textAnchor="middle"
              fontSize="9"
              fontFamily="ui-monospace, monospace"
              fill={track}
              className="text-fg-muted"
            >
              {role}
            </text>
          </g>
        );
      })}

      <text
        x="160"
        y="134"
        textAnchor="middle"
        fontSize="8"
        fontFamily="ui-monospace, monospace"
        fill={track}
        className="text-fg-subtle"
      >
        abstraction · inheritance · encapsulation · polymorphism
      </text>
    </g>
  );
}
