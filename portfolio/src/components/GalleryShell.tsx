"use client";

import { useEffect, useState } from "react";
import GalleryCanvas from "@/components/GalleryCanvas";

type GalleryPhoto = {
  id: string;
  src: string;
  title: string;
  date: string;
  location: string;
  tags: string[];
};

type GalleryPage = {
  slug: string;
  name: string;
  blurb: string;
  firstRowCount?: number;
  photos: GalleryPhoto[];
};

type GalleryContent = {
  intro: string;
  pages: GalleryPage[];
};

export default function GalleryShell({ gallery }: { gallery: GalleryContent }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  const page = gallery.pages[activeIndex];
  const images = page.photos.map((photo) => photo.src);

  useEffect(() => {
    const slug = window.location.hash.replace("#", "");
    if (!slug) return;
    const index = gallery.pages.findIndex((p) => p.slug === slug);
    if (index >= 0) setActiveIndex(index);
  }, [gallery.pages]);

  const switchPage = (index: number) => {
    if (index === activeIndex) return;
    setVisible(false);
    setTimeout(() => {
      setActiveIndex(index);
      window.location.hash = gallery.pages[index].slug;
      setVisible(true);
    }, 200);
  };

  const goPrev = () => {
    if (activeIndex > 0) switchPage(activeIndex - 1);
  };

  const goNext = () => {
    if (activeIndex < gallery.pages.length - 1) switchPage(activeIndex + 1);
  };

  return (
    <>
      <style>{`
        .gallery-canvas-wrap {
          transition: opacity 0.25s ease, transform 0.25s ease;
        }
        .gallery-canvas-wrap.hidden-page {
          opacity: 0;
          transform: translateY(8px);
        }
        .gallery-nav {
          position: fixed;
          bottom: 28px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 30;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 10px;
          border-radius: 999px;
          background: rgba(0, 0, 0, 0.55);
          border: 1px solid rgba(255, 255, 255, 0.12);
          backdrop-filter: blur(12px);
          max-width: calc(100vw - 48px);
          overflow-x: auto;
        }
        .gallery-nav-btn {
          border: 1px solid transparent;
          background: transparent;
          color: rgba(255, 255, 255, 0.45);
          font-size: 0.85rem;
          font-weight: 500;
          padding: 8px 14px;
          border-radius: 999px;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .gallery-nav-btn:hover {
          color: rgba(255, 255, 255, 0.8);
          background: rgba(255, 255, 255, 0.06);
        }
        .gallery-nav-btn.active {
          color: white;
          background: rgba(255, 255, 255, 0.12);
          border-color: rgba(255, 255, 255, 0.18);
        }
        .gallery-page-name {
          font-size: 1.1rem;
          font-weight: 600;
          color: white;
          line-height: 1.2;
        }
        .gallery-page-blurb {
          margin-top: 6px;
          font-size: 0.8rem;
          line-height: 1.45;
          color: rgba(255, 255, 255, 0.6);
        }
        .gallery-page-count {
          margin-top: 10px;
          font-size: 0.65rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.35);
        }
        .gallery-info-panel {
          position: fixed;
          bottom: 112px;
          left: 24px;
          z-index: 30;
          width: 168px;
        }
        .gallery-info-card {
          backdrop-filter: blur(12px);
          background: rgba(0, 0, 0, 0.45);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 14px;
          padding: 12px 14px;
        }
        .gallery-arrows {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 10px;
        }
        .gallery-arrow-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 28px;
          height: 28px;
          border-radius: 999px;
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: rgba(255, 255, 255, 0.06);
          color: rgba(255, 255, 255, 0.7);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .gallery-arrow-btn:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.12);
          color: white;
          border-color: rgba(255, 255, 255, 0.22);
        }
        .gallery-arrow-btn:disabled {
          opacity: 0.25;
          cursor: default;
        }
      `}</style>

      <div className="gallery-info-panel">
        <div className="gallery-info-card">
          <p className="gallery-page-name">{page.name}</p>
          <p className="gallery-page-blurb">{page.blurb}</p>
          <p className="gallery-page-count">
            {activeIndex + 1} / {gallery.pages.length}
          </p>
          <div className="gallery-arrows">
            <button
              type="button"
              className="gallery-arrow-btn"
              onClick={goPrev}
              disabled={activeIndex === 0}
              aria-label="Previous album"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <button
              type="button"
              className="gallery-arrow-btn"
              onClick={goNext}
              disabled={activeIndex === gallery.pages.length - 1}
              aria-label="Next album"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>
        </div>
      </div>

      <div className={`gallery-canvas-wrap h-full ${visible ? "" : "hidden-page"}`}>
        <GalleryCanvas
          key={page.slug}
          images={images}
          firstRowCount={page.firstRowCount ?? 6}
        />
      </div>

      <nav className="gallery-nav" aria-label="Gallery pages">
        {gallery.pages.map((item, index) => (
          <button
            key={item.slug}
            type="button"
            className={`gallery-nav-btn ${index === activeIndex ? "active" : ""}`}
            onClick={() => switchPage(index)}
          >
            {item.name}
          </button>
        ))}
      </nav>
    </>
  );
}
