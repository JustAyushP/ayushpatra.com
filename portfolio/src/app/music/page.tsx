"use client";

import { useEffect } from "react";
import musicData from "../../content/music.json";
import DarkVeil from "../../components/DarkVeil";

type Track = {
  name: string;
  artist: string;
  albumArt: string;
  spotifyUrl: string;
};

type Artist = {
  name: string;
  imageUrl: string;
  spotifyUrl: string;
};

type MusicContent = {
  spotifyProfileUrl: string;
  blurb: string;
  featuredSong: Track;
  topTracks: Track[];
  topArtists: Artist[];
};

const music = musicData as MusicContent;

function SpotifyIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
    </svg>
  );
}

function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function VinylRecord({ albumArt, songName }: { albumArt: string; songName: string }) {
  return (
    <div className="vinyl-container">
      <div className="vinyl-record">
        <div className="vinyl-grooves" />
        <div className="vinyl-label">
          <img src={albumArt} alt={songName} className="vinyl-album-art" />
        </div>
      </div>
    </div>
  );
}

function FeaturedSong({ song }: { song: Track }) {
  return (
    <a
      href={song.spotifyUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="featured-card group block"
      style={{ transform: "rotate(1.5deg)" }}
    >
      <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
        <VinylRecord albumArt={song.albumArt} songName={song.name} />
        <div className="flex flex-col items-center sm:items-start gap-2">
          <span className="text-xs uppercase tracking-[0.2em] text-neutral-500">Top Song of the Year</span>
          <h2 className="text-2xl sm:text-3xl font-semibold text-white leading-tight">{song.name}</h2>
          <p className="text-lg text-neutral-400">{song.artist}</p>
          <span className="mt-2 inline-flex items-center gap-2 text-sm text-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <SpotifyIcon className="w-4 h-4" /> Play on Spotify <ExternalLinkIcon className="w-3 h-3" />
          </span>
        </div>
      </div>
    </a>
  );
}

function BlurbCard({ text, profileUrl }: { text: string; profileUrl: string }) {
  return (
    <div
      className="blurb-card"
      style={{ transform: "rotate(-2.5deg)" }}
    >
      <p className="text-neutral-300 text-base leading-relaxed">{text}</p>
      <a
        href={profileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors text-sm font-medium"
      >
        <SpotifyIcon className="w-5 h-5" />
        My Spotify Profile
        <ExternalLinkIcon className="w-3 h-3" />
      </a>
    </div>
  );
}

function TrackCard({ track, index }: { track: Track; index: number }) {
  const rotations = [2, -1.5, 3];
  return (
    <a
      href={track.spotifyUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="track-card group"
      style={{ transform: `rotate(${rotations[index]}deg)` }}
    >
      <img
        src={track.albumArt}
        alt={track.name}
        className="w-full aspect-square object-cover rounded-lg"
      />
      <div className="mt-3">
        <p className="text-white font-medium text-sm truncate">{track.name}</p>
        <p className="text-neutral-500 text-xs truncate">{track.artist}</p>
      </div>
      <span className="absolute top-3 right-3 text-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <SpotifyIcon className="w-5 h-5" />
      </span>
    </a>
  );
}

function ArtistCard({ artist, index }: { artist: Artist; index: number }) {
  const rotations = [-2, 1.5, -3];
  return (
    <a
      href={artist.spotifyUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="artist-card group"
      style={{ transform: `rotate(${rotations[index]}deg)` }}
    >
      <div className="artist-image-wrapper">
        <img
          src={artist.imageUrl}
          alt={artist.name}
          className="w-full h-full object-cover"
        />
      </div>
      <p className="mt-3 text-white text-sm font-medium text-center truncate">{artist.name}</p>
      <span className="absolute top-2 right-2 text-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <SpotifyIcon className="w-4 h-4" />
      </span>
    </a>
  );
}

export default function MusicPage() {
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
        .music-bg {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }
        .music-page {
          position: relative;
          z-index: 1;
          min-height: 100vh;
          padding: 120px 24px 80px;
        }

        .music-grid {
          max-width: 960px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1.6fr;
          gap: 24px;
        }

        .blurb-card {
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.16);
          backdrop-filter: blur(12px);
          border-radius: 20px;
          padding: 28px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .blurb-card:hover {
          transform: rotate(0deg) !important;
          box-shadow: 0 0 30px rgba(30, 215, 96, 0.08);
        }

        .featured-card {
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.16);
          backdrop-filter: blur(12px);
          border-radius: 20px;
          padding: 32px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .featured-card:hover {
          transform: rotate(0deg) !important;
          box-shadow: 0 0 40px rgba(30, 215, 96, 0.1);
        }

        .section-label {
          font-size: 1.1rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: rgba(255, 255, 255, 0.5);
          font-weight: 600;
          margin-bottom: 16px;
        }

        .tracks-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .track-card {
          position: relative;
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.16);
          border-radius: 16px;
          padding: 16px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          display: block;
        }
        .track-card:hover {
          transform: rotate(0deg) scale(1.03) !important;
          box-shadow: 0 0 30px rgba(30, 215, 96, 0.1);
        }

        .artists-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .artist-card {
          position: relative;
          background: rgba(255, 255, 255, 0.12);
          border: 1px solid rgba(255, 255, 255, 0.16);
          border-radius: 16px;
          padding: 16px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          display: block;
          text-align: center;
        }
        .artist-card:hover {
          transform: rotate(0deg) scale(1.03) !important;
          box-shadow: 0 0 30px rgba(30, 215, 96, 0.1);
        }

        .artist-image-wrapper {
          width: 100%;
          aspect-ratio: 1;
          border-radius: 50%;
          overflow: hidden;
          border: 2px solid rgba(255, 255, 255, 0.1);
        }

        /* Vinyl Record */
        .vinyl-container {
          flex-shrink: 0;
          width: 160px;
          height: 160px;
        }
        .vinyl-record {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: conic-gradient(
            from 0deg,
            #1a1a1a 0deg,
            #2a2a2a 20deg,
            #1a1a1a 40deg,
            #2a2a2a 60deg,
            #1a1a1a 80deg,
            #2a2a2a 100deg,
            #1a1a1a 120deg,
            #2a2a2a 140deg,
            #1a1a1a 160deg,
            #2a2a2a 180deg,
            #1a1a1a 200deg,
            #2a2a2a 220deg,
            #1a1a1a 240deg,
            #2a2a2a 260deg,
            #1a1a1a 280deg,
            #2a2a2a 300deg,
            #1a1a1a 320deg,
            #2a2a2a 340deg,
            #1a1a1a 360deg
          );
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: spin 4s linear infinite;
          box-shadow:
            0 0 0 3px rgba(255, 255, 255, 0.05),
            0 8px 32px rgba(0, 0, 0, 0.5);
        }
        .vinyl-grooves {
          position: absolute;
          inset: 8px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.04);
          box-shadow:
            inset 0 0 0 8px rgba(255, 255, 255, 0.02),
            inset 0 0 0 16px rgba(255, 255, 255, 0.02),
            inset 0 0 0 24px rgba(255, 255, 255, 0.01),
            inset 0 0 0 32px rgba(255, 255, 255, 0.01);
        }
        .vinyl-label {
          width: 55%;
          height: 55%;
          border-radius: 50%;
          overflow: hidden;
          position: relative;
          z-index: 1;
          box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1);
        }
        .vinyl-album-art {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Responsive */
        @media (max-width: 768px) {
          .music-grid {
            grid-template-columns: 1fr;
          }
          .tracks-grid,
          .artists-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .vinyl-container {
            width: 120px;
            height: 120px;
          }
        }
      `}</style>

      <div className="music-bg">
        <DarkVeil
          hueShift={89}
          noiseIntensity={0}
          scanlineIntensity={0}
          speed={0.5}
          scanlineFrequency={0}
          warpAmount={0}
        />
      </div>

      <div className="music-page">
        {/* Top section: Blurb + Featured Song */}
        <div className="music-grid">
          <BlurbCard text={music.blurb} profileUrl={music.spotifyProfileUrl} />
          <FeaturedSong song={music.featuredSong} />
        </div>

        {/* Top Tracks */}
        <div className="max-w-[960px] mx-auto mt-12">
          <p className="section-label">Top Tracks This Month</p>
          <div className="tracks-grid">
            {music.topTracks.map((track, i) => (
              <TrackCard key={i} track={track} index={i} />
            ))}
          </div>
        </div>

        {/* Top Artists */}
        <div className="max-w-[960px] mx-auto mt-12">
          <p className="section-label">Top Artists This Month</p>
          <div className="artists-grid">
            {music.topArtists.map((artist, i) => (
              <ArtistCard key={i} artist={artist} index={i} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
