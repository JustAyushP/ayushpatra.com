"use client";

import BounceCards from "@/components/GalleryCard";

export default function GalleryCanvas({ images }: { images: string[] }) {
  const row1 = images.slice(0, 6);
  const row2 = images.slice(6, 12);

  const transformStylesRow1 = [
    "rotate(12deg) translate(-450px)",
    "rotate(-5deg) translate(-280px)",
    "rotate(8deg) translate(-50px)",
    "rotate(-12deg) translate(120px)",
    "rotate(5deg) translate(320px)",
    "rotate(-8deg) translate(480px)",
  ];

  const transformStylesRow2 = [
    "rotate(10deg) translate(-450px)",
    "rotate(-6deg) translate(-270px)",
    "rotate(8deg) translate(-90px)",
    "rotate(-10deg) translate(90px)",
    "rotate(6deg) translate(290px)",
    "rotate(-8deg) translate(480px)",
  ];

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-20">
      <BounceCards
        images={row1}
        containerWidth={1200}
        containerHeight={320}
        animationDelay={0.2}
        animationStagger={0.08}
        easeType="elastic.out(1, 0.5)"
        transformStyles={transformStylesRow1}
        enableHover={true}
      />

      <BounceCards
        images={row2}
        containerWidth={1200}
        containerHeight={320}
        animationDelay={0.4}
        animationStagger={0.08}
        easeType="elastic.out(1, 0.5)"
        transformStyles={transformStylesRow2}
        enableHover={true}
      />
    </div>
  );
}
