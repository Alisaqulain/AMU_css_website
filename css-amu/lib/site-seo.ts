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
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: getSiteUrl(),
    siteName: siteShortName,
    title: siteName,
    description: defaultDescription,
    images: [
      {
        url: "/cslogo.png",
        width: 512,
        height: 512,
        alt: `${siteShortName} logo`,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: siteName,
    description: defaultDescription,
    images: ["/cslogo.png"],
  },
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
    openGraph: {
      title,
      description,
      url,
      type: "website",
      images: [{ url: "/cslogo.png", alt: `${siteShortName} logo` }],
    },
    twitter: {
      title,
      description,
      images: ["/cslogo.png"],
    },
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
