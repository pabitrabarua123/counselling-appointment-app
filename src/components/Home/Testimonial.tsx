"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Star } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    name: "Ananya S.",
    role: "IT Professional",
    place: "Kolkata",
    rating: 5,
    text: "I was struggling with anxiety for years. Taking the first step was hard, but it changed everything. I feel more in control now.",
  },
  {
    name: "Rahul K.",
    role: "Entrepreneur",
    place: "Delhi",
    rating: 4,
    text: "Therapy helped me understand myself better. It’s not just about problems—it’s about growth and clarity.",
  },
  {
    name: "Priya M.",
    role: "Teacher",
    place: "Bangalore",
    rating: 4,
    text: "I finally feel heard. The journey hasn’t been easy, but it’s been worth it. I feel lighter and stronger.",
  },
  {
    name: "Arjun D.",
    role: "Software Engineer",
    place: "Hyderabad",
    rating: 5,
    text: "Opening up was difficult at first, but I found a safe space. It truly helped me rebuild my confidence.",
  },
  {
    name: "Sneha R.",
    role: "Student",
    place: "Mumbai",
    rating: 4,
    text: "I learned how to manage my thoughts and emotions. It’s made a huge difference in my daily life.",
  },
];

export default function Testimonial() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50" id="testimonial">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heading */}
        <div className="text-center mb-16">
          <span className="inline-block text-theme font-semibold bg-primary/10 px-4 py-2 mb-3 rounded-full text-sm">
            Voices of Recovery
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            Real Experiences, <span className="text-theme">Deep Healing</span>
          </h2>

          <p className="text-gray-500 md:text-lg mt-4">
            Listen to stories of those who found the courage to seek help and
            <br className="hidden sm:block" />
            discovered a path toward healing.
          </p>
        </div>

        {/* Swiper */}
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          pagination={{ clickable: true }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          modules={[Pagination]}
        >
          {testimonials.map((item, index) => (
            <SwiperSlide key={index}>
              
              <div
                className="h-full bg-light-ultra rounded-2xl p-6 flex flex-col justify-between transition duration-300 hover:-translate-y-1"
                style={{
                  boxShadow:
                    "rgba(61, 49, 41, 0.05) 0px 2px 8px -2px, rgba(61, 49, 41, 0.07) 0px 4px 16px -4px",
                }}
              >
                
                {/* ⭐ Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={18}
                      className={`${
                        i < item.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>

                {/* 📝 Text */}
                <p className="text-gray-600 leading-relaxed mb-6">
                  “{item.text}”
                </p>

                {/* Divider */}
                <div className="border-t border-[#aee8e1] my-4"></div>

                {/* 👤 User Info */}
                <div className="flex items-center gap-4 mt-2">
                  
                  {/* Avatar */}
                  <img
                    src={`https://ui-avatars.com/api/?name=${item.name}&background=random`}
                    width={40}
                    height={40}
                    alt={item.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />

                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {item.name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {item.role} • {item.place}
                    </p>
                  </div>
                </div>

              </div>

            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}