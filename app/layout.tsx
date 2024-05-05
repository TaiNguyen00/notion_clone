import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
// theme prodiver
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ConvexClientProvider } from "@/components/providers/auth-provider";
import { ModalProvider } from "@/components/providers/modal-provider";
// font
const inter = Inter({ subsets: ["latin"] });

// Edge store
import { EdgeStoreProvider } from '../lib/edgestore';


export const metadata: Metadata = {
  title: "Notions",
  description: "The connected workspace where better, faster work happens.",
  icons: {
    icon: [
      {
        media: "(prefers-color-scheme: light)",
        url: "/logo.png",
        href: "/logo.png"
      },
      {
        media: "(prefers-color-scheme: dark)",
        url: "/vercel.svg",
        href: "/vercel.svg"
      }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ConvexClientProvider>
          <EdgeStoreProvider>
            <ThemeProvider
            attribute='class'
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            storageKey="notion-theme-2" 
            >
              <Toaster position="bottom-center" />
              <ModalProvider />
              {children}  
            </ThemeProvider>
          </EdgeStoreProvider>
        </ConvexClientProvider>
      </body>
    </html>
  );
}
