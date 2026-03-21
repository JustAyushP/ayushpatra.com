"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Link from "next/link";
import aboutData from "../../content/about.json";
import musicData from "../../content/music.json";
import ScrollReveal from "../../components/ScrollReveal";

export default function AboutPage() {
  const [loaded, setLoaded] = useState(false);
  const [cardTilts, setCardTilts] = useState<Record<number, { x: number; y: number }>>({});
  const bentoRef = useRef<HTMLDivElement>(null);
  const expRef = useRef<HTMLDivElement>(null);
  const projRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    document.documentElement.style.backgroundColor = "#0a0a0a";
    document.body.style.backgroundColor = "#0a0a0a";
    return () => {
      document.documentElement.style.backgroundColor = "";
      document.body.style.backgroundColor = "";
    };
  }, []);

  const handleCardMouseMove = useCallback((index: number, e: React.MouseEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setCardTilts(prev => ({ ...prev, [index]: { x: y * 4, y: -x * 4 } }));
  }, []);

  const handleCardMouseLeave = useCallback((index: number) => {
    setCardTilts(prev => ({ ...prev, [index]: { x: 0, y: 0 } }));
  }, []);

  const [bentoVisible, setBentoVisible] = useState(false);
  const [expVisible, setExpVisible] = useState(false);
  const [projVisible, setProjVisible] = useState(false);

  useEffect(() => {
    const bentoEl = bentoRef.current;
    const expEl = expRef.current;
    const projEl = projRef.current;

    const bentoObs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setBentoVisible(true),
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    const expObs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setExpVisible(true),
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    const projObs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setProjVisible(true),
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    if (bentoEl) bentoObs.observe(bentoEl);
    if (expEl) expObs.observe(expEl);
    if (projEl) projObs.observe(projEl);

    return () => {
      if (bentoEl) bentoObs.unobserve(bentoEl);
      if (expEl) expObs.unobserve(expEl);
      if (projEl) projObs.unobserve(projEl);
    };
  }, [aboutData.showExperience, aboutData.showProjects]);

  return (
    <>
      <style>{`
        .about-page {
          min-height: 100vh;
          background: #0a0a0a;
          color: #fff;
          position: relative;
        }

        .section-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent);
          max-width: 960px;
          margin: 0 auto 80px;
          transform-origin: left;
          transform: scaleX(0);
          transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .section-divider.visible {
          transform: scaleX(1);
        }

        .scroll-spacer {
          height: 78vh;
        }

        .hero-title {
          background: linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.9) 40%, rgba(168,130,255,0.7) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: drop-shadow(0 0 40px rgba(168,130,255,0.15));
        }

        .reveal-bento {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .reveal-bento.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .reveal-section {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .reveal-section.visible {
          opacity: 1;
          transform: translateY(0);
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
            "quote   tech       tech       nowplay"
            "connect hobbies    hobbies    location"
            "funfact funfact    countries  countries";
          gap: 14px;
        }

        .bento-card {
          --tilt-x: 0deg;
          --tilt-y: 0deg;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(12px);
          border-radius: 20px;
          padding: 24px;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          gap: 8px;
          transition: transform 0.2s ease-out, box-shadow 0.3s ease, background 0.3s ease, border-color 0.3s ease;
          overflow: hidden;
          min-height: 140px;
          transform: perspective(800px) rotateX(var(--tilt-x)) rotateY(var(--tilt-y)) scale(1);
        }
        .bento-card:hover {
          transform: perspective(800px) rotateX(var(--tilt-x)) rotateY(var(--tilt-y)) scale(1.02);
        }

        .area-education:hover {
          background: rgba(99, 145, 255, 0.08);
          border-color: rgba(99, 145, 255, 0.18);
          box-shadow: 0 0 30px rgba(99, 145, 255, 0.06);
        }
        .area-currently:hover {
          background: rgba(251, 191, 36, 0.08);
          border-color: rgba(251, 191, 36, 0.18);
          box-shadow: 0 0 30px rgba(251, 191, 36, 0.06);
        }
        .area-tech:hover {
          background: rgba(168, 130, 255, 0.08);
          border-color: rgba(168, 130, 255, 0.18);
          box-shadow: 0 0 30px rgba(168, 130, 255, 0.06);
        }
        .area-nowplay:hover {
          background: rgba(30, 215, 96, 0.08);
          border-color: rgba(30, 215, 96, 0.18);
          box-shadow: 0 0 30px rgba(30, 215, 96, 0.06);
        }
        .area-quote:hover {
          background: rgba(244, 114, 182, 0.08);
          border-color: rgba(244, 114, 182, 0.18);
          box-shadow: 0 0 30px rgba(244, 114, 182, 0.06);
        }
        .area-connect:hover {
          background: rgba(99, 102, 241, 0.08);
          border-color: rgba(99, 102, 241, 0.18);
          box-shadow: 0 0 30px rgba(99, 102, 241, 0.06);
        }
        .area-hobbies:hover {
          background: rgba(45, 212, 191, 0.08);
          border-color: rgba(45, 212, 191, 0.18);
          box-shadow: 0 0 30px rgba(45, 212, 191, 0.06);
        }
        .area-location:hover {
          background: rgba(251, 146, 60, 0.08);
          border-color: rgba(251, 146, 60, 0.18);
          box-shadow: 0 0 30px rgba(251, 146, 60, 0.06);
        }
        .area-funfact:hover {
          background: rgba(250, 204, 21, 0.08);
          border-color: rgba(250, 204, 21, 0.18);
          box-shadow: 0 0 30px rgba(250, 204, 21, 0.06);
        }
        .area-countries:hover {
          background: rgba(52, 211, 153, 0.08);
          border-color: rgba(52, 211, 153, 0.18);
          box-shadow: 0 0 30px rgba(52, 211, 153, 0.06);
        }

        .area-photo-wrapper {
          grid-area: photo;
        }
        .area-photo {
          padding: 0;
          aspect-ratio: 1;
          overflow: hidden;
          border: 2px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
        }
        .area-photo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 25%;
          border-radius: 18px;
          filter: brightness(0.88) contrast(1.05);
        }
        .area-education { grid-area: education; }
        .area-currently { grid-area: currently; }
        .area-tech      { grid-area: tech; }
        .area-nowplay   { grid-area: nowplay; }
        .area-quote     { grid-area: quote; min-height: 100px; }
        .area-connect   { grid-area: connect; min-height: 100px; }
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

        .traditional-section {
          max-width: 960px;
          margin: 0 auto;
          padding: 0 24px 120px;
        }

        .section-heading {
          font-size: 1.8rem;
          font-weight: 600;
          background: linear-gradient(135deg, rgba(255,255,255,0.95), rgba(168,130,255,0.8));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 40px;
        }

        .timeline {
          position: relative;
          padding-left: 32px;
        }
        .timeline::before {
          content: '';
          position: absolute;
          left: 7px;
          top: 8px;
          bottom: 8px;
          width: 1px;
          background: rgba(255, 255, 255, 0.1);
        }

        .timeline-item {
          position: relative;
          padding-bottom: 40px;
        }
        .timeline-item:last-child {
          padding-bottom: 0;
        }
        .timeline-dot {
          position: absolute;
          left: -28px;
          top: 8px;
          width: 11px;
          height: 11px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          border: 2px solid rgba(255, 255, 255, 0.3);
        }

        .timeline-role {
          font-size: 1.1rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.9);
        }
        .timeline-company {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.5);
          margin-top: 2px;
          text-decoration: none;
        }
        .timeline-company:hover {
          color: rgba(255, 255, 255, 0.7);
        }
        .timeline-date {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: rgba(255, 255, 255, 0.3);
          margin-top: 6px;
        }
        .timeline-desc {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.55);
          margin-top: 10px;
          line-height: 1.6;
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .project-card {
          --accent: 255, 255, 255;
          position: relative;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          padding: 28px;
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease, background 0.3s ease;
          display: flex;
          flex-direction: column;
          gap: 14px;
          overflow: hidden;
        }
        .project-card.featured {
          grid-column: 1 / -1;
          padding: 36px 40px;
        }
        .project-card.featured .project-name {
          font-size: 1.4rem;
        }
        .project-card.featured .project-desc {
          font-size: 0.9rem;
          max-width: 720px;
        }
        .project-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 20px;
          padding: 1px;
          background: linear-gradient(135deg, rgba(var(--accent), 0.3), transparent 50%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }
        .project-card:hover::before {
          opacity: 1;
        }
        .project-card:hover {
          transform: translateY(-6px);
          background: rgba(var(--accent), 0.04);
          border-color: rgba(var(--accent), 0.15);
          box-shadow: 0 12px 40px rgba(var(--accent), 0.08);
        }

        

        .project-name {
          font-size: 1.15rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
          line-height: 1.3;
        }
        .project-desc {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.45);
          line-height: 1.7;
        }
        .project-links {
          display: flex;
          gap: 10px;
          margin-top: auto;
          padding-top: 4px;
        }
        .project-link {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 0.78rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.35);
          text-decoration: none;
          padding: 5px 12px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: all 0.2s ease;
        }
        .project-link:hover {
          color: rgba(255, 255, 255, 0.8);
          border-color: rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.05);
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
              "connect"
              "location"
              "funfact"
              "countries";
          }
          .area-photo { min-height: 300px; }
          .projects-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div
        className="about-page"
        style={{
          opacity: loaded ? 1 : 0,
          filter: loaded ? "blur(0px)" : "blur(12px)",
          transition: "opacity 0.6s ease, filter 0.6s ease",
        }}
      >
        <div className="about-content" style={{ position: 'relative', zIndex: 0 }}>
        <div className="scroll-spacer">
          <div className="flex flex-col items-center justify-center h-full gap-6">
            <h1 className="hero-title font-semibold tracking-tight" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)' }}>
              About Me
            </h1>
            <button
              onClick={() => {
                const target = document.querySelector('.scroll-section');
                target?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Scroll down"
            >
              <svg className="w-5 h-5 text-white/20 animate-bounce" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
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

        <div className={`section-divider ${bentoVisible ? "visible" : ""}`} />

        <div ref={bentoRef} className={`bento-section ${bentoVisible ? "reveal-bento visible" : "reveal-bento"}`}>
          <div className="bento-grid">
            <div className="area-photo-wrapper">
              <div
                className="bento-card area-photo"
                onMouseMove={(e) => handleCardMouseMove(0, e)}
                onMouseLeave={() => handleCardMouseLeave(0)}
                style={{ ['--tilt-x']: `${cardTilts[0]?.x ?? 0}deg`, ['--tilt-y']: `${cardTilts[0]?.y ?? 0}deg` } as React.CSSProperties}
              >
                <img src={aboutData.photo} alt="Ayush Patra" />
              </div>
            </div>

            <div
              className="bento-card area-education"
              onMouseMove={(e) => handleCardMouseMove(1, e)}
              onMouseLeave={() => handleCardMouseLeave(1)}
              style={{ ['--tilt-x']: `${cardTilts[1]?.x ?? 0}deg`, ['--tilt-y']: `${cardTilts[1]?.y ?? 0}deg` } as React.CSSProperties}
            >
              <div>
                <p className="bento-label">Education</p>
                <p className="text-[1.25rem] font-semibold text-white/90">{aboutData.education.school}</p>
                <p className="text-sm text-white/50 mt-1">{aboutData.education.program} · {aboutData.education.year}</p>
              </div>
            </div>

            <div
              className="bento-card area-currently"
              onMouseMove={(e) => handleCardMouseMove(2, e)}
              onMouseLeave={() => handleCardMouseLeave(2)}
              style={{ ['--tilt-x']: `${cardTilts[2]?.x ?? 0}deg`, ['--tilt-y']: `${cardTilts[2]?.y ?? 0}deg` } as React.CSSProperties}
            >
              <div>
                <p className="bento-label">Currently</p>
                <p className="text-[1.2rem] font-semibold text-white/90 leading-snug">{aboutData.currently}</p>
              </div>
            </div>

            <div
              className="bento-card area-tech"
              onMouseMove={(e) => handleCardMouseMove(3, e)}
              onMouseLeave={() => handleCardMouseLeave(3)}
              style={{ ['--tilt-x']: `${cardTilts[3]?.x ?? 0}deg`, ['--tilt-y']: `${cardTilts[3]?.y ?? 0}deg` } as React.CSSProperties}
            >
              <p className="bento-label">Tech Stack</p>
              <div className="tech-tags">
                {aboutData.techStack.map((tech, i) => (
                  <span key={i} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>

            <Link
              href="/music"
              className="bento-card area-nowplay group no-underline"
              onMouseMove={(e) => handleCardMouseMove(4, e)}
              onMouseLeave={() => handleCardMouseLeave(4)}
              style={{ ['--tilt-x']: `${cardTilts[4]?.x ?? 0}deg`, ['--tilt-y']: `${cardTilts[4]?.y ?? 0}deg` } as React.CSSProperties}
            >
              <div className="overflow-hidden w-full">
                <p className="bento-label">Now Playing</p>
                <div className="marquee-wrap">
                  <span className="marquee-text bento-value">{musicData.featuredSong.name}&nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;{musicData.featuredSong.name}&nbsp;&nbsp;&nbsp;·&nbsp;&nbsp;&nbsp;</span>
                </div>
                <p className="text-sm text-white/50 mt-1">{musicData.featuredSong.artist}</p>
              </div>
              <span className="text-xs text-white/30 group-hover:text-white/60 transition-colors mt-2">♪ View music →</span>
            </Link>

            <div
              className="bento-card area-quote"
              style={{ justifyContent: 'center', ['--tilt-x']: `${cardTilts[5]?.x ?? 0}deg`, ['--tilt-y']: `${cardTilts[5]?.y ?? 0}deg` } as React.CSSProperties}
              onMouseMove={(e) => handleCardMouseMove(5, e)}
              onMouseLeave={() => handleCardMouseLeave(5)}
            >
              <div>
                <p className="text-[0.95rem] italic leading-relaxed text-white/70">&ldquo;{aboutData.quote}&rdquo;</p>
                <p className="text-xs text-white/30 mt-3">— {aboutData.quoteAuthor}</p>
              </div>
            </div>

            <div
              className="bento-card area-connect"
              onMouseMove={(e) => handleCardMouseMove(6, e)}
              onMouseLeave={() => handleCardMouseLeave(6)}
              style={{ ['--tilt-x']: `${cardTilts[6]?.x ?? 0}deg`, ['--tilt-y']: `${cardTilts[6]?.y ?? 0}deg` } as React.CSSProperties}
            >
              <p className="bento-label">Connect</p>
              <div className="flex flex-col gap-2">
                <a href={aboutData.socials.github} target="_blank" rel="noopener noreferrer" className="text-sm text-white/70 hover:text-white transition-colors">GitHub ↗</a>
                <a href={aboutData.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-sm text-white/70 hover:text-white transition-colors">LinkedIn ↗</a>
                <a href={`mailto:${aboutData.socials.email}`} className="text-sm text-white/70 hover:text-white transition-colors">Email ↗</a>
              </div>
            </div>

            <div
              className="bento-card area-hobbies"
              onMouseMove={(e) => handleCardMouseMove(7, e)}
              onMouseLeave={() => handleCardMouseLeave(7)}
              style={{ ['--tilt-x']: `${cardTilts[7]?.x ?? 0}deg`, ['--tilt-y']: `${cardTilts[7]?.y ?? 0}deg` } as React.CSSProperties}
            >
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

            <div
              className="bento-card area-location"
              onMouseMove={(e) => handleCardMouseMove(8, e)}
              onMouseLeave={() => handleCardMouseLeave(8)}
              style={{ ['--tilt-x']: `${cardTilts[8]?.x ?? 0}deg`, ['--tilt-y']: `${cardTilts[8]?.y ?? 0}deg` } as React.CSSProperties}
            >
              <p className="bento-label">Location</p>
              <div className="flex items-center gap-2">
                <span className="text-xl">📍</span>
                <p className="bento-value text-sm">{aboutData.location}</p>
              </div>
            </div>

            <div
              className="bento-card area-funfact"
              onMouseMove={(e) => handleCardMouseMove(9, e)}
              onMouseLeave={() => handleCardMouseLeave(9)}
              style={{ ['--tilt-x']: `${cardTilts[9]?.x ?? 0}deg`, ['--tilt-y']: `${cardTilts[9]?.y ?? 0}deg` } as React.CSSProperties}
            >
              <p className="bento-label">Fun Fact</p>
              <div className="flex items-center gap-2">
                <p className="bento-value text-sm">{aboutData.funFact}</p>
              </div>
            </div>

            <Link
              href="/travel"
              className="bento-card area-countries group no-underline"
              style={{ position: 'relative', ['--tilt-x']: `${cardTilts[10]?.x ?? 0}deg`, ['--tilt-y']: `${cardTilts[10]?.y ?? 0}deg` } as React.CSSProperties}
              onMouseMove={(e) => handleCardMouseMove(10, e)}
              onMouseLeave={() => handleCardMouseLeave(10)}
            >
              <p className="bento-label">Countries Travelled</p>
              <div className="flex items-end">
                <span className="text-6xl font-bold text-white/90 leading-none">{aboutData.countriesTravelled}</span>
                <span className="text-white/40 text-xs ml-2 mb-0.5">and counting →</span>
              </div>
              
            </Link>
          </div>
        </div>

        {aboutData.showExperience && (
          <>
            <div className={`section-divider ${expVisible ? "visible" : ""}`} />
            <div ref={expRef} className={`traditional-section ${expVisible ? "reveal-section visible" : "reveal-section"}`}>
              <h2 className="section-heading">Experience</h2>
            <div className="timeline">
              {aboutData.experience.map((exp, i) => (
                <div key={i} className="timeline-item">
                  <div className="timeline-dot" />
                  <p className="timeline-role">
                    {exp.role}
                    {exp.incoming && <span className="incoming-badge">Incoming</span>}
                  </p>
                  {exp.companyUrl ? (
                    <a href={exp.companyUrl} target="_blank" rel="noopener noreferrer" className="timeline-company">{exp.company} ↗</a>
                  ) : (
                    <p className="timeline-company">{exp.company}</p>
                  )}
                  <p className="timeline-date">{exp.date}</p>
                  {exp.description && <p className="timeline-desc">{exp.description}</p>}
                  {exp.tags.length > 0 && (
                    <div className="tech-tags" style={{ marginTop: 12 }}>
                      {exp.tags.map((tag, j) => (
                        <span key={j} className="tech-tag">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            </div>
          </>
        )}

        {aboutData.showProjects && (
          <>
            <div className={`section-divider ${projVisible ? "visible" : ""}`} />
            <div ref={projRef} className={`traditional-section ${projVisible ? "reveal-section visible" : "reveal-section"}`}>
              <h2 className="section-heading">Projects</h2>
            <div className="projects-grid">
              {aboutData.projects.map((project, i) => {
                const accents = ['74, 158, 255', '30, 185, 84', '255, 138, 76', '168, 130, 255'];
                return (
                <div key={i} className={`project-card${i === 0 ? ' featured' : ''}`} style={{ '--accent': accents[i % accents.length] } as React.CSSProperties}>
                  <p className="project-name">{project.name}</p>
                  <p className="project-desc">{project.description}</p>
                  <div className="tech-tags">
                    {project.tags.map((tag, j) => (
                      <span key={j} className="tech-tag">{tag}</span>
                    ))}
                  </div>
                  <div className="project-links">
                    {project.url && (
                      <a href={project.url} target="_blank" rel="noopener noreferrer" className="project-link">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                        Live
                      </a>
                    )}
                    {project.github && (
                      <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
                );
              })}
            </div>
            </div>
          </>
        )}
        </div>
      </div>
    </>
  );
}
