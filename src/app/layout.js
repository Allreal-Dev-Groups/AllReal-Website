import "./globals.css";
import { siteConfig } from "@/lib/siteConfig";
import ThemeProvider from "@/components/layout/ThemeProvider";
import LenisProvider from "@/components/layout/LenisProvider";
import { Header, SplashCursor } from "@/components";


export const metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme="brand">
      <body className="antialiased overflow-x-hidden">
        
        <SplashCursor/>
        <ThemeProvider>
          <Header />
          <LenisProvider>{children}</LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
