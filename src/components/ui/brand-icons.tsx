import type { SVGProps } from "react";

/**
 * Brand marks. lucide-react dropped its brand set, so these are inlined here
 * with the same `className`-driven sizing API as the lucide icons.
 */
type IconProps = SVGProps<SVGSVGElement>;

function Base({ children, ...props }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export function GithubIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M12 .5C5.73.5.7 5.58.7 11.92c0 5.05 3.22 9.33 7.69 10.84.56.11.77-.24.77-.55l-.02-2.13c-3.13.69-3.79-1.36-3.79-1.36-.51-1.32-1.25-1.67-1.25-1.67-1.02-.71.08-.7.08-.7 1.13.08 1.73 1.18 1.73 1.18 1 1.74 2.63 1.24 3.27.95.1-.74.39-1.24.71-1.53-2.5-.29-5.13-1.27-5.13-5.64 0-1.25.44-2.27 1.16-3.07-.12-.29-.5-1.45.11-3.03 0 0 .95-.31 3.11 1.17a10.6 10.6 0 0 1 5.66 0c2.16-1.48 3.1-1.17 3.1-1.17.62 1.58.23 2.74.12 3.03.72.8 1.16 1.82 1.16 3.07 0 4.38-2.64 5.35-5.15 5.63.41.35.77 1.05.77 2.12l-.01 3.14c0 .31.2.67.78.55a11.24 11.24 0 0 0 7.68-10.84C23.3 5.58 18.27.5 12 .5Z" />
    </Base>
  );
}

export function LinkedinIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05a3.75 3.75 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0Z" />
    </Base>
  );
}

export function TelegramIcon(props: IconProps) {
  return (
    <Base {...props}>
      <path d="M23.91 3.79 20.3 20.84c-.25 1.21-.98 1.5-2 .94l-5.5-4.07-2.66 2.57c-.3.3-.55.56-1.1.56-.72 0-.6-.27-.84-.95L6.3 13.7.85 12c-1.18-.35-1.19-1.16.26-1.75l21.26-8.2c.97-.43 1.9.24 1.54 1.73Z" />
    </Base>
  );
}
