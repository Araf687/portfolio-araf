import type { Metadata } from "next";
import { Anton, Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import QueryProvider from "@/lib/query-provider";
import TopNav from "@/components/TopNav";
import Footer from "@/components/web/Footer";
import ThemeProvider from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  weight: "400",
  style: "italic",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mohammad Yeasin — Full Stack Developer",
  description:
    "Full stack developer focused on scalable architecture, clean structure, clear UX and performance.",
};

// Runs before paint so a stored or system theme never flashes the wrong colors
const themeScript = `try{var t=localStorage.getItem("theme");document.documentElement.dataset.theme=t==="light"||t==="dark"?t:matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}catch(e){document.documentElement.dataset.theme="dark"}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${anton.variable} ${instrumentSerif.variable} antialiased z-0`}
      >
        <ThemeProvider>
          {/* clip, not hidden: overflow-hidden would break the sticky project stack */}
          <div className="min-h-screen bg-background text-foreground overflow-x-clip">
            <TopNav />
            <QueryProvider>{children}</QueryProvider>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
