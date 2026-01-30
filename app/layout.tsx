import type { Metadata } from "next";
import { Prompt, Raleway } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import Loading from "./Components/loading";
import ClientProviders from "./Components/ProjectWrap/ProjectWrap";
//import imp from './public/regallog.svg'
const prompt = Prompt({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-prompt",
  display: "swap",
});

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Regal",
  description: "Fitted by Regal",
  icons: {
    icon: "/regallog.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${raleway.className}`}>
        {/* Everything inside ClientProviders is client-side */}
        <ClientProviders>
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </ClientProviders>
      </body>
    </html>
  );
}
