'use client';

import { useRef, useEffect, useState } from 'react';

interface Viewer360Props {
  imageSrc: string;
  alt: string;
  loading?: 'lazy' | 'eager';
}

export function Viewer360({ imageSrc, alt, loading = 'lazy' }: Viewer360Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const horizontalFovRef = useRef((130 * Math.PI) / 180);
  const [isLoading, setIsLoading] = useState(true);
  const rotationRef = useRef({ yaw: 0, pitch: 0 });
  const lastMouseRef = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const velocityRef = useRef({ x: 0, y: 0 });
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    // Set canvas size
    const updateCanvasSize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    updateCanvasSize();
    window.addEventListener('resize', updateCanvasSize);

    // Load image
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      imageRef.current = img;
      setIsLoading(false);
      startRenderLoop();
    };
    img.onerror = () => {
      console.error('Failed to load 360 image');
      setIsLoading(false);
    };
    img.src = imageSrc;

    // Optimized render using canvas drawImage with transformation
    const render = () => {
      const ctx = canvas.getContext('2d');
      if (!ctx || !imageRef.current) return;

      const w = canvas.width;
      const h = canvas.height;
      
      // Clear
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, w, h);

      const img = imageRef.current;
      const imgW = img.naturalWidth;
      const imgH = img.naturalHeight;

      const horizontalFov = horizontalFovRef.current;
      const verticalFov = horizontalFov * (h / w);

      const viewWidthPx = (horizontalFov / (2 * Math.PI)) * imgW;
      const viewHeightPx = (verticalFov / Math.PI) * imgH;

      // Calculate visible portion based on yaw rotation
      // For equirectangular image: map yaw to horizontal position in image
      const yawNormalized = ((rotationRef.current.yaw + Math.PI) % (2 * Math.PI)) / (2 * Math.PI);
      const startX = yawNormalized * imgW;

      // Calculate pitch offset
      const pitchNormalized = (rotationRef.current.pitch + Math.PI / 2) / Math.PI;
      const startY = Math.max(0, Math.min(1, pitchNormalized)) * Math.max(0, imgH - viewHeightPx);

      // Draw image in two parts to handle wrapping
      const part1SrcWidth = Math.min(imgW - startX, viewWidthPx);
      const part2SrcWidth = viewWidthPx - part1SrcWidth;

      const part1DestWidth = (part1SrcWidth / viewWidthPx) * w;
      const part2DestWidth = w - part1DestWidth;

      // Part 1 - right side of image
      ctx.drawImage(
        img,
        startX, startY, part1SrcWidth, viewHeightPx,
        0, 0, part1DestWidth, h
      );

      // Part 2 - left side of image (wrapping)
      if (part2SrcWidth > 0) {
        ctx.drawImage(
          img,
          0, startY, part2SrcWidth, viewHeightPx,
          part1DestWidth, 0, part2DestWidth, h
        );
      }
    };

    // Animation loop
    const startRenderLoop = () => {
      const animate = () => {
        render();
        animationIdRef.current = requestAnimationFrame(animate);
      };
      animationIdRef.current = requestAnimationFrame(animate);
    };

    // Mouse events
    const onMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      lastMouseRef.current = { x: e.clientX, y: e.clientY };
      velocityRef.current = { x: 0, y: 0 };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;

      const deltaX = e.clientX - lastMouseRef.current.x;
      const deltaY = e.clientY - lastMouseRef.current.y;

      rotationRef.current.yaw -= deltaX * 0.004;
      rotationRef.current.pitch -= deltaY * 0.004;

      // Clamp pitch
      rotationRef.current.pitch = Math.max(
        -Math.PI / 2 + 0.01,
        Math.min(Math.PI / 2 - 0.01, rotationRef.current.pitch)
      );

      velocityRef.current = { x: deltaX * 0.004, y: deltaY * 0.004 };
      lastMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDraggingRef.current = false;
      applyInertia();
    };

    // Touch events
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDraggingRef.current = true;
        lastMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        velocityRef.current = { x: 0, y: 0 };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDraggingRef.current || e.touches.length !== 1) return;

      const deltaX = e.touches[0].clientX - lastMouseRef.current.x;
      const deltaY = e.touches[0].clientY - lastMouseRef.current.y;

      rotationRef.current.yaw -= deltaX * 0.004;
      rotationRef.current.pitch -= deltaY * 0.004;

      rotationRef.current.pitch = Math.max(
        -Math.PI / 2 + 0.01,
        Math.min(Math.PI / 2 - 0.01, rotationRef.current.pitch)
      );

      velocityRef.current = { x: deltaX * 0.004, y: deltaY * 0.004 };
      lastMouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchEnd = () => {
      isDraggingRef.current = false;
      applyInertia();
    };

    // Inertia/momentum effect
    const applyInertia = () => {
      const animate = () => {
        velocityRef.current.x *= 0.93;
        velocityRef.current.y *= 0.93;

        if (Math.abs(velocityRef.current.x) > 0.0002 || Math.abs(velocityRef.current.y) > 0.0002) {
          rotationRef.current.yaw -= velocityRef.current.x;
          rotationRef.current.pitch -= velocityRef.current.y;

          rotationRef.current.pitch = Math.max(
            -Math.PI / 2 + 0.01,
            Math.min(Math.PI / 2 - 0.01, rotationRef.current.pitch)
          );

          animationIdRef.current = requestAnimationFrame(animate);
        } else {
          animationIdRef.current = null;
        }
      };
      animate();
    };

    canvas.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('touchstart', onTouchStart);
    document.addEventListener('touchmove', onTouchMove);
    document.addEventListener('touchend', onTouchEnd);

    return () => {
      window.removeEventListener('resize', updateCanvasSize);
      canvas.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('touchstart', onTouchStart);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [imageSrc]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full bg-slate-900 rounded-2xl relative overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 cursor-grab active:cursor-grabbing"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ touchAction: 'none', display: 'block' }}
      />
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/80 text-white z-10 backdrop-blur-[2px]">
          <span className="material-icons text-6xl mb-4 animate-pulse">view_in_ar</span>
          <p className="font-medium text-lg">Cargando Recorrido Virtual...</p>
          <p className="text-xs text-slate-400 mt-2">Esto puede tomar unos segundos</p>
        </div>
      )}
      <div className="absolute bottom-4 left-4 right-4 flex justify-center z-20 text-white text-xs bg-black/50 px-4 py-2 rounded-lg backdrop-blur-sm pointer-events-none max-w-xs mx-auto">
        <span>🖱️ Arrastra para girar 360° • 📱 Toca para rotar</span>
      </div>
    </div>
  );
}
