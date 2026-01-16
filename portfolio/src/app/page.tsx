"use client";
import Link from "next/link";
import { useEffect } from "react";
import homeData from "../content/home.json";
import Aurora from '../components/Aurora';
import FluidGlass from '../components/FluidGlass';


type HomeCTA = { label: string; href: string };

type HomeContent = {
  headline?: string;
  subheadline?: string;
  highlights?: string[];
  ctas?: HomeCTA[];
};

const home = homeData as HomeContent;

export default function Home() {
  const headline = home.headline ?? "Ayush Patra.";
  const subheadline =
    home.subheadline ??
    "Building clean systems, interactive experiences, and thoughtful products.";
  const highlights = Array.isArray(home.highlights) ? home.highlights : [];
  const ctas = Array.isArray(home.ctas) ? home.ctas : [];

  useEffect(() => {
    document.documentElement.style.backgroundColor = 'black';
    document.body.style.backgroundColor = 'black';
    return () => {
      document.documentElement.style.backgroundColor = '';
      document.body.style.backgroundColor = '';
    };
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black" style={{ zIndex: 1 }}>
      <div className="absolute inset-0 z-0 w-screen h-screen">
        <Aurora
          colorStops={["#3A29FF", "#FF94B4", "#FF3232"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>
      <div className="relative z-10 flex max-w-5xl flex-col items-center px-6 text-center">
        <h1 
          className="font-semibold leading-tight tracking-tight text-white"
          style={{ 
            fontSize: 'clamp(3rem, 9vw, 6rem)',
            lineHeight: '1.1'
          }}
        >
          {headline}
        </h1>

        <p className="max-w-xl text-lg leading-8 text-neutral-300 text-white">
          {subheadline}
        </p>

        {highlights.length > 0 && (
          <ul className="mt-4 flex flex-col gap-2 text-sm text-neutral-400">
            {highlights.map((item, index) => (
              <li key={index}>• {item}</li>
            ))}
          </ul>
        )}

        {ctas.length > 0 && (
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {ctas.map((cta, index) => (
              <Link
                key={index}
                href={cta.href}
                className="rounded-full border border-neutral-700 px-6 py-3 text-sm font-medium text-white transition hover:bg-neutral-900 hover:border-neutral-600"
              >
                {cta.label}
              </Link>
            ))}
          </div>
        )}
      </div>
      
      <div className="absolute inset-0 z-5" style={{ height: '600px', position: 'relative' }}>
      </div>
    </div>
  );
}
