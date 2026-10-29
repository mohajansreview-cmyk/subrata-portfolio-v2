import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Base({ size = 18, children, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export const IconArrowUpRight = (p: IconProps) => (
  <Base {...p}><path d="M7 17 17 7" /><path d="M8 7h9v9" /></Base>
);

export const IconArrowDown = (p: IconProps) => (
  <Base {...p}><path d="M12 5v14" /><path d="m19 12-7 7-7-7" /></Base>
);

export const IconArrowRight = (p: IconProps) => (
  <Base {...p}><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></Base>
);

export const IconCheck = (p: IconProps) => (
  <Base {...p}><path d="M20 6 9 17l-5-5" /></Base>
);

export const IconCopy = (p: IconProps) => (
  <Base {...p}><rect width="14" height="14" x="8" y="8" rx="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" /></Base>
);

export const IconMail = (p: IconProps) => (
  <Base {...p}><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></Base>
);

export const IconWhatsApp = (p: IconProps) => (
  <svg width={p.size ?? 18} height={p.size ?? 18} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.497.1-.198.05-.371-.025-.52-.074-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413" />
  </svg>
);

export const IconStar = (p: IconProps) => (
  <svg width={p.size ?? 14} height={p.size ?? 14} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M12 2l2.9 6.26 6.86.77-5.1 4.66 1.38 6.76L12 17.27l-6.04 3.18 1.38-6.76-5.1-4.66 6.86-.77L12 2z" />
  </svg>
);

export const IconPlus = (p: IconProps) => (
  <Base {...p}><path d="M12 5v14" /><path d="M5 12h14" /></Base>
);

export const IconChart = (p: IconProps) => (
  <Base {...p}><path d="M3 3v16a2 2 0 0 0 2 2h16" /><path d="m7 14 4-4 4 4 5-5" /></Base>
);

export const IconHoney = (p: IconProps) => (
  <Base {...p}><path d="M12 2.7S6 9.2 6 13.8a6 6 0 0 0 12 0C18 9.2 12 2.7 12 2.7Z" /><path d="M9.5 14a2.6 2.6 0 0 0 2.5 2.6" /></Base>
);

export const IconSend = (p: IconProps) => (
  <Base {...p}><path d="m22 2-7 20-4-9-9-4Z" /><path d="M22 2 11 13" /></Base>
);

export const IconSpinner = (p: IconProps) => (
  <svg width={p.size ?? 18} height={p.size ?? 18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" aria-hidden="true" className={`animate-spin ${p.className ?? ""}`}>
    <path d="M21 12a9 9 0 1 1-6.2-8.56" />
  </svg>
);

export const IconMenu = (p: IconProps) => (
  <Base {...p}><path d="M4 6h16" /><path d="M4 12h16" /><path d="M4 18h16" /></Base>
);

export const IconX = (p: IconProps) => (
  <Base {...p}><path d="M18 6 6 18" /><path d="m6 6 12 12" /></Base>
);

export const IconGrid = (p: IconProps) => (
  <Base {...p}><rect width="18" height="18" x="3" y="3" rx="1" /><path d="M3 9h18" /><path d="M3 15h18" /><path d="M9 3v18" /><path d="M15 3v18" /></Base>
);

export const IconTimer = (p: IconProps) => (
  <Base {...p}><path d="M10 2h4" /><path d="M12 14l3-3" /><circle cx="12" cy="14" r="8" /></Base>
);

export const IconEye = (p: IconProps) => (
  <Base {...p}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></Base>
);

export const IconExternal = (p: IconProps) => (
  <Base {...p}><path d="M15 3h6v6" /><path d="M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /></Base>
);

export const IconSparkle = (p: IconProps) => (
  <Base {...p}><path d="M12 3v3" /><path d="M12 18v3" /><path d="M3 12h3" /><path d="M18 12h3" /><path d="m5.6 5.6 2.1 2.1" /><path d="m16.3 16.3 2.1 2.1" /><path d="m5.6 18.4 2.1-2.1" /><path d="m16.3 7.7 2.1-2.1" /><circle cx="12" cy="12" r="3.2" /></Base>
);

/* Brand glyphs (filled, simple) */

export const IconBehance = (p: IconProps) => (
  <svg width={p.size ?? 18} height={p.size ?? 18} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M8.84 10.83c.7-.35 1.22-1.08 1.22-2.24 0-2.21-1.65-2.75-3.55-2.75H1v11.99h5.66c2.03 0 3.94-.97 3.94-3.25 0-1.41-.67-2.45-1.76-2.87v.12ZM3.62 7.75h2.55c.98 0 1.86.27 1.86 1.43 0 1.06-.7 1.49-1.68 1.49H3.62V7.75Zm2.9 8.18H3.62v-3.42h2.96c1.19 0 1.95.5 1.95 1.76 0 1.24-.9 1.66-2.01 1.66Zm14.4-8.71h-4.97v1.44h4.97V7.22Zm-2.47 2.4c-2.74 0-4.55 2.05-4.55 4.76 0 2.8 1.72 4.72 4.55 4.72 2.15 0 3.55-.97 4.22-3.03h-2.19c-.24.77-1 1.17-1.96 1.17-1.37 0-2.09-.81-2.09-2.18h6.4c.16-2.97-1.45-5.44-4.38-5.44Zm-2.02 3.81c.08-1.12.82-1.82 1.95-1.82 1.2 0 1.8.7 1.9 1.82h-3.85Z" />
  </svg>
);

export const IconLinkedin = (p: IconProps) => (
  <svg width={p.size ?? 18} height={p.size ?? 18} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.55V9h3.57v11.45Z" />
  </svg>
);

export const IconInstagram = (p: IconProps) => (
  <Base {...p}><rect width="20" height="20" x="2" y="2" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" /></Base>
);

export const IconTelegram = (p: IconProps) => (
  <svg width={p.size ?? 18} height={p.size ?? 18} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M21.94 4.35 18.9 19.1c-.23 1.02-.83 1.27-1.68.79l-4.65-3.43-2.24 2.16c-.25.25-.46.46-.94.46l.33-4.73 8.6-7.77c.38-.34-.08-.52-.58-.19l-10.63 6.7-4.58-1.43c-1-.31-1.02-1 .21-1.48l17.9-6.9c.83-.3 1.55.19 1.3 1.37Z" />
  </svg>
);

export const IconYoutube = (p: IconProps) => (
  <svg width={p.size ?? 18} height={p.size ?? 18} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81ZM9.55 15.57V8.43L15.82 12l-6.27 3.57Z" />
  </svg>
);

export const IconFacebook = (p: IconProps) => (
  <svg width={p.size ?? 18} height={p.size ?? 18} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...p}>
    <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.09 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.7 4.53-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.89v2.26h3.32l-.53 3.49h-2.79V24C19.61 23.09 24 18.1 24 12.07Z" />
  </svg>
);

export const brandIcon: Record<string, (p: IconProps) => React.JSX.Element> = {
  behance: IconBehance,
  linkedin: IconLinkedin,
  instagram: IconInstagram,
  telegram: IconTelegram,
  youtube: IconYoutube,
  facebook: IconFacebook,
};
