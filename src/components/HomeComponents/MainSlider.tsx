// components/MainSlider.tsx
"use client";

import React, { useRef } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Image from "next/image";

const images = [
  "https://pixishoes.com/cdn/shop/files/pixi_-_desktop_banner_e0a11282-7345-459a-860c-d15a009e2fae.png?v=1752498355&width=2000",
  "https://pixishoes.com/cdn/shop/files/b1.png?v=1752159084&width=1880",
];

export default function MainSlider() {
  const timer = useRef<NodeJS.Timeout | null>(null);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      origin: "center",
      perView: 1,
    },
    created() {
      clearInterval(timer.current!);
      timer.current = setInterval(() => {
        instanceRef.current?.next();
      }, 3000);
    },
  });

  return (
    <div ref={sliderRef} className="keen-slider w-[98vw] mx-auto mb-6 bg-background">
      {images.map((img, i) => (
        <div key={i} className="keen-slider__slide flex justify-center items-center">
            <Image
                src={img}
                alt={`slide-${i}`}
                width={2000}
                height={800}
                priority={i === 0}
                className="w-full h-[30vh] object-cover md:h-[90vh]"/>
        </div>
      ))}
    </div>
  );
}
