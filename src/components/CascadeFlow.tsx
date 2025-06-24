"use client";

import { useEffect, useRef } from "react";

interface CascadeFlowProps {
  className?: string;
  intensity?: number;
}

export default function CascadeFlow({ intensity = 0.9 }: CascadeFlowProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Animation speed controller - ajustez cette valeur pour changer toute la vitesse
    const animationSpeed = 0.8; // 1.0 = vitesse normale, 2.0 = 2x plus rapide, 0.5 = 2x plus lent

    // Animation intensity controller - ajustez cette valeur pour modifier l'intensité de l'animation
    const animationIntensity = 1.5; // 1.0 = intensité normale, 1.5 = plus intense, 0.8 = plus subtil

    // Variables de temps simplifiées
    let time = 0;
    let frameSkipCounter = 0;

    // Get background and foreground colors from CSS variables
    const getColors = () => {
      const styles = getComputedStyle(document.documentElement);
      const bgColor = styles.getPropertyValue("--background-color").trim();
      const fgColor = styles.getPropertyValue("--foreground-color").trim();
      return { bgColor, fgColor };
    };

    // Convert hex to rgb
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
          }
        : null;
    };

    // Set up canvas size
    const updateCanvasSize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    // Create radial gradient from center to edges with stronger falloff
    const getRadialMask = (
      x: number,
      y: number,
      width: number,
      height: number,
      t: number
    ) => {
      const centerX = width * 0.5;
      const centerY = height * 0.5;

      // Calculate distance from center
      const dx = x - centerX;
      const dy = y - centerY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Use a smaller radius with safety margin to avoid edge cutoffs
      const maxRadius = Math.min(width, height); // Réduit de 0.4 à 0.35 pour plus de marge

      // Create radial fade with breathing effect controlled by animationSpeed
      const breathe = Math.sin(t * 2.0 * animationSpeed) * 0.1 + 0.9;
      const normalizedDistance = (distance / maxRadius) * breathe;

      // Apply stronger radial falloff to create smoother edges
      return Math.max(0, 1 - Math.pow(normalizedDistance, 0.8)); // Plus doux (0.8 au lieu de 1.2)
    };

    // Create organic cascade boundary with smooth transitions
    const getCascadeMask = (
      x: number,
      y: number,
      width: number,
      height: number,
      t: number
    ) => {
      const centerX = width * 0.5;
      const centerY = height * 0.5;

      // Add safety margins to avoid edge cutoffs
      const marginX = width * 0;
      const marginY = height * 0;

      // Use a more concentrated vertical area with margins
      const effectiveHeight = Math.min(height - marginY * 2, width * 0.6);
      const topOffset = (height - effectiveHeight) * 0.5;
      const bottomOffset = topOffset + effectiveHeight;

      // Create complex, smooth boundaries
      const topBoundary =
        topOffset +
        // Primary wave
        Math.sin(x * 0.008 + t * 1.0 * animationSpeed) * 30 +
        // Secondary detail
        Math.sin(x * 0.015 + t * 1.6 * animationSpeed) * 15 +
        // Fine fractal details
        Math.sin(x * 0.03 + t * 2.4 * animationSpeed) * 8 +
        Math.sin(x * 0.05 + t * 1.8 * animationSpeed) * 4 +
        // Organic irregularities
        Math.sin(x * 0.12 + t * 3.0 * animationSpeed + Math.sin(x * 0.02)) * 2;

      const bottomBoundary =
        bottomOffset - // Primary wave
        (Math.sin(x * 0.006 + t * 1.2 * animationSpeed) * 40 +
          // Secondary detail
          Math.sin(x * 0.012 + t * 1.8 * animationSpeed) * 20 +
          // Fine fractal details
          Math.sin(x * 0.025 + t * 2.2 * animationSpeed) * 10 +
          Math.sin(x * 0.04 + t * 1.4 * animationSpeed) * 5 +
          // Organic irregularities
          Math.sin(x * 0.1 + t * 2.6 * animationSpeed + Math.sin(x * 0.018)) *
            3);

      // Create complex curved side boundaries with direct calculations
      const cascadeWidth =
        // Base width modulation
        (Math.sin(y * 0.004 + t * 0.4 * animationSpeed) + 1) * 0.25 +
        0.5 +
        // Fine width variations
        Math.sin(y * 0.015 + t * 1.6 * animationSpeed) * 0.1 +
        Math.sin(y * 0.03 + t * 2.4 * animationSpeed) * 0.05;

      const sideOffset =
        // Primary side movement
        Math.sin(y * 0.008 + t * 0.6 * animationSpeed) * 40 +
        // Secondary organic movement
        Math.sin(y * 0.02 + t * 1.4 * animationSpeed) * 15 +
        // Fine details
        Math.sin(y * 0.04 + t * 2.2 * animationSpeed) * 8 +
        // Micro variations
        Math.sin(y * 0.08 + t * 2.8 * animationSpeed) * 3;

      // Complex left and right boundaries controlled by animationSpeed
      const leftBoundary =
        centerX -
        width * cascadeWidth * 0.5 +
        sideOffset +
        // Add fractal complexity to left edge
        Math.sin(y * 0.025 + t * 1.8 * animationSpeed) * 12 +
        Math.sin(y * 0.06 + t * 2.6 * animationSpeed) * 6 +
        Math.sin(y * 0.1 + t * 3.2 * animationSpeed + Math.sin(y * 0.03)) * 3;

      const rightBoundary =
        centerX +
        width * cascadeWidth * 0.5 +
        sideOffset +
        // Add fractal complexity to right edge (different phase)
        Math.sin(y * 0.025 + t * 1.8 * animationSpeed + Math.PI * 0.3) * 12 +
        Math.sin(y * 0.06 + t * 2.6 * animationSpeed + Math.PI * 0.7) * 6 +
        Math.sin(
          y * 0.1 + t * 3.2 * animationSpeed + Math.PI + Math.sin(y * 0.03)
        ) *
          3;

      // Check if point is within organic cascade shape
      const withinVertical = y > topBoundary && y < bottomBoundary;
      const withinHorizontal = x > leftBoundary && x < rightBoundary;

      if (!withinVertical || !withinHorizontal) return 0;

      // Create soft edges with complex distance calculations
      const distFromTop = Math.max(0, y - topBoundary);
      const distFromBottom = Math.max(0, bottomBoundary - y);
      const distFromLeft = Math.max(0, x - leftBoundary);
      const distFromRight = Math.max(0, rightBoundary - x);

      const edgeFalloff = 100; // Balanced falloff for visibility + softness
      const topFade = Math.min(1, distFromTop / edgeFalloff);
      const bottomFade = Math.min(1, distFromBottom / edgeFalloff);
      const leftFade = Math.min(1, distFromLeft / edgeFalloff);
      const rightFade = Math.min(1, distFromRight / edgeFalloff);

      // Apply gentle curve for soft blending but maintain visibility
      const rawMask = Math.min(topFade, bottomFade, leftFade, rightFade);
      return Math.pow(rawMask, 1.2); // Gentler curve for better visibility
    };

    // Multi-layered noise for organic flow with good visibility
    const noise = (x: number, y: number, scale: number, offset: number) => {
      return (
        Math.sin((x + offset) * scale) *
        Math.cos((y + offset * 0.7) * scale) *
        0.7
      ); // Increased amplitude
    };

    // Create flowing organic patterns with downward cascade movement
    const flowNoise = (x: number, y: number, t: number) => {
      // Create vertical flow paths - prioritize downward movement
      const verticalOffset = t * 50 * animationSpeed; // Constant downward movement
      const flowY = y - verticalOffset; // Move patterns downward over time

      // Subtle horizontal curves for natural cascade effect
      const curveX =
        x +
        Math.sin(flowY * 0.008 + t * 0.8 * animationSpeed) * 25 +
        Math.sin(flowY * 0.02 + t * 1.2 * animationSpeed) * 10 +
        Math.sin(flowY * 0.04 + t * 1.6 * animationSpeed) * 4;

      // Multiple octaves of noise with vertical emphasis
      const n1 = noise(curveX, flowY, 0.006, t * 1.0 * animationSpeed) * 0.4;
      const n2 = noise(curveX, flowY, 0.012, t * 1.4 * animationSpeed) * 0.3;
      const n3 = noise(curveX, flowY, 0.024, t * 1.8 * animationSpeed) * 0.2;
      const n4 = noise(curveX, flowY, 0.048, t * 2.2 * animationSpeed) * 0.1;

      // Strong vertical flow component - the main cascade effect
      const cascadeFlow =
        Math.sin(flowY * 0.004 + t * 1.5 * animationSpeed) * 0.4 +
        Math.sin(flowY * 0.01 + t * 2.0 * animationSpeed) * 0.2 +
        Math.sin(flowY * 0.02 + t * 2.5 * animationSpeed) * 0.1;

      // Add speed gradient - faster at top, slower at bottom
      const speedGradient = Math.max(0.3, 1 - y / 800); // Adjust 800 based on typical height

      return (n1 + n2 + n3 + n4 + cascadeFlow * speedGradient) * 0.5 + 0.5;
    };

    // Create vertical cascade streams with downward flow
    const cascadePattern = (x: number, y: number, t: number) => {
      // Create vertical offset for downward movement
      const cascadeOffset = t * 60 * animationSpeed; // Slightly faster than flowNoise
      const cascadeY = y - cascadeOffset;

      // Create multiple vertical streams with gentle horizontal sway
      const stream1X =
        x +
        Math.sin(cascadeY * 0.012 + t * 1.0 * animationSpeed) * 20 +
        Math.sin(cascadeY * 0.03 + t * 1.5 * animationSpeed) * 8 +
        Math.sin(cascadeY * 0.06 + t * 2.0 * animationSpeed) * 3;

      const stream2X =
        x +
        Math.sin(cascadeY * 0.01 + t * 1.2 * animationSpeed + 2) * 18 +
        Math.sin(cascadeY * 0.025 + t * 1.8 * animationSpeed + 2) * 7 +
        Math.sin(cascadeY * 0.05 + t * 2.3 * animationSpeed + 2) * 3;

      const stream3X =
        x +
        Math.sin(cascadeY * 0.014 + t * 0.8 * animationSpeed + 4) * 15 +
        Math.sin(cascadeY * 0.035 + t * 1.3 * animationSpeed + 4) * 6 +
        Math.sin(cascadeY * 0.07 + t * 1.9 * animationSpeed + 4) * 2;

      // Calculate vertical cascade streams
      const stream1 =
        Math.sin(
          stream1X * 0.025 + cascadeY * 0.005 + t * 1.8 * animationSpeed
        ) *
        Math.exp(-Math.pow((stream1X - x) * 0.03, 2)) *
        (1 + Math.sin(cascadeY * 0.008 + t * 1.2 * animationSpeed) * 0.3);

      const stream2 =
        Math.sin(
          stream2X * 0.03 + cascadeY * 0.006 + t * 2.2 * animationSpeed
        ) *
        Math.exp(-Math.pow((stream2X - x) * 0.032, 2)) *
        (1 + Math.sin(cascadeY * 0.01 + t * 1.6 * animationSpeed) * 0.3);

      const stream3 =
        Math.sin(
          stream3X * 0.02 + cascadeY * 0.004 + t * 1.4 * animationSpeed
        ) *
        Math.exp(-Math.pow((stream3X - x) * 0.035, 2)) *
        (1 + Math.sin(cascadeY * 0.006 + t * 1.0 * animationSpeed) * 0.3);

      // Vertical flow patterns emphasizing downward movement
      const verticalFlow1 =
        Math.sin(x * 0.015 + cascadeY * 0.008 + t * 1.5 * animationSpeed) *
        Math.cos(cascadeY * 0.006 + t * 1.0 * animationSpeed) *
        0.3;

      const verticalFlow2 =
        Math.sin(x * 0.02 + cascadeY * 0.01 + t * 1.8 * animationSpeed) *
        Math.cos(cascadeY * 0.008 + t * 1.3 * animationSpeed) *
        0.25;

      // Fine vertical turbulence for realistic cascade effect
      const verticalTurbulence =
        Math.sin(x * 0.04 + cascadeY * 0.015 + t * 2.5 * animationSpeed) * 0.1 +
        Math.sin(x * 0.06 + cascadeY * 0.02 + t * 3.0 * animationSpeed) * 0.06 +
        Math.sin(x * 0.08 + cascadeY * 0.025 + t * 3.5 * animationSpeed) * 0.03;

      // Apply vertical speed gradient
      const verticalGradient = Math.max(0.4, 1 - y / 600);

      return (
        (stream1 +
          stream2 +
          stream3 +
          verticalFlow1 +
          verticalFlow2 +
          verticalTurbulence) *
          verticalGradient *
          0.25 +
        0.5
      );
    };

    const animate = () => {
      // Mode performance : temps direct sans smoothing
      time += 0.016 * animationSpeed;

      const width = canvas.width;
      const height = canvas.height;

      // Skip frames pour très grandes résolutions (>200k pixels)
      const skipFrames = width * height > 200000;
      if (skipFrames) {
        frameSkipCounter++;
        if (frameSkipCounter % 2 !== 0) {
          // Skip une frame sur deux pour les très grandes résolutions
          animationRef.current = requestAnimationFrame(animate);
          return;
        }
      }

      ctx.clearRect(0, 0, width, height);

      // Get colors
      const { bgColor, fgColor } = getColors();
      const bgRgb = hexToRgb(bgColor);
      const fgRgb = hexToRgb(fgColor);

      if (!bgRgb || !fgRgb) return;

      // Pré-calculs pour optimiser les performances
      const timeSpeed = time * animationSpeed;
      const centerX = width * 0.5;
      const centerY = height * 0.5;
      const maxRadius = Math.min(width, height);
      const edgeMargin = 0;

      // Create organic flowing gradient with maximum performance optimizations
      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;

      // Performance optimizations
      const pixelStep = 4; // +80% performance

      for (let y = 0; y < height; y += pixelStep) {
        for (let x = 0; x < width; x += pixelStep) {
          // Radial mask optimisé avec pré-calculs
          const dx = x - centerX;
          const dy = y - centerY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const breathe = Math.sin(timeSpeed * 2.0) * 0.1 + 0.9;
          const normalizedDistance = (distance / maxRadius) * breathe;
          const radialMask = Math.max(0, 1 - Math.pow(normalizedDistance, 0.8));

          // Calculs complets de l'animation
          const cascadeMask = getCascadeMask(x, y, width, height, time);
          const flowValue = flowNoise(x, y, time);
          const cascadeValue = cascadePattern(x, y, time);

          // Edge fade optimisé
          const edgeFadeX = Math.min(
            Math.min(x / edgeMargin, 1),
            Math.min((width - x) / edgeMargin, 1)
          );
          const edgeFadeY = Math.min(
            Math.min(y / edgeMargin, 1),
            Math.min((height - y) / edgeMargin, 1)
          );
          const edgeFade = Math.min(edgeFadeX, edgeFadeY);

          const combinedMask = radialMask * cascadeMask * edgeFade;

          if (combinedMask <= 0.05) {
            // Remplir le bloc avec la couleur de fond
            for (let dy = 0; dy < pixelStep && y + dy < height; dy++) {
              for (let dx = 0; dx < pixelStep && x + dx < width; dx++) {
                const index = ((y + dy) * width + (x + dx)) * 4;
                const bgFade = Math.max(0, radialMask * 0.3);
                data[index] = bgRgb.r;
                data[index + 1] = bgRgb.g;
                data[index + 2] = bgRgb.b;
                data[index + 3] = bgFade * 50;
              }
            }
            continue;
          }

          // Calcul des patterns une seule fois pour le bloc
          const combinedPattern = flowValue * 0.5 + cascadeValue * 0.5;
          const enhancedIntensity = intensity * animationIntensity;
          const colorMix =
            combinedPattern * enhancedIntensity * combinedMask * 1.0;

          const r = bgRgb.r + (fgRgb.r - bgRgb.r) * colorMix;
          const g = bgRgb.g + (fgRgb.g - bgRgb.g) * colorMix;
          const b = bgRgb.b + (fgRgb.b - bgRgb.b) * colorMix;
          const alpha = 255 * combinedMask * Math.max(0.35, colorMix);

          // Appliquer aux pixels du bloc
          for (let dy = 0; dy < pixelStep && y + dy < height; dy++) {
            for (let dx = 0; dx < pixelStep && x + dx < width; dx++) {
              const index = ((y + dy) * width + (x + dx)) * 4;
              data[index] = r;
              data[index + 1] = g;
              data[index + 2] = b;
              data[index + 3] = alpha;
            }
          }
        }
      }

      ctx.putImageData(imageData, 0, 0);
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [intensity]);

  return (
    <section
      ref={containerRef}
      className="grid grid-cols-1 md:grid-cols-5 md:gap-8 px-4 md:py-48 col-span-3 items-start relative overflow-visible gap-16"
    >
      <p className="text-[64px] leading-none col-span-3 md:col-start-2 md:col-span-3 mb-16">
        Cascade c'est l'histoire de deux{" "}
        <span className="italic text-[64px] leading-none">frères</span> qui
        conçoivent le web comme un{" "}
        <span className="italic text-[64px] leading-none">artisanat</span> :{" "}
        avec rigueur, écoute et soin.
      </p>
      <div className="col-start-2 col-span-2 md:col-start-3 md:col-span-2 flex flex-col gap-8">
        <p>
          Notre volonté est d'être les artisans d'un web mieux conçu et plus
          sobre, où la forme sert le message pour vous offrir la visibilité et
          la crédibilité que vous méritez.
        </p>
        <p>
          Avec des parcours mêlant design, tech et conseil, nous travaillons en
          cascade : chaque étape découle du problème initial et y apporte une
          réponse sur mesure, de la réflexion stratégique à la mise en ligne.
        </p>
      </div>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{
          mixBlendMode: "normal",
          filter: "blur(0.6px)", // Reduced blur for better visibility
          opacity: 1, // Increased opacity for better visibility
        }}
      />
    </section>
  );
}
