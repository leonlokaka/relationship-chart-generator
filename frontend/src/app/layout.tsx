"use client";
import "./globals.css";
import { metadata } from "./const";
import Script from "next/script";
import MainProvider from "./MainProvider";
import { GlobalDialog } from "./components/GlobalDialog";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      style={{
        position: "relative",
        height: "100%",
      }}
    >
      <head>
        <title>{metadata.title?.toString()}</title>
        <meta property="og:title" content={metadata.title?.toString()} />
        <meta name="description" content={metadata.description!} />
        <meta name="og:description" content={metadata.description!} />
        <meta name="image" content={metadata.icons?.toString()} />
        <meta name="og:image" content={metadata.icons?.toString()} />
        <meta name="keywords" content={metadata.title?.toString()} />
      </head>
      <body
        style={{
          position: "relative",
          height: "100%",
        }}
      >
        <MainProvider>
          {/* <Header /> */}
          <main
            style={{
              position: "relative",
              height: "100%",
            }}
          >
            {children}
          </main>
          {/* <Footer /> */}
        </MainProvider>

        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA_MEASUREMENT_ID}`}
        />
        <Script id="google-analytics">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', '${process.env.GA_MEASUREMENT_ID}');
        `}
        </Script>
      </body>
    </html>
  );
}
