import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import ClientLayout from "./ClientLayout"
import Script from "next/script"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

// Century 21 Canada specific metadata
export const metadata: Metadata = {
  title: "Century 21 Canada - Real Estate Platform",
  description: "AI-powered tools and training for real estate professionals",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
                return (
                <html lang="en" suppressHydrationWarning>
      <head>
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />

                            {/* MemberSpace Script - Century 21 Canada Only */}
                    <Script
                      id="memberspace-canada"
                      strategy="beforeInteractive"
                      dangerouslySetInnerHTML={{
                        __html: `
                          var MemberSpace = window.MemberSpace || {"subdomain":"empowerc21canada"};
                          (function(d){
                            var s = d.createElement("script");
                            s.src = "https://cdn.memberspace.com/scripts/widgets.js";
                            var e = d.getElementsByTagName("script")[0];
                            e.parentNode.insertBefore(s,e);
                          }(document));
                        `,
                      }}
                    />

                    {/* Static Title Script - Century 21 Canada */}
                    <Script
                      id="static-title"
                      strategy="beforeInteractive"
                      dangerouslySetInnerHTML={{
                        __html: `
                          document.title = 'Century 21 Canada - Real Estate Platform';
                        `,
                      }}
                    />


      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <ClientLayout>{children}</ClientLayout>
        </ThemeProvider>


      </body>
    </html>
  )
}
