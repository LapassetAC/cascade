'use client';

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { cascadeDelay } from "@/lib/animations";

export default function ProjectVisual({
  project,
  displayedProject,
  isProjectTransition,
  isFromPage,
  isMobile,
  index,
  setCurrentProjectIndex,
}) {
  const projectRefs = useRef([]);
  const { title, image, url, videoUrl } = project;
  const videoRef = useRef(null);
  const imageRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    !isMobile && videoRef.current?.play();
    setCurrentProjectIndex(index);
  };
  
  const handleMouseLeave = () => {
    !isMobile && videoRef.current?.pause();
    setCurrentProjectIndex(null);
  };

  if (isMobile) {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        ref={(el) => (projectRefs.current[index] = el)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "block relative w-full aspect-[1.49] overflow-hidden",
          "transition-transform duration-500",
          isProjectTransition ? "scale-105" : "scale-100"
        )}
      >
        <div ref={imageRef} className="relative w-full h-full">
          <Image
            src={image.asset.url}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
            className={cn(
              "object-cover",
              !isFromPage && "animate-fade-in",
              `[--animation-delay:${cascadeDelay(index + 1)}]`
            )}
            priority={index === 0}
          />
        </div>
      </a>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      ref={(el) => (projectRefs.current[index] = el)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "block relative w-full aspect-[1.49] overflow-hidden group",
        "transition-transform duration-500",
        isProjectTransition ? "scale-105" : "scale-100"
      )}
    >
      <div ref={imageRef} className="relative w-full h-full">
        <Image
          src={image.asset.url}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
          className={cn(
            "object-cover",
            !isFromPage && "animate-fade-in",
            `[--animation-delay:${cascadeDelay(index + 1)}]`
          )}
          priority={index === 0}
        />
        {videoUrl && (
          <video
            ref={videoRef}
            src={videoUrl}
            muted
            playsInline
            loop
            className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
        )}
      </div>
    </a>
  );
}
