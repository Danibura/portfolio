"use client";
import { useEffect, useRef } from "react";

export default function Profile() {
  const tiltRef = useRef(null);

  useEffect(() => {
    const el = tiltRef.current;
    if (!el) return;

    const maxTilt = 20;

    const updateTilt = (x, y) => {
      const rect = el.getBoundingClientRect();
      const offsetX = x - rect.left;
      const offsetY = y - rect.top;

      let px = offsetX / rect.width - 0.5;
      let py = offsetY / rect.height - 0.5;

      px *= 2;
      py *= 2;

      const rotateX = Math.max(Math.min(-py * maxTilt, maxTilt), -maxTilt);
      const rotateY = Math.max(Math.min(px * maxTilt, maxTilt), -maxTilt);

      el.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

      const glareX = (px + 1) * 50;
      const glareY = (py + 1) * 50;
      el.querySelector(".glare").style.background =
        `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.1) 0%, transparent 80%)`;
    };

    const handleMouseMove = (e) => updateTilt(e.clientX, e.clientY);
    const handleMouseLeave = () => {
      el.style.transform = `rotateX(0deg) rotateY(0deg)`;
      el.querySelector(".glare").style.background = "none";
    };

    const handleTouchMove = (e) => {
      const touch = e.touches[0];
      updateTilt(touch.clientX, touch.clientY);
    };
    const handleTouchEnd = () => handleMouseLeave();

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);
    el.addEventListener("touchmove", handleTouchMove);
    el.addEventListener("touchend", handleTouchEnd);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
      el.removeEventListener("touchmove", handleTouchMove);
      el.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);
  return (
    <div
      ref={tiltRef}
      className="w-48 md:w-80 rounded-3xl shadow-lg overflow-hidden select-none touch-none"
    >
      <img src="/assets/Rheinpark.webp" alt="Me" className="w-full h-auto" />
      <div className="glare absolute inset-0 pointer-events-none"></div>
    </div>
  );
}
