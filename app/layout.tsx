import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import ClientLayout from "./ClientLayout"
import Script from "next/script"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

// Dynamic title based on domain - will be set client-side
export const metadata: Metadata = {
  title: "Empower AI - Real Estate Platform", // Default fallback
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

                            {/* MemberSpace Script - Domain Based Configuration */}
                    <Script
                      id="memberspace-unified"
                      strategy="beforeInteractive"
                      dangerouslySetInnerHTML={{
                        __html: `
                          (function() {
                            if (typeof window === 'undefined') return;
                            
                            var hostname = window.location.hostname;
                            var subdomain = '';
                            
                            // Determine MemberSpace subdomain based on domain
                            if (hostname === 'sample-begginsagents.com' ||
                                 hostname === 'www.sample-begginsagents.com' ||
                                 hostname === 'sample-beggins.thenextlevelu.com' ||
                                 hostname === 'sample-begginsuniversity.com' ||
                                 hostname === 'www.sample-begginsuniversity.com') {
                              subdomain = 'begginsuniversity';
                            } else if (hostname === 'empowerc21canada.com' ||
                                       hostname === 'www.empowerc21canada.com' ||
                                       hostname === 'century21canada.thenextlevelu.com') {
                              subdomain = 'empower21canada';
                            } else if (hostname === 'sample-empower-ai.com' ||
                                       hostname === 'www.sample-empower-ai.com') {
                              subdomain = 'getempowerai';
                            } else {
                              // For all other domains, use getempowerai
                              subdomain = 'getempowerai';
                            }
                            
                            // Set MemberSpace configuration
                            window.MemberSpace = window.MemberSpace || {"subdomain": subdomain};
                            
                            // Load MemberSpace widgets script
                            var script = document.createElement("script");
                            script.src = "https://cdn.memberspace.com/scripts/widgets.js";
                            var firstScript = document.getElementsByTagName("script")[0];
                            firstScript.parentNode.insertBefore(script, firstScript);
                            
                            console.log('MemberSpace loaded for domain:', hostname, 'with subdomain:', subdomain);
                          })();
                        `,
                      }}
                    />

                    {/* Dynamic Title Script - Domain Based Configuration */}
                    <Script
                      id="dynamic-title"
                      strategy="beforeInteractive"
                      dangerouslySetInnerHTML={{
                        __html: `
                          (function() {
                            if (typeof window === 'undefined') return;
                            
                            var hostname = window.location.hostname;
                            var title = 'Empower AI - Real Estate Platform'; // Default
                            
                            // Set title based on domain
                            if (hostname === 'sample-begginsagents.com' ||
                                 hostname === 'www.sample-begginsagents.com' ||
                                 hostname === 'sample-beggins.thenextlevelu.com' ||
                                 hostname === 'sample-begginsuniversity.com' ||
                                 hostname === 'www.sample-begginsuniversity.com') {
                              title = 'Beggins University - Real Estate Platform';
                            } else if (hostname === 'empowerc21canada.com' ||
                                       hostname === 'www.empowerc21canada.com' ||
                                       hostname === 'century21canada.thenextlevelu.com') {
                              title = 'Century 21 Canada - Real Estate Platform';
                            } else if (hostname === 'sample-empower-ai.com' ||
                                       hostname === 'www.sample-empower-ai.com') {
                              title = 'Empower AI - Real Estate Platform';
                            }
                            
                            // Update document title immediately and also on DOMContentLoaded
                            document.title = title;
                            
                            // Also set it when DOM is ready to ensure it sticks
                            if (document.readyState === 'loading') {
                              document.addEventListener('DOMContentLoaded', function() {
                                document.title = title;
                              });
                            }
                            
                            console.log('Dynamic title set for domain:', hostname, 'title:', title);
                          })();
                        `,
                      }}
                    />

                    {/* Beggins University Chatbot Script */}
                    <Script
                      id="beggins-chatbot"
                      strategy="beforeInteractive"
                      dangerouslySetInnerHTML={{
                        __html: `
                          (function() {
                            if (typeof window === 'undefined') return;
                            
                            var hostname = window.location.hostname;
                            
                            // Only load Beggins University chatbot for Beggins domains
                            if (hostname === 'sample-begginsagents.com' ||
                                 hostname === 'www.sample-begginsagents.com' ||
                                 hostname === 'sample-beggins.thenextlevelu.com' ||
                                 hostname === 'sample-begginsuniversity.com' ||
                                 hostname === 'www.sample-begginsuniversity.com') {
                              
                              // Add the Beggins University Fastbots script
                              var script = document.createElement('script');
                              script.defer = true;
                              script.src = 'https://app.fastbots.ai/embed.js';
                              script.setAttribute('data-bot-id', 'clxdizpfe0089ohbd0rq1xroi');
                              document.head.appendChild(script);
                              
                              console.log('Beggins University chatbot loaded for domain:', hostname);
                            }
                          })();
                        `,
                      }}
                    />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <ClientLayout>{children}</ClientLayout>
        </ThemeProvider>

                            {/* Fastbots Chat Widget - Higher Priority */}
                    <Script
                      id="fastbots-priority"
                      strategy="beforeInteractive"
                      dangerouslySetInnerHTML={{
                        __html: `
                          (function() {
                            // Only skip on consumer home page
                            if (typeof window !== 'undefined' && (
                              window.location.pathname === '/' || 
                              window.location.hostname.includes('sample-beggins') ||
                              window.location.hostname === 'sample-begginsagents.com' ||
                              window.location.hostname === 'www.sample-begginsagents.com'
                            )) {
                              return;
                            }
                            
                            // Add the Fastbots script to head with higher priority
                            var script = document.createElement('script');
                            script.defer = true;
                            script.src = 'https://app.fastbots.ai/embed.js';
                            script.setAttribute('data-bot-id', 'cmb9q8pc4072ku0lvydb0l8io');
                            document.head.appendChild(script);
                          })();
                        `,
                      }}
                    />
      </body>
    </html>
  )
}
