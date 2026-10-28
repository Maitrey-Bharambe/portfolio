import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
const title = "Maitrey Bharambe | Data Scientist & AI Engineer";
const description =
  "Portfolio of Maitrey Bharambe, working across data science, machine learning, AI engineering, and creative software.";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  authors: [{ name: "Maitrey Bharambe" }],
  openGraph: {
    title,
    description,
    type: "website",
    siteName: "Maitrey Bharambe",
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image", title, description },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fff5d6",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preload"
          href="/fonts/HostGrotesk.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
