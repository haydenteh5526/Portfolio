import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { MotionProvider } from "@/components/motion";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://haydenteh5526.github.io/Portfolio/"),
  title: {
    default: "Hayden Teh | Software Engineering Portfolio",
    template: "%s | Hayden Teh",
  },
  description:
    "Software engineering, practical AI and cloud computing. Explore Hayden Teh’s projects and experience at Ericsson and Jabil.",
  openGraph: { type: "website", locale: "en_IE", siteName: "Hayden Teh" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body id="top">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <MotionProvider>
          <Header />
          {children}
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
