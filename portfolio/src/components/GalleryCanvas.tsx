"use client";

import BounceCards from "@/components/GalleryCard";

const transformStylesRow1 = [
  "rotate(12deg) translate(-450px)",
  "rotate(-5deg) translate(-280px)",
  "rotate(8deg) translate(-50px)",
  "rotate(-12deg) translate(120px)",
  "rotate(5deg) translate(320px)",
  "rotate(-8deg) translate(480px)",
];

const transformStylesRow1Compact = [
  "rotate(12deg) translate(-320px)",
  "rotate(-5deg) translate(-110px)",
  "rotate(8deg) translate(110px)",
  "rotate(-12deg) translate(320px)",
];

const transformStylesRow2 = [
  "rotate(10deg) translate(-450px)",
  "rotate(-6deg) translate(-270px)",
  "rotate(8deg) translate(-90px)",
  "rotate(-10deg) translate(90px)",
  "rotate(6deg) translate(290px)",
  "rotate(-8deg) translate(480px)",
];

const transformStylesRow2Compact = [
  "rotate(10deg) translate(-320px)",
  "rotate(-6deg) translate(-110px)",
  "rotate(8deg) translate(110px)",
  "rotate(-10deg) translate(320px)",
];

function pickStyles(full: string[], compact: string[], count: number) {
  const styles = count <= 4 ? compact : full;
  return styles.slice(0, count);
}

export default function GalleryCanvas({
  images,
  firstRowCount = 6,
}: {
  images: string[];
  firstRowCount?: number;
}) {
  const row1 = images.slice(0, firstRowCount);
  const row2 = images.slice(firstRowCount, 12);
  const compact = firstRowCount <= 4 || row2.length <= 4;
  const containerWidth = compact ? 900 : 1200;

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-20 pb-24">
      {row1.length > 0 && (
        <BounceCards
          images={row1}
          containerWidth={containerWidth}
          containerHeight={320}
          animationDelay={0.2}
          animationStagger={0.08}
          easeType="elastic.out(1, 0.5)"
          transformStyles={pickStyles(transformStylesRow1, transformStylesRow1Compact, row1.length)}
          enableHover={true}
        />
      )}

      {row2.length > 0 && (
        <BounceCards
          images={row2}
          containerWidth={containerWidth}
          containerHeight={320}
          animationDelay={0.4}
          animationStagger={0.08}
          easeType="elastic.out(1, 0.5)"
          transformStyles={pickStyles(transformStylesRow2, transformStylesRow2Compact, row2.length)}
          enableHover={true}
        />
      )}
    </div>
  );
}
