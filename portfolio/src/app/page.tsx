"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import homeData from "../content/home.json";
import musicData from "../content/music.json";
import Aurora from '../components/Aurora';

type HomeContent = {
  headline?: string;
  subheadline?: string;
};

const home = homeData as HomeContent;

const rotatingPhrases = [
  "I build software.",
  "I make films.",
  "I solve problems.",
  "I explore the world.",
];

function RotatingText() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % rotatingPhrases.length);
        setFade(true);
      }, 400);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span
      className="inline-block transition-all duration-400 ease-in-out"
      style={{
        opacity: fade ? 1 : 0,
        transform: fade ? "translateY(0)" : "translateY(8px)",
        transition: "opacity 0.4s ease, transform 0.4s ease",
      }}
    >
      {rotatingPhrases[index]}
    </span>
  );
}

export default function Home() {
  const headline = home.headline ?? "Ayush Patra.";

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

        <p className="mt-4 max-w-xl text-xl leading-8 text-white">
          <RotatingText />
        </p>
      </div>

      <Link
        href="/music"
        className="absolute bottom-10 z-10 flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm hover:bg-white/10 hover:text-white/80 transition-all duration-300 backdrop-blur-sm"
      >
        <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse" />
        Currently listening to ♪ <em>{musicData.featuredSong.name}</em> by <em>{musicData.featuredSong.artist}</em>
      </Link>
    </div>
  );
}
