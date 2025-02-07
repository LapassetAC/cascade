'use client';

import React from "react";
import { cn } from "@/lib/utils";
import Arrow from "@/assets/icons/Arrow";

export default function ProjectInfo({
  project,
  displayedProject,
  isFromPage,
  isInfoTransition,
  isMobile,
  isVisible,
}) {
  if (isMobile) {
    const { title, url, category, services } = project;
    return (
      <div
        className={cn(
          "flex flex-col justify-center items-center text-center p-4",
          "transition-opacity duration-400",
          isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="flex justify-between mb-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl animate-fade-in [--animation-delay:100ms]">
            {title}
          </h2>
          <p className="text-lg animate-fade-in [--animation-delay:200ms]">
            {category}
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4 animate-fade-in [--animation-delay:300ms]">
          <ul>
            {services.map((service, i) => (
              <li key={i}>
                <p className="px-3 py-1 rounded-full border border-current text-sm">
                  {service}
                </p>
              </li>
            ))}
          </ul>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 underline animate-fade-in [--animation-delay:400ms]"
          >
            Voir <Arrow />
          </a>
        </div>
      </div>
    );
  } else {
    const { title, category, services } = displayedProject;
    return (
      <div
        className={cn(
          "fixed inset-0 z-50 flex flex-col justify-center items-center text-center p-4",
          "transition-opacity duration-400",
          isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="flex flex-col justify-center items-center text-center mb-4">
          <h2
            className={cn(
              "text-2xl md:text-3xl lg:text-4xl animate-fade-in",
              isInfoTransition ? "opacity-100" : "opacity-0",
              isInfoTransition ? "animation-delay:100ms" : "animation-delay:0ms"
            )}
          >
            {title}
          </h2>
          <p
            className={cn(
              "text-lg animate-fade-in",
              isInfoTransition ? "opacity-100" : "opacity-0",
              isInfoTransition ? "animation-delay:200ms" : "animation-delay:0ms"
            )}
          >
            {category}
          </p>
        </div>
        <ul>
          {services.map((service, i) => (
            <li
              key={service}
              className={cn(
                "flex flex-wrap justify-center gap-4 animate-fade-in",
                isInfoTransition ? "opacity-100" : "opacity-0",
                isInfoTransition ? `animation-delay:${(i + 1) * 100}ms` : "animation-delay:0ms"
              )}
            >
              <p className="px-3 py-1 rounded-full border border-current text-sm">
                {service}
              </p>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
