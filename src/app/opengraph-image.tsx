import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social preview card, generated at build time so there is no binary to keep in sync. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#090d16",
          backgroundImage:
            "radial-gradient(circle at 18% 8%, rgba(34,211,238,0.20), transparent 45%), radial-gradient(circle at 88% 78%, rgba(139,92,246,0.20), transparent 45%)",
          color: "#e6edf7",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 14,
              border: "1px solid #1e293b",
              background: "#0f1626",
              color: "#22d3ee",
              fontSize: 22,
              fontWeight: 600,
            }}
          >
            {site.initials}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "8px 16px",
              borderRadius: 999,
              border: "1px solid rgba(52,211,153,0.3)",
              background: "rgba(52,211,153,0.1)",
              color: "#34d399",
              fontSize: 20,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: 999,
                background: "#34d399",
              }}
            />
            {site.availability}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ display: "flex", fontSize: 66, fontWeight: 600, lineHeight: 1.1 }}>
            Mathematical rigor, shipped as full-stack software.
          </div>
          <div style={{ display: "flex", fontSize: 28, color: "#94a3b8" }}>
            {site.name} &middot; {site.role} &middot; {site.location}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 12,
            fontSize: 22,
            color: "#64748b",
          }}
        >
          {["Next.js", "TypeScript", "Python", "PostgreSQL", "Statistics"].map((tag) => (
            <div
              key={tag}
              style={{
                display: "flex",
                padding: "8px 16px",
                borderRadius: 10,
                border: "1px solid #1e293b",
                background: "#0d1320",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
