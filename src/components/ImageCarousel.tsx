"use client";

import { useState } from "react";
import Image from "next/image";

interface ImageCarouselProps {
  images: string[];
  alt: string;
}

export default function ImageCarousel({ images, alt }: ImageCarouselProps) {
  const [current, setCurrent] = useState(0);

  if (images.length <= 1) {
    return (
      <div className="relative w-full aspect-[4/3]">
        <Image
          src={images[0]}
          alt={alt}
          fill
          className="object-contain p-3"
          sizes="(max-width: 640px) 100vw, 176px"
        />
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-[4/3] group">
      <Image
        src={images[current]}
        alt={`${alt} — photo ${current + 1}`}
        fill
        className="object-contain p-3"
        sizes="(max-width: 640px) 100vw, 176px"
        priority={current === 0}
      />

      {/* Dots */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Show photo ${i + 1}`}
            className={`w-2 h-2 rounded-full transition-colors ${
              i === current ? "bg-ocean" : "bg-ocean/30"
            }`}
          />
        ))}
      </div>

      {/* Arrows */}
      {images.length > 1 && (
        <>
          <button
            onClick={() => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1))}
            aria-label="Previous photo"
            className="absolute left-1 top-1/2 -translate-y-1/2 bg-black/40 text-white w-6 h-6 rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            &#8249;
          </button>
          <button
            onClick={() => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1))}
            aria-label="Next photo"
            className="absolute right-1 top-1/2 -translate-y-1/2 bg-black/40 text-white w-6 h-6 rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            &#8250;
          </button>
        </>
      )}
    </div>
  );
}
