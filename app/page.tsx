"use client";
import { useEffect, useRef } from "react";
import Project from "@/components/project";
import type { ProjectType } from "@/types/types";

const projects: ProjectType[] = [
  {
    id: 1,
    title: "Trip planner",
    description: "A web app to organize trips with other people",
    url: "https://trip-planner-rust-gamma.vercel.app",
    cover: "trip.png",
    languages: ["html", "css", "js", "react", "node", "mongo"],
  },
];

export default function Home() {
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
    <div className="bg-mist-900 min-h-screen">
      <div className="flex flex-wrap justify-center items-center gap-x-30 mt-6 md:mt-20">
        <div
          ref={tiltRef}
          className="w-48 md:w-80 rounded-3xl shadow-lg overflow-hidden select-none touch-none"
        >
          <img src="/assets/Rheinpark.jpg" alt="Me" className="w-full h-auto" />
          <div className="glare absolute inset-0 pointer-events-none"></div>
        </div>
        <div className="block mt-8 text-center">
          <h1 className="font-bold text-4xl md:text-7xl">
            DANIELE <br /> BURATTI
          </h1>
          <h3 className="font-medium md:text-3xl mt-2 md:mt-4">
            Developer based in Milan
          </h3>
          <div className="flex mt-10 md:mt-14 gap-6 justify-center items-center">
            <a href="https://github.com/Danibura">
              <img
                src="/assets/social/github.png"
                alt="github"
                height="38"
                width="38"
                className="hover:scale-120 transition-transform duration-150"
              />
            </a>
            <a href="https://www.linkedin.com/in/daniele-buratti-23a0242b0/">
              <img
                src="/assets/social/linkedin.svg"
                alt="linkedin"
                className="hover:scale-120 transition-transform duration-150"
              />
            </a>
            <a href="https://www.instagram.com/dani.buratti24/">
              <img
                src="/assets/social/instagram.svg"
                alt="instagram"
                className="hover:scale-120 transition-transform duration-150"
              />
            </a>
            <a href="mailto:danibura2007@gmail.com">
              <img
                src="/assets/social/gmail.svg"
                alt="gmail"
                className="hover:scale-120 transition-transform duration-150"
              />
            </a>
          </div>
        </div>
      </div>
      <div className="md:mt-10 p-4">
        <div className=" text-center text-2xl md:text-4xl mt-10  font-extrabold bg-linear-to-r from-red-900 via-white to-green-900 text-transparent bg-clip-text animate-gradient w-full">
          PROJECTS
        </div>
        <div className="flex flex-wrap gap-x-20 gap-y-5 justify-center">
          {projects.map((project) => (
            <Project key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
