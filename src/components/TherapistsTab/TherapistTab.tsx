"use client";

import { useState } from "react";
import type { TabItem } from "@/types";
import Image from "next/image";
import { GraduationCap, Languages, Heart, Clock, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";

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

  const router = useRouter();

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* Top Controls */}
      <div className="flex items-center justify-center gap-3 mb-8">
        <button
          onClick={prev}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 leading-[18px] cursor-pointer"
        >
          ←
        </button>

        <div className="flex gap-2">
          {data.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full transition-[width] duration-300 ease-in-out ${
                index === activeIndex
                  ? "bg-primary w-6"
                  : "bg-gray-400"
              }`}
            />
          ))}
        </div>

        <button
          onClick={next}
          className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 leading-[18px] cursor-pointer"
        >
          →
        </button>
      </div>

      {/* Fade Container */}
      <div className="relative h-[670px]">
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
                src={item.image}
                alt="Counselling Psychologist"
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
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Hi, I am {item.name}</h3>
            <p className="text-theme">{item.degree}</p>
        </div>
        <p className="text-secondary md:text-lg">
          {item.description}
        </p>
        <div className="pt-4">
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">Area Of Expertise</h4>
            <div className="flex flex-wrap gap-3">
              { item.areas.map((area, idx) => (
                <div 
                  className="flex items-center gap-2 bg-light text-secondary px-4 py-2 rounded-full text-sm font-medium"
                  key={idx}>
                  <GraduationCap className="h-4 w-4"/>
                   {area}
                </div>
              ))
            }
            </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
            <div className="bg-background rounded-xl p-4 shadow-sm border border-primary">
                <Languages className="text-theme mb-2" />
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Languages</p>
                <p className="text-sm font-semibold text-foreground mt-1">
                  {item.languages.join(", ")}
                </p>
            </div>
            <div className="bg-background rounded-xl p-4 shadow-sm border border-primary">
                <Clock className="text-theme mb-2" /> 
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Availability</p>
                <p className="text-sm font-semibold text-foreground mt-1">9 AM - 7 PM</p>
            </div>
            <div className="bg-background rounded-xl p-4 shadow-sm border border-primary">
                <Heart className="text-theme mb-2" />
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Experience</p>
                <p className="text-sm font-semibold text-foreground mt-1">240+ Hours</p>
            </div>
        </div>
        <div className="pt-4">
            <Button variant="primary" onClick={() => router.push("/book")}>
              <span>Book a Session with {item.name}</span> 
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform"/>
            </Button>
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
