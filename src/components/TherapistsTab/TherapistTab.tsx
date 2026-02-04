"use client";

import { useState } from "react";
import type { TabItem } from "@/types";
import Image from "next/image";

type CarouselProps = {
  data: TabItem[];
};

const TherapistsTab = ({ data } : CarouselProps) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const next = (): void => {
    setActiveIndex((prev) => (prev + 1) % data.length);
  };

  const prev = (): void => {
    setActiveIndex((prev) => (prev - 1 + data.length) % data.length);
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Top Controls */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <button
          onClick={prev}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
        >
          ←
        </button>

        <div className="flex gap-2">
          {data.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full transition ${
                index === activeIndex
                  ? "bg-black scale-110"
                  : "bg-gray-400"
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
        >
          →
        </button>
      </div>

      {/* Fade Container */}
      <div className="relative h-[320px]">
        {data.map((item, index) => (
          <div
            key={item.id}
            className={`
              absolute inset-0
              transition-opacity duration-500 ease-in-out
              ${index === activeIndex ? "opacity-100 z-10" : "opacity-0 z-0"}
            `}
          >
<div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-6xl mx-auto">
    <div className="relative">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <Image
                src="/assets/therapist-suhana-D3k1ANau.jpg"
                alt="Suhana - Counselling Psychologist"
                className="w-full h-auto object-cover aspect-square"
                loading="lazy"
                width={500}
                height={500}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
        </div>
        <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-primary/10 rounded-full -z-10"></div>
        <div className="absolute -top-4 -left-4 w-16 h-16 bg-accent/20 rounded-full -z-10"></div>
    </div>
    <div className="space-y-6">
        <div>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Hi, I am Suhana</h3>
            <p className="text-primary font-medium">Counselling Psychologist</p>
        </div>
        <p className="text-muted-foreground leading-relaxed">
            I amm really glad you have ve taken this step for yourself. Considering therapy is a brave and meaningful choice. I
            am a counselling psychologist with a Masters degree in Counselling Psychology, and I have over 240 hours of
            experience supporting adolescents and adults in both school and individual settings.
        </p>
        <p className="text-muted-foreground leading-relaxed">
            My approach is empathetic, person-centred, and integrative, drawing from Positive Psychology and
            strength-based approaches. I believe therapy is not only about addressing challenges, but also about
            discovering your strengths, values, and inner capacity for growth.
        </p>
        <p className="text-muted-foreground leading-relaxed font-medium">
            My aim is to offer a warm, safe, and understanding space where you can explore, heal, and move closer to the
            life you wish to build.
        </p>
        <div className="pt-4">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">Qualifications</h4>
            <div className="flex flex-wrap gap-3">
                <div
                    className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="lucide lucide-graduation-cap w-4 h-4"
                    >
                        <path
                            d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"
                        ></path>
                        <path d="M22 10v6"></path>
                        <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"></path></svg
                    >MSc Counselling Psychology
                </div>
                <div
                    className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        className="lucide lucide-graduation-cap w-4 h-4"
                    >
                        <path
                            d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"
                        ></path>
                        <path d="M22 10v6"></path>
                        <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5"></path></svg
                    >BSc Psychology
                </div>
            </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="bg-background rounded-xl p-4 shadow-sm border border-border/50">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-languages w-5 h-5 text-primary mb-2"
                >
                    <path d="m5 8 6 6"></path>
                    <path d="m4 14 6-6 2-3"></path>
                    <path d="M2 5h12"></path>
                    <path d="M7 2h1"></path>
                    <path d="m22 22-5-10-5 10"></path>
                    <path d="M14 18h6"></path>
                </svg>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Languages</p>
                <p className="text-sm font-semibold text-foreground mt-1">Tamil, English</p>
            </div>
            <div className="bg-background rounded-xl p-4 shadow-sm border border-border/50">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-clock w-5 h-5 text-primary mb-2"
                >
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Availability</p>
                <p className="text-sm font-semibold text-foreground mt-1">9 AM - 7 PM</p>
            </div>
            <div className="bg-background rounded-xl p-4 shadow-sm border border-border/50">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-heart w-5 h-5 text-primary mb-2"
                >
                    <path
                        d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
                    ></path>
                </svg>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Experience</p>
                <p className="text-sm font-semibold text-foreground mt-1">240+ Hours</p>
            </div>
        </div>
        <div className="pt-4">
            <button
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 shadow-soft hover:shadow-card hover:-translate-y-0.5 active:translate-y-0 h-12 rounded-xl px-8 text-base w-full sm:w-auto"
            >
                Book a Session with Suhana
            </button>
        </div>
    </div>
</div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default TherapistsTab;
