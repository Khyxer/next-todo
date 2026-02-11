import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import localFont from "next/font/local";
import ToggleTheme from "@/components/ToggleTheme";
import { Toaster } from "react-hot-toast";
import { UserInfoProvider } from "@/contexts/UserInfoContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const snPro = localFont({
  src: "../public/fonts/SNPro-VariableFont_wght.woff2",
  variable: "--font-sn-pro",
  weight: "100 900", // Rango de peso para fuente variable
});

export const metadata: Metadata = {
  title: "Next Todo",
  description: "Next Todo app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${snPro.variable} ${geistSans.variable} ${geistMono.variable}  antialiased`}
      >
        <UserInfoProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ToggleTheme />
            <Toaster />

            {children}
          </ThemeProvider>
        </UserInfoProvider>
      </body>
    </html>
  );
}
