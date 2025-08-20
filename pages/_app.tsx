'use client'
import '../components/globals.css';
import { ThemeProvider as MTThemeProvider } from "@material-tailwind/react";
import { ThemeProvider } from "../context/ThemeContext";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MTThemeProvider>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </MTThemeProvider>
  );
}