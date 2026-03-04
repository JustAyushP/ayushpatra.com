"use client";

import { useEffect } from "react";
import Link from "next/link";
import aboutData from "../../content/about.json";
import musicData from "../../content/music.json";
import ScrollReveal from "../../components/ScrollReveal";

export default function AboutPage() {
  useEffect(() => {
    document.documentElement.style.backgroundColor = "#0a0a0a";
    document.body.style.backgroundColor = "#0a0a0a";
    return () => {
      document.documentElement.style.backgroundColor = "";
      document.body.style.backgroundColor = "";
    };
  }, []);

  return (
    <>
      <style>{`
        .about-page {
          min-height: 100vh;
          background: #0a0a0a;
          color: #fff;
        }

        .scroll-spacer {
          height: 78vh;
        }

        .scroll-section {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 80px 24px 200px;
        }

        .bento-section {
          max-width: 960px;
          margin: 0 auto;
          padding: 0 24px 120px;
        }

        .bento-grid {
          display: grid;
          grid-template-columns: 1.1fr 1fr 1fr 0.9fr;
          grid-template-rows: auto auto auto auto auto;
          grid-template-areas:
            "photo   education  education  currently"
            "photo   tech       tech       currently"
            "photo   tech       tech       nowplay"
            "quote   hobbies    hobbies    location"
            "quote   funfact    countries  countries";
          gap: 14px;
        }

        .bento-card {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(12px);
          border-radius: 20px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          gap: 8px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          overflow: hidden;
          min-height: 140px;
        }
        .bento-card:hover {
          transform: scale(1.02);
          box-shadow: 0 0 30px rgba(255, 255, 255, 0.05);
        }

        .area-photo     { grid-area: photo; padding: 0; }
        .area-photo img { width: 100%; height: 100%; object-fit: cover; border-radius: 20px; }
        .area-education { grid-area: education; }
        .area-currently { grid-area: currently; }
        .area-tech      { grid-area: tech; }
        .area-nowplay   { grid-area: nowplay; }
        .area-quote     { grid-area: quote; }
        .area-hobbies   { grid-area: hobbies; }
        .area-location  { grid-area: location; min-height: 100px; }
        .area-funfact   { grid-area: funfact; min-height: 100px; }
        .area-countries { grid-area: countries; min-height: 100px; }

        .bento-label {
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: rgba(255, 255, 255, 0.35);
          margin-bottom: 12px;
        }

        .bento-value {
          font-size: 1.1rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.9);
        }

        .tech-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .tech-tag {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 999px;
          padding: 4px 12px;
          font-size: 0.8rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .hobby-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .hobby-item {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .marquee-wrap {
          overflow: hidden;
          white-space: nowrap;
          mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
        }

        .marquee-text {
          display: inline-block;
          animation: marquee 8s linear infinite;
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @media (max-width: 768px) {
          .bento-grid {
            grid-template-columns: 1fr;
            grid-template-areas:
              "photo"
              "education"
              "currently"
              "tech"
              "nowplay"
              "hobbies"
              "quote"
              "location"
              "funfact"
              "countries";
          }
          .area-photo { min-height: 300px; }
        }
      `}</style>

      <div className="about-page">
        <div className="scroll-spacer">
          <div className="flex flex-col items-center justify-center h-full gap-6">
            <h1 className="text-white/90 font-semibold tracking-tight" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}>
              About Me
            </h1>
            <svg className="w-5 h-5 text-white/20 animate-bounce" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        <div className="scroll-section">
          <div className="max-w-[1000px]">
            <ScrollReveal
              baseOpacity={0.1}
              enableBlur
              baseRotation={3}
              blurStrength={4}
              wordAnimationEnd="center+=30% center"
              textClassName="text-white !text-[clamp(1.6rem,4vw,3rem)]"
            >
              {aboutData.scrollText}
            </ScrollReveal>
          </div>
        </div>

        <div className="bento-section">
          <div className="bento-grid">
            <div className="bento-card area-photo">
              <img src={aboutData.photo} alt="Ayush Patra" />
            </div>

            <div className="bento-card area-education">
              <div>
                <p className="bento-label">Education</p>
                <p className="bento-value">{aboutData.education.program}</p>
                <p className="text-sm text-white/50 mt-1">{aboutData.education.school}</p>
                <p className="text-xs text-white/30 mt-1">{aboutData.education.year}</p>
              </div>
            </div>

            <div className="bento-card area-currently">
              <div>
                <p className="bento-label">Currently</p>
                <p className="bento-value">{aboutData.currently}</p>
              </div>
              <span className="text-3xl mt-2">⚡</span>
            </div>

            <div className="bento-card area-tech">
              <p className="bento-label">Tech Stack</p>
              <div className="tech-tags">
                {aboutData.techStack.map((tech, i) => (
                  <span key={i} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>

            <Link href="/music" className="bento-card area-nowplay group no-underline">
              <div className="overflow-hidden w-full">
                <p className="bento-label">Now Playing</p>
                <div className="marquee-wrap">
                  <span className="marquee-text bento-value">{musicData.featuredSong.name}&nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;{musicData.featuredSong.name}&nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;</span>
                </div>
                <p className="text-sm text-white/50 mt-1">{musicData.featuredSong.artist}</p>
              </div>
              <span className="text-xs text-white/30 group-hover:text-white/60 transition-colors mt-2">♪ View music →</span>
            </Link>

            <div className="bento-card area-quote" style={{ justifyContent: 'center' }}>
              <div>
                <p className="bento-value italic leading-relaxed">&ldquo;{aboutData.quote}&rdquo;</p>
                <p className="text-sm text-white/40 mt-3">— {aboutData.quoteAuthor}</p>
              </div>
            </div>

            <div className="bento-card area-hobbies">
              <p className="bento-label">Hobbies</p>
              <div className="hobby-list">
                {aboutData.hobbies.map((hobby, i) => (
                  <span key={i} className="hobby-item">
                    {i > 0 && <span className="text-white/20 mr-2">·</span>}
                    {hobby}
                  </span>
                ))}
              </div>
            </div>

            <div className="bento-card area-location">
              <p className="bento-label">Location</p>
              <div className="flex items-center gap-2">
                <span className="text-xl">📍</span>
                <p className="bento-value text-sm">{aboutData.location}</p>
              </div>
            </div>

            <div className="bento-card area-funfact">
              <p className="bento-label">Fun Fact</p>
              <div className="flex items-center gap-2">
                <span className="text-xl">🤓</span>
                <p className="bento-value text-sm">{aboutData.funFact}</p>
              </div>
            </div>

            <Link href="/travel" className="bento-card area-countries group no-underline" style={{ position: 'relative' }}>
              <p className="bento-label">Countries Travelled</p>
              <div className="flex items-end">
                <span className="text-6xl font-bold text-white/90 leading-none">{aboutData.countriesTravelled}</span>
                <span className="text-white/40 text-xs ml-2 mb-0.5">and counting →</span>
              </div>
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[5rem] leading-none opacity-[0.08] group-hover:opacity-[0.15] transition-opacity pointer-events-none select-none">🌍</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
