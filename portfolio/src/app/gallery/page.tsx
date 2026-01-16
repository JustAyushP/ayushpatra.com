import gallery from "../../content/gallery.json";
import BounceCards from "../../components/GalleryCard";
import GalleryCanvas from "../../components/GalleryCanvas";

type GalleryItem = {
    id: string;
    src: string;
    title: string;
    date: string;
    location: string;
    tags: string[];
};

export default function GalleryPage() {
    const items = gallery as GalleryItem[];
    const images = items.map(item => item.src);

    return (
        <div className="fixed inset-0 overflow-hidden">
        {/* Dark White Dotted Grid Background */}
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
                {/* Left side text */}
                <div className="absolute left-12 top-1/2 -translate-y-1/2 z-20 max-w-[240px]">
                    <p className="text-white font-mono text-base md:text-lg leading-relaxed tracking-wider opacity-90">
                        I love taking photos and documenting my life! These are just a few photos that I'm proud of!
                    </p>
                </div>
                <GalleryCanvas images={images} />
            </div>

        </div>
        );
}



