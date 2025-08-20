'use client'
import '../components/globals.css';
import { ThemeProvider as MTThemeProvider } from "@material-tailwind/react";
import { ThemeProvider } from "../context/ThemeContext";
import type { AppProps } from "next/app";
import GlassHeader from "../components/GlassHeader";
import Footer from "../components/Footer";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MTThemeProvider>
      <ThemeProvider>
        <GlassHeader />
        <main className="min-h-screen p-8 bg-gradient-to-br from-green-200 via-emerald-300 to-gray-500">
          <Component {...pageProps} />
        </main>
        <Footer />
      </ThemeProvider>
    </MTThemeProvider>
  );
}