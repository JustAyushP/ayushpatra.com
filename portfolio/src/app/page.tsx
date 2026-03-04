"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import homeData from "../content/home.json";
import musicData from "../content/music.json";
import aboutData from "../content/about.json";
import Aurora from "../components/Aurora";

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

function useTypewriter(text: string, speed = 80, delay = 500) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timeout);
  }, [text, speed, delay]);

  return { displayed, done };
}

function useKonami(callback: () => void) {
  const sequence = useRef<string[]>([]);
  const code = [
    "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
    "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
    "b", "a",
  ];

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      sequence.current.push(e.key);
      sequence.current = sequence.current.slice(-code.length);
      if (sequence.current.join(",") === code.join(",")) {
        callback();
        sequence.current = [];
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [callback]);
}

export default function Home() {
  const headline = home.headline ?? "Ayush Patra.";
  const { displayed, done } = useTypewriter(headline, 90, 300);

  const [emailCopied, setEmailCopied] = useState(false);
  const [konamiActive, setKonamiActive] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [loaded, setLoaded] = useState(false);

  // Page load blur-in
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  // Background color
  useEffect(() => {
    document.documentElement.style.backgroundColor = "black";
    document.body.style.backgroundColor = "black";
    return () => {
      document.documentElement.style.backgroundColor = "";
      document.body.style.backgroundColor = "";
    };
  }, []);


  // Tab title easter egg
  useEffect(() => {
    const original = document.title;
    const handleVisibility = () => {
      document.title = document.hidden ? "Come back! 👋" : original;
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      document.title = original;
    };
  }, []);

  // Cursor glow
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  // Konami code
  const triggerKonami = useCallback(() => {
    setKonamiActive(true);
    setTimeout(() => setKonamiActive(false), 4000);
  }, []);
  useKonami(triggerKonami);

  // Copy email
  const handleCopyEmail = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(aboutData.socials.email);
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch {
      /* fallback: do nothing */
    }
  };

  return (
    <>
      <style>{`
        .cursor-glow {
          position: fixed;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%);
          pointer-events: none;
          z-index: 1;
          transform: translate(-50%, -50%);
        }

        .typewriter-cursor {
          display: inline-block;
          width: 3px;
          height: 1em;
          background: white;
          margin-left: 4px;
          animation: blink 1s step-end infinite;
          vertical-align: text-bottom;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        .konami-flash {
          position: fixed;
          inset: 0;
          z-index: 100;
          pointer-events: none;
          animation: konamiPulse 4s ease-out forwards;
        }

        @keyframes konamiPulse {
          0% { background: rgba(255,255,255,0.3); }
          10% { background: rgba(58,41,255,0.2); }
          30% { background: rgba(255,50,50,0.15); }
          50% { background: rgba(255,148,180,0.1); }
          100% { background: transparent; }
        }

      `}</style>

      {/* Cursor glow on Aurora */}
      <div
        className="cursor-glow"
        style={{ left: mousePos.x, top: mousePos.y }}
      />

      {/* Konami easter egg */}
      {konamiActive && <div className="konami-flash" />}

      <div
        className="fixed inset-0 flex items-center justify-center bg-black"
        style={{
          zIndex: 1,
          opacity: loaded ? 1 : 0,
          filter: loaded ? "blur(0px)" : "blur(12px)",
          transition: "opacity 0.8s ease, filter 0.8s ease",
        }}
      >
        <div className="absolute inset-0 z-0 w-screen h-screen">
          <Aurora
            colorStops={
              konamiActive
                ? ["#FF0000", "#00FF00", "#0000FF"]
                : ["#3A29FF", "#FF94B4", "#FF3232"]
            }
            blend={0.5}
            amplitude={konamiActive ? 2.0 : 1.0}
            speed={konamiActive ? 2.0 : 0.5}
          />
        </div>

        {/* Center content */}
        <div className="relative z-10 flex max-w-5xl flex-col items-center px-6 text-center">
          <h1
            className="font-semibold leading-tight tracking-tight text-white"
            style={{
              fontSize: "clamp(3rem, 9vw, 6rem)",
              lineHeight: "1.1",
            }}
          >
            {displayed}
            {!done && <span className="typewriter-cursor" />}
          </h1>

          <p className="mt-4 max-w-xl text-xl leading-8 text-white">
            <RotatingText />
          </p>

          <p className="mt-3 text-white/30 text-sm">
            Currently: {aboutData.currently}
          </p>
        </div>

        {/* Bottom row */}
        <div className="absolute bottom-10 z-10 flex items-center gap-4">
          <Link
            href="/music"
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-white/60 text-sm hover:bg-white/10 hover:text-white/80 transition-all duration-300 backdrop-blur-sm"
          >
            <span className="inline-block w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Currently listening to ♪{" "}
            <em>{musicData.featuredSong.name}</em> by{" "}
            <em>{musicData.featuredSong.artist}</em>
          </Link>

          <button
            onClick={handleCopyEmail}
            className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-white/40 text-sm hover:bg-white/10 hover:text-white/70 transition-all duration-300 backdrop-blur-sm"
          >
            {emailCopied ? (
              "Copied! ✓"
            ) : (
              <>
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4L12 13 2 4"/></svg>
                Email
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
