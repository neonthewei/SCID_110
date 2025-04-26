"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CatalogViewerProps {
  images: {
    url: string;
    alt: string;
  }[];
}

export default function CatalogViewer({ images }: CatalogViewerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const containerWidth = useRef(0);

  useEffect(() => {
    const updateContainerWidth = () => {
      if (containerRef.current) {
        containerWidth.current = containerRef.current.offsetWidth;
      }
    };

    updateContainerWidth();
    window.addEventListener("resize", updateContainerWidth);
    return () => window.removeEventListener("resize", updateContainerWidth);
  }, []);

  useEffect(() => {
    if (sliderRef.current && !isDragging) {
      sliderRef.current.style.transition = "transform 0.2s ease-out";
      sliderRef.current.style.transform = `translateX(${-currentIndex * 100}%)`;
    }
  }, [currentIndex, isDragging]);

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(images.length - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setCurrentX(e.clientX);

    if (sliderRef.current) {
      sliderRef.current.style.transition = "none";
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setCurrentX(e.clientX);

    if (sliderRef.current) {
      const deltaX = e.clientX - startX;
      const translateXValue = -currentIndex * containerWidth.current + deltaX;
      sliderRef.current.style.transform = `translateX(${translateXValue}px)`;
    }
  };

  const handleMouseUp = () => {
    if (!isDragging) return;

    const deltaX = currentX - startX;
    const threshold = containerWidth.current * 0.25;

    if (deltaX > threshold && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (deltaX < -threshold && currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }

    setIsDragging(false);
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
    setCurrentX(e.touches[0].clientX);

    if (sliderRef.current) {
      sliderRef.current.style.transition = "none";
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    setCurrentX(e.touches[0].clientX);

    if (sliderRef.current) {
      const deltaX = e.touches[0].clientX - startX;
      const translateXValue = -currentIndex * containerWidth.current + deltaX;
      sliderRef.current.style.transform = `translateX(${translateXValue}px)`;
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;

    const deltaX = currentX - startX;
    const threshold = containerWidth.current * 0.25;

    if (deltaX > threshold && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (deltaX < -threshold && currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }

    setIsDragging(false);
  };

  return (
    <div className="w-full">
      {/* 主要預覽圖 */}
      <div
        className="relative aspect-[39/38] sm:aspect-square w-full mx-auto overflow-hidden group"
        ref={containerRef}
      >
        {/* Navigation Buttons */}
        <button
          onClick={handlePrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/10 hover:bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden md:flex items-center justify-center z-10"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6 text-black" />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/10 hover:bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden md:flex items-center justify-center z-10"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6 text-black" />
        </button>

        {/* Sliding images container */}
        <div
          ref={sliderRef}
          className="flex w-full h-full transition-transform cursor-grab active:cursor-grabbing select-none"
          style={{ transform: `translateX(${-currentIndex * 100}%)` }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {images.map((image, index) => (
            <div key={index} className="flex-shrink-0 w-full h-full relative">
              <Image
                src={image.url}
                alt={image.alt}
                fill
                className="object-cover pointer-events-none"
                priority={index === currentIndex}
                draggable={false}
              />
            </div>
          ))}
        </div>

        {/* 固定在容器右下角的頁碼 */}
        <div className="absolute bottom-4 right-8 z-10 text-sm text-white bg-black/50 rounded-full w-12 h-6 flex items-center justify-center md:hidden">
          {currentIndex + 1} / {images.length}
        </div>
      </div>

      {/* 桌面版縮圖列表 */}
      <div className="hidden md:block max-w-4xl mx-auto mt-3">
        <div className="flex justify-center gap-2 overflow-x-auto py-1 px-4 no-scrollbar">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
              }}
              className={`flex-shrink-0 relative w-12 aspect-square rounded-xl overflow-hidden
                ${
                  currentIndex === index
                    ? "ring-2 ring-black"
                    : "hover:ring-2 hover:ring-gray-300"
                }
                transition-all duration-200 hover:opacity-80 active:opacity-60`}
            >
              <Image
                src={image.url}
                alt={image.alt}
                fill
                className="object-cover pointer-events-none"
                sizes="48px"
                draggable={false}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Fullscreen Modal - Simplified without animations */}
      {isFullscreen && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          onClick={() => setIsFullscreen(false)}
        >
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 hover:bg-black/70"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="white"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div className="relative w-full h-full">
            <Image
              src={images[currentIndex].url}
              alt={images[currentIndex].alt}
              fill
              className="object-contain"
              priority
              sizes="100vw"
            />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-3 py-1 rounded-full">
              {currentIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
