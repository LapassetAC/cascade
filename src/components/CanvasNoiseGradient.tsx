"use client";

import { useEffect, useRef } from "react";

interface CascadeFlowProps {
  className?: string;
  intensity?: number;
}

export default function CascadeFlow({
  className = "",
  intensity = 0.9,
}: CascadeFlowProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

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

    let time = 0;

    // Create radial gradient from center to edges
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

      // Calculate maximum distance (from center to corner)
      const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);

      // Create radial fade with gentle breathing effect
      const breathe = Math.sin(t * 0.8) * 0.1 + 0.9; // 0.8 to 1.0
      const normalizedDistance = (distance / maxDistance) * breathe;

      // Apply smooth radial falloff
      return Math.max(0, 1 - Math.pow(normalizedDistance, 1.5));
    };

    // Create organic cascade boundary with balanced softness
    const getCascadeMask = (
      x: number,
      y: number,
      width: number,
      height: number,
      t: number
    ) => {
      const centerX = width * 0.5;

      // Create flowing, organic boundaries with balanced amplitude
      const topBoundary =
        Math.sin(x * 0.008 + t * 0.3) * 30 + Math.sin(x * 0.015 + t * 0.5) * 15;
      const bottomBoundary =
        height -
        (Math.sin(x * 0.006 + t * 0.4) * 40 +
          Math.sin(x * 0.012 + t * 0.6) * 20);

      // Create curved side boundaries that narrow and widen like a cascade
      const cascadeWidth = (Math.sin(y * 0.004 + t * 0.2) + 1) * 0.25 + 0.5; // 0.5 to 1.0
      const sideOffset = Math.sin(y * 0.008 + t * 0.3) * 40;

      const leftBoundary = centerX - width * cascadeWidth * 0.5 + sideOffset;
      const rightBoundary = centerX + width * cascadeWidth * 0.5 + sideOffset;

      // Check if point is within organic cascade shape
      const withinVertical = y > topBoundary && y < bottomBoundary;
      const withinHorizontal = x > leftBoundary && x < rightBoundary;

      if (!withinVertical || !withinHorizontal) return 0;

      // Create soft edges with balanced falloff distance
      const distFromTop = Math.max(0, y - topBoundary);
      const distFromBottom = Math.max(0, bottomBoundary - y);
      const distFromLeft = Math.max(0, x - leftBoundary);
      const distFromRight = Math.max(0, rightBoundary - x);

      const edgeFalloff = 50; // Balanced falloff for visibility + softness
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

    // Create flowing organic patterns that follow curved paths
    const flowNoise = (x: number, y: number, t: number) => {
      // Create curved flow paths with moderate movement
      const curveX = x + Math.sin(y * 0.005 + t * 0.4) * 40;
      const curveY = y + Math.sin(x * 0.008 + t * 0.3) * 20;

      // Multiple octaves of noise for organic complexity with better visibility
      const n1 = noise(curveX, curveY, 0.005, t * 0.5) * 0.4;
      const n2 = noise(curveX, curveY, 0.01, t * 0.7) * 0.3;
      const n3 = noise(curveX, curveY, 0.02, t * 1.2) * 0.2;

      // Vertical flow bias for cascade effect with curves
      const verticalFlow = Math.sin(curveY * 0.003 + t * 0.8) * 0.3;

      return (n1 + n2 + n3 + verticalFlow) * 0.5 + 0.5;
    };

    // Create organic cascade patterns with curved streams
    const cascadePattern = (x: number, y: number, t: number) => {
      // Create multiple curved streams with visible intensity
      const stream1X = x + Math.sin(y * 0.01 + t * 0.7) * 30;
      const stream2X = x + Math.sin(y * 0.008 + t * 0.5 + 2) * 25;
      const stream3X = x + Math.sin(y * 0.012 + t * 0.9 + 4) * 20;

      // Calculate stream intensities with curved paths and good visibility
      const stream1 =
        Math.sin(stream1X * 0.02 + t) *
        Math.exp(-Math.pow((stream1X - x) * 0.02, 2));
      const stream2 =
        Math.sin(stream2X * 0.025 + t * 1.2) *
        Math.exp(-Math.pow((stream2X - x) * 0.022, 2));
      const stream3 =
        Math.sin(stream3X * 0.018 + t * 0.8) *
        Math.exp(-Math.pow((stream3X - x) * 0.025, 2));

      // Organic flow between streams with good visibility
      const flow1 =
        Math.sin(x * 0.008 + y * 0.003 + t * 0.6) *
        Math.cos(y * 0.004 + t * 0.4) *
        0.4;
      const flow2 =
        Math.sin(x * 0.012 + y * 0.006 + t * 0.8) *
        Math.cos(x * 0.005 + t * 0.5) *
        0.4;

      return (stream1 + stream2 + stream3 + flow1 + flow2) * 0.25 + 0.5; // Increased intensity
    };

    const animate = () => {
      time += 0.012; // Slightly faster for better perception

      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      // Get colors
      const { bgColor, fgColor } = getColors();
      const bgRgb = hexToRgb(bgColor);
      const fgRgb = hexToRgb(fgColor);

      if (!bgRgb || !fgRgb) return;

      // Create organic flowing gradient with curved boundaries and radial fade
      const imageData = ctx.createImageData(width, height);
      const data = imageData.data;

      for (let y = 0; y < height; y += 1) {
        for (let x = 0; x < width; x += 1) {
          const index = (y * width + x) * 4;

          // Get radial mask for center-to-edge fade
          const radialMask = getRadialMask(x, y, width, height, time);

          // Get cascade mask for organic boundaries
          const cascadeMask = getCascadeMask(x, y, width, height, time);

          // Combine both masks
          const combinedMask = radialMask * cascadeMask;

          if (combinedMask <= 0.05) {
            // Outside boundaries or too far from center - fade to background
            const bgFade = Math.max(0, radialMask * 0.3); // Subtle background tint at edges
            data[index] = bgRgb.r;
            data[index + 1] = bgRgb.g;
            data[index + 2] = bgRgb.b;
            data[index + 3] = bgFade * 50; // Very subtle background presence
            continue;
          }

          // Create organic flow pattern
          const flowValue = flowNoise(x, y, time);
          const cascadeValue = cascadePattern(x, y, time);

          // Combine patterns for organic complexity with good visibility
          const combinedPattern = flowValue * 0.5 + cascadeValue * 0.5;

          // Enhanced color interpolation with foreground as the peak color (supports light/dark mode)
          const colorMix = combinedPattern * intensity * combinedMask * 0.8; // Increased for better visibility

          // Interpolate from background to foreground color (blue in light mode, cream in dark mode)
          const r = bgRgb.r + (fgRgb.r - bgRgb.r) * colorMix;
          const g = bgRgb.g + (fgRgb.g - bgRgb.g) * colorMix;
          const b = bgRgb.b + (fgRgb.b - bgRgb.b) * colorMix;

          // Apply alpha with radial enhancement
          const alpha = 255 * combinedMask * Math.max(0.25, colorMix);

          data[index] = r;
          data[index + 1] = g;
          data[index + 2] = b;
          data[index + 3] = alpha;
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
    <div
      ref={containerRef}
      className={`relative overflow-visible ${className}`}
      style={{ height: "100px" }}
    >
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
      </p>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{
          mixBlendMode: "normal",
          filter: "blur(0.8px)", // Slight blur but not too much
          opacity: 0.95, // Slightly increased for better center visibility
        }}
      />
    </div>
  );
}
