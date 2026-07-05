import gallery from "../../content/gallery.json";
import GalleryShell from "../../components/GalleryShell";

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
  photos: GalleryPhoto[];
};

type GalleryContent = {
  intro: string;
  pages: GalleryPage[];
};

export default function GalleryPage() {
  const content = gallery as GalleryContent;

  return (
    <div className="fixed inset-0 overflow-hidden">
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: "#000000",
          backgroundImage: `
            radial-gradient(circle, rgba(255, 255, 255, 0.2) 1.5px, transparent 1.5px)
          `,
          backgroundSize: "30px 30px",
          backgroundPosition: "0 0",
        }}
      />
      <div className="relative z-10 h-full">
        <GalleryShell gallery={content} />
      </div>
    </div>
  );
}
