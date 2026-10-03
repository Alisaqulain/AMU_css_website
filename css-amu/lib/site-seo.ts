import type { Metadata } from "next";

const DEFAULT_SITE_URL = "https://cssamu.in";

export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) {
    try {
      return new URL(fromEnv).origin;
    } catch {
      return DEFAULT_SITE_URL;
    }
  }
  return DEFAULT_SITE_URL;
}

export const siteName = "Computer Science Society | AMU";
export const siteShortName = "CSS AMU";
export const defaultDescription =
  "Official website of the Computer Science Society, Department of Computer Science, Aligarh Muslim University. Events, clubs, team, and membership.";

export const defaultKeywords = [
  "Computer Science Society",
  "CSS AMU",
  "Aligarh Muslim University",
  "AMU computer science",
  "CS club AMU",
  "AI ML club",
  "web development AMU",
];

export function absoluteUrl(path = "/"): string {
  const base = getSiteUrl();
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}

/** Standard share card (1200×630) — used by WhatsApp, Facebook, LinkedIn, X, etc. */
export const OG_IMAGE_WIDTH = 1200;
export const OG_IMAGE_HEIGHT = 630;
const OG_IMAGE_PATH = "/opengraph-image";

export function openGraphImageUrl(): string {
  return absoluteUrl(OG_IMAGE_PATH);
}

export function openGraphImageMeta(alt?: string) {
  const imageAlt = alt ?? `${siteShortName} — Aligarh Muslim University`;
  const url = openGraphImageUrl();
  return [
    {
      url,
      secureUrl: url,
      width: OG_IMAGE_WIDTH,
      height: OG_IMAGE_HEIGHT,
      alt: imageAlt,
      type: "image/png",
    },
  ];
}

export function sharedOpenGraph({
  title,
  description,
  url,
}: {
  title: string;
  description: string;
  url: string;
}) {
  return {
    type: "website" as const,
    locale: "en_IN",
    url,
    siteName: siteShortName,
    title,
    description,
    images: openGraphImageMeta(title),
  };
}

export function sharedTwitter({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return {
    card: "summary_large_image" as const,
    title,
    description,
    images: [openGraphImageUrl()],
  };
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: siteName,
    template: `%s | ${siteShortName}`,
  },
  description: defaultDescription,
  keywords: defaultKeywords,
  authors: [{ name: siteShortName }],
  creator: siteShortName,
  publisher: siteShortName,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: sharedOpenGraph({
    title: siteName,
    description: defaultDescription,
    url: getSiteUrl(),
  }),
  twitter: sharedTwitter({
    title: siteName,
    description: defaultDescription,
  }),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: getSiteUrl(),
  },
};

export function pageMetadata({
  title,
  description,
  path,
  keywords,
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
}): Metadata {
  const url = absoluteUrl(path);
  return {
    title,
    description,
    keywords: keywords ?? defaultKeywords,
    alternates: { canonical: url },
    openGraph: sharedOpenGraph({ title, description, url }),
    twitter: sharedTwitter({ title, description }),
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "CollegeOrUniversity",
    name: "Computer Science Society, Aligarh Muslim University",
    alternateName: "CSS AMU",
    url: getSiteUrl(),
    logo: absoluteUrl("/cslogo.png"),
    sameAs: [
      "https://github.com/CSS-AMU",
      "https://www.linkedin.com/company/cssamu",
      "https://www.instagram.com/css.amu/",
    ],
    parentOrganization: {
      "@type": "CollegeOrUniversity",
      name: "Aligarh Muslim University",
    },
  };
}

export function webPageJsonLd({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name,
    description,
    url: absoluteUrl(path),
    isPartOf: {
      "@type": "WebSite",
      name: siteShortName,
      url: getSiteUrl(),
    },
  };
}
