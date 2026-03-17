"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How do I know if I need therapy?",
    answer:
      "If you're feeling overwhelmed, anxious, stuck, or simply want to understand yourself better, therapy can help. You don’t need to be in crisis to seek support.",
  },
  {
    question: "Is everything I share confidential?",
    answer:
      "Yes, your privacy is a priority. Everything discussed in sessions remains confidential, with very few legal exceptions.",
  },
  {
    question: "How long does each session last?",
    answer:
      "Most sessions typically last around 45–60 minutes, depending on your needs and the therapist’s approach.",
  },
  {
    question: "Can I choose my therapist?",
    answer:
      "Absolutely. You can browse profiles and select a therapist you feel comfortable with based on your preferences.",
  },
  {
    question: "How soon will I start feeling better?",
    answer:
      "Progress varies for everyone, but many people start noticing positive changes within a few sessions.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-light-ultra" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Heading */}
        <div className="text-center mb-14">
          <span className="inline-block text-theme bg-light font-semibold bg-primary/10 px-4 py-2 mb-3 rounded-full text-sm">FAQs</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
            Frequently Asked <span className="text-theme">Questions</span>
          </h2>

          <p className="text-gray-500 mt-4">
            Everything you need to know before getting started.
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="bg-white rounded-xl border border-gray-100 shadow-sm transition"
              >
                {/* Question */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between text-left px-6 py-5"
                >
                  <span className="font-medium text-gray-900">
                    {faq.question}
                  </span>

                  <ChevronDown
                    className={`transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-theme" : "text-gray-400"
                    }`}
                  />
                </button>

                {/* Answer */}
                <div
                  className={`px-6 overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-40 pb-5" : "max-h-0"
                  }`}
                >
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}