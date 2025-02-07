'use client';

import React, { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export default function JSFooterAnim({ noAnimation, pathname }) {
  const [progressInPercent, setProgressInPercent] = useState(0);
  const ref = useRef();

  useEffect(() => {
    const handleScroll = () => {
      const top = ref.current.getBoundingClientRect().top;
      setProgressInPercent(
        Math.round(
          ((window.innerHeight - top) / (window.innerHeight - 120)) * 100
        )
      );
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const drops = [
    { width: 44, height: 13 },
    { width: 56, height: 36 },
    { width: 67, height: 72 },
    { width: 78, height: 90 },
    { width: 89, height: 99 },
  ];

  return (
    <footer
      ref={ref}
      className="overflow-hidden h-screen md:h-[calc(100vh-120px)] col-span-5 row-span-1 grid m-0"
    >
      {drops.map((drop, index) => (
        <aside
          key={index}
          className={cn(
            "row-span-1 bg-current min-h-[5px]",
            `col-start-${index + 1} col-span-1`
          )}
          style={{
            width: noAnimation 
              ? `${drop.width}%` 
              : `${(progressInPercent * drop.width) / 100}%`,
            height: noAnimation
              ? `calc(${drop.height}vh - 150px)`
              : `calc(${(progressInPercent * drop.height) / 100}vh - 150px)`,
          }}
        />
      ))}
      <div className="row-span-1 self-end text-current">
        <a className="block mt-15">Link 1</a>
        <a className="block mt-15">Link 2</a>
        <a className="block mt-15">Link 3</a>
      </div>
      <div className="row-span-1 self-end text-current col-start-2">
        <a className="block mt-15">Link 4</a>
        <a className="block mt-15">Link 5</a>
        <a className="block mt-15">Link 6</a>
      </div>
      <div className="row-span-1 self-end text-current col-start-3">
        <a className="block mt-15">Link 7</a>
        <a className="block mt-15">Link 8</a>
        <a className="block mt-15">Link 9</a>
      </div>
    </footer>
  );
}
