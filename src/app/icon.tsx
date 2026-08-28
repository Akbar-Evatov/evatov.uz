import { ImageResponse } from "next/og";
import { site } from "@/data/site";

/** Required by `output: "export"`: emit this route as a build-time file. */
export const dynamic = "force-static";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

/** Monogram favicon, generated so it always matches the brand colours. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#090d16",
          color: "#22d3ee",
          fontSize: 16,
          fontWeight: 700,
          letterSpacing: -0.5,
          borderRadius: 7,
        }}
      >
        {site.initials}
      </div>
    ),
    size,
  );
}
