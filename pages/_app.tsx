'use client'
import '../components/globals.css';
import { ThemeProvider as MTThemeProvider } from "@material-tailwind/react";
import { ThemeProvider } from "../context/ThemeContext";
import type { AppProps } from "next/app";
import { Header as GlassHeader } from "../components/Header";
import { Footer }  from "../components/Footer";
import Head from 'next/head';
import Script from 'next/script';
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Liquid Glass UI Component Library – Modern Glassmorphism React & Tailwind CSS Kit</title>
        <meta
          name="description"
          content="Liquid Glass UI: A modern glassmorphism component library for React, Tailwind CSS, and Next.js. Perfect for education, design, and web apps. Popular searches: liquid glass tailwind, glassmorphism ui react, liquid glass next js, tailwindcss liquid glass."
        />
        <meta
          name="keywords"
          content="liquid glass tailwind, liquid glass next js, glassmorphism ui react, tailwind liquid glass, liquid glass ui, liquid glass ui library, tailwindcss liquid glass, glass ui, liquid glass component library, liquid glass in tailwind, react, nextjs, glassmorphism, UI kit, open source, education, design, component library"
        />
        <meta name="author" content="liqueai.com" />
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#10b981" />
        <meta name="baidu-site-verification" content="codeva-rHX2WveDDk" />
        <meta
          property="og:title"
          content="Liquid Glass UI | Tailwind Glassmorphism React Components & Next.js Library"
        />
        <meta
          property="og:description"
          content="Liquid Glass UI component library for Tailwind CSS, React, and Next.js. Designed for modern glassmorphism. Popular searches: liquid glass tailwind, glassmorphism ui react, liquid glass next js."
        />
        <meta property="og:url" content="https://liquidglass.liqueai.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://liquidglass.liqueai.com/og-image.png" />
        <meta property="og:site_name" content="Liquid Glass UI" />
        <meta property="og:locale" content="en_US" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Liquid Glass UI | Tailwind Glassmorphism React Components & Next.js Library"
        />
        <meta
          name="twitter:description"
          content="Liquid Glass UI component library built with Tailwind CSS, React, and Next.js. Modern glassmorphism for education, design, and web apps."
        />
        <meta name="twitter:image" content="https://liquidglass.liqueai.com/og-image.png" />
        <link rel="canonical" href="https://liquidglass.liqueai.com/" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" sizes="16x16" />
      </Head>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-HY16TGS4ZE"
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-HY16TGS4ZE');
        `}
      </Script>
      <MTThemeProvider>
        <ThemeProvider>
          <GlassHeader />
          <main className="min-h-screen p-8 bg-gradient-to-br from-green-200 via-emerald-300 to-gray-500">
            <Component {...pageProps} />
          </main>
          <Footer />
        </ThemeProvider>
      </MTThemeProvider>
      <Toaster position="top-center" />
    </>

  );
}